# Phuket Shooters Website Prototype — Codex Build Brief

## 1. Objective
 
Create a working prototype replacement for the current Phuket Shooters Wix website.

The prototype is intended for internal review and later demonstration to the business investor and owner. It is **not** yet a production migration. The live Wix site must remain untouched.

The prototype should demonstrate that Phuket Shooters can move from Wix to a faster, cheaper, maintainable static website while improving usability, content structure, mobile experience, multilingual support, and the path from customer interest to enquiry/booking.

The prototype will be hosted on **GitHub Pages**. The booking form does not need to submit real data.

If approved, the same codebase should later be capable of moving with minimal effort to **Cloudflare** for production hosting.

---

## 2. Existing Website

Current live site:

- https://www.phuketshooters.com/

Treat the existing English-language site as the **canonical source of business facts and content**.

The prototype should preserve current factual information unless this brief explicitly says otherwise.

Do not modify or interact with the live Wix site.

---

## 3. Core Principles

### 3.1 Preserve facts, improve presentation

The prototype may substantially improve:

- information architecture;
- visual hierarchy;
- navigation;
- page layout;
- mobile usability;
- content scanability;
- calls to action;
- photography presentation;
- accessibility;
- page performance;
- SEO structure;
- maintainability.

Do **not** invent or alter:

- prices;
- packages;
- opening hours;
- firearms;
- courses;
- staff credentials;
- certifications;
- safety claims;
- promotions;
- incentives;
- testimonials;
- business policies;
- legal or safety rules.

If information is ambiguous or inconsistent, preserve the English source and flag the issue for later review.

---

## 4. Languages

### Required working languages

The prototype must fully support:

- English
- Thai

### Language selector

The language selector must also display:

- Chinese
- Arabic
- Russian

These three languages do **not** need functional translated content in the prototype.

They should not appear broken. Mark them clearly but unobtrusively as unavailable in the prototype, for example:

- Chinese — Coming soon
- Arabic — Coming soon
- Russian — Coming soon

The exact UI is up to Codex, but it must be obvious that the prototype currently supports English and Thai only.

### Translation rules

- Use the current **English** website as the canonical source.
- Build the Thai version from the English content.
- Do not automatically copy discrepancies from the existing Thai site.
- If useful content appears only in an existing non-English page, flag it for review rather than adding it silently.
- The architecture must make it straightforward to add Chinese, Arabic and Russian later.
- The future Arabic implementation must support RTL layout, but a full Arabic prototype is not required now.

---

## 5. Existing Main Pages

Audit and reproduce the content required for these principal pages:

- `/`
- `/prices`
- `/book`
- `/courses`
- `/meet-the-team`
- `/range-rules`
- `/find-us`
- `/gallery`

The prototype should preserve these URL paths where practical.

The Thai version should use a consistent language prefix, e.g.:

- `/th/`
- `/th/prices`
- `/th/book`
- etc.

Choose a clean implementation that works correctly on GitHub Pages.

---

## 6. Information Architecture

The current website gives many destinations similar prominence.

The prototype should prioritise the main customer journey:

1. Understand what Phuket Shooters offers
2. See activities / shooting experiences
3. Check prices
4. Build confidence in safety and professionalism
5. Find the range
6. Enquire or book

Primary navigation should therefore give strongest prominence to:

- Home
- Prices
- Courses / Experiences where appropriate
- Book / Enquire
- Find Us

Secondary or lower-priority content can include:

- Meet the Team
- Range Rules
- Gallery

Do not remove important content simply because it is lower priority.

---

## 7. Homepage

The existing homepage contains a very large image carousel and substantial explanatory prose.

Redesign the homepage so it is more useful to a visitor making a decision.

Recommended content flow:

1. Strong hero section
2. Clear short value proposition
3. Primary CTA to Prices
4. Primary or secondary CTA to Book / Enquire
5. Key experiences / activities
6. Key practical facts
7. Safety / instructor reassurance
8. Selected facility highlights
9. Selected imagery
10. Location / opening information
11. Final booking / enquiry CTA

Useful existing facts may include, where confirmed on the English site:

- opening date;
- opening hours;
- number of ranges;
- main range length;
- number of bays;
- number of firearms;
- instructor availability;
- café / viewing area;
- archery;
- crossbow;
- BB guns;
- whether booking is normally required.

Do not convert unverified wording into stronger claims.

Avoid reproducing a 30+ image carousel.

Use a smaller, curated image set.

---

## 8. Prices Page

This is a high-priority commercial page.

Preserve all current prices exactly.

Improve the information design substantially.

Consider:

- individual activity cards;
- firearm / activity categories;
- round counts;
- prominent price display;
- package cards;
- visual distinction between single activities and combinations;
- explanatory microcopy where already supported by existing content;
- booking / enquiry CTA after meaningful sections.

Do not invent “recommended”, “best value”, “most popular” or similar claims unless these are explicitly supported by the current site.

The page should be easy to scan on a mobile phone.

---

## 9. Booking / Enquiry Page

Reproduce the current booking/enquiry flow visually.

Fields should include the current business requirements, such as:

- number of people;
- date;
- start time;
- end time;
- name;
- telephone;
- email;
- additional information;
- acceptance of range rules.

The prototype form must **not** send real bookings.

On submit, show an explicit prototype state such as:

> Prototype only — no booking has been submitted.

Do not imply that the customer has made a real booking.

Include the current alternative contact options such as WhatsApp where supported by the live site.

The form should be designed so it can later be connected to a production backend without redesigning the page.

---

## 10. Courses Page

Retain the current course information, including the existing IDPA course details.

Improve scanability using:

- concise course summary;
- duration;
- price;
- inclusions;
- who it is for, only if the existing content supports this;
- structured timetable;
- CTA to enquire.

Do not invent additional course details.

If the live site says other courses are available without defining them, retain an enquiry route rather than fabricating new course offerings.

---

## 11. Meet the Team

The team page must be **data-driven**.

Do not hard-code repeated staff cards into multiple language pages.

Create a structured staff data source containing fields such as:

- ID / slug;
- name;
- role;
- languages;
- biography;
- image;
- display order;
- translated text.

Staff currently present on the site should be preserved.

Recently added staff including Chat, Dul and Fahn should be included if they are on the live English site.

Adding, editing or removing a staff member later should require changing data, not editing multiple page templates.

---

## 12. Range Rules

Treat the existing English Range Rules as controlled safety/business content.

Improve:

- typography;
- grouping;
- readability;
- spacing;
- responsive presentation.

Do **not** materially rewrite or reinterpret the rules.

Do not weaken, strengthen, summarise away, or invent legal/safety requirements.

If a translation is required for the Thai prototype, translate faithfully from the English canonical content.

---

## 13. Find Us

Improve the practical task of locating and contacting the business.

Prioritise:

- location;
- address;
- map / directions;
- opening hours;
- telephone;
- WhatsApp;
- email;
- useful nearby landmarks where supported by current content.

Do not invent a more precise address or geographical claim than the live site provides.

If embedding a map creates GitHub Pages or privacy complications, use a suitable static or linked prototype treatment.

---

## 14. Gallery

Do not reproduce the gallery as a large unstructured image dump.

Download and reuse suitable existing images from the current Phuket Shooters website.

Curate the strongest images.

Recommended approach:

- smaller initial set;
- responsive grid;
- lazy loading;
- useful categories if these can be derived safely;
- accessible alt text;
- avoid dozens of visually repetitive images above the fold.

Retain unused downloaded assets where useful for later production review, but do not force them all into the gallery.

---

## 15. Images

Codex is authorised to download and reuse images from the existing Phuket Shooters website for this prototype.

Use existing real images where they are good enough.

Where an appropriate image is missing or weak, create a clearly labelled placeholder in the layout rather than inventing photography or using unrelated stock imagery.

Example placeholder:

> IMAGE REQUIRED: wide photograph of customer using range with instructor

Optimise downloaded images for web use where practical.

Prefer modern formats such as WebP / AVIF while retaining source files where useful.

Avoid unnecessarily large image payloads.

---

## 16. Content Model

Separate content from presentation.

Avoid repeating business data across pages.

Create structured data for reusable content such as:

- business details;
- contact details;
- opening hours;
- staff;
- prices;
- packages;
- courses;
- navigation;
- languages;
- translated strings.

Conceptually:

```text
content/
  site.*
  prices.*
  packages.*
  courses.*
  staff.*
  translations/
    en.*
    th.*

assets/
  images/

components/
templates/
pages/
```

The exact framework and file extensions are Codex's choice.

The principle is mandatory: **one source of truth for repeated content**.

---

## 17. Technical Architecture

Use an architecture appropriate for:

- static generation;
- GitHub Pages;
- strong performance;
- simple maintenance;
- later Cloudflare deployment;
- multilingual content;
- reusable components.

Avoid unnecessary complexity.

Do not build a large client-side SPA unless there is a compelling reason.

Prefer generated HTML with lightweight JavaScript / progressive enhancement.

A lightweight static site generator is acceptable if it improves maintainability.

The repository should be understandable to a competent developer without specialist infrastructure knowledge.

---

## 18. GitHub Pages Prototype

Configure the project so the prototype can be deployed to GitHub Pages.

Requirements:

- repeatable build;
- documented deployment;
- correct asset paths;
- functional routing;
- responsive layout;
- English and Thai working;
- no dependency on Wix at runtime except temporarily downloaded source assets;
- no real form submission.

The repository should be suitable for later connection to Cloudflare with minimal structural changes.

---

## 19. Prototype Search-Engine Protection

The prototype is unofficial and must not compete with the live site in search engines.

Implement appropriate **noindex** protection.

At minimum:

```html
<meta name="robots" content="noindex, nofollow">
```

Also use any appropriate GitHub Pages-compatible measures.

Do not add production SEO settings that cause the prototype to be indexed.

---

## 20. Production-Ready SEO Structure

Although the prototype must be noindex, structure the code so the eventual production version can support:

- unique title tags;
- useful meta descriptions;
- canonical URLs;
- `hreflang`;
- sitemap;
- robots.txt;
- semantic headings;
- schema / structured business data;
- meaningful image alt text;
- redirects where needed.

Do not enable conflicting production indexing behaviour in the prototype.

---

## 21. Analytics-Ready Interaction Model

Do not add a real production analytics account unless instructed.

Prepare semantic hooks or an event abstraction suitable for later tracking of actions such as:

- `view_prices`
- `select_course`
- `begin_booking`
- `booking_submit`
- `whatsapp_click`
- `phone_click`
- `maps_click`
- `language_change`

Keep analytics implementation decoupled so GA4 or another analytics platform can be added later.

---

## 22. UX Improvements to Incorporate

The prototype should demonstrate meaningful improvement over Wix, not merely reproduce it.

Prioritise:

- clearer customer journey;
- more visible pricing;
- stronger booking/enquiry pathways;
- faster scanning;
- better typography;
- reduced visual clutter;
- stronger mobile layout;
- clearer hierarchy;
- better use of photography;
- prominent practical information;
- visible trust / safety information;
- consistent CTA treatment;
- reduced repetition;
- accessible navigation;
- usable touch targets;
- sensible focus states;
- good contrast.

Do not introduce speculative business offers or promotions.

---

## 23. Visual Direction

Do not radically reinvent the Phuket Shooters brand without stakeholder approval.

The prototype should feel like a significantly more professional and modern version of Phuket Shooters, not an unrelated brand concept.

Retain appropriate visual continuity from the existing business.

Codex may improve:

- spacing;
- grid;
- typography;
- hierarchy;
- card design;
- image treatment;
- responsive behaviour;
- CTA treatment.

Avoid gratuitous animation or decorative effects.

The design should work particularly well on mobile devices used by tourists.

---

## 24. Accessibility

Implement sensible baseline accessibility:

- semantic HTML;
- correct heading hierarchy;
- keyboard-accessible navigation;
- visible focus;
- accessible forms;
- labelled inputs;
- good contrast;
- meaningful alt text;
- language attributes;
- appropriate Thai typography;
- reduced-motion consideration where animation is used.

Aim for WCAG 2.2 AA principles where practical.

---

## 25. Performance

Aim for a visibly faster experience than the existing Wix implementation.

Prioritise:

- static rendering;
- minimal JavaScript;
- image resizing;
- modern image formats;
- lazy loading;
- sensible font usage;
- minimal third-party scripts;
- no unnecessary UI framework payload.

Avoid adding dependencies merely for convenience.

---

## 26. Responsive Behaviour

The prototype must be designed and tested for:

- mobile;
- tablet;
- desktop.

Mobile is particularly important.

Test narrow screens rather than merely relying on framework defaults.

Navigation, prices, staff cards, forms and galleries must remain usable without horizontal scrolling.

---

## 27. Content Fidelity

Create a source-content inventory while building.

Where possible, note the original URL for migrated content.

Do not silently omit significant content.

If existing content appears:

- contradictory;
- outdated;
- duplicated;
- mistranslated;
- unclear;
- present only in a non-English version;

record it in a review file rather than improvising a correction.

Create:

```text
CONTENT_REVIEW.md
```

Use it to list issues requiring later owner/investor confirmation.

---

## 28. Documentation

Create a concise repository README covering:

- project purpose;
- local development;
- build command;
- GitHub Pages deployment;
- content structure;
- how to edit prices;
- how to add a staff member;
- how to edit English content;
- how to edit Thai content;
- how to add another language later;
- where images are stored;
- how the prototype booking form works;
- how to remove `noindex` safely for production;
- likely steps for future Cloudflare migration.

The maintenance instructions should be understandable without reverse-engineering the project.

---

## 29. Do Not Do Yet

Do not:

- modify the live Wix website;
- change DNS;
- transfer the domain;
- connect Cloudflare production hosting;
- implement real email delivery;
- implement a real booking backend;
- accept payments;
- add production GA4 credentials;
- create unsupported business claims;
- invent promotions;
- invent incentives;
- add fake testimonials;
- introduce new products or packages;
- enable search-engine indexing.

These are post-approval tasks.

---

## 30. Acceptance Criteria

The prototype is ready for review when all of the following are true:

### General

- [ ] Runs locally using documented instructions
- [ ] Deploys successfully to GitHub Pages
- [ ] Live Wix site remains untouched
- [ ] No horizontal scrolling at normal mobile widths
- [ ] Main navigation works on mobile and desktop
- [ ] Prototype is protected with `noindex`

### Content

- [ ] English content uses the live English site as canonical source
- [ ] No unsupported business facts have been invented
- [ ] Current prices are preserved
- [ ] Main current pages are represented
- [ ] Range Rules retain their substantive meaning
- [ ] Existing useful imagery has been downloaded and incorporated
- [ ] Missing imagery uses explicit placeholders rather than stock fabrication

### Languages

- [ ] English fully works
- [ ] Thai fully works
- [ ] Language selector includes Chinese
- [ ] Language selector includes Arabic
- [ ] Language selector includes Russian
- [ ] Unsupported prototype languages are clearly marked as unavailable / coming soon
- [ ] Architecture supports adding those languages later

### Maintainability

- [ ] Repeated business information has a single source of truth
- [ ] Staff content is data-driven
- [ ] Prices / packages are data-driven
- [ ] Translation content is separated cleanly from templates
- [ ] Adding a new staff member does not require editing multiple page templates

### UX

- [ ] Homepage presents a clearer visitor journey than the Wix site
- [ ] Prices are substantially easier to scan
- [ ] Booking / enquiry CTA is clearly visible
- [ ] Booking form behaves convincingly but does not submit real data
- [ ] Gallery is curated rather than reproducing the full existing image dump
- [ ] Find Us prioritises practical visitor information
- [ ] Course content is easier to scan

### Technical

- [ ] Images are appropriately optimised
- [ ] JavaScript is kept lightweight
- [ ] Site is usable with keyboard navigation
- [ ] Forms have proper labels
- [ ] Semantic HTML is used
- [ ] Analytics event hooks are prepared but no production analytics account is required
- [ ] Codebase can later be deployed to Cloudflare without substantial rewrite

---

## 31. Deliverables

Codex should produce:

1. Complete prototype source code
2. GitHub Pages deployment configuration
3. Working deployed prototype URL
4. `README.md`
5. `CONTENT_REVIEW.md`
6. Structured English and Thai content
7. Downloaded / optimised website image assets
8. Any clearly labelled image placeholders
9. Documented build and deployment process

---

## 32. Implementation Approach

Work in stages rather than attempting an uncontrolled redesign in one pass.

Recommended sequence:

### Stage 1 — Audit and extraction
- inspect current English site;
- inventory pages;
- collect content;
- collect images;
- identify repeated data;
- record discrepancies.

### Stage 2 — Architecture
- create static site structure;
- create data/content model;
- establish English/Thai localisation;
- create common layout and navigation.

### Stage 3 — Core pages
- homepage;
- prices;
- booking;
- courses;
- team;
- range rules;
- find us;
- gallery.

### Stage 4 — UX refinement
- improve hierarchy;
- improve CTA placement;
- improve image selection;
- improve mobile layout;
- improve scanability.

### Stage 5 — QA
- check links;
- check images;
- check English;
- check Thai;
- check mobile;
- check forms;
- check accessibility basics;
- check noindex;
- check GitHub Pages deployment.

### Stage 6 — Review
Produce a concise list of:
- remaining content questions;
- image gaps;
- business decisions needed before production;
- technical items deferred until production.

---

## 33. Governing Rule

When there is a conflict between:

1. making the prototype look impressive, and
2. preserving factual accuracy,

**preserve factual accuracy**.

Where business information is uncertain, flag it for review rather than inventing a solution.
