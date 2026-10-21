(() => {
  const toggle=document.querySelector('.nav-toggle'), nav=document.querySelector('.site-nav');
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);});
  document.querySelector('.nav-more > button')?.addEventListener('click',e=>{const open=e.currentTarget.getAttribute('aria-expanded')==='true';e.currentTarget.setAttribute('aria-expanded',String(!open));});
  const language=document.querySelector('[data-language]'), languageButton=language?.querySelector('button'), languageMenu=language?.querySelector('.language__menu');
  languageButton?.addEventListener('click',()=>{const open=languageButton.getAttribute('aria-expanded')==='true';languageButton.setAttribute('aria-expanded',String(!open));languageMenu.hidden=open;});
  document.addEventListener('click',e=>{if(language&&!language.contains(e.target)){languageButton.setAttribute('aria-expanded','false');languageMenu.hidden=true;}});
  document.querySelector('[data-prototype-form]')?.addEventListener('submit',e=>{e.preventDefault();const result=e.currentTarget.querySelector('.form-result');result.hidden=false;result.focus();window.phuketShootersTrack?.('booking_submit');});
  document.querySelectorAll('[data-demo-group-form]').forEach(form=>{
    const messages=JSON.parse(form.dataset.messages||'{}');
    const preview=form.parentElement.querySelector('[data-group-preview]');
    const summary=form.querySelector('.group-error-summary');
    const input=name=>form.elements.namedItem(name);
    const showError=(name,message)=>{const field=input(name),error=form.querySelector(`#group-${name}-error`);field.setAttribute('aria-invalid','true');field.setAttribute('aria-describedby',error.id);error.textContent=message;error.hidden=false;};
    const clearError=name=>{const field=input(name),error=form.querySelector(`#group-${name}-error`);field.removeAttribute('aria-invalid');field.removeAttribute('aria-describedby');error.textContent='';error.hidden=true;};
    form.addEventListener('submit',event=>event.preventDefault());
    form.querySelectorAll('input,textarea').forEach(field=>field.addEventListener('input',()=>clearError(field.name)));
    form.querySelector('[data-preview-group]').addEventListener('click',()=>{
      const values=Object.fromEntries([...form.elements].filter(field=>field.name).map(field=>[field.name,field.value.trim()]));
      form.querySelectorAll('input,textarea').forEach(field=>clearError(field.name));
      const invalid=[];
      for(const name of ['name','email','date','visitors']) if(!values[name]) invalid.push([name,messages.required]);
      if(values.email && input('email').validity.typeMismatch) invalid.push(['email',messages.email]);
      const dateParts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(part=>[part.type,part.value]));
      const todayInPhuket=`${dateParts.year}-${dateParts.month}-${dateParts.day}`;
      if(values.date && values.date<todayInPhuket) invalid.push(['date',messages.date]);
      if(values.visitors && (!/^\d+$/.test(values.visitors)||!Number.isSafeInteger(Number(values.visitors))||Number(values.visitors)<1)) invalid.push(['visitors',messages.visitors]);
      if(values.coaches && (!/^\d+$/.test(values.coaches)||!Number.isSafeInteger(Number(values.coaches)))) invalid.push(['coaches',messages.coaches]);
      if(invalid.length){for(const [name,message] of invalid)showError(name,message);summary.textContent=messages.summary;summary.hidden=false;summary.focus();return;}
      summary.hidden=true;
      const [year,month,day]=values.date.split('-').map(Number);
      preview.querySelector('[data-preview-date]').textContent=new Intl.DateTimeFormat(form.dataset.locale,{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Bangkok'}).format(new Date(Date.UTC(year,month-1,day,12)));
      preview.querySelector('[data-preview-time-wrap]').hidden=!values.time;
      preview.querySelector('[data-preview-time]').textContent=values.time;
      preview.querySelector('[data-preview-visitors]').textContent=new Intl.NumberFormat(form.dataset.locale).format(Number(values.visitors));
      preview.querySelector('[data-preview-coaches]').textContent=new Intl.NumberFormat(form.dataset.locale).format(Number(values.coaches||0));
      form.hidden=true;preview.hidden=false;preview.focus();
    });
    preview.querySelector('[data-edit-group]').addEventListener('click',()=>{preview.hidden=true;form.hidden=false;form.querySelector('[data-preview-group]').focus();});
  });
  document.querySelectorAll('[data-visit-image]').forEach(image=>{const pool=JSON.parse(image.dataset.imagePool||'[]');if(!pool.length)return;const selected=pool[Math.floor(Math.random()*pool.length)];image.alt=selected.alt;image.src=selected.src;image.removeAttribute('data-image-pool');});
  document.querySelectorAll('[data-deferred-video]').forEach(video=>{const load=()=>{video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;source.removeAttribute('data-src');});video.load();};if(!('IntersectionObserver'in window)){load();return;}const observer=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;observer.disconnect();load();},{rootMargin:'300px'});observer.observe(video);});
  document.addEventListener('click',e=>{const target=e.target.closest('[data-event]');if(target)window.phuketShootersTrack?.(target.dataset.event,{href:target.getAttribute('href'),...(target.dataset.language?{language:target.dataset.language}:{})});});
  window.phuketShootersTrack=window.phuketShootersTrack||((event,detail={})=>window.dispatchEvent(new CustomEvent('phuketshooters:event',{detail:{event,...detail}})));
})();
