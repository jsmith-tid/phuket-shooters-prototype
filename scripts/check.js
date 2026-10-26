const fs=require('node:fs'); const path=require('node:path'); const root=path.resolve(__dirname,'../dist');
if(!fs.existsSync(root)) require('./build');
const html=[]; function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);entry.isDirectory()?walk(p):entry.name.endsWith('.html')&&html.push(p);}} walk(root);
const failures=[]; for(const file of html){const source=fs.readFileSync(file,'utf8');if(!source.includes('noindex, nofollow')) failures.push(`${file}: missing noindex`);if(!source.includes('<html lang=')) failures.push(`${file}: missing lang`);for(const match of source.matchAll(/(?:src|href)="([^"#]+)"/g)){const ref=match[1];if(/^(https?:|mailto:|tel:)/.test(ref))continue;const local=path.join(root,ref.replace(/^\//,''));const candidate=path.extname(local)?local:path.join(local,'index.html');if(!fs.existsSync(candidate))failures.push(`${file}: broken ${ref}`);}}
for(const lang of ['en','th','zh','ar','ru']){
  const prefix=lang==='en'?'':`${lang}/`;
  const file=path.join(root,prefix,'book','index.html');
  const source=fs.readFileSync(file,'utf8');
  if(!/<form class="booking-form"[^>]*\bhidden\b[^>]*\bmethod="post"/.test(source)||!source.includes('<noscript><div class="form-script-required">')||!source.includes('type="button" data-event="booking_submit"')) failures.push(`${file}: unsafe no-JavaScript enquiry fallback`);
}
for(const lang of ['en','th','zh']){
  const prefix=lang==='en'?'':`${lang}/`;
  const file=path.join(root,prefix,'groups-tour-operators','group-booking','index.html');
  const source=fs.readFileSync(file,'utf8');
  if(!/<form class="group-request-form"[^>]*\bhidden\b[^>]*\bmethod="post"/.test(source)||!source.includes('<noscript><div class="form-script-required">')) failures.push(`${file}: unsafe no-JavaScript group fallback`);
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);} console.log(`Checked ${html.length} pages: noindex, language and local links OK.`);
