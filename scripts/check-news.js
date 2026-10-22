const fs = require('node:fs');
const path = require('node:path');
const { newsItems, languages } = require('../src/content/news');

const dist = path.resolve(__dirname, '../dist');
const failures = [];
if (fs.existsSync(path.join(dist, 'articles'))) failures.push('Raw article source was copied into dist/articles');
const escapeHtml = text => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

for (const lang of languages) {
  const expected = newsItems.filter(item => item.translations[lang]).sort((a, b) => b.eventDate.localeCompare(a.eventDate)).map(item => item.slug);
  const prefix = lang === 'en' ? '' : `${lang}/`;
  const listing = fs.readFileSync(path.join(dist, prefix, 'news-events/index.html'), 'utf8');
  const paths = [...listing.matchAll(/<h3><a href="[^"]*\/news-events\/([^/]+)\/"/g)].map(match => match[1]);
  if (paths.join('|') !== expected.join('|')) failures.push(`${lang}: listing is not in descending event-date order`);

  const homepage = fs.readFileSync(path.join(dist, prefix, 'index.html'), 'utf8');
  const homeNews = homepage.match(/<section class="section section--soft home-news">[\s\S]*?<\/section>/)?.[0] || '';
  if (!homeNews.includes(`/news-events/${expected[0]}/`) || (homeNews.match(/class="news-card news-card--featured"/g) || []).length !== 1) {
    failures.push(`${lang}: homepage does not show just the most recent event`);
  }

  for (const item of newsItems) {
    const file = path.join(dist, prefix, `news-events/${item.slug}/index.html`);
    const translation = item.translations[lang];
    if (!translation) {
      if (fs.existsSync(file)) failures.push(`${lang}/${item.slug}: generated without a translation`);
      continue;
    }
    const article = fs.readFileSync(file, 'utf8');
    if (!article.includes(`<time datetime="${item.eventDate}">`)) failures.push(`${lang}/${item.slug}: event date missing`);
    if (!article.includes(`<h1>${escapeHtml(translation.title)}</h1>`) || !article.includes(`content="${escapeHtml(translation.summary)}"`)) {
      failures.push(`${lang}/${item.slug}: localized title or summary missing`);
    }
    if (article.includes('class="news-article__body wrap narrow" lang="en" dir="ltr"')) failures.push(`${lang}/${item.slug}: article body still forced to English LTR`);
    if (lang === 'ar' && !article.includes('<html lang="ar" dir="rtl">')) failures.push(`${lang}/${item.slug}: RTL page direction missing`);
    if (translation.body.some(block => block.type === 'heading') && !article.includes(`<h2>${escapeHtml(translation.body.find(block => block.type === 'heading').text)}</h2>`)) {
      failures.push(`${lang}/${item.slug}: localized Markdown heading missing`);
    }
    if (article.includes('article:published_time')) failures.push(`${lang}/${item.slug}: event date incorrectly marked as publication date`);
    if (item.isDemo && !article.includes('class="news-placeholder"')) failures.push(`${lang}/${item.slug}: demo label missing`);
    if (translation.translationStatus === 'draft' && !article.includes('class="news-translation-status"')) failures.push(`${lang}/${item.slug}: draft-translation label missing`);
    const alternates = [...article.matchAll(/<link rel="alternate" hreflang="([^"]+)"/g)].map(match => match[1]);
    if (alternates.length !== Object.keys(item.translations).length) failures.push(`${lang}/${item.slug}: language alternates do not match available translations`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Checked ${newsItems.length} Markdown articles across ${languages.length} languages: order, homepage, translated pages and draft labels OK.`);
