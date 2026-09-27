# Content review

Audit date: 26 September 2026. The current English website was treated as canonical. The live Wix site was read only; it was not edited or otherwise changed.

## Source inventory

| Prototype route | Canonical source | Content migrated |
|---|---|---|
| `/` | [Homepage](https://www.phuketshooters.com/) | Opening date/hours, facility size, parking, range/bay/firearm counts, activities, supervision/instructor statements, café/viewing area, shop and walk-in guidance |
| `/prices/` | [Prices](https://www.phuketshooters.com/prices) | Eight individual activities and all eleven packages, with prices and stated round/target counts |
| `/book/` | [Book](https://www.phuketshooters.com/book) | Required fields, opening/closing times, ID reminder, rules acknowledgement and WhatsApp option |
| `/courses/` | [Courses](https://www.phuketshooters.com/courses) | IDPA introduction, three-day/1,000-round/75,000-baht summary, inclusions, full timetable and other-course enquiry route |
| `/meet-the-team/` | [Meet the Team](https://www.phuketshooters.com/meet-the-team) | 18 current profiles, including Chat, Dul and Fahn |
| `/range-rules/` | [Range Rules](https://www.phuketshooters.com/range-rules) | Introductory record-keeping statement and all six rules |
| `/find-us/` | [Find Us](https://www.phuketshooters.com/find-us) | Published address, phone, email and nearby Phuket Dolphin show reference |
| `/gallery/` | [Gallery](https://www.phuketshooters.com/gallery) | Twelve curated live-site images selected from the much larger gallery |

Shared contact details extracted from the English pages:

- address: `33, 54 Soi Palai, Chalong, Mueang Phuket District, Phuket 83130, Thailand`
- telephone: `+66 81 103 2598`
- email: `info@phuketshooters.com`
- WhatsApp destination verified in source: `66811032598`
- opening hours: daily, 09:00–18:00

## Owner/investor confirmation required

1. **Postal address punctuation.** The live site consistently says “33, 54 Soi Palai”. Confirm whether the correct address is `33/54`, `33, 54`, or another format before production. The prototype preserves the published comma form.
2. **Accreditation wording.** The homepage says the range “is accredited to Thailand’s Sports Association” and separately describes THPSA instructor accreditation. Confirm the exact legal organisation names and approved wording before adding structured data or stronger trust claims.
3. **Instructor licensing/certification.** Confirm that the statement that instructors are licensed to teach IPSC, IDPA and HDP courses remains current and whether “safe firearms handling certification” is the approved description.
4. **Opening information.** Confirm October 2024 and daily 09:00–18:00 hours before production launch, including holiday exceptions and last-admission time.
5. **Age rule.** The source says Thai law prohibits firearm use/handling by people under 20 on the premises. It also describes archery, crossbows and B.B. guns as suitable alternatives for children/under-20s. Obtain legal/owner approval for the Thai translation and for any future age-specific marketing.
6. **Thai safety/legal translation.** The prototype Thai rules are faithful working translations from canonical English, but they have not been certified by a Thai legal or safety reviewer. Native-speaker and owner sign-off is mandatory before production.
7. **Course timetable typo.** The live English page ends with “certification assessment as an IPDA shooter”. Context and the rest of the page indicate `IDPA`; the prototype displays IDPA and records that normalisation here for approval.
8. **IDPA description currency.** The live page’s global membership figures and 1996 history were not required for the decision-focused summary and may date quickly. Confirm whether they should be restored and sourced for production.
9. **Price inclusions.** Individual firearm rows state 10 bullets but the three non-firearm activities have no duration/round/arrow count. Package descriptions are preserved exactly. Confirm what every price includes, taxes/payment options, and whether prices can change without notice.
10. **Booking requirements.** The site says bookings are not essential, while collecting a start and end time when someone does enquire. Confirm whether the end time is genuinely customer-selected and whether capacity/confirmation language is needed in the real workflow.
11. **Identification.** The booking page lists passport, ID card or driver’s licence, while the rules list passport or driver’s licence as examples. Confirm the accepted documents and any data-retention/privacy wording.
12. **Staff details.** Confirm all 18 people remain current, consent to reuse portraits and biographies, preferred English spellings, roles and languages. Relative claims (“over 5 years”, “since 2021”) should be converted to dated source fields or reviewed periodically.
13. **`Na` portrait source naming.** The live page labels this staff member “Na”, while the underlying image filename is `Serena Profile Picture.jpeg`. Confirm that the portrait/person mapping is correct.
14. **Location coordinates.** The Find Us map uses the owner-supplied Google Business Profile, which resolves to `7.841593, 98.3562825`. Confirm the pin remains correct before production launch.
15. **Nearby businesses.** The live Find Us page contains promotional descriptions/links for Dolphins’ Bay, Crocodile Show, Lion Land, Cobra Show and JuraFish. The prototype retains only the useful dolphin-show landmark and does not reproduce the promotional copy. Confirm whether any partnerships require these links to remain.
16. **Affiliations.** The homepage displays six affiliation logos without explanatory copy. They are not shown in this prototype to avoid implying an unverified status. Confirm every current affiliation, correct organisation name, logo permission and approved wording before reinstating them.
17. **Copyright/footer year.** The Wix pages currently display “© 2025”. The prototype uses the build/current year; confirm the desired company/legal entity and notice for production.

## Image review

- All displayed photography is from the existing Phuket Shooters site; no stock or AI-generated photography was introduced.
- Hero and gallery images were resized through Wix’s image service at extraction time and stored locally. Typical gallery files are approximately 120–250 KB; staff portraits are approximately 30–65 KB.
- The live homepage exposes a 34-image carousel and the gallery exposes roughly 112 image entries. The prototype deliberately uses three prominent homepage images and twelve gallery images.
- The homepage Plan your visit section randomly selects one image per page view from a five-image, bilingual-alt-text pool of approved visitor, supervision and facility photography. Only the selected image is requested.
- Some live gallery source alt text repeats the generic phrase “Training to fire weapons at Phuket Shooters, Thailand”. Prototype alt text is contextual but should be reviewed against the people/actions actually shown.
- Confirm consent for identifiable customers and staff, especially for production reuse outside Wix.
- Source media is photographed at mixed quality/aspect ratios. A later production shoot would improve consistent wide hero, facility, café/viewing area, exterior/entrance, parking and non-firearm activity coverage.
- The Courses page uses the supplied 41-second portrait video as a general competition-style shooting exercise. It is an existing H.264/AAC MP4, presented without autoplay and with a poster extracted from the footage; the copy does not claim that the person shown is completing the advertised IDPA course.

## Content/UX decisions made in the prototype

- Navigation prioritises Home, Prices, Courses, Book/Enquire and Find Us. Team, Rules and Gallery remain available under the secondary menu.
- Repetitive marketing copy was reorganised, not strengthened. No popularity, discount, recommendation, testimonial or performance claim was added.
- The booking form explicitly prevents submission and shows a prototype-only status.
- Thai pages are generated from the same facts/data as English rather than copied from the existing Thai Wix pages.
- Chinese, Arabic and Russian appear in the language selector as unavailable/coming soon. Arabic architecture is reserved for a later RTL implementation.
- The Find Us page loads a lazy Google Maps iframe from the owner-supplied Business Profile. No third-party font or analytics account is used.
- Approximately 95% of visitors are reported to use mobile devices. This is treated as an internal design requirement rather than a customer-facing claim; mobile navigation, primary actions, review proof and commercial content receive priority.
- The homepage Google Reviews panel shows a reusable snapshot of `4.8/5` from `146` reviews, checked on 26 September 2026, and links to the owner-supplied Google Business Profile. No review excerpts are reproduced. The snapshot should be rechecked before stakeholder demonstrations and production launch.

## Deferred production work

- Owner-approved content corrections and professional Thai review
- Real booking backend, validation policy, spam protection, consent/privacy notice and delivery monitoring
- Production canonical URLs, sitemap, indexable robots policy, redirects and verified structured data
- Security headers and Cloudflare Pages configuration
- Production analytics consent and vendor integration
- Privacy and consent review for the Google Maps embed
- Image rights/consent audit and replacement photography
- Chinese, Arabic/RTL and Russian translations
