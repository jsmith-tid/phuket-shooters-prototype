(() => {
  const toggle=document.querySelector('.nav-toggle'), nav=document.querySelector('.site-nav');
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);});
  document.querySelector('.nav-more > button')?.addEventListener('click',e=>{const open=e.currentTarget.getAttribute('aria-expanded')==='true';e.currentTarget.setAttribute('aria-expanded',String(!open));});
  const language=document.querySelector('[data-language]'), languageButton=language?.querySelector('button'), languageMenu=language?.querySelector('.language__menu');
  languageButton?.addEventListener('click',()=>{const open=languageButton.getAttribute('aria-expanded')==='true';languageButton.setAttribute('aria-expanded',String(!open));languageMenu.hidden=open;});
  document.addEventListener('click',e=>{if(language&&!language.contains(e.target)){languageButton.setAttribute('aria-expanded','false');languageMenu.hidden=true;}});
  document.querySelector('[data-prototype-form]')?.addEventListener('submit',e=>{e.preventDefault();const result=e.currentTarget.querySelector('.form-result');result.hidden=false;result.focus();window.phuketShootersTrack?.('booking_submit');});
  document.querySelectorAll('[data-visit-image]').forEach(image=>{const pool=JSON.parse(image.dataset.imagePool||'[]');if(!pool.length)return;const selected=pool[Math.floor(Math.random()*pool.length)];image.alt=selected.alt;image.src=selected.src;image.removeAttribute('data-image-pool');});
  document.querySelectorAll('[data-deferred-video]').forEach(video=>{const load=()=>{video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;source.removeAttribute('data-src');});video.load();};if(!('IntersectionObserver'in window)){load();return;}const observer=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;observer.disconnect();load();},{rootMargin:'300px'});observer.observe(video);});
  document.addEventListener('click',e=>{const target=e.target.closest('[data-event]');if(target)window.phuketShootersTrack?.(target.dataset.event,{href:target.getAttribute('href')});});
  window.phuketShootersTrack=window.phuketShootersTrack||((event,detail={})=>window.dispatchEvent(new CustomEvent('phuketshooters:event',{detail:{event,...detail}})));
})();
