# Codex task: Add multilingual Tour Operators strip to the Phuket Shooters homepage

## Objective

Add a small, visually distinct **Tour Operators** promotional strip to the homepage of the Phuket Shooters prototype.

The purpose is to give Chinese- and Thai-speaking tour operators a clear route to the relevant tour-operator information **without changing the main homepage into a B2B-focused page**.

This should be a compact signpost, not a large content section.

---

## Placement

Place the new strip:

**Immediately below the Google Reviews bar and immediately above the “Ways to enjoy” section.**

Do not move or substantially redesign the existing Google Reviews or “Ways to enjoy” sections.

The intended sequence is:

1. Existing introductory/homepage content
2. Google Reviews bar
3. **New Tour Operators strip**
4. Ways to enjoy
5. Rest of current homepage

---

## Content

Show the following three linked phrases:

- **Tour operators welcome**
- **欢迎旅行社**
- **ยินดีต้อนรับบริษัททัวร์**

Each phrase should be an independent link to the tour-operator page in that language.

### Link behaviour

Inspect the existing project routing and multilingual structure first.

Use the site's existing language/path conventions rather than inventing a new routing system.

Map the links as follows:

- English → English **Groups / Tour Operators** page
- Chinese → Simplified Chinese **Groups / Tour Operators** page
- Thai → Thai **Groups / Tour Operators** page

If those destination pages do not yet exist, do **not** create a large new information architecture in this task. Instead:

1. use the most appropriate existing route if one is already planned or stubbed;
2. otherwise create a clearly named lightweight placeholder route/page following the project's existing page conventions, with a TODO note in source for later completion.

Do not use `#` links in the production-facing UI.

---

## Visual treatment

Include a **small coach/bus image** alongside the links.

Preferred order:

1. Reuse a suitable existing Phuket Shooters image showing an actual coach, group arrival, or coach parking if one already exists in the repository.
2. If no suitable real photograph exists, use a simple neutral coach/bus graphic or existing project placeholder.
3. Do **not** introduce an unrelated stock photograph.

The image must not imply that Phuket Shooters operates a transport service.

Use accessible alt text such as:

> Coach groups welcome at Phuket Shooters

---

## Responsive layout

### Mobile — highest priority

The three languages should be stacked vertically:

**[small coach image]**

Tour operators welcome →  
欢迎旅行社 →  
ยินดีต้อนรับบริษัททัวร์ →

Requirements:

- each language is a separate tap target;
- links must be easy to tap;
- avoid tiny text;
- do not force all three languages onto one line;
- keep the strip compact enough that it does not dominate the page;
- the coach image may sit above or to the left of the text depending on available width, but the language links should remain clearly readable.

### Desktop

The same content may be presented horizontally if space allows, for example:

**[coach image]  Tour operators welcome →  |  欢迎旅行社 →  |  ยินดีต้อนรับบริษัททัวร์ →**

Avoid excessive height on desktop.

---

## Style

Match the existing Phuket Shooters visual system.

Use existing:

- typography;
- colours;
- spacing scale;
- link/arrow treatment;
- border radius;
- responsive breakpoints.

The component should feel native to the current homepage rather than like an external banner.

Suggested visual weight:

- similar height/prominence to the Google Reviews strip;
- clearly noticeable but secondary to the main consumer content;
- no large heading;
- no paragraph-length explanatory copy.

Do not add Russian or Arabic to this strip at this stage.

---

## UX rationale

This component is intentionally audience-specific.

It should:

- acknowledge tour operators as an important B2B audience;
- provide Chinese and Thai routes directly from the homepage;
- avoid making the whole homepage B2B-focused;
- avoid treating tour operators as another consumer “activity” within “Ways to enjoy”;
- preserve the main B2C journey for ordinary visitors.

Language and audience type are different dimensions: Chinese visitors are not necessarily tour operators, so the general Chinese homepage should remain a normal consumer-facing site.

---

## Accessibility

Ensure:

- all three links are keyboard accessible;
- visible focus states are retained;
- colour contrast meets the site's existing accessible standard;
- the coach image has useful alt text;
- no information relies on the image alone.

---

## Analytics

If the project already has a reusable analytics/event pattern, track clicks on the three tour-operator links separately.

Suggested event naming concept:

- `tour_operator_link_click`
- language value: `en`, `zh`, or `th`

Follow the existing analytics implementation rather than introducing a new analytics library.

---

## Scope constraints

Do not:

- redesign the rest of the homepage;
- alter the main language selector;
- change the Google Reviews implementation;
- move “Ways to enjoy”;
- make Chinese the default site language;
- add extra explanatory text about coach parking, refreshments, nearby attractions, etc. to this strip;
- add Russian or Arabic to this strip;
- add stock imagery if no suitable real coach photo is available.

The detailed B2B proposition belongs on the linked **Groups / Tour Operators** page, not on the homepage strip.

---

## Acceptance criteria

The task is complete when:

- [ ] A compact Tour Operators strip appears directly below Google Reviews.
- [ ] It appears directly above “Ways to enjoy”.
- [ ] It includes a small coach/bus visual.
- [ ] It includes the exact English text: **Tour operators welcome**.
- [ ] It includes the exact Chinese text: **欢迎旅行社**.
- [ ] It includes the exact Thai text: **ยินดีต้อนรับบริษัททัวร์**.
- [ ] Each language is independently clickable.
- [ ] Each link uses the existing multilingual routing conventions.
- [ ] Mobile layout stacks the language links and remains easy to scan/tap.
- [ ] Desktop layout is compact and may use a horizontal arrangement.
- [ ] The component visually matches the existing site.
- [ ] No unrelated homepage content is changed.
- [ ] Existing analytics conventions are used for link tracking if available.
- [ ] The implementation is tested at mobile and desktop widths.

---

## Final check

Before finishing, verify the homepage visually at:

- a narrow mobile width comparable to iPhone 13/14;
- a typical tablet width;
- a normal desktop width.

Pay particular attention to the Thai line, which is the longest, and ensure it does not overflow or create an awkward horizontal scroll.
