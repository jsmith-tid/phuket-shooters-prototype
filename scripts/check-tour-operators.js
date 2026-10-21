const fs = require('node:fs');
const path = require('node:path');

const dist = path.resolve(__dirname, '../dist');
const route = 'groups-tour-operators';
const requestRoute = `${route}/group-booking`;
const locales = ['', 'th/', 'zh/'];
const failures = [];
const read = (locale, page = '') => fs.readFileSync(path.join(dist, locale, page, 'index.html'), 'utf8');

for (const locale of ['', 'th/', 'zh/', 'ar/', 'ru/']) {
  const home = read(locale);
  if (home.includes('class="tour-operator-strip"')) failures.push(`${locale || 'en'}: homepage strip still rendered`);
  if (locales.includes(locale) !== home.includes('class="footer-operator-link"')) failures.push(`${locale || 'en'}: footer operator link incorrect`);
}

for (const locale of locales) {
  const info = read(locale, route);
  const request = read(locale, requestRoute);
  const prefix = `/${locale}`;
  if (!info.includes(`href="${prefix}${requestRoute}/"`)) failures.push(`${locale || 'en'}: no link to group request`);
  if (!request.includes(`href="${prefix}${route}/"`)) failures.push(`${locale || 'en'}: no back link`);
  if (!request.includes('data-demo-group-form') || !request.includes('type="button" data-preview-group')) failures.push(`${locale || 'en'}: demo form missing or potentially submitting`);
  for (const source of [info, request]) {
    const menu = source.match(/<div class="language__menu"[^>]*>([\s\S]*?)<\/div>/)?.[1] || '';
    const alternates = source.match(/<link rel="alternate"[^>]+>/g) || [];
    if ((menu.match(/data-event="language_change"/g) || []).length !== 3 || alternates.length !== 3) failures.push(`${locale || 'en'}: operator language options are not limited to three`);
    if (menu.includes('hreflang="ar"') || menu.includes('hreflang="ru"')) failures.push(`${locale || 'en'}: unsupported operator language link`);
  }
}

for (const locale of ['ar/', 'ru/']) {
  if (fs.existsSync(path.join(dist, locale, route))) failures.push(`${locale}: unsupported operator route generated`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('Checked operator homepage removal, footer visibility, six routes, three-language switching and demo-only form.');
