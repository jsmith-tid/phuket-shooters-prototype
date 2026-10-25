(() => {
  const toggle=document.querySelector('.nav-toggle'), nav=document.querySelector('.site-nav');
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);});
  document.querySelector('.nav-more > button')?.addEventListener('click',e=>{const open=e.currentTarget.getAttribute('aria-expanded')==='true';e.currentTarget.setAttribute('aria-expanded',String(!open));});
  const language=document.querySelector('[data-language]'), languageButton=language?.querySelector('button'), languageMenu=language?.querySelector('.language__menu');
  languageButton?.addEventListener('click',()=>{const open=languageButton.getAttribute('aria-expanded')==='true';languageButton.setAttribute('aria-expanded',String(!open));languageMenu.hidden=open;});
  document.addEventListener('click',e=>{if(language&&!language.contains(e.target)){languageButton.setAttribute('aria-expanded','false');languageMenu.hidden=true;}});
  const securityCopy={
    en:{checking:'Checking your browser…',wait:'Please complete the security check before sending.',error:'The security check could not finish. Please retry or contact us directly.',limited:'Too many requests just now. Please wait a minute before trying again.'},
    th:{checking:'กำลังตรวจสอบเบราว์เซอร์…',wait:'กรุณาทำการตรวจสอบความปลอดภัยก่อนส่ง',error:'ไม่สามารถตรวจสอบความปลอดภัยได้ โปรดลองอีกครั้งหรือติดต่อเราโดยตรง',limited:'มีคำขอมากเกินไปในขณะนี้ โปรดรอสักครู่แล้วลองอีกครั้ง'},
    zh:{checking:'正在检查浏览器…',wait:'发送前请完成安全验证。',error:'安全验证未能完成。请重试或直接联系我们。',limited:'当前请求过多。请稍等一分钟后重试。'},
    ar:{checking:'جارٍ التحقق من المتصفح…',wait:'يرجى إكمال التحقق الأمني قبل الإرسال.',error:'تعذر إكمال التحقق الأمني. يرجى المحاولة مجددًا أو التواصل معنا مباشرة.',limited:'هناك طلبات كثيرة الآن. يرجى الانتظار دقيقة ثم المحاولة مجددًا.'},
    ru:{checking:'Проверяем браузер…',wait:'Пройдите проверку безопасности перед отправкой.',error:'Не удалось завершить проверку. Повторите попытку или свяжитесь с нами напрямую.',limited:'Сейчас слишком много запросов. Подождите минуту и попробуйте снова.'}
  };
  const security=securityCopy[document.documentElement.lang.split('-')[0]]||securityCopy.en;
  let turnstileScript;
  const loadTurnstile=()=>turnstileScript||=(new Promise((resolve,reject)=>{
    if(window.turnstile){resolve(window.turnstile);return;}
    const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.defer=true;
    script.onload=()=>window.turnstile?resolve(window.turnstile):reject(Error('Turnstile unavailable'));
    script.onerror=()=>reject(Error('Turnstile unavailable'));document.head.append(script);
  }));
  const attachChallenge=(form,siteKey,button,action)=>{
    if(!siteKey)return null;
    const panel=document.createElement('div'),widget=document.createElement('div'),status=document.createElement('p');
    panel.className='form-security';panel.tabIndex=-1;status.className='form-security__status';status.setAttribute('role','status');status.textContent=security.checking;
    panel.append(widget,status);button.before(panel);
    let token='',widgetId=null,api=null,loadFailed=false;
    loadTurnstile().then(turnstile=>{
      api=turnstile;widgetId=api.render(widget,{sitekey:siteKey,action,appearance:'always',size:'flexible',language:document.documentElement.lang.toLowerCase(),
        callback:value=>{token=value;status.textContent='';},
        'expired-callback':()=>{token='';status.textContent=security.wait;},
        'error-callback':()=>{token='';status.textContent=security.error;},
        'timeout-callback':()=>{token='';status.textContent=security.wait;}});
    }).catch(()=>{loadFailed=true;status.textContent=security.error;});
    return {getToken:()=>token,focus:()=>{status.textContent=loadFailed?security.error:api?security.wait:security.checking;panel.focus();},reset:()=>{token='';if(api&&widgetId!==null)api.reset(widgetId);}};
  };
  const bookingForm=document.querySelector('[data-prototype-form]');
  if(bookingForm){
    const messages=JSON.parse(bookingForm.dataset.testMessages||'{}'),button=bookingForm.querySelector('button[type="submit"]'),result=bookingForm.querySelector('.form-result');
    let testEnabled=false,submissionId=null,busy=false,challenge=null;
    fetch('/api/booking-mode',{cache:'no-store'}).then(response=>response.ok?response.json():null).then(mode=>{
      if(mode?.enabled){testEnabled=true;button.firstChild.textContent=messages.send;challenge=attachChallenge(bookingForm,mode.turnstileSiteKey,button,'consumer_enquiry');}
    }).catch(()=>{});
    bookingForm.addEventListener('input',()=>{if(!busy)submissionId=null;});
    bookingForm.addEventListener('submit',async event=>{
      event.preventDefault();
      if(!testEnabled){result.hidden=false;result.focus();return;}
      if(busy)return;
      if(!bookingForm.reportValidity())return;
      if(challenge&&!challenge.getToken()){challenge.focus();return;}
      busy=true;button.disabled=true;button.firstChild.textContent=messages.sending;result.hidden=true;
      submissionId ||= crypto.randomUUID();
      const values=Object.fromEntries(new FormData(bookingForm));
      const payload={...values,lang:document.documentElement.lang.split('-')[0],agree:bookingForm.querySelector('.check input').checked,submissionId,...(challenge?{turnstileToken:challenge.getToken()}:{})};
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
        else result.textContent=data.result==='partial'?messages.partial:data.result==='rate_limited'?security.limited:data.result?.startsWith('challenge_')?security.error:messages.failed;
      }catch{result.textContent=messages.failed;}
      finally{busy=false;button.disabled=false;button.firstChild.textContent=messages.send;controls.forEach(control=>control.disabled=false);challenge?.reset();}
      result.hidden=false;result.focus();
    });
  }
  document.querySelectorAll('[data-demo-group-form]').forEach(form=>{
    const messages=JSON.parse(form.dataset.messages||'{}');
    const sendMessages=JSON.parse(form.dataset.sendMessages||'{}');
    const preview=form.parentElement.querySelector('[data-group-preview]');
    const summary=form.querySelector('.group-error-summary');
    const button=form.querySelector('[data-preview-group]');
    let sendEnabled=false,submissionId=null,busy=false,challenge=null;
    fetch('/api/booking-mode',{cache:'no-store'}).then(response=>response.ok?response.json():null).then(mode=>{
      if(mode?.enabled){sendEnabled=true;button.type='submit';button.firstChild.textContent=sendMessages.send;document.querySelector('[data-group-request-intro]').textContent=sendMessages.intro;challenge=attachChallenge(form,mode.turnstileSiteKey,button,'group_enquiry');}
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
      if(challenge&&!challenge.getToken()){challenge.focus();return;}
      busy=true;button.disabled=true;button.firstChild.textContent=sendMessages.sending;submissionId ||= crypto.randomUUID();
      const controls=form.querySelectorAll('input,textarea');controls.forEach(control=>control.disabled=true);
      try{
        const response=await fetch('/api/group-enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,lang:form.dataset.language,submissionId,...(challenge?{turnstileToken:challenge.getToken()}:{})}),cache:'no-store'});
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
        else summary.textContent=data.result==='partial'?sendMessages.partial:data.result==='rate_limited'?security.limited:data.result?.startsWith('challenge_')?security.error:sendMessages.failed;
      }catch{summary.textContent=sendMessages.failed;}
      finally{busy=false;button.disabled=false;button.firstChild.textContent=sendMessages.send;controls.forEach(control=>control.disabled=false);challenge?.reset();}
      summary.hidden=false;summary.focus();
    });
    preview.querySelector('[data-edit-group]').addEventListener('click',()=>{preview.hidden=true;form.hidden=false;button.focus();});
  });
  document.querySelectorAll('[data-visit-image]').forEach(image=>{const pool=JSON.parse(image.dataset.imagePool||'[]');if(!pool.length)return;const selected=pool[Math.floor(Math.random()*pool.length)];image.alt=selected.alt;image.src=selected.src;image.removeAttribute('data-image-pool');});
  document.querySelectorAll('[data-deferred-video]').forEach(video=>{const load=()=>{video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;source.removeAttribute('data-src');});video.load();};if(!('IntersectionObserver'in window)){load();return;}const observer=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;observer.disconnect();load();},{rootMargin:'300px'});observer.observe(video);});
  document.addEventListener('click',e=>{const target=e.target.closest('[data-event]');if(target)window.phuketShootersTrack?.(target.dataset.event,{href:target.getAttribute('href'),...(target.dataset.language?{language:target.dataset.language}:{})});});
  window.phuketShootersTrack=window.phuketShootersTrack||((event,detail={})=>window.dispatchEvent(new CustomEvent('phuketshooters:event',{detail:{event,...detail}})));
})();
