# Codex task: Phuket Shooters gap audit

## Objective

Audit the existing Phuket Shooters prototype and produce an evidence-based, prioritised list of what is missing, incomplete or worth improving. Assess both the prototype's customer journeys and the work needed later to replace Wix hosting. Keep those assessments separate.

- Repository: https://github.com/jsmith-tid/phuket-shooters-prototype
- Current prototype: https://phuket-shooters.com/
- Existing Wix site: https://phuketshooters.com/
- Planning date: 21 October 2026.
- Approximate Wix hosting deadline: 5 December 2026; confirm the actual expiry/payment dates before migration.
- Suggested migration window: 23–27 November, leaving time for corrections.

This is an **audit task, not an implementation task**. Read the project, build it, exercise the journeys and write the findings. Do not start fixing the site, introduce services, send emails, change DNS or deploy it. Writing the audit report and related documentation is in scope.

## Current decisions: use these when older briefs disagree

1. **Individual and group booking flows are intentionally dummy prototype processes.** No submission backend, email delivery, payment processing, real booking references or reservation system is required for the prototype. Missing production services must be recorded as future launch dependencies, not prototype defects.
2. The user will manage content changes through Codex/the repository. A staff CMS, administration portal and staff content-editing workflow are not current requirements.
3. Wix provides hosting only. Domain registration and email/workspace are elsewhere. Do not assume they need migrating from Wix.
4. Downplay tour operators on the homepage: the promotional strip below reviews should remain disabled and easily restorable, with no blank gap. Keep the operator information page accessible through a discreet footer link below the social links.
5. Operator information and group request pages are required in **English, Thai and Chinese only**. No new Russian or Arabic operator pages/links are required. Existing unrelated Russian and Arabic pages should remain functional.
6. Free coach parking is confirmed. **Four coaches** and **1–4 hours** are provisional preview figures. Parking spaces do not establish simultaneous visitor or participant capacity.
7. Known payment arrangements are cash on the day or card payment arranged by telephone. No online checkout is required. Do not collect card details in any prototype form.
8. Approximately 95% of visitors are reported to use mobile devices. Prioritise mobile clarity and usability.
9. Do not invent capacity, eligibility, availability, prices, discounts, trade commissions, response times, cancellation terms or legal claims. Unconfirmed information belongs in the business-questions section/register.

## 1. Establish the baseline

Read AGENTS.md wherever applicable, then inspect:

- README.md and package.json;
- CONTENT_REVIEW.md and docs/launch-checks.md;
- scripts/build.js, scripts/check.js and scripts/check-tour-operators.js;
- src/content/site.js, pages.js, tourOperators.js and news.js;
- the locale modules, shared CSS/JavaScript, assets and deployment workflow;
- earlier briefs where they help explain intended behaviour, applying the current decisions above if they conflict.

Record the branch, commit SHA, audit date, build commands and test environment. Preserve any existing working changes. Do not reset, overwrite or pull over someone else's work.

Inventory the actual routes, languages, major components and interactive states. Distinguish source capability from deployed behaviour. Run the existing build/check commands, inspect what they cover and identify relevant gaps in their coverage. Do not treat a static string check as proof that an interaction works in a browser.

If the remote prototype cannot be accessed, run the repository locally and inspect that build where tooling permits. Report the access limitation; do not ask the owner to manually capture a large screenshot set when you can inspect the local build. Do not bypass access controls. If browser testing is unavailable too, complete the source audit and clearly mark visual/interactive checks unverified.

## 2. Audit complete customer journeys

### A. First-time individual visitor

Trace: homepage → activities/prices → understand an option → book/enquire → dummy preview/completion → edit or return.

Check:

- Can a beginner understand the activities and distinguish a casual visit from the three-day course?
- Is the price basis clear: per person, package, round count, arrows/targets or duration where approved data exists?
- Is there a useful action at the point of choosing an activity or package?
- Can a choice carry into the enquiry form without having to retype it? Assess the course CTA similarly.
- Does the enquiry collect appropriate information, avoid unnecessary required fields, and explain whether it represents a request or a booking?
- Do preferred dates/times, headcount and contact details validate sensibly? Include past dates, end-before-start, opening-hours boundaries, fractional/negative counts and invalid email.
- Are dates/times explicitly Phuket-local where that affects interpretation?
- Does the dummy result show enough information to review the enquiry and an understandable next step? Can visitors edit while retaining values?
- Are the demonstration state and absence of real submission clear before and after the action?

Do not assume that visitors should select an end time: flag this for a business decision if the operational reason is unclear.

### B. Tour operator / group organiser

Trace: footer → operator information → separate group request page → valid/invalid form states → dummy preview → edit.

Check:

- The homepage strip is absent across locales; footer links are in the agreed position and limited to the three supported operator languages.
- Information and request routes work directly and through navigation; back links and language equivalents are correct.
- Group requests remain distinct from individual bookings.
- Parking, duration, arrival, contact and payment information matches confirmed facts or clearly identified assumptions.
- Independent organisers can enquire without being forced to invent a company name.
- Coach count can be zero. The unconfirmed four-space assumption must not be treated as an automatic form capacity limit.
- Blank optional fields are not silently converted into facts. In particular, an unspecified coach count should not become an asserted zero.
- The review includes the details needed to evaluate the request: contact information, company if supplied, preferred date/time, visitors, coaches, activities and questions.
- Error recovery, editing and language switching behave predictably. Note lost form values if changing language requires restarting.
- No dummy state implies that staff received a request, reserved capacity or confirmed a real booking.

### C. Practical planning and arrival

Trace the visitor's attempt to find opening hours, identification information, approved participation rules, location, directions, parking and contact options.

Assess whether a short first-visit guide or FAQ would answer genuine remaining questions: ordinary visit length, clothing, what prices include, spectators, last admission and arrival arrangements. Identify missing answers for the business; do not write invented answers.

Check whether the operator arrival image actually helps a driver recognise the entrance/parking. The current café image may be legitimate facility imagery while leaving arrival guidance incomplete. Recommend entrance/parking imagery only where it solves a concrete problem.

Inspect telephone, WhatsApp, email and map destinations without sending messages, placing calls or submitting real requests.

### D. Supporting content

Review Courses, Team, Rules, Gallery, News and Events, and the shared footer. Check for dead ends, outdated facts, unsupported claims, placeholder articles, missing links and content inconsistent with the main journeys.

Decide whether gallery enlargement would add useful functionality; label it as an enhancement unless an existing control falsely promises it. Treat the Action Air example as intentional prototype content, with replacement/removal as a launch task.

## 3. Mobile, accessibility and language checks

Use representative viewports around 360/390px, 768px and 1440px where supported. Inspect the homepage, prices, individual booking, operator information, group request and its preview. Check all core English routes, the key Thai/Chinese journeys, and representative existing Arabic/Russian routes, including Arabic RTL layout.

Evaluate:

- horizontal overflow, clipped labels, unreadable text and overlapping fixed elements;
- navigation discovery, touch targets, menu closing and scrolling;
- keyboard operation, Escape-to-close where appropriate, focus visibility and focus movement after errors/previews;
- form labels, required/optional indicators, field errors and error summaries;
- semantic headings, alternative text and meaningful link labels;
- text contrast, zoom and reduced-motion behaviour;
- translated interface text, validation, preview messages and correct language attributes;
- language switching to the equivalent page rather than an unrelated destination;
- graceful behaviour if JavaScript is unavailable or fails, particularly avoiding accidental data transmission from a dummy form.

Automated tools can support the audit but do not replace manual journey checks. Do not claim accessibility compliance or native-language approval from automated results. Record fluent translation review as an outstanding business/content dependency.

## 4. Performance and technical completeness

- Inspect image file sizes, responsive-image opportunities, lazy loading, explicit dimensions and video loading.
- Pay particular attention to shared footer affiliation logos: the previously reviewed six files totalled approximately 1.85 MB. Recalculate against the current commit; recommend suitable dimensions/compression rather than indiscriminate extra imagery.
- Check route generation, direct loads, internal links, actual asset availability and console errors.
- Verify prototype noindex/robots protection remains intentional; do not remove it during the audit.
- Check demo forms neither send network requests nor persist personal form values unexpectedly.
- Distinguish already-present analytics hooks from a configured production analytics service. Check for duplicate events where relevant; no personal form values should appear in event payloads.
- Explain the limits of any measurements taken locally or against the prototype. Do not report a guessed live performance score.

## 5. Production readiness: separate future work

Produce a concise production dependency list covering:

- actual individual/group request delivery, server validation, spam controls, retry handling and monitoring;
- staff request ownership, manual confirmation and a shared record of confirmed bookings/changes;
- verified sender/recipient and transactional email configuration if chosen later; Resend sends email and is not itself the whole submission backend;
- owner-approved facts, translations, real news content and removal of preview-only notices;
- appropriate privacy information and handling of future form data and third-party embeds/analytics;
- production hosting, secrets, headers, deployment and rollback procedure;
- old Wix URL inventory, relevant redirects, canonical URLs, sitemap, language metadata, final indexing policy and search monitoring;
- analytics setup and useful conversion events;
- export/preservation of any Wix content or records still needed;
- domain/DNS access and preservation of existing email DNS records.

Confirm the intended final production hostname: the existing Wix domain has no hyphen and the prototype domain has a hyphen. Do not assume a permanent domain change is intended. Explain the migration implications of the actual decision.

Keep this list proportionate. Accounts, online payment, automatic capacity/availability, a partner portal, a staff CMS and a custom admin dashboard are not automatic launch requirements. Recommend additional infrastructure only with a clear user/business need.

## 6. Recheck these prior observations

These are leads from a source review of commit `fdf3b9be6bb95cd01d14da8a150723361e6a5d51`, not findings you may copy without verification:

1. Prices/packages lack individual enquiry actions and the form lacks a selected-activity/package field.
2. The course enquiry action loses course context.
3. Individual “Preview enquiry” reveals a prototype notice without a full enquiry summary/edit step.
4. Group preview shows date/time/headcounts but omits contact, company, interests and questions.
5. An unspecified optional coach count displays as zero.
6. Individual booking lacks past-date and chronological time checks.
7. Some menu behaviour lacks Escape-to-close handling.
8. Footer affiliation assets are oversized for their displayed role.
9. Group arrival imagery is a café photograph rather than an entrance/parking view.

Mark each as confirmed, resolved, partly resolved, not applicable or unverified. An enhancement is not automatically a defect. Do not re-report something already fixed in the current commit.

## 7. Deliverables

Write **docs/gap-audit.md** with:

1. A short readiness assessment and the three most useful next actions.
2. Scope, commit/environment, commands run and verification limits.
3. A concise route/journey coverage matrix, including what already works.
4. Prioritised prototype findings.
5. Business questions and unconfirmed content.
6. A separate production dependency list and suggested sequence before the Wix deadline.
7. Verification results and the status of the prior observations above.

For each actionable finding include:

| Field | Required content |
| --- | --- |
| ID | Stable identifier, for example GAP-01. |
| Category | Prototype defect, prototype enhancement, business/content decision, or production dependency. |
| Priority | P1: breaks/misleads a core journey; P2: materially improves understanding/usability; P3: useful polish. Prioritise launch dependencies separately by deadline impact. |
| Evidence | Actual route/state, concise reproduction steps, and source file/line where relevant. Label source-only inferences. |
| User impact | The concrete difficulty or risk. |
| Recommended change | Smallest useful action; include dependencies or unanswered questions. |
| Acceptance check | Observable behaviour that would establish completion. |
| Effort | Small/medium/large with a brief reason, not an unsupported precise estimate. |

Avoid duplicate findings for the same shared issue across languages. Separate demonstrated defects from subjective recommendations. Do not turn this into a list of every feature a website could possibly have.

Cross-reference existing CONTENT_REVIEW.md and docs/launch-checks.md rather than copying them into competing registers. If a newly identified business question needs tracking, add it to the relevant register without deleting existing entries or claiming owner approval.

Finish the response to the owner with the report path, the five most important findings, checks completed, limitations and the recommended next implementation batch. **Do not implement the findings, commit/push changes or deploy as part of this audit.**
