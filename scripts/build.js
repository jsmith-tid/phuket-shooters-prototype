const fs = require('node:fs');
const path = require('node:path');
const { business, nav, prices, packages, visitImages, affiliations, staff, rules } = require('../src/content/site');
const { copy, schedule } = require('../src/content/pages');
const { newsItems } = require('../src/content/news');
const { tourOperators } = require('../src/content/tourOperators');
const chinese = require('../src/content/chinese');
const arabic = require('../src/content/arabic');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const value = (entry, lang) => typeof entry === 'object' && entry !== null && lang in entry ? entry[lang] : entry;
const local = (lang, en, th, zh) => lang === 'ar' ? (arabic.inline[en] ?? en) : lang === 'zh' ? zh : lang === 'th' ? th : en;
const url = (lang, route = '') => `${base}/${lang === 'en' ? '' : `${lang}/`}${route ? `${route}/` : ''}`;
const asset = file => `${base}/assets/${file}`;
const money = n => new Intl.NumberFormat('en-US').format(n);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const orderedNewsItems = () => [...newsItems].sort((a,b) => String(b.date || '').localeCompare(String(a.date || '')));
const formatDate = (date, lang) => date ? new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : lang === 'ar' ? 'ar-u-nu-latn' : 'en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${date}T00:00:00Z`)) : '';
const forwardArrow = lang => lang === 'ar' ? '←' : '→';
const newsUrl = (lang, item) => url(lang, `news-events/${item.slug}`);

function button(href, label, kind = 'primary', event = '', external = false) {
  return `<a class="button button--${kind}" href="${href}"${event ? ` data-event="${event}"` : ''}${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}<span aria-hidden="true">→</span></a>`;
}

function languageMenu(lang, route, c) {
  return `<div class="language" data-language>
    <button class="language__button" type="button" aria-label="${c.language}: ${lang === 'ar' ? c.arabic : local(lang,c.english,c.thai,c.chinese)}" aria-expanded="false" aria-controls="language-menu">${lang === 'ar' ? 'AR' : local(lang,'EN','TH','ZH')}<span aria-hidden="true">⌄</span></button>
    <div class="language__menu" id="language-menu" hidden>
      <a href="${url('en', route)}" hreflang="en" lang="en" data-event="language_change"${lang === 'en' ? ' aria-current="true"' : ''}>English</a>
      <a href="${url('th', route)}" hreflang="th" lang="th" data-event="language_change"${lang === 'th' ? ' aria-current="true"' : ''}>ไทย</a>
      <a href="${url('zh', route)}" hreflang="zh-CN" lang="zh-CN" data-event="language_change"${lang === 'zh' ? ' aria-current="true"' : ''}>简体中文</a>
      <a href="${url('ar', route)}" hreflang="ar" lang="ar" dir="rtl" data-event="language_change"${lang === 'ar' ? ' aria-current="true"' : ''}>العربية</a>
      <span><b>${c.russian}</b><small>${c.comingSoon}</small></span>
    </div>
  </div>`;
}

function affiliationsFooter(lang) {
  const heading = local(lang, 'Our affiliations', 'องค์กรพันธมิตร', '合作机构');
  return `<section class="footer-affiliations" aria-labelledby="footer-affiliations-title"><h2 id="footer-affiliations-title">${heading}</h2><ul>${affiliations.map(item => `<li><img src="${asset(`images/affiliations/${item.file}`)}" loading="lazy" alt="${esc(item.name)}"></li>`).join('')}</ul></section>`;
}

function layout(lang, page, title, description, content, routeOverride = null, options = {}) {
  const c = copy[lang];
  const route = routeOverride ?? nav.find(item => item[0] === page)?.[1] ?? '';
  const navHtml = nav.slice(0, 6).map(([id, href, label]) => `<a href="${url(lang, href)}"${id === page ? ' aria-current="page"' : ''}>${value(label, lang)}</a>`).join('');
  const moreHtml = nav.slice(6).map(([id, href, label]) => `<a href="${url(lang, href)}"${id === page ? ' aria-current="page"' : ''}>${value(label, lang)}</a>`).join('');
  const socialMeta = options.ogType ? `<meta property="og:type" content="${esc(options.ogType)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">${options.publishedTime ? `<meta property="article:published_time" content="${esc(options.publishedTime)}">` : ''}` : '';
  const languageAlternates = `<link rel="alternate" hreflang="en" href="${url('en', route)}"><link rel="alternate" hreflang="th" href="${url('th', route)}"><link rel="alternate" hreflang="zh-CN" href="${url('zh', route)}"><link rel="alternate" hreflang="ar" href="${url('ar', route)}">`;
  return `<!doctype html>
<html lang="${lang === 'zh' ? 'zh-CN' : lang}"${lang === 'ar' ? ' dir="rtl"' : ''}>
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow, noarchive"><meta name="googlebot" content="noindex, nofollow, noarchive">
  <title>${esc(title)} | Phuket Shooters</title><meta name="description" content="${esc(description)}">
  ${socialMeta}
  ${languageAlternates}
  <link rel="icon" href="${asset('images/logo.jpg')}"><link rel="stylesheet" href="${asset('css/site.css')}">
</head>
<body class="page-${page}">
  <a class="skip" href="#main">${c.skip}</a>
  <div class="prototype-bar">${c.prototype}</div>
  <header class="site-header">
    <a class="brand" href="${url(lang)}" aria-label="Phuket Shooters ${value(business.descriptor,lang)}"><img class="brand__logo" src="${asset('images/logo-header.png')}" alt=""><span><b>Phuket Shooters</b><small>${value(business.descriptor,lang)}</small></span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span><i>${c.menu}</i></button>
    <nav class="site-nav" id="site-nav" aria-label="${c.menu}">${navHtml}<div class="nav-more"><button type="button" aria-expanded="false">${local(lang,'More','เพิ่มเติม','更多')}<span aria-hidden="true">⌄</span></button><div>${moreHtml}</div></div></nav>
    ${languageMenu(lang, route, c)}
  </header>
  <main id="main">${content}</main>
  <footer class="site-footer">${affiliationsFooter(lang)}<div class="footer-grid"><div><div class="brand brand--footer"><img class="brand__logo" src="${asset('images/logo-header.png')}" alt=""><span><b>Phuket Shooters</b><small>${value(business.descriptor,lang)}</small></span></div></div><div><h2>${c.footerExplore}</h2>${nav.map(x=>`<a href="${url(lang,x[1])}">${x[0] === 'team' && lang === 'en' ? 'The Team' : value(x[2],lang)}</a>`).join('')}</div><div><h2>${c.footerVisit}</h2><p>${value(business.hours,lang)}<br>${value(business.address,lang)}</p><a href="tel:${business.phoneHref}" data-event="phone_click">${business.phoneDisplay}</a><a href="mailto:${business.email}">${business.email}</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Phuket Shooters</span><a href="${url(lang,'range-rules')}">${value(nav.find(x=>x[0]==='rules')[2],lang)}</a></div></footer>
  <a class="whatsapp-float" href="${business.whatsapp}" target="_blank" rel="noopener noreferrer" data-event="whatsapp_click" aria-label="${lang === 'zh' ? '通过 WhatsApp 联系我们' : lang === 'ar' ? 'تواصل معنا عبر واتساب' : lang === 'en' ? 'Contact us with WhatsApp' : 'ติดต่อเราทาง WhatsApp'}"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg><span class="whatsapp-float__tooltip" aria-hidden="true">${lang === 'zh' ? '通过 WhatsApp 联系我们' : lang === 'ar' ? 'تواصل معنا عبر واتساب' : lang === 'en' ? 'Contact us with WhatsApp' : 'ติดต่อเราทาง WhatsApp'}</span></a>
  <script src="${asset('js/site.js')}" defer></script>
</body></html>`;
}

function pageHeader(eyebrow, title, intro, aside = '') {
  return `<section class="page-hero"><div class="wrap"><p class="eyebrow">${eyebrow}</p><div class="page-hero__grid"><div><h1>${title}</h1>${intro ? `<p class="lede">${intro}</p>` : ''}</div>${aside}</div></div></section>`;
}

function cta(lang, heading, text) {
  const c = copy[lang];
  return `<section class="cta"><div><p class="eyebrow">${value(business.hours,lang)}</p><h2>${heading}</h2><p>${text}</p></div><div class="actions">${button(url(lang,'book'),c.bookCta,'light','begin_booking')}${button(business.whatsapp,c.whatsapp,'ghost','whatsapp_click')}</div></section>`;
}

function newsCard(lang, item, featured = false) {
  const c = copy[lang];
  const date = formatDate(item.date,lang);
  return `<article class="news-card${featured ? ' news-card--featured' : ''}"><a class="news-card__image" href="${newsUrl(lang,item)}"><img src="${asset(`images/${item.heroImage}`)}" loading="lazy" alt="${esc(value(item.heroAlt,lang))}"></a><div class="news-card__body"><p class="news-card__meta"><span>${esc(value(item.category,lang))}</span>${date ? `<time datetime="${item.date}">${date}</time>` : ''}</p>${item.isPlaceholder ? `<p class="news-placeholder">${c.exampleContent}</p>` : ''}<h3><a href="${newsUrl(lang,item)}">${esc(value(item.title,lang))}</a></h3><p>${esc(value(item.summary,lang))}</p><a class="news-card__link" href="${newsUrl(lang,item)}">${c.readMore} ${forwardArrow(lang)}</a></div></article>`;
}

function homeNews(lang) {
  const c = copy[lang];
  const latest = orderedNewsItems()[0];
  if(!latest) return '';
  return `<section class="section section--soft home-news"><div class="wrap"><div class="split-heading"><div><p class="eyebrow">${c.latestUpdate}</p><h2>${c.newsTitle}</h2></div><a class="news-all-link" href="${url(lang,'news-events')}">${c.viewAllNews} ${forwardArrow(lang)}</a></div>${newsCard(lang,latest,true)}</div></section>`;
}

function tourOperatorStrip(lang) {
  return `<aside class="tour-operator-strip" id="tour-operators" aria-label="${local(lang,'Tour operators','สำหรับบริษัททัวร์','旅行社')}"><div class="tour-operator-strip__inner"><img src="${asset('images/coach-illustration.svg')}" width="112" height="72" alt="${local(lang,'Illustration of a coach','ภาพประกอบรถโค้ช','旅游大巴插图')}"><div class="tour-operator-strip__links">${tourOperators.links.map(link => `<a href="${url(link.lang,tourOperators.route)}" lang="${link.lang === 'zh' ? 'zh-CN' : link.lang}" hreflang="${link.lang === 'zh' ? 'zh-CN' : link.lang}" data-event="tour_operator_link_click" data-language="${link.lang}">${link.label}<span aria-hidden="true">→</span></a>`).join('')}</div></div></aside>`;
}

function tourOperatorPage(lang) {
  const c = tourOperators.pages[lang];
  return `${pageHeader('Phuket Shooters',esc(c.title),esc(c.intro))}<section class="section wrap tour-operator-page"><div class="tour-operator-page__card"><p class="eyebrow">${esc(c.notice)}</p><p>${esc(c.body)}</p>${button(business.whatsapp,esc(c.contact),'primary','tour_operator_enquiry',true)}</div><nav class="tour-operator-page__languages" aria-label="${local(lang,'Choose a language','เลือกภาษา','选择语言')}">${tourOperators.links.map(link => `<a href="${url(link.lang,tourOperators.route)}" lang="${link.lang === 'zh' ? 'zh-CN' : link.lang}" hreflang="${link.lang === 'zh' ? 'zh-CN' : link.lang}"${link.lang === lang ? ' aria-current="page"' : ''}>${link.label}</a>`).join('')}</nav></section>`;
}

function home(lang) {
  const c = copy[lang];
  const visitPool = visitImages.map(image => ({ src: asset(`images/${image.file}`), alt: value(image.alt,lang) }));
  return `<section class="home-hero"><img src="${asset('images/hero-instructors.jpg')}" alt="${local(lang,'Instructors supervising customers on the indoor shooting range','ผู้สอนดูแลลูกค้าในสนามยิงปืนในร่ม','教练在室内靶场指导访客')}" fetchpriority="high"><div class="home-hero__shade"></div><div class="home-hero__content"><p class="eyebrow">${local(lang,'Chalong · Phuket','Chalong · Phuket','查龙 · 普吉')}</p><h1>${c.homeTitle}</h1><p>${c.homeIntro}</p><div class="actions">${button(url(lang,'prices'),c.pricesCta,'primary','view_prices')}${button(url(lang,'book'),c.bookCta,'light','begin_booking')}</div></div><div class="hero-facts"><span><b>09:00–18:00</b>${local(lang,'Daily','ทุกวัน','每天')}</span><span><b>25m</b>${local(lang,'Main range','สนามหลัก','主靶场')}</span><span><b>12</b>${local(lang,'Shooting bays','ช่องยิง','射击位')}</span></div></section>
  <aside class="reviews-bar" aria-label="${c.reviewsLabel}"><div class="reviews-bar__inner"><div class="reviews-bar__source"><span class="google-g" aria-hidden="true">G</span><strong>${c.reviewsLabel}</strong></div><div class="reviews-bar__rating"><b>${business.reviews.rating}</b><span class="stars" aria-label="${business.reviews.rating} ${local(lang,'out of 5','จาก 5','分（满分 5 分）')}">★★★★★</span><span>${business.reviews.count} ${c.reviewsCount}</span></div><a href="${business.reviews.url}" data-event="reviews_click" rel="noopener">${c.reviewsLink}<span aria-hidden="true">↗</span></a></div></aside>
  ${tourOperatorStrip(lang)}
  <section class="section wrap"><div class="section-heading"><p class="eyebrow">${c.experiences}</p><h2>${local(lang,'Ways to enjoy','หลายวิธีในการเข้าร่วม','多种体验方式')}</h2></div><div class="experience-grid"><article class="feature feature--image"><img src="${asset('images/hero-shotgun.jpg')}" loading="lazy" alt="${local(lang,'Customer using a shotgun under supervision','ลูกค้าใช้ปืนลูกซองภายใต้การดูแล','访客在指导下使用霰弹枪')}"><div><span>01</span><h3>${c.firearms}</h3><p>${c.firearmsText}</p>${button(url(lang,'prices'),c.pricesCta,'text','view_prices')}</div></article><article class="feature"><span>02</span><h3>${c.alternatives}</h3><p>${c.alternativesText}</p>${button(url(lang,'prices'),c.pricesCta,'text','view_prices')}</article><article class="feature feature--red"><span>03</span><h3>${c.course}</h3><p>${c.courseText}</p>${button(url(lang,'courses'),local(lang,'Explore the course','ดูหลักสูตร','了解课程'),'text','select_course')}</article></div></section>
  <section class="section section--ink visit-section"><div class="wrap visit-layout"><div><div class="section-heading"><p class="eyebrow">${c.practical}</p><h2>${local(lang,'Everything you need to arrive prepared','ข้อมูลที่คุณต้องรู้ก่อนมา','到访前须知')}</h2></div><div class="info-grid"><article><i>01</i><h3>${c.safety}</h3><p>${c.safetyText}</p></article><article><i>02</i><h3>${c.facility}</h3><p>${c.facilityText}</p></article><article><i>03</i><h3>${c.noBooking}</h3><p>${c.noBookingText}</p></article><article><i>04</i><h3>${c.identification}</h3><p>${c.identificationText}</p><a class="info-link" href="${url(lang,'range-rules')}">${c.rulesTitle} →</a></article></div></div><figure class="visit-photo"><img data-visit-image data-image-pool="${esc(JSON.stringify(visitPool))}" width="1200" height="900" loading="lazy" alt=""><noscript><img src="${visitPool[0].src}" width="1200" height="900" loading="lazy" alt="${esc(visitPool[0].alt)}"></noscript></figure></div></section>
  ${homeNews(lang)}
  <section class="section wrap"><div class="split-heading"><div><p class="eyebrow">${c.selectedPhotos}</p><h2>${local(lang,'A look at the experience','บรรยากาศของประสบการณ์','体验一览')}</h2></div>${button(url(lang,'gallery'),c.viewGallery,'outline')}</div><div class="photo-strip"><img src="${asset('images/hero-customers.jpg')}" loading="lazy" alt="${local(lang,'Visitors holding their shooting targets','ผู้มาเยือนถือเป้ายิง','访客展示射击靶纸')}"><img src="${asset('images/photo15.jpeg')}" loading="lazy" alt="${local(lang,'Café and visitor seating area at Phuket Shooters','คาเฟ่และพื้นที่นั่งพักสำหรับผู้มาเยือนที่ Phuket Shooters','Phuket Shooters 的咖啡厅和访客休息区')}"><img src="${asset('images/gallery-02.jpg')}" loading="lazy" alt="${local(lang,'Instructor supervising a visitor using a rifle','ผู้สอนดูแลผู้เยี่ยมชมขณะใช้ปืนยาว','教练指导访客使用步枪')}"></div></section>
  <section class="location-band"><div><p class="eyebrow">${c.location}</p><h2>${value(business.address,lang)}</h2><p>${value(business.hours,lang)} · ${business.phoneDisplay}</p></div>${button(business.map,c.directions,'light','maps_click')}</section>
  ${cta(lang,local(lang,'Ready to plan your visit?','พร้อมวางแผนการเยี่ยมชมแล้วหรือยัง?','准备好规划到访了吗？'),local(lang,'Walk in during opening hours, or contact the range if you need a specific time.','เข้ามาได้ในเวลาเปิดทำการ หรือติดต่อหากต้องการเวลาเฉพาะ','营业时间内可直接到访；如需指定时段，请提前联系靶场。'))}`;
}

function pricesPage(lang) {
  const c=copy[lang];
  return `${pageHeader('Phuket Shooters',c.pricesTitle,c.pricesIntro,`<div class="hero-note"><b>${value(business.hours,lang)}</b><span>${c.noBooking}</span></div>`)}<section class="section wrap"><aside class="price-guidance"><p>${c.pricesHelp}</p><a href="${business.whatsapp}" target="_blank" rel="noopener noreferrer" data-event="whatsapp_click">${c.whatsapp} →</a></aside><div class="section-heading"><p class="eyebrow">01</p><h2>${c.individual}</h2></div><div class="price-grid">${prices.map(([name,en,th,price],i)=>`<article class="price-card"><div><h3>${lang==='ar'?(arabic.priceNames[name]||name):lang==='zh'?({Shotgun:'霰弹枪',Archery:'射箭','B.B. Gun':'BB 枪',Crossbow:'弩'}[name]||name):name}</h3>${en?`<p>${lang==='ar'?arabic.priceDetails[i]:local(lang,en,th,chinese.priceDetails[i])}</p>`:''}</div><strong><span>฿</span>${money(price)}</strong></article>`).join('')}</div></section><section class="section section--soft"><div class="wrap"><div class="section-heading"><p class="eyebrow">02</p><h2>${c.packages}</h2></div><div class="package-grid">${packages.map(([price,desc],i)=>`<article class="package-card"><span>${String(i+1).padStart(2,'0')}</span><h3>${lang==='ar'?arabic.packages[i]:lang==='zh'?desc.replace(/bullets/g,'发子弹').replace(/targets/g,'张靶纸').replace(/Shotgun/g,'霰弹枪').replace(/gauge shotgun/g,'号霰弹枪').replace(/Archery/g,'射箭').replace(/Crossbow/g,'弩').replace(/B\.B\. Gun/g,'BB 枪'):desc.replace(/bullets/g,lang==='en'?'bullets':'นัด').replace(/targets/g,lang==='en'?'targets':'เป้า')}</h3><strong>฿${money(price)}</strong></article>`).join('')}</div></div></section>${cta(lang,local(lang,'Know what you want to try?','เลือกได้แล้วว่าอยากลองอะไร?','想好体验哪项了吗？'),c.noBookingText)}`;
}

function bookPage(lang) {
  const c=copy[lang]; const field=(id,label,type='text',attrs='')=>`<label class="field" for="${id}"><span>${label} <small>${c.required}</small></span><input id="${id}" name="${id}" type="${type}" required ${attrs}></label>`;
  return `${pageHeader('Phuket Shooters',c.bookTitle,c.bookIntro,`<div class="contact-actions">${button(business.whatsapp,c.whatsapp,'primary','whatsapp_click')}${button(`tel:${business.phoneHref}`,c.call,'outline','phone_click')}</div>`)}<section class="section wrap booking-layout"><aside><p class="eyebrow">${local(lang,'Before you visit','ก่อนมาเยี่ยมชม','到访前须知')}</p><h2>${c.idNotice}</h2><p>${value(business.hours,lang)}</p><a href="${url(lang,'range-rules')}">${c.rulesTitle} →</a></aside><form class="booking-form" data-prototype-form><div class="form-heading"><span>01</span><h2>${c.prototypeForm}</h2></div><div class="form-grid">${field('people',c.people,'number','min="1" inputmode="numeric"')}${field('date',c.date,'date')}${field('start',c.start,'time','min="09:00" max="18:00"')}${field('end',c.end,'time','min="09:00" max="18:00"')}${field('name',c.name)}${field('phone',c.phone,'tel')}${field('email',c.email,'email')}</div><label class="field field--full" for="extra"><span>${c.extra}</span><textarea id="extra" name="extra" rows="5"></textarea></label><label class="check"><input type="checkbox" required><span>${c.agree} <a href="${url(lang,'range-rules')}">${c.rulesTitle}</a></span></label><div class="mobile-visit-note"><p class="eyebrow">${local(lang,'Before you visit','ก่อนมาเยี่ยมชม','到访前须知')}</p><h3>${c.idNotice}</h3><p>${value(business.hours,lang)}</p><a href="${url(lang,'range-rules')}">${c.rulesTitle} →</a></div><button class="button button--primary" type="submit" data-event="booking_submit">${c.submit}<span aria-hidden="true">→</span></button><div class="form-result" role="status" tabindex="-1" hidden>${c.formResult}</div></form></section>`;
}

function coursesPage(lang) {
  const c=copy[lang];
  return `${pageHeader('IDPA',c.coursesTitle,c.coursesIntro)}<section class="course-intro wrap"><img src="${asset('images/course-action.jpg')}" alt="${local(lang,'Participant training on the IDPA course','ผู้เข้าร่วมฝึกในหลักสูตร IDPA','参加者在 IDPA 课程中训练')}"><div><p>${c.courseSummary}</p><div class="course-stats"><span><b>${c.duration}</b>${local(lang,'Course length','ระยะเวลา','课程时长')}</span><span><b>${c.bullets}</b>${local(lang,'Included','รวมแล้ว','包含')}</span><span><b>${c.coursePrice}</b>${local(lang,'Course fee','ค่าหลักสูตร','课程费用')}</span></div><h2>${c.includes}</h2><p>${c.includesText}</p>${button(url(lang,'book'),c.bookCta,'primary','begin_booking')}</div></section><section class="section course-video-section"><div class="wrap course-video-layout"><div><p class="eyebrow">${local(lang,'Competition exercise','การฝึกแบบการแข่งขัน','竞赛式练习')}</p><h2>${c.courseVideoTitle}</h2><p class="lede">${c.courseVideoText}</p></div><div class="course-video-frame"><video data-deferred-video controls playsinline preload="none" poster="${asset('video/competition-shooting-exercise-poster.jpg')}"><source data-src="${asset('video/competition-shooting-exercise.mp4')}" type="video/mp4">${local(lang,'Your browser does not support embedded video.','เบราว์เซอร์ของคุณไม่รองรับวิดีโอแบบฝัง','您的浏览器不支持嵌入式视频。')}</video><noscript><video controls playsinline preload="metadata" poster="${asset('video/competition-shooting-exercise-poster.jpg')}"><source src="${asset('video/competition-shooting-exercise.mp4')}" type="video/mp4"></video></noscript></div></div></section><section class="section section--soft"><div class="wrap narrow"><div class="section-heading"><p class="eyebrow">03 / ${c.duration}</p><h2>${c.timetable}</h2></div>${[1,2,3].map(day=>`<section class="day"><h3>${c.day} ${day}${lang==='zh'?'天':''}</h3><div>${schedule.filter(x=>x[0]===day).map(x=>`<article><time>${x[1]}</time><p>${value(x[2],lang)}</p></article>`).join('')}</div></section>`).join('')}</div></section>${cta(lang,c.otherCourses,local(lang,'Ask the team about course dates and other available training.','สอบถามทีมงานเกี่ยวกับวันที่เปิดหลักสูตรและการฝึกอื่น ๆ','请向团队咨询开课日期及其他培训。'))}`;
}

function teamPage(lang) {
  const c=copy[lang];
  return `${pageHeader('Phuket Shooters',c.teamTitle,c.teamIntro)}<section class="section wrap"><div class="team-grid">${staff.map(([id,name,role,bio,languages],i)=>`<article class="staff-card" data-staff="${id}"><div class="staff-card__portrait"><img src="${asset(`images/${id}.jpg`)}" loading="lazy" alt="${lang==='ar'?`${name}، ${value(role,lang)} في Phuket Shooters`:local(lang,`${name}, ${value(role,lang)} at Phuket Shooters`,`${name} ${value(role,lang)} ที่ Phuket Shooters`,`${name}，Phuket Shooters 的${value(role,lang)}`)}"></div><div><p class="staff-card__role">${value(role,lang)}</p><h2>${name}</h2><p>${value(bio,lang)}</p><small><b>${c.languages}:</b> ${lang==='ar'?arabic.languages[i]:lang==='zh'?languages.replace(/Thai/g,'泰语').replace(/English/g,'英语').replace(/Mandarin/g,'普通话').replace(/Arabic/g,'阿拉伯语').replace(/Malay/g,'马来语').replace(/some /g,'少量').replace(/a little /g,'少量').replace(/learning /g,'正在学习 '):languages}</small></div></article>`).join('')}</div></section>`;
}

function rulesPage(lang) {
 const c=copy[lang];
 return `${pageHeader(local(lang,'Safety','Safety','安全须知'),c.rulesTitle,c.rulesIntro)}<section class="section wrap rules-layout"><aside><span aria-hidden="true">!</span><p>${c.controlled}</p></aside><ol class="rules-list">${rules.map(rule=>`<li><span>${value(rule,lang)}</span></li>`).join('')}</ol></section>${cta(lang,local(lang,'Questions before you visit?','มีคำถามก่อนมาหรือไม่?','到访前还有疑问？'),local(lang,'Contact the range team before making your visit.','ติดต่อทีมงานของสนามก่อนเดินทาง','出发前请联系靶场团队。'))}`;
}

function findPage(lang) {
 const c=copy[lang];
 return `${pageHeader(local(lang,'Chalong · Phuket','Chalong · Phuket','查龙 · 普吉'),c.findTitle,c.findIntro,button(business.map,c.directions,'primary','maps_click',true))}<section class="location-map" aria-label="${local(lang,'Map showing Phuket Shooters Shooting Range','แผนที่แสดงที่ตั้ง Phuket Shooters Shooting Range','显示 Phuket Shooters 射击靶场位置的地图')}"><iframe src="${business.mapEmbed}" title="${local(lang,'Google Map showing Phuket Shooters Shooting Range','Google Map แสดงที่ตั้ง Phuket Shooters Shooting Range','显示 Phuket Shooters 射击靶场位置的 Google 地图')}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe><div class="location-map__bar"><div><p class="eyebrow">${local(lang,'Your destination','จุดหมายของคุณ','您的目的地')}</p><strong>Phuket Shooters Shooting Range</strong><span>${value(business.address,lang)}</span></div>${button(business.map,c.directions,'light','maps_click',true)}</div></section><section class="section wrap contact-grid"><article><span>01</span><h2>${c.address}</h2><p>${value(business.address,lang)}</p></article><article><span>02</span><h2>${c.hours}</h2><p>${value(business.hours,lang)}</p><p>${c.noBookingText}</p></article><article><span>03</span><h2>${c.contact}</h2><a href="tel:${business.phoneHref}" data-event="phone_click">${business.phoneDisplay}</a><a href="mailto:${business.email}">${business.email}</a><a href="${business.whatsapp}" data-event="whatsapp_click">WhatsApp</a></article><article><span>04</span><h2>${c.nearby}</h2><p>${c.landmark}</p></article></section>`;
}

function galleryPage(lang) {
 const c=copy[lang]; const alts=lang==='ar'?['رامٍ يشارك في مرحلة خارجية','زائر يستخدم بندقية تحت إشراف مدرب','تدريب على المسدس في الميدان الداخلي','مدرب سلامة يقف بجوار زائر','مرحلة رماية تنافسية','زائر يستعد في مسار رماية داخلي','مدرب يرشد زائرًا','تدريب على الرماية في Phuket Shooters','زائر في الميدان','جلسة رماية تحت إشراف السلامة','تدريب على المنافسات','مشاركون في Phuket Shooters']:lang==='en'?['Shooter taking part in an outdoor stage','Visitor using a rifle under instructor supervision','Indoor pistol range training','Range safety instructor beside a visitor','Competition shooting stage','Visitor preparing at an indoor shooting bay','Instructor guiding a visitor','Shooting practice at Phuket Shooters','Customer on the range','Safety-supervised shooting session','Competition training','Participants at Phuket Shooters']:lang==='th'?['นักยิงในสเตจกลางแจ้ง','ผู้เยี่ยมชมใช้ปืนยาวภายใต้การดูแล','การฝึกปืนพกในสนามในร่ม','เจ้าหน้าที่ความปลอดภัยข้างผู้เยี่ยมชม','สเตจยิงปืนแข่งขัน','ผู้เยี่ยมชมเตรียมตัวที่ช่องยิงในร่ม','ผู้สอนแนะนำผู้เยี่ยมชม','การฝึกยิงที่ Phuket Shooters','ลูกค้าในสนาม','การยิงภายใต้การดูแลความปลอดภัย','การฝึกเพื่อการแข่งขัน','ผู้เข้าร่วมที่ Phuket Shooters']:['射手参加户外射击关卡','访客在教练指导下使用步枪','室内手枪训练','靶场安全教练陪同访客','竞技射击关卡','访客在室内射击位准备','教练指导访客','在 Phuket Shooters 练习射击','靶场内的访客','在安全监督下射击','竞技射击训练','Phuket Shooters 的参加者'];
 return `${pageHeader('Phuket Shooters',c.galleryTitle,c.galleryIntro)}<section class="section wrap"><div class="gallery-grid">${alts.map((alt,i)=>`<figure><img src="${asset(`images/gallery-${String(i+1).padStart(2,'0')}.jpg`)}" loading="lazy" alt="${alt}"><figcaption>${String(i+1).padStart(2,'0')} / Phuket Shooters</figcaption></figure>`).join('')}</div></section>${cta(lang,local(lang,'See it for yourself','มาสัมผัสด้วยตัวคุณเอง','亲自来体验'),c.noBookingText)}`;
}

function newsPage(lang) {
  const c=copy[lang];
  return `${pageHeader('Phuket Shooters',c.newsTitle,c.newsIntro)}<section class="section wrap"><div class="news-list">${orderedNewsItems().map(item=>newsCard(lang,item)).join('')}</div></section>`;
}

function newsArticlePage(lang,item) {
  const c=copy[lang];
  const date=formatDate(item.date,lang);
  const gallery=item.gallery||[];
  return `<article class="news-article"><header class="news-article__header wrap"><a class="news-back" href="${url(lang,'news-events')}">${lang==='ar'?'→':'←'} ${c.backToNews}</a><p class="eyebrow">${esc(value(item.category,lang))}</p>${item.isPlaceholder?`<p class="news-placeholder">${c.exampleContent}</p>`:''}<h1>${esc(value(item.title,lang))}</h1>${date?`<time datetime="${item.date}">${date}</time>`:''}<p class="lede">${esc(value(item.summary,lang))}</p></header><figure class="news-article__hero wrap"><img src="${asset(`images/${item.heroImage}`)}" alt="${esc(value(item.heroAlt,lang))}"></figure><div class="news-article__body wrap narrow">${value(item.body,lang).map(paragraph=>`<p>${esc(paragraph)}</p>`).join('')}${item.eventDate?`<p><strong>${local(lang,'Event date','วันที่จัดกิจกรรม','活动日期')}:</strong> <time datetime="${item.eventDate}">${formatDate(item.eventDate,lang)}</time></p>`:''}${item.cta?button(value(item.cta.url,lang),value(item.cta.label,lang),'primary','news_cta'):''}</div>${gallery.length?`<div class="news-article__gallery wrap">${gallery.map(image=>`<img src="${asset(`images/${image.file}`)}" loading="lazy" alt="${esc(value(image.alt,lang))}">`).join('')}</div>`:''}</article>`;
}

const renderers={home,prices:pricesPage,book:bookPage,courses:coursesPage,news:newsPage,team:teamPage,rules:rulesPage,'find-us':findPage,gallery:galleryPage};
const metadata={
 home:['Shooting range in Phuket','A clearer guide to Phuket Shooters range, activities, prices and visitor information.'], prices:['Range prices','Current individual activity and package prices at Phuket Shooters.'], book:['Booking and enquiries','Prototype booking and enquiry flow for Phuket Shooters.'], courses:['IDPA course','Three-day IDPA course information and timetable at Phuket Shooters.'], news:['News and Events','News, events and announcements from Phuket Shooters.'], team:['Meet the team','Meet the instructors, safety officers and customer service team at Phuket Shooters.'], rules:['Range rules','Controlled range safety and visitor rules for Phuket Shooters.'], 'find-us':['Find us','Address, opening hours and contact details for Phuket Shooters in Chalong.'], gallery:['Gallery','A curated gallery of training and visitor experiences at Phuket Shooters.']
};
const chineseMetadata={
 home:['普吉射击靶场','了解 Phuket Shooters 的活动、价格及到访信息。'], prices:['靶场价格','Phuket Shooters 的单项活动和套餐价格。'], book:['预约与咨询','向 Phuket Shooters 咨询到访事宜的演示表单。'], courses:['IDPA 课程','Phuket Shooters 三天 IDPA 课程信息及时间表。'], news:['新闻与活动','Phuket Shooters 的新闻、活动及公告。'], team:['认识团队','认识 Phuket Shooters 的教练、安全人员及客户服务团队。'], rules:['靶场规则','Phuket Shooters 的访客及安全规则。'], 'find-us':['如何找到我们','普吉查龙 Phuket Shooters 的地址、营业时间及联系方式。'], gallery:['相册','Phuket Shooters 的训练及访客体验照片。']
};
const arabicMetadata = arabic.metadata;

fs.rmSync(out,{recursive:true,force:true}); fs.mkdirSync(out,{recursive:true}); fs.cpSync(path.join(root,'public'),out,{recursive:true});
for(const lang of ['en','th','zh','ar']) for(const [page,renderer] of Object.entries(renderers)){
  const route=nav.find(x=>x[0]===page)?.[1]||''; const target=path.join(out,lang==='en'?'':lang,route,'index.html'); fs.mkdirSync(path.dirname(target),{recursive:true});
  const [title,desc]=lang==='ar'?arabicMetadata[page]:lang==='zh'?chineseMetadata[page]:metadata[page]; const localTitle=lang==='en'?title:copy[lang][page==='home'?'homeTitle':page==='find-us'?'findTitle':`${page}Title`]||title;
  fs.writeFileSync(target,layout(lang,page,localTitle,desc,renderer(lang)));
}
for(const lang of ['en','th','zh','ar']) for(const item of newsItems){
  const route=`news-events/${item.slug}`; const target=path.join(out,lang==='en'?'':lang,route,'index.html'); fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,layout(lang,'news',value(item.title,lang),value(item.metaDescription,lang),newsArticlePage(lang,item),route,{ogType:'article',publishedTime:item.date}));
}
for(const lang of ['en','th','zh','ar']) {
  const route=tourOperators.route;
  const target=path.join(out,lang==='en'?'':lang,route,'index.html');
  const content=tourOperators.pages[lang];
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,layout(lang,'tour-operators',content.title,content.intro,tourOperatorPage(lang),route));
}
console.log(`Built ${Object.keys(renderers).length*4+newsItems.length*4+4} pages in ${path.relative(root,out)} with base "${base||'/'}"`);
