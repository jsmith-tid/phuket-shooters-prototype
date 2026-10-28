(() => {
  const toggle=document.querySelector('.nav-toggle'), nav=document.querySelector('.site-nav');
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);});
  const more=document.querySelector('.nav-more'), moreButton=more?.querySelector('button');
  const language=document.querySelector('[data-language]'), languageButton=language?.querySelector('button'), languageMenu=language?.querySelector('.language__menu');
  const closeMore=()=>moreButton?.setAttribute('aria-expanded','false');
  const closeLanguage=()=>{if(languageButton) languageButton.setAttribute('aria-expanded','false');if(languageMenu) languageMenu.hidden=true;};
  moreButton?.addEventListener('click',()=>{const open=moreButton.getAttribute('aria-expanded')==='true';closeLanguage();moreButton.setAttribute('aria-expanded',String(!open));});
  languageButton?.addEventListener('click',()=>{const open=languageButton.getAttribute('aria-expanded')==='true';closeMore();languageButton.setAttribute('aria-expanded',String(!open));languageMenu.hidden=open;});
  document.addEventListener('click',e=>{if(more&&!more.contains(e.target)) closeMore();if(language&&!language.contains(e.target)) closeLanguage();});
  const securityCopy={
    en:{checking:'Checking your browser…',wait:'Please complete the security check before sending.',error:'The security check could not finish. Try sending again, or contact us directly.',limited:'Too many requests right now. Please wait a minute and try again, or contact us by phone or WhatsApp.'},
    th:{checking:'กำลังตรวจสอบเบราว์เซอร์…',wait:'กรุณาทำการตรวจสอบความปลอดภัยก่อนส่ง',error:'ไม่สามารถตรวจสอบความปลอดภัยได้ โปรดลองส่งอีกครั้งหรือติดต่อเราโดยตรง',limited:'มีคำขอมากเกินไปในขณะนี้ โปรดรอสักครู่แล้วลองอีกครั้ง หรือติดต่อทางโทรศัพท์หรือ WhatsApp'},
    zh:{checking:'正在检查浏览器…',wait:'发送前请完成安全验证。',error:'安全验证未能完成。请再次尝试发送，或直接联系我们。',limited:'当前请求过多。请稍等一分钟后重试，或通过电话或 WhatsApp 联系我们。'},
    ar:{checking:'جارٍ التحقق من المتصفح…',wait:'يرجى إكمال التحقق الأمني قبل الإرسال.',error:'تعذر إكمال التحقق الأمني. حاول الإرسال مجددًا أو تواصل معنا مباشرة.',limited:'هناك طلبات كثيرة الآن. انتظر دقيقة ثم حاول مجددًا، أو تواصل معنا هاتفيًا أو عبر واتساب.'},
    ru:{checking:'Проверяем браузер…',wait:'Пройдите проверку безопасности перед отправкой.',error:'Не удалось завершить проверку. Попробуйте отправить ещё раз или свяжитесь с нами напрямую.',limited:'Сейчас слишком много запросов. Подождите минуту и попробуйте снова или свяжитесь с нами по телефону или через WhatsApp.'}
  };
  const security=securityCopy[document.documentElement.lang.split('-')[0]]||securityCopy.en;
  const emailPattern=/^[^\s@.<>()[\],;:"\\]+(?:\.[^\s@.<>()[\],;:"\\]+)*@(?:[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?\.)+(?:[\p{L}]{2,63}|xn--[a-z0-9-]{2,59})$/iu;
  const normalisePhoneDigits=value=>value.replace(/[٠-٩۰-۹๐-๙０-９]/gu,digit=>{const code=digit.codePointAt(0),base=code>=0xff10?0xff10:code>=0x0e50?0x0e50:code>=0x06f0?0x06f0:0x0660;return String(code-base);});
  const validPhone=value=>{const digits=normalisePhoneDigits(value);return /^\+?[0-9().\-\s]+$/.test(digits)&&(digits.match(/[0-9]/g)||[]).length>=6&&(digits.match(/[0-9]/g)||[]).length<=20;};
  const phuketToday=()=>{const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(part=>[part.type,part.value]));return `${parts.year}-${parts.month}-${parts.day}`;};
  const inputCopy={
    en:{email:'Enter a valid email address.',phone:'Enter a phone number with 6–20 digits, using only common separators.',time:'Choose an end time later than the start time.'},
    th:{email:'กรุณากรอกอีเมลให้ถูกต้อง',phone:'กรุณาระบุหมายเลขโทรศัพท์ 6–20 หลัก โดยใช้เฉพาะเครื่องหมายคั่นทั่วไป',time:'กรุณาเลือกเวลาสิ้นสุดหลังเวลาเริ่ม'},
    zh:{email:'请输入有效的电子邮箱地址。',phone:'请输入含 6–20 位数字的电话号码，仅使用常见分隔符。',time:'结束时间须晚于开始时间。'},
    ar:{email:'أدخل عنوان بريد إلكتروني صالحًا.',phone:'أدخل رقم هاتف يتكون من 6 إلى 20 رقمًا باستخدام فواصل شائعة فقط.',time:'اختر وقت انتهاء بعد وقت البدء.'},
    ru:{email:'Укажите корректный адрес электронной почты.',phone:'Укажите номер телефона из 6–20 цифр; допускаются обычные разделители.',time:'Время окончания должно быть позже времени начала.'}
  };
  const revealPanel=panel=>{
    panel.focus({preventScroll:true});
    requestAnimationFrame(()=>{
      const headerHeight=document.querySelector('.site-header')?.getBoundingClientRect().height||0;
      const top=window.scrollY+panel.getBoundingClientRect().top-headerHeight-16;
      const root=document.documentElement,previous=root.style.scrollBehavior;
      root.style.scrollBehavior='auto';
      window.scrollTo(0,Math.max(0,top));
      requestAnimationFrame(()=>{root.style.scrollBehavior=previous;});
    });
  };
  let turnstileScript;
  const loadTurnstile=()=>turnstileScript||=(new Promise((resolve,reject)=>{
    if(window.turnstile){resolve(window.turnstile);return;}
    const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.defer=true;
    script.onload=()=>window.turnstile?resolve(window.turnstile):reject(Error('Turnstile unavailable'));
    script.onerror=()=>reject(Error('Turnstile unavailable'));document.head.append(script);
  }).catch(error=>{turnstileScript=null;throw error;}));
  const attachChallenge=(form,siteKey,button,action)=>{
    if(!siteKey)return null;
    const panel=document.createElement('div'),widget=document.createElement('div'),status=document.createElement('p');
    panel.className='form-security';panel.tabIndex=-1;status.className='form-security__status';status.setAttribute('role','status');status.textContent=security.checking;
    panel.append(widget,status);button.before(panel);
    let token='',widgetId=null,api=null,loadFailed=false;
    const start=()=>{loadFailed=false;status.textContent=security.checking;loadTurnstile().then(turnstile=>{
      api=turnstile;widgetId=api.render(widget,{sitekey:siteKey,action,appearance:'always',size:'flexible',language:document.documentElement.lang.toLowerCase(),
        callback:value=>{token=value;status.textContent='';},
        'expired-callback':()=>{token='';status.textContent=security.wait;},
        'error-callback':()=>{token='';status.textContent=security.error;},
        'timeout-callback':()=>{token='';status.textContent=security.wait;}});
    }).catch(()=>{loadFailed=true;status.textContent=security.error;});};
    start();
    return {getToken:()=>token,focus:()=>{if(loadFailed)start();else status.textContent=api?security.wait:security.checking;revealPanel(panel);},reset:()=>{token='';if(api&&widgetId!==null)api.reset(widgetId);}};
  };
  const bookingForm=document.querySelector('[data-prototype-form]');
  if(bookingForm){
    const messages=JSON.parse(bookingForm.dataset.testMessages||'{}'),button=bookingForm.querySelector('button[type="submit"]'),result=bookingForm.querySelector('.form-result');
    const inputMessages=inputCopy[document.documentElement.lang.split('-')[0]]||inputCopy.en;
    const phone=bookingForm.elements.namedItem('phone'),email=bookingForm.elements.namedItem('email'),start=bookingForm.elements.namedItem('start'),end=bookingForm.elements.namedItem('end'),date=bookingForm.elements.namedItem('date');
    date.min=phuketToday();
    for(const control of [phone,email,start,end])control.addEventListener('input',()=>control.setCustomValidity(''));
    const validateInputs=()=>{
      phone.setCustomValidity(phone.value.trim()&&!validPhone(phone.value.trim())?inputMessages.phone:'');
      email.setCustomValidity(email.value.trim()&&!emailPattern.test(email.value.trim())?inputMessages.email:'');
      end.setCustomValidity(start.value&&end.value&&start.value>=end.value?inputMessages.time:'');
      date.min=phuketToday();
      return bookingForm.reportValidity();
    };
    let testEnabled=false,submissionId=null,busy=false,challenge=null;
    fetch('/api/booking-mode',{cache:'no-store'}).then(response=>response.ok?response.json():null).then(mode=>{
      if(mode?.enabled){testEnabled=true;button.firstChild.textContent=messages.send;challenge=attachChallenge(bookingForm,mode.turnstileSiteKey,button,'consumer_enquiry');}
    }).catch(()=>{});
    bookingForm.addEventListener('input',()=>{if(!busy)submissionId=null;});
    bookingForm.addEventListener('submit',async event=>{
      event.preventDefault();
      if(!testEnabled){result.hidden=false;revealPanel(result);return;}
      if(busy)return;
      if(!validateInputs())return;
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
          bookingForm.hidden=true;confirmation.hidden=false;revealPanel(confirmation);
          window.phuketShootersTrack?.('booking_submit');
          return;
        }
        else if(data.result==='changed'){submissionId=null;result.textContent=messages.changed;}
        else result.textContent=data.result==='partial'?messages.partial:data.result==='rate_limited'?security.limited:data.result?.startsWith('challenge_')?security.error:messages.failed;
      }catch{result.textContent=messages.failed;}
      finally{busy=false;button.disabled=false;button.firstChild.textContent=messages.send;controls.forEach(control=>control.disabled=false);challenge?.reset();}
      result.hidden=false;revealPanel(result);
    });
    button.type='submit';
    bookingForm.hidden=false;
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
    const groupFields=['company','name','email','phone','date','time','visitors','coaches','activities','questions'];
    input('date').min=phuketToday();
    const showError=(name,message)=>{const field=input(name),error=form.querySelector(`#group-${name}-error`);field.setAttribute('aria-invalid','true');field.setAttribute('aria-describedby',error.id);error.textContent=message;error.hidden=false;};
    const clearError=name=>{const field=input(name),error=form.querySelector(`#group-${name}-error`);field.removeAttribute('aria-invalid');field.removeAttribute('aria-describedby');error.textContent='';error.hidden=true;};
    groupFields.forEach(name=>input(name).addEventListener('input',()=>{clearError(name);if(!busy)submissionId=null;}));
    const validateValues=()=>{
      const values=Object.fromEntries(groupFields.map(name=>[name,input(name).value.trim()]));
      groupFields.forEach(clearError);
      const invalid=[];
      for(const name of ['name','email','date','visitors']) if(!values[name]) invalid.push([name,messages.required]);
      if(values.email&&!emailPattern.test(values.email))invalid.push(['email',messages.email]);
      if(values.phone&&!validPhone(values.phone))invalid.push(['phone',messages.phone]);
      input('date').min=phuketToday();
      if(values.date&&values.date<input('date').min)invalid.push(['date',messages.date]);
      if(values.time&&(values.time<'09:00'||values.time>='18:00'))invalid.push(['time',messages.time]);
      if(values.visitors&&(!/^\d+$/.test(values.visitors)||!Number.isSafeInteger(Number(values.visitors))||Number(values.visitors)<1||Number(values.visitors)>999))invalid.push(['visitors',messages.visitors]);
      if(values.coaches&&(!/^\d+$/.test(values.coaches)||!Number.isSafeInteger(Number(values.coaches))||Number(values.coaches)>20))invalid.push(['coaches',messages.coaches]);
      if(invalid.length){for(const [name,message] of invalid)showError(name,message);summary.textContent=messages.summary;summary.hidden=false;revealPanel(summary);return null;}
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
      form.hidden=true;preview.hidden=false;revealPanel(preview);
    };
    button.addEventListener('click',()=>{if(!sendEnabled){const values=validateValues();if(values)showPreview(values);}});
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      if(!sendEnabled||busy)return;
      const values=validateValues();if(!values)return;
      if(challenge&&!challenge.getToken()){challenge.focus();return;}
      busy=true;button.disabled=true;button.firstChild.textContent=sendMessages.sending;submissionId ||= crypto.randomUUID();
      const controls=groupFields.map(input);controls.forEach(control=>control.disabled=true);
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
          preview.querySelector('[data-edit-group]').hidden=true;form.hidden=true;preview.hidden=false;revealPanel(preview);
          window.phuketShootersTrack?.('group_request_submit');return;
        }
        if(data.result==='accepted')summary.textContent=sendMessages.outdated;
        else if(data.result==='changed'){submissionId=null;summary.textContent=sendMessages.changed;}
        else summary.textContent=data.result==='partial'?sendMessages.partial:data.result==='rate_limited'?security.limited:data.result?.startsWith('challenge_')?security.error:sendMessages.failed;
      }catch{summary.textContent=sendMessages.failed;}
      finally{busy=false;button.disabled=false;button.firstChild.textContent=sendMessages.send;controls.forEach(control=>control.disabled=false);challenge?.reset();}
      summary.hidden=false;revealPanel(summary);
    });
    preview.querySelector('[data-edit-group]').addEventListener('click',()=>{preview.hidden=true;form.hidden=false;button.focus();});
    form.hidden=false;
  });
  document.querySelectorAll('[data-visit-image]').forEach(image=>{const pool=JSON.parse(image.dataset.imagePool||'[]');if(!pool.length)return;const selected=pool[Math.floor(Math.random()*pool.length)];image.alt=selected.alt;image.src=selected.src;image.removeAttribute('data-image-pool');});
  document.querySelectorAll('[data-deferred-video]').forEach(video=>{const load=()=>{video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;source.removeAttribute('data-src');});video.load();};if(!('IntersectionObserver'in window)){load();return;}const observer=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;observer.disconnect();load();},{rootMargin:'300px'});observer.observe(video);});
  document.addEventListener('click',e=>{const target=e.target.closest('[data-event]');if(target)window.phuketShootersTrack?.(target.dataset.event,{href:target.getAttribute('href'),...(target.dataset.language?{language:target.dataset.language}:{})});});
  window.phuketShootersTrack=window.phuketShootersTrack||((event,detail={})=>window.dispatchEvent(new CustomEvent('phuketshooters:event',{detail:{event,...detail}})));
})();
