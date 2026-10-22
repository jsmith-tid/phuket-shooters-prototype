const fs = require('node:fs');
const path = require('node:path');

const articlesDir = path.resolve(__dirname, '../articles');
const imagesDir = path.resolve(__dirname, '../../public/assets/images');
const languages = ['en', 'th', 'zh', 'ar', 'ru'];

function readMarkdown(file) {
  const source = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n\s*/);
  if (!frontmatter) throw new Error(`${file}: missing article frontmatter`);
  const fields = Object.fromEntries(frontmatter[1].split('\n').map(line => {
    const separator = line.indexOf(':');
    if (separator < 1) throw new Error(`${file}: invalid frontmatter line: ${line}`);
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
  }));
  for (const key of ['category', 'summary', 'heroAlt']) {
    if (!fields[key]) throw new Error(`${file}: missing ${key}`);
  }
  const blocks = source.slice(frontmatter[0].length).trim().split(/\n\s*\n/).map(block => {
    if (block.startsWith('# ')) return { type: 'title', text: block.slice(2).trim() };
    if (block.startsWith('## ')) return { type: 'heading', text: block.slice(3).trim() };
    return { type: 'paragraph', text: block.trim() };
  });
  if (blocks[0]?.type !== 'title') throw new Error(`${file}: expected a Markdown H1 title`);
  return { fields, title: blocks[0].text, body: blocks.slice(1) };
}

function readArticle(slug) {
  const articleDir = path.join(articlesDir, slug);
  const english = readMarkdown(path.join(articleDir, 'en.md'));
  const fields = english.fields;
  for (const key of ['slug', 'status', 'eventDate', 'heroImage']) {
    if (!fields[key]) throw new Error(`${slug}/en.md: missing ${key}`);
  }
  if (fields.slug !== slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${slug}: invalid slug`);
  if (!['demo', 'published'].includes(fields.status)) throw new Error(`${slug}: invalid status`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.eventDate) || Number.isNaN(Date.parse(`${fields.eventDate}T00:00:00Z`))) {
    throw new Error(`${slug}: invalid eventDate`);
  }
  if (fields.eventStartDate && (!/^\d{4}-\d{2}-\d{2}$/.test(fields.eventStartDate) || fields.eventStartDate > fields.eventDate)) {
    throw new Error(`${slug}: invalid eventStartDate`);
  }
  const validImage = /^(?:[a-zA-Z0-9_-]+\.(?:jpe?g|png|webp)|articles\/[a-zA-Z0-9_-]+\.(?:jpe?g|png|webp))$/.test(fields.heroImage);
  if (!validImage || !fs.existsSync(path.join(imagesDir, fields.heroImage))) throw new Error(`${slug}: missing hero image ${fields.heroImage}`);

  const translations = {};
  for (const lang of languages) {
    const file = path.join(articleDir, `${lang}.md`);
    if (!fs.existsSync(file)) continue;
    const source = lang === 'en' ? english : readMarkdown(file);
    if (lang !== 'en' && source.fields.translationStatus !== 'draft' && source.fields.translationStatus !== 'reviewed') {
      throw new Error(`${file}: translationStatus must be draft or reviewed`);
    }
    translations[lang] = {
      title: source.title,
      category: source.fields.category,
      summary: source.fields.summary,
      heroAlt: source.fields.heroAlt,
      body: source.body,
      translationStatus: lang === 'en' ? 'source' : source.fields.translationStatus
    };
  }
  return {
    slug,
    status: fields.status,
    eventDate: fields.eventDate,
    eventStartDate: fields.eventStartDate || null,
    heroImage: fields.heroImage,
    translations,
    date: fields.eventDate, // The prototype orders by event date until publication dates are supplied.
    isDemo: fields.status === 'demo'
  };
}

const newsItems = fs.readdirSync(articlesDir, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => readArticle(entry.name));
module.exports = { newsItems, languages };
