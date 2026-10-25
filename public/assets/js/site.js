(() => {
  const toggle=document.querySelector('.nav-toggle'), nav=document.querySelector('.site-nav');
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);});
  document.querySelector('.nav-more > button')?.addEventListener('click',e=>{const open=e.currentTarget.getAttribute('aria-expanded')==='true';e.currentTarget.setAttribute('aria-expanded',String(!open));});
  const language=document.querySelector('[data-language]'), languageButton=language?.querySelector('button'), languageMenu=language?.querySelector('.language__menu');
  languageButton?.addEventListener('click',()=>{const open=languageButton.getAttribute('aria-expanded')==='true';languageButton.setAttribute('aria-expanded',String(!open));languageMenu.hidden=open;});
  document.addEventListener('click',e=>{if(language&&!language.contains(e.target)){languageButton.setAttribute('aria-expanded','false');languageMenu.hidden=true;}});
  const bookingForm=document.querySelector('[data-prototype-form]');
  if(bookingForm){
    const messages=JSON.parse(bookingForm.dataset.testMessages||'{}'),button=bookingForm.querySelector('button[type="submit"]'),result=bookingForm.querySelector('.form-result');
    let testEnabled=false,submissionId=null,busy=false;
    fetch('/api/booking-mode',{cache:'no-store'}).then(response=>response.ok?response.json():null).then(mode=>{
      if(mode?.enabled){testEnabled=true;button.firstChild.textContent=messages.send;}
    }).catch(()=>{});
    bookingForm.addEventListener('input',()=>{if(!busy)submissionId=null;});
    bookingForm.addEventListener('submit',async event=>{
      event.preventDefault();
      if(!testEnabled){result.hidden=false;result.focus();return;}
      if(busy)return;
      if(!bookingForm.reportValidity())return;
      busy=true;button.disabled=true;button.firstChild.textContent=messages.sending;result.hidden=true;
      submissionId ||= crypto.randomUUID();
      const values=Object.fromEntries(new FormData(bookingForm));
      const payload={...values,lang:document.documentElement.lang.split('-')[0],agree:bookingForm.querySelector('.check input').checked,submissionId};
      const controls=bookingForm.querySelectorAll('input,textarea');
      controls.forEach(control=>control.disabled=true);
      try{
        const response=await fetch('/api/booking-enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),cache:'no-store'});
        const data=await response.json();
        if(data.result==='accepted' && !data.details){
          result.textContent=messages.outdated;
        }else if(data.result==='accepted'){
          const confirmation=bookingForm.parentElement.querySelector('.booking-confirmation');
          confirmation.querySelector('h2').textContent=messages.title;
          confirmation.querySelector('p').textContent=messages.accepted;
          const detailsHeading=document.createElement('h3'),detailsList=document.createElement('dl');
          detailsHeading.textContent=messages.details;
          detailsList.className='booking-confirmation__details';
          for(const key of ['name','phone','email','people','date','start','end','extra']){
            const label=bookingForm.querySelector(`label[for="${key}"] span`),row=document.createElement('div'),term=document.createElement('dt'),value=document.createElement('dd');
            term.textContent=label.firstChild.textContent.trim();
            value.textContent=String(data.details[key] || '—');
            value.dir='auto';
            row.append(term,value);detailsList.append(row);
          }
          confirmation.querySelector('a').before(detailsHeading,detailsList);
          bookingForm.hidden=true;confirmation.hidden=false;confirmation.focus();
          window.phuketShootersTrack?.('booking_submit');
          return;
        }
        else if(data.result==='changed'){submissionId=null;result.textContent=messages.changed;}
        else result.textContent=data.result==='partial'?messages.partial:messages.failed;
      }catch{result.textContent=messages.failed;}
      finally{busy=false;button.disabled=false;button.firstChild.textContent=messages.send;controls.forEach(control=>control.disabled=false);}
      result.hidden=false;result.focus();
    });
  }
  document.querySelectorAll('[data-demo-group-form]').forEach(form=>{
    const messages=JSON.parse(form.dataset.messages||'{}');
    const sendMessages=JSON.parse(form.dataset.sendMessages||'{}');
    const preview=form.parentElement.querySelector('[data-group-preview]');
    const summary=form.querySelector('.group-error-summary');
    const button=form.querySelector('[data-preview-group]');
    let sendEnabled=false,submissionId=null,busy=false;
    fetch('/api/booking-mode',{cache:'no-store'}).then(response=>response.ok?response.json():null).then(mode=>{
      if(mode?.enabled){sendEnabled=true;button.type='submit';button.firstChild.textContent=sendMessages.send;document.querySelector('[data-group-request-intro]').textContent=sendMessages.intro;}
    }).catch(()=>{});
    const input=name=>form.elements.namedItem(name);
    const showError=(name,message)=>{const field=input(name),error=form.querySelector(`#group-${name}-error`);field.setAttribute('aria-invalid','true');field.setAttribute('aria-describedby',error.id);error.textContent=message;error.hidden=false;};
    const clearError=name=>{const field=input(name),error=form.querySelector(`#group-${name}-error`);field.removeAttribute('aria-invalid');field.removeAttribute('aria-describedby');error.textContent='';error.hidden=true;};
    form.querySelectorAll('input,textarea').forEach(field=>field.addEventListener('input',()=>{clearError(field.name);if(!busy)submissionId=null;}));
    const validateValues=()=>{
      const values=Object.fromEntries([...form.elements].filter(field=>field.name).map(field=>[field.name,field.value.trim()]));
      form.querySelectorAll('input,textarea').forEach(field=>clearError(field.name));
      const invalid=[];
      for(const name of ['name','email','date','visitors']) if(!values[name]) invalid.push([name,messages.required]);
      if(values.email && input('email').validity.typeMismatch) invalid.push(['email',messages.email]);
      const dateParts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(part=>[part.type,part.value]));
      const todayInPhuket=`${dateParts.year}-${dateParts.month}-${dateParts.day}`;
      if(values.date && values.date<todayInPhuket) invalid.push(['date',messages.date]);
      if(values.visitors && (!/^\d+$/.test(values.visitors)||!Number.isSafeInteger(Number(values.visitors))||Number(values.visitors)<1||Number(values.visitors)>10000)) invalid.push(['visitors',messages.visitors]);
      if(values.coaches && (!/^\d+$/.test(values.coaches)||!Number.isSafeInteger(Number(values.coaches))||Number(values.coaches)>99)) invalid.push(['coaches',messages.coaches]);
      if(invalid.length){for(const [name,message] of invalid)showError(name,message);summary.textContent=messages.summary;summary.hidden=false;summary.focus();return null;}
      summary.hidden=true;
      return values;
    };
    const showPreview=values=>{
      const [year,month,day]=values.date.split('-').map(Number);
      preview.querySelector('[data-preview-date]').textContent=new Intl.DateTimeFormat(form.dataset.locale,{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Bangkok'}).format(new Date(Date.UTC(year,month-1,day,12)));
      preview.querySelector('[data-preview-time-wrap]').hidden=!values.time;
      preview.querySelector('[data-preview-time]').textContent=values.time;
      preview.querySelector('[data-preview-visitors]').textContent=new Intl.NumberFormat(form.dataset.locale).format(Number(values.visitors));
      preview.querySelector('[data-preview-coaches]').textContent=new Intl.NumberFormat(form.dataset.locale).format(Number(values.coaches||0));
      form.hidden=true;preview.hidden=false;preview.focus();
    };
    button.addEventListener('click',()=>{if(!sendEnabled){const values=validateValues();if(values)showPreview(values);}});
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      if(!sendEnabled||busy)return;
      const values=validateValues();if(!values)return;
      busy=true;button.disabled=true;button.firstChild.textContent=sendMessages.sending;submissionId ||= crypto.randomUUID();
      const controls=form.querySelectorAll('input,textarea');controls.forEach(control=>control.disabled=true);
      try{
        const response=await fetch('/api/group-enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,lang:form.dataset.language,submissionId}),cache:'no-store'});
        const data=await response.json();
        if(data.result==='accepted'&&data.details){
          preview.querySelector('h2').textContent=sendMessages.title;
          preview.querySelector('p').textContent=sendMessages.accepted;
          const list=preview.querySelector('dl');list.replaceChildren();
          for(const key of ['company','name','email','phone','date','time','visitors','coaches','activities','questions']){
            const row=document.createElement('div'),term=document.createElement('dt'),value=document.createElement('dd');
            term.textContent=form.querySelector(`label[for="group-${key}"]`).firstChild.textContent.trim();
            value.textContent=String(data.details[key]??'')||'—';value.dir='auto';row.append(term,value);list.append(row);
          }
          preview.querySelector('[data-edit-group]').hidden=true;form.hidden=true;preview.hidden=false;preview.focus();
          window.phuketShootersTrack?.('group_request_submit');return;
        }
        if(data.result==='accepted')summary.textContent=sendMessages.outdated;
        else if(data.result==='changed'){submissionId=null;summary.textContent=sendMessages.changed;}
        else summary.textContent=data.result==='partial'?sendMessages.partial:sendMessages.failed;
      }catch{summary.textContent=sendMessages.failed;}
      finally{busy=false;button.disabled=false;button.firstChild.textContent=sendMessages.send;controls.forEach(control=>control.disabled=false);}
      summary.hidden=false;summary.focus();
    });
    preview.querySelector('[data-edit-group]').addEventListener('click',()=>{preview.hidden=true;form.hidden=false;button.focus();});
  });
  document.querySelectorAll('[data-visit-image]').forEach(image=>{const pool=JSON.parse(image.dataset.imagePool||'[]');if(!pool.length)return;const selected=pool[Math.floor(Math.random()*pool.length)];image.alt=selected.alt;image.src=selected.src;image.removeAttribute('data-image-pool');});
  document.querySelectorAll('[data-deferred-video]').forEach(video=>{const load=()=>{video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;source.removeAttribute('data-src');});video.load();};if(!('IntersectionObserver'in window)){load();return;}const observer=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;observer.disconnect();load();},{rootMargin:'300px'});observer.observe(video);});
  document.addEventListener('click',e=>{const target=e.target.closest('[data-event]');if(target)window.phuketShootersTrack?.(target.dataset.event,{href:target.getAttribute('href'),...(target.dataset.language?{language:target.dataset.language}:{})});});
  window.phuketShootersTrack=window.phuketShootersTrack||((event,detail={})=>window.dispatchEvent(new CustomEvent('phuketshooters:event',{detail:{event,...detail}})));
})();
