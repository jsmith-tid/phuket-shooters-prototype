# Phuket Shooters static prototype

An unofficial English/Thai prototype with draft Simplified Chinese, Modern Standard Arabic and Russian subsites for re-platforming [phuketshooters.com](https://www.phuketshooters.com/). The live Wix site is the canonical English content source and remains untouched.

The prototype is intentionally protected from search indexing. Its booking form is a demonstration only and never sends data.

## Run locally

Requirements: Node.js 20 or newer. There are no third-party runtime or build dependencies.

```bash
npm run dev
```

Open `http://127.0.0.1:8080`. The preview server binds only to this computer. To make a production-style build without starting the local server:

```bash
npm run build
npm run check
```

Generated files are written to `dist/` and are not committed.

## Architecture

- `src/content/site.js` — business details, navigation, prices, packages, staff and controlled range rules
- `src/content/pages.js` — English/Thai interface copy and the IDPA timetable
- `src/content/chinese.js` — draft Simplified Chinese page and shared copy
- `src/content/arabic.js` — draft Modern Standard Arabic page and shared copy
- `src/content/russian.js` — draft Russian page and shared copy
- `src/articles/<slug>/<language>.md` — News and Events article text and localized metadata (source only; not deployed as raw Markdown)
- `src/content/news.js` — multilingual Markdown article loader and metadata validation
- `src/content/tourOperators.js` — draft operator information and group-request preview copy in English, Thai and Simplified Chinese
- `scripts/build.js` — dependency-free static generator and shared page templates
- `public/assets/` — local CSS, JavaScript and images migrated from the live site
- `public/robots.txt` — prototype crawler block
- `.github/workflows/pages.yml` — repeatable GitHub Pages build and deployment
- `CONTENT_REVIEW.md` — source inventory and decisions that need owner review

Core routes are generated in English, Thai, Simplified Chinese, Arabic and Russian. English uses the requested paths (`/prices/`, `/book/`, etc.); the other languages use matching `/th/`, `/zh/`, `/ar/` and `/ru/` prefixes. The operator information and group-request preview routes exist only in English, Thai and Simplified Chinese; their language selectors have only those three options. Arabic pages use `dir="rtl"` and scoped right-to-left styles. Links and assets are automatically prefixed with `BASE_PATH`, so the same output works under a GitHub project URL.

The site ships generated HTML, one CSS file and a small progressive-enhancement script. It is not a client-side SPA and has no Wix runtime dependency.

The project is mobile-first in product priority: approximately 95% of current visitors use mobile devices. Navigation, hero actions, review proof, prices and enquiry fields are therefore ordered and sized for narrow touch screens first, with tablet and desktop layouts progressively adding space and columns.

## Edit content

### Prices and packages

Edit the `prices` or `packages` arrays in `src/content/site.js`. Each price is stored once and rendered in all five languages. Do not change a business price without owner confirmation.

### Add or edit a staff member

Edit the `staff` array in `src/content/site.js`. Each record contains:

1. image/slug ID;
2. display name;
3. translated role;
4. translated biography;
5. languages.

Place the corresponding optimised portrait at `public/assets/images/<id>.jpg`. Display order follows data order. No templates or language-specific pages need editing.

### Translated copy

Shared business facts and English/Thai safety/staff content live in `src/content/site.js`. Page-specific English/Thai copy lives in `src/content/pages.js`. Draft Chinese, Arabic and Russian translations live in their respective `src/content/` modules and are attached to the same shared content records during the build. The helper `t(english, thai)` keeps the original two language values adjacent for review.

Controlled rules should be changed only from approved source wording. Thai, Chinese, Arabic and Russian content, particularly legal/safety language, requires native-speaker and owner review before production.

### Google rating

The Google rating, review count, verification date and Business Profile link are stored once in `business.reviews` in `src/content/site.js`. Update all four together after checking the live listing. The homepage deliberately links to Google rather than reproducing review excerpts.

### Add another language

1. Add the language code to the translation values and `copy` object. Chinese, Arabic and Russian drafts use separate content modules to aid review.
2. Add it to the language loops and metadata in `scripts/build.js`; `url()` prefixes non-English routes automatically.
3. Enable its entry in `languageMenu()` and add the correct `hreflang` element.
4. Review layout and typography. RTL languages must set `dir="rtl"` and need visual QA on mobile and desktop.
5. Translate all controlled content from canonical English and obtain business approval.

Chinese, Arabic and Russian are available as draft prototypes.

### Tour operators and group-request preview

The homepage operator strip is disabled but retained in `scripts/build.js` for possible restoration. A quiet link beneath the footer social icons leads to `/groups-tour-operators/` in English, `/th/groups-tour-operators/` in Thai and `/zh/groups-tour-operators/` in Simplified Chinese. Each information page links to its separate `group-booking/` preview page. These pages are not generated in Arabic or Russian.

The group form is a **local-only interaction**: its button previews proposed visit details on the same page. It makes no network request, creates no reference, stores no data and confirms no booking. Visitors should not use it to contact the business; real phone and WhatsApp links remain available. Coach capacity (up to four) and a 1–4-hour visit time are explicitly provisional. See [docs/launch-checks.md](docs/launch-checks.md) for outstanding decisions and translation review.

### Add a News and Events item

Create `src/articles/<slug>/en.md` with frontmatter for the shared `slug`, `status`, `eventDate` and `heroImage`, plus English `category`, `summary` and `heroAlt`. Follow it with one `#` title and the article body. `status` is `demo` or `published` for internal editorial tracking; neither value adds a visitor-facing badge. Use `##` headings, paragraphs and `**bold**` for the supported article formatting. An optional `eventStartDate` shows a localised date range; `eventDate` is the ISO end date used for sorting. The homepage shows the single highest event date available in that language; each language's listing shows its available articles in descending event-date order. A future event therefore appears before a more recently reported past event.

For a translation, add `th.md`, `zh.md`, `ar.md` or `ru.md` in the same folder. Each needs localized `category`, `summary` and `heroAlt` frontmatter, a `#` title and translated body; set `translationStatus: draft` until reviewed, then `reviewed`. Only languages with an article file get a detail page or article-specific language-switcher/`hreflang` entry. Arabic article text follows the existing page-level right-to-left direction. The four current non-English sets are draft translations, not fluent-reviewer-approved copy.

For an existing local image, set `heroImage` to its filename in `public/assets/images/`. New article images can go in `public/assets/images/articles/` and use `heroImage: articles/example.jpg`. The current four drafts reuse existing Phuket Shooters photos and label them as illustrative, not as photos of the described events. No publication dates have been supplied, so event dates are not emitted as article publication metadata. The drafts need factual, image and translation review before real publication. Markdown under `src/` is not copied to `dist/`, although it remains visible in the public GitHub repository.

## Images

Images in `public/assets/images/` were downloaded from the existing Phuket Shooters Wix site with authorisation in the project brief. Wix’s image service was used to resize and compress them at extraction time. Gallery images use native lazy loading; key hero imagery is loaded eagerly.

The UI uses 12 curated gallery images instead of the live gallery’s much larger set. The homepage Plan your visit section chooses one file per page load from a five-image pool stored in shared content data, so it does not download every candidate. Original Wix media IDs and extraction decisions are recorded in `CONTENT_REVIEW.md` and the Git history.

The Courses page also includes the supplied competition-exercise video as a native, non-autoplaying H.264 MP4 with controls, inline mobile playback and a poster frame extracted from the footage.

## Prototype booking form

The form uses normal, labelled HTML fields and native validation. Submission is intercepted locally and displays:

> No enquiry has been sent. Contact Phuket Shooters by WhatsApp or phone to make arrangements.

No network request is made and no customer data is stored. A production backend can later be attached to the existing form without redesigning it.

## Analytics-ready events

Buttons expose semantic `data-event` hooks. The small event adapter dispatches a `phuketshooters:event` browser event for:

- `view_prices`
- `select_course`
- `begin_booking`
- `booking_submit`
- `whatsapp_click`
- `phone_click`
- `maps_click`
- `language_change`
- `reviews_click`
- `tour_operator_request` (navigation to the demo request page; no form values)

No analytics vendor or production account is connected.

## GitHub Pages deployment

The workflow deploys every push to `main` using GitHub’s official Pages actions. In the repository settings, choose **Settings → Pages → Source: GitHub Actions** once. The workflow builds with `BASE_PATH=/<repository-name>` so project-page asset paths remain correct.

For a manual build that emulates a repository called `phuket-shooters`:

```bash
BASE_PATH=/phuket-shooters npm run build
```

In PowerShell:

```powershell
$env:BASE_PATH='/phuket-shooters'; npm run build
```

The deployed prototype remains protected by all of the following:

- `<meta name="robots" content="noindex, nofollow, noarchive">` on every page;
- an equivalent `googlebot` directive;
- `robots.txt` with `Disallow: /`.

## Safely remove `noindex` for production

Do this only after stakeholder approval and only on the final production hostname:

1. remove both robots meta directives from `layout()` in `scripts/build.js`;
2. replace the blocking `public/robots.txt` with the approved production policy;
3. add the final canonical origin and canonical links;
4. add a production sitemap and validated LocalBusiness/sporting-facility structured data;
5. verify all five languages' `hreflang`, redirects and owner-approved content;
6. deploy, then confirm the rendered HTML and response headers before requesting indexing.

Do not remove the protection from this GitHub Pages prototype.

## Future Cloudflare Pages migration

Connect the same repository to Cloudflare Pages with:

- build command: `npm run build`
- output directory: `dist`
- Node.js: 20 or newer
- `BASE_PATH`: leave unset for a root/custom-domain deployment

No framework adapter is needed. Before launch, add the production domain, redirects, security headers, form/backend integration and any approved analytics through Cloudflare configuration. DNS changes, real booking delivery and production hosting are intentionally out of scope for this prototype.
