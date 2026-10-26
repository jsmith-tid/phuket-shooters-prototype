# Phuket Shooters static prototype

An unofficial English/Thai prototype with draft Simplified Chinese, Modern Standard Arabic and Russian subsites for re-platforming [phuketshooters.com](https://www.phuketshooters.com/). The live Wix site is the canonical English content source and remains untouched.

The prototype is intentionally protected from search indexing. The consumer booking form can send test emails through the explicitly configured localhost server or the Cloudflare Worker used for the prototype site. The GitHub Pages version remains non-sending.

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
- `src/content/tourOperators.js` — operator information and group-request copy in English, Thai and Simplified Chinese
- `scripts/build.js` — dependency-free static generator and shared page templates
- `worker/index.mjs` and `wrangler.jsonc` — opt-in consumer enquiry API alongside the Cloudflare Worker's static assets
- `src/booking-hosted.mjs` and `scripts/booking-email.mjs` — hosted request handling and shared email validation/templates
- `public/assets/` — local CSS, JavaScript and images migrated from the live site
- `public/robots.txt` — prototype crawler block
- `.github/workflows/pages.yml` — repeatable GitHub Pages build and deployment
- `CONTENT_REVIEW.md` — source inventory and decisions that need owner review

Core routes are generated in English, Thai, Simplified Chinese, Arabic and Russian. English uses the requested paths (`/prices/`, `/book/`, etc.); the other languages use matching `/th/`, `/zh/`, `/ar/` and `/ru/` prefixes. The operator information and group-request routes exist only in English, Thai and Simplified Chinese; their language selectors have only those three options. Arabic pages use `dir="rtl"` and scoped right-to-left styles. Links and assets are automatically prefixed with `BASE_PATH`, so the same output works under a GitHub project URL.

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

### Tour operators and group requests

The homepage operator strip is disabled but retained in `scripts/build.js` for possible restoration. A quiet link beneath the footer social icons leads to `/groups-tour-operators/` in English, `/th/groups-tour-operators/` in Thai and `/zh/groups-tour-operators/` in Simplified Chinese. Each information page links to its separate `group-booking/` page. These pages are not generated in Arabic or Russian.

On an enabled Cloudflare deployment or configured local server, the group form sends a staff notification and a customer receipt using the same Resend settings and, on Cloudflare, the same test-email allowlist as individual enquiries. The receipt uses the selected English, Thai or Simplified Chinese language. Once both emails are accepted, the page shows the submitted details. Receipt is not booking confirmation or a parking reservation. On GitHub Pages or when sending is disabled, the form offers an in-page preview only. Coach capacity (up to four) and a 1–4-hour visit time remain provisional. See [docs/launch-checks.md](docs/launch-checks.md) for outstanding decisions and translation review.

### Add a News and Events item

Create `src/articles/<slug>/en.md` with frontmatter for the shared `slug`, `status`, `eventDate` and `heroImage`, plus English `category`, `summary` and `heroAlt`. Follow it with one `#` title and the article body. `status` is `demo` or `published` for internal editorial tracking; neither value adds a visitor-facing badge. Use `##` headings, paragraphs and `**bold**` for the supported article formatting. An optional `eventStartDate` shows a localised date range; `eventDate` is the ISO end date used for sorting. The homepage shows the single highest event date available in that language; each language's listing shows its available articles in descending event-date order. A future event therefore appears before a more recently reported past event.

For a translation, add `th.md`, `zh.md`, `ar.md` or `ru.md` in the same folder. Each needs localized `category`, `summary` and `heroAlt` frontmatter, a `#` title and translated body; set `translationStatus: draft` until reviewed, then `reviewed`. Only languages with an article file get a detail page or article-specific language-switcher/`hreflang` entry. Arabic article text follows the existing page-level right-to-left direction. The four current non-English sets are draft translations, not fluent-reviewer-approved copy.

For an existing local image, set `heroImage` to its filename in `public/assets/images/`. New article images can go in `public/assets/images/articles/` and use `heroImage: articles/example.jpg`. The current four drafts reuse existing Phuket Shooters photos and label them as illustrative, not as photos of the described events. No publication dates have been supplied, so event dates are not emitted as article publication metadata. The drafts need factual, image and translation review before real publication. Markdown under `src/` is not copied to `dist/`, although it remains visible in the public GitHub repository.

## Images

Images in `public/assets/images/` were downloaded from the existing Phuket Shooters Wix site with authorisation in the project brief. Wix’s image service was used to resize and compress them at extraction time. Gallery images use native lazy loading; key hero imagery is loaded eagerly.

The UI uses 12 curated gallery images instead of the live gallery’s much larger set. The homepage Plan your visit section chooses one file per page load from a five-image pool stored in shared content data, so it does not download every candidate. Original Wix media IDs and extraction decisions are recorded in `CONTENT_REVIEW.md` and the Git history.

The Courses page also includes the supplied competition-exercise video as a native, non-autoplaying H.264 MP4 with controls, inline mobile playback and a poster frame extracted from the footage.

## Local Resend test for consumer enquiries

The GitHub Pages form still previews without sending. To test real email acceptance locally, set `RESEND_API_KEY_FILE` to an absolute path **outside this repository** and `RESEND_TEST_INBOX` to the business/test notification inbox before starting `npm run dev`. Alternatively set `RESEND_API_KEY` in the server process environment. The sender defaults to `Phuket Shooters <bookings@mail.phuket-shooters.com>`, using the verified prototype sending domain; override it with `RESEND_FROM_EMAIL` if needed. The variable names are listed in `.env.example`; this project does not automatically load `.env` files.

In PowerShell, for example:

```powershell
$env:RESEND_API_KEY_FILE = 'C:\path\outside\repository\key.txt'
$env:RESEND_TEST_INBOX = 'your-resend-account@example.com'
npm run dev
```

Open `http://127.0.0.1:8080/book/` (or your chosen `PORT`). With the local endpoint enabled, the button says “Send enquiry”; the server validates the fields, sends the business notification to `RESEND_TEST_INBOX`, and sends the acknowledgement to the **email entered in the form**. Only test with addresses you control. A confirmation screen displays the server-validated submitted details only if Resend accepts both messages; a partial or failed send leaves the form available to retry. Acceptance does not establish inbox delivery or confirm a booking. Check both inboxes and the Resend dashboard separately.

Both enquiry forms stay hidden until their JavaScript handlers are ready. With JavaScript unavailable, visitors see translated phone and WhatsApp contact options instead of a form that could submit personal details through a URL. The forms also declare POST as a fallback method; browser submissions are handled only by the JavaScript API flow.

The localhost server binds to `127.0.0.1`. The API key stays server-side; it is not written to generated assets. With Resend configured locally, the group form also sends to the same staff inbox and entered customer email. GitHub Pages cannot run these endpoints or read a local key file.

### Controlled Cloudflare Worker test

The existing `phuket-shooters-prototype` Cloudflare deployment is a static-assets-only Worker, not a Pages project. `worker/index.mjs` adds a Worker script and `wrangler.jsonc` routes `/api/booking-mode`, `/api/booking-enquiry` and `/api/group-enquiry` through it while preserving static asset delivery. The GitHub Pages deployment cannot serve these routes. Hosted sending is **off by default**. After deploying the Worker script, set the following in that Worker's runtime Variables and Secrets:

- `RESEND_API_KEY` — an encrypted secret, ideally a separate sending-only key for the verified `mail.phuket-shooters.com` domain;
- `BOOKING_STAFF_INBOX` — the fixed staff notification email for both forms; the older `RESEND_TEST_INBOX` remains a fallback during controlled testing;
- `BOOKING_ALLOWED_EMAILS` — comma-separated customer email addresses you control for this test;
- `BOOKING_EMAIL_ENABLED` — set to `true` only when ready to test.

`RESEND_FROM_EMAIL` is optional. Never place the key in the repository, generated assets, a Wrangler command-line argument or a screenshot. After deployment and configuration, check `/api/booking-mode` on the prototype URL: it should return `{"enabled":true}` before testing either form. Test only with an address in `BOOKING_ALLOWED_EMAILS`, and verify both actual inboxes. This is a controlled hosted test, not an unrestricted production endpoint. The current allowlist and same-origin check are not substitutes for public abuse protection; see `Resend-Setup.md`.

### Turnstile trial on the hosted prototype

The configured hosted prototype uses Cloudflare Turnstile on both enquiry forms while keeping the test-email allowlist. To configure another deployment, create a **Managed** Turnstile widget for `phuket-shooters.com` in the Cloudflare account, then add these to the Worker's Variables and Secrets:

- `TURNSTILE_SITE_KEY` — public site key, as a plain-text variable;
- `TURNSTILE_SECRET_KEY` — private secret key, as an encrypted secret;
- `TURNSTILE_ENABLED` — plain-text variable set to `true` after both keys are present.

The root hostname also authorizes `www.phuket-shooters.com` if it is used. The browser receives only the public site key from `/api/booking-mode`; the secret stays in the Worker. When Turnstile is enabled, both rate-limit bindings must also be present or sending is disabled. `wrangler.jsonc` defines approximate ceilings of **4 attempts per entered email** and **12 attempts per client IP** per minute, each shared across both forms and counted separately in each Cloudflare location. The IP comes from Cloudflare's `CF-Connecting-IP` header; a missing header fails closed. The IP ceiling catches attempts that rotate email addresses, but shared hotel Wi-Fi and mobile networks can also share an IP, so keep the phone and WhatsApp fallback visible. The allowlist remains enabled. See [docs/booking-abuse-policy.md](docs/booking-abuse-policy.md) for the release checks.

Test both forms with an allowlisted address. A successful send must show the confirmation and deliver both emails. An invalid or missing challenge must send no email. If the widget fails to load, the form preserves the entered details and the visitor can use the phone or WhatsApp links. Keep the allowlist while assessing challenge failures on mobile devices and browsers.

`wrangler.jsonc` uses `keep_vars: true` because these test variables are managed in the Cloudflare dashboard from a phone. Future Git deployments must preserve them; the encrypted Resend key remains a dashboard secret and must never be copied into source control.

To check routing without credentials, run `npm run build`, then `npx wrangler dev --ip 127.0.0.1 --port 8788`. The mode endpoint should return `{"enabled":false}` and the form should not send. Automated Worker tests use a fake Resend response and send no email.

Restart `npm run dev` after changing server-side scripts: Node keeps the loaded email handler in memory, even if generated page assets are rebuilt.

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

## Cloudflare deployment and later production transition

The existing Git-connected Cloudflare project is a Worker serving static assets. The repository now includes `wrangler.jsonc` for that project. Its static build uses:

- build command: `npm run build`
- output directory: `dist`
- Node.js: 20 or newer
- `BASE_PATH`: leave unset for a root/custom-domain deployment

Before publishing the Worker script, confirm the existing Cloudflare Git build and deploy commands use this Wrangler configuration and retain the current domain. Before a real production launch, review redirects, security headers, form protection, staff handoff and approved analytics. The old live site at `phuketshooters.com` is not changed by this work.
