# Phuket Shooters static prototype

An unofficial English/Thai prototype with draft Simplified Chinese and Modern Standard Arabic subsites for re-platforming [phuketshooters.com](https://www.phuketshooters.com/). The live Wix site is the canonical English content source and remains untouched.

The prototype is intentionally protected from search indexing. Its booking form is a demonstration only and never sends data.

## Run locally

Requirements: Node.js 20 or newer. There are no third-party runtime or build dependencies.

```bash
npm run dev
```

Open `http://localhost:8080`. To make a production-style build without starting the local server:

```bash
npm run build
npm run check
```

Generated files are written to `dist/` and are not committed.

## Architecture

- `src/content/site.js` — business details, navigation, prices, packages, staff and controlled range rules
- `src/content/pages.js` — English/Thai interface copy and the IDPA timetable
- `src/content/chinese.js` — draft Simplified Chinese page, shared and article translations
- `src/content/arabic.js` — draft Modern Standard Arabic page, shared and article translations
- `src/content/news.js` — data-driven News and Events articles, metadata and optional galleries/CTAs
- `src/content/tourOperators.js` — homepage operator links and clearly marked demo page copy
- `scripts/build.js` — dependency-free static generator and shared page templates
- `public/assets/` — local CSS, JavaScript and images migrated from the live site
- `public/robots.txt` — prototype crawler block
- `.github/workflows/pages.yml` — repeatable GitHub Pages build and deployment
- `CONTENT_REVIEW.md` — source inventory and decisions that need owner review

Core routes are generated in English, Thai, Simplified Chinese and Arabic. English uses the requested paths (`/prices/`, `/book/`, etc.); the other languages use matching `/th/`, `/zh/` and `/ar/` prefixes. The language selector links to the equivalent page in each available language, including News and Events articles and the tour-operator demo. Arabic pages use `dir="rtl"` and scoped right-to-left styles. Links and assets are automatically prefixed with `BASE_PATH`, so the same output works under a GitHub project URL.

The site ships generated HTML, one CSS file and a small progressive-enhancement script. It is not a client-side SPA and has no Wix runtime dependency.

The project is mobile-first in product priority: approximately 95% of current visitors use mobile devices. Navigation, hero actions, review proof, prices and enquiry fields are therefore ordered and sized for narrow touch screens first, with tablet and desktop layouts progressively adding space and columns.

## Edit content

### Prices and packages

Edit the `prices` or `packages` arrays in `src/content/site.js`. Each price is stored once and rendered in all four languages. Do not change a business price without owner confirmation.

### Add or edit a staff member

Edit the `staff` array in `src/content/site.js`. Each record contains:

1. image/slug ID;
2. display name;
3. translated role;
4. translated biography;
5. languages.

Place the corresponding optimised portrait at `public/assets/images/<id>.jpg`. Display order follows data order. No templates or language-specific pages need editing.

### Translated copy

Shared business facts and English/Thai safety/staff content live in `src/content/site.js`. Page-specific English/Thai copy lives in `src/content/pages.js`. Draft Chinese and Arabic translations live in their respective `src/content/` modules and are attached to the same shared content records during the build. The helper `t(english, thai)` keeps the original two language values adjacent for review.

Controlled rules should be changed only from approved source wording. Thai, Chinese and Arabic content, particularly legal/safety language, requires native-speaker and owner review before production.

### Google rating

The Google rating, review count, verification date and Business Profile link are stored once in `business.reviews` in `src/content/site.js`. Update all four together after checking the live listing. The homepage deliberately links to Google rather than reproducing review excerpts.

### Add another language

1. Add the language code to the translation values and `copy` object. Chinese and Arabic drafts use separate content modules to aid review.
2. Add it to the language loops and metadata in `scripts/build.js`; `url()` prefixes non-English routes automatically.
3. Enable its entry in `languageMenu()` and add the correct `hreflang` element.
4. Review layout and typography. RTL languages must set `dir="rtl"` and need visual QA on mobile and desktop.
5. Translate all controlled content from canonical English and obtain business approval.

Chinese and Arabic are available as draft prototypes. Russian remains shown as “Coming soon” in the main language selector.

### Tour-operator demo

Edit the four homepage link labels and placeholder page copy in `src/content/tourOperators.js`. The links lead to `/groups-tour-operators/` and matching `/th/`, `/zh/` and `/ar/` routes. Replace the placeholder copy only after confirming group capacity, coach access, facilities and any translated business claims. The coach graphic is a neutral illustration, not a photograph of the range or a transport service.

### Add a News and Events item

Add an entry to `newsItems` in `src/content/news.js`. Each item supports a slug, title, publication date, category, summary, paragraph-based body, hero image, optional image gallery, optional event date, optional CTA and meta description. Listing, homepage-latest and individual article pages are generated automatically in all four languages; no page template changes are required. Add the Chinese and Arabic translations to the content data before publishing a new item.

Only add factual event copy and translations after approval. Keep `isPlaceholder: true` for examples or incomplete material and remove it when the item is approved for publication. The Chinese and Arabic Action Air items are translated placeholders, not factual event reports.

## Images

Images in `public/assets/images/` were downloaded from the existing Phuket Shooters Wix site with authorisation in the project brief. Wix’s image service was used to resize and compress them at extraction time. Gallery images use native lazy loading; key hero imagery is loaded eagerly.

The UI uses 12 curated gallery images instead of the live gallery’s much larger set. The homepage Plan your visit section chooses one file per page load from a five-image pool stored in shared content data, so it does not download every candidate. Original Wix media IDs and extraction decisions are recorded in `CONTENT_REVIEW.md` and the Git history.

The Courses page also includes the supplied competition-exercise video as a native, non-autoplaying H.264 MP4 with controls, inline mobile playback and a poster frame extracted from the footage.

## Prototype booking form

The form uses normal, labelled HTML fields and native validation. Submission is intercepted locally and displays:

> Prototype only — no booking has been submitted.

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
- `tour_operator_link_click` (includes `language: en`, `th`, `zh` or `ar`)
- `tour_operator_enquiry`

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
5. verify all four languages' `hreflang`, redirects and owner-approved content;
6. deploy, then confirm the rendered HTML and response headers before requesting indexing.

Do not remove the protection from this GitHub Pages prototype.

## Future Cloudflare Pages migration

Connect the same repository to Cloudflare Pages with:

- build command: `npm run build`
- output directory: `dist`
- Node.js: 20 or newer
- `BASE_PATH`: leave unset for a root/custom-domain deployment

No framework adapter is needed. Before launch, add the production domain, redirects, security headers, form/backend integration and any approved analytics through Cloudflare configuration. DNS changes, real booking delivery and production hosting are intentionally out of scope for this prototype.
