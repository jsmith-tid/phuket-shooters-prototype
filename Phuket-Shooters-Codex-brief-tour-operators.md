# Codex brief: tour operator pages, separate group booking requests and quieter homepage placement

Implement these changes in the existing Phuket Shooters repository. This is an implementation brief in English with proposed visitor-facing copy in English, Thai and Simplified Chinese. Use the site's existing Chinese variant if it is already established instead of introducing a competing variant.

This document supersedes the previous brief. Codex has reported that there is no working enquiry backend. Treat building a functioning group booking request backend as part of this task; do not assume an existing form sends anything. Inspect and retain any correct work already completed from the original brief, then implement the remaining changes without duplicating pages, components or register entries.

## 1. Objective and scope

The investor supports the new design but wants tour operators and coach groups to have less prominence on the homepage. Remove the promotional section beneath the homepage reviews from the rendered page, retain a discreet footer link, and build or update a dedicated operator information page and separate group booking request flow in English, Thai and Chinese only.

The group process is: operator submits a request → team reviews availability and arrangements → team explicitly confirms by email or phone → payment follows the agreed arrangement. Submission and acknowledgement do not reserve capacity or confirm a booking. This is the proposed operating process to support; staff responsibility and commercial terms remain to be agreed before launch.

Do not add Russian or Arabic versions of either page or its new footer link. Preserve unrelated existing Russian and Arabic site content. Do not add these pages to the main navigation or replace the removed homepage section with another operator promotion. Keep the existing individual-customer booking journey unchanged.

Read AGENTS.md and inspect the existing application before editing. Follow its router, translation system, shared footer, design tokens, contact components, forms and analytics conventions. Adapt the paths and component names in this brief to the actual project. Update existing operator pages rather than creating duplicates. Do not redesign unrelated parts of the site or publish/deploy as part of this task.

## 2. Facts and working assumptions

Confirmed by the project owner:

- There is free parking that accommodates coaches.
- Payment options are cash on the day or arranging card payment by telephone.
- The operator promotion beneath the homepage reviews should be removed from view.
- The operator page should remain discoverable through a quiet footer link beneath the social links.
- A separate group booking request process is now required.
- There is no working enquiry backend, according to the implementation feedback.

Provisional, for the design preview:

- Parking accommodates up to four coaches. This is a parking assumption, not a statement about shooting-range throughput or simultaneous visitor capacity.
- Visits last approximately one to four hours, depending on visitors and activities. This is not a guaranteed package duration.
- A location map and coach arrival information may be required. Specific approach instructions and entrance details are unconfirmed.

Unknown: visitor capacity, minimum group size, lead time, deposits, operational ownership of booking confirmation, cancellation/refund terms, trade rates, commission, driver/guide benefits, facilities, accessibility and group-specific participation requirements. Do not invent these. Record relevant questions in the register below; omit unsupported promises from visitor-facing copy. Build the request-and-manual-confirmation workflow described here without implying that operational details have already been agreed.

## 3. Homepage: disable the operator CTA section

Find the tour operator / coach group promotional section directly beneath the reviews. Disable its rendering across every homepage locale, including any existing Russian and Arabic homepages.

Preserve the implementation so it can be restored easily. Use the project's existing feature-flag convention if one exists, otherwise a clearly named local boolean or template-appropriate comment is sufficient. Comment out the section invocation where practical; do not wrap a large block in invalid nested comments.

The disabled section must leave no visible content, empty wrapper, blank vertical gap, focusable controls, exposed accessibility content or impressions/events triggered merely by mounting it. Keep the review section and following section correctly spaced. Do not remove shared code used elsewhere.

## 4. Footer: add a discreet localized link

In the company-information column, beneath the existing Facebook, YouTube, TikTok and Instagram links, add one ordinary text link to the matching operator page. Reuse the existing shared footer and typography. Do not create a banner, prominent card or primary button. Keep existing social destinations unchanged; no new WhatsApp or Line social icon is needed.

Labels:

- English: **Tour operators & coach groups**
- Thai: **ผู้ประกอบการทัวร์และกรุ๊ปรถโค้ช**
- Chinese: **旅行社与旅游大巴团体**

The link must use the current supported language and the appropriate locale route. Display it only on English, Thai and Chinese site versions. Do not show an English fallback link on Russian or Arabic pages.

On mobile, keep the link beneath the social links with readable spacing and an adequate touch target. Preserve visible keyboard focus and existing link contrast.

## 5. Routes and locale behavior

Use existing locale routes and slugs. Provide an operator information page and a distinct group booking request page in each of the three supported locales. An illustrative route pair is /tour-operators and /tour-operators/group-booking; adapt it to the actual router and locale scheme. Do not hard-code a new /en/ prefix if English currently uses unprefixed paths. Link the information-page primary CTA to the matching group request page and provide a back link.

Support direct entry and reload using the existing hosting/router arrangement. Set the correct document language, translated page title and description. Use existing canonical/hreflang conventions if present; do not create Russian or Arabic alternates for these pages.

On both pages, offer only the three supported page languages in the language selector. Switching language should retain the information-page or request-page context and preserve entered form values where practical. Do not create empty Russian/Arabic pages, silent English content under a Russian/Arabic URL, or broken language-switch links. Preserve the site's established language-selection behavior on unrelated pages. Do not put personal form values in navigation URLs or persist them indefinitely in browser storage.

## 6. Operator page design

Make this a practical itinerary-planning page using the established visual design. Use a restrained hero, a compact planning-summary row and readable sections. On mobile, use one column with no horizontal scrolling.

Suggested order:

1. Hero: title, brief introduction and primary action linking to the separate group booking request page.
2. Planning summary: free coach parking; provisional four-coach parking capacity; provisional 1–4 hour visit duration.
3. Plan your visit: explain which details operators should provide.
4. Arrival and parking: location, verified directions and parking information.
5. How group bookings work: send a request, discuss arrangements, receive explicit confirmation, then pay as agreed.
6. Payment: the two known payment methods, followed by a repeated link to the group booking request page and secondary telephone/existing messaging options.

The separate request page should contain a short explanation, one manageable form, an optional review summary within the same page, and a clear submitted state with the request reference and next steps. Do not add accounts, a partner portal, live availability calendar, automatic pricing, automatic booking confirmation or online checkout in this iteration.

Use relevant existing photographs with suitable alt text. Prefer an existing entrance/parking photo if available. Do not invent an entrance image or use an unrelated location to illustrate access. Avoid fabricated testimonials, partnerships, discounts, availability guarantees and unsupported participation/safety claims.

Keep the provisional figures visible in the design preview, clearly identified as draft information through a preview-only notice or the project's existing preview mechanism. Record their source/status in code or content data and in the register. Do not put internal identifiers or technical verification language in normal customer copy. Before release, confirm the figures or use the approved less-specific wording recorded below.

## 7. Draft localized page copy

Use these strings through the existing translation mechanism. Adapt punctuation and line wrapping to the interface. These Thai and Chinese translations are draft copy and need a fluent reviewer before public release. Do not translate company names or invent contact details.

### English

- Page title: **Tour operators & coach groups | Phuket Shooters**
- Description: **Plan a group visit to Phuket Shooters. Find information about coach parking, visit timings, enquiries and payment.**
- Heading: **Tour operators & coach groups**
- Introduction: **Planning a stop at Phuket Shooters? Contact our team to discuss your group, preferred arrival time and itinerary.**
- Primary action: **Request a group booking**
- Secondary phone action: **Call the team**
- Summary label: **Free coach parking**
- Parking figure, provisional: **Space for up to 4 coaches**
- Duration label: **Plan your visit**
- Duration figure, provisional: **Allow approximately 1–4 hours**
- Duration supporting text: **Visit length depends on your group and chosen activities. Contact us to discuss the time available in your itinerary.**
- Planning heading: **Fit a visit into your itinerary**
- Planning body: **Tell us your preferred date, arrival time, approximate number of visitors and number of coaches. Our team can discuss the arrangements with you.**
- Arrival heading: **Arrival & coach parking**
- Arrival body: **Free parking is available for coaches. Contact us before your visit to discuss arrival and parking arrangements.**
- Directions action: **Get directions**
- Booking heading: **Booking & payment**
- Booking body: **Send a group booking request. Our team will check availability and contact you to agree the arrangements and confirm your booking. You can pay cash on the day, or call us to arrange payment by card.**
- Payment action: **Call to arrange card payment**
- Request heading: **Request a group booking**
- Request introduction: **Tell us about your group and preferred visit. Sending this form does not reserve a time or confirm a booking. Our team will contact you to discuss the arrangements.**
- Form labels: **Company or organisation; Contact name; Email address; Phone number; Preferred visit date; Approximate arrival time; Number of visitors; Number of coaches; Activities or packages of interest; Questions or requirements**
- Optional-field indicator: **Optional**
- Submit action: **Send booking request**
- Success message: **We've received your group booking request. Reference: {reference}. Your booking is confirmed only when our team explicitly confirms the arrangements with you.**
- Failure message: **We couldn't send your booking request. Your booking has not been confirmed. Please try again or call the team.**
- Preview-only notice: **Draft preview: parking capacity and visit timings need confirmation before launch.**

### Thai

- Page title: **ผู้ประกอบการทัวร์และกรุ๊ปรถโค้ช | Phuket Shooters**
- Description: **วางแผนพากรุ๊ปมาเยือน Phuket Shooters พร้อมข้อมูลที่จอดรถโค้ช ระยะเวลาเข้าชม การสอบถาม และการชำระเงิน**
- Heading: **ผู้ประกอบการทัวร์และกรุ๊ปรถโค้ช**
- Introduction: **กำลังวางแผนแวะ Phuket Shooters อยู่ใช่ไหม? ติดต่อทีมงานเพื่อพูดคุยเกี่ยวกับกรุ๊ปของคุณ เวลาที่ต้องการเดินทางมาถึง และแผนการเดินทาง**
- Primary action: **ส่งคำขอจองแบบกรุ๊ป**
- Secondary phone action: **โทรหาทีมงาน**
- Summary label: **ที่จอดรถโค้ชฟรี**
- Parking figure, provisional: **รองรับรถโค้ชได้สูงสุด 4 คัน**
- Duration label: **วางแผนการเข้าชม**
- Duration figure, provisional: **เผื่อเวลาประมาณ 1–4 ชั่วโมง**
- Duration supporting text: **ระยะเวลาขึ้นอยู่กับกรุ๊ปและกิจกรรมที่เลือก ติดต่อเราเพื่อพูดคุยเกี่ยวกับเวลาที่มีในแผนการเดินทางของคุณ**
- Planning heading: **จัดเวลาเข้าชมให้เข้ากับแผนการเดินทาง**
- Planning body: **แจ้งวันที่ต้องการเข้าชม เวลาที่จะมาถึง จำนวนผู้เข้าร่วมโดยประมาณ และจำนวนรถโค้ช เพื่อให้ทีมงานพูดคุยเรื่องการจัดกรุ๊ปกับคุณ**
- Arrival heading: **การเดินทางมาถึงและที่จอดรถโค้ช**
- Arrival body: **มีที่จอดรถโค้ชฟรี กรุณาติดต่อเราก่อนเข้าชมเพื่อพูดคุยเรื่องการเดินทางมาถึงและการจอดรถ**
- Directions action: **ดูเส้นทาง**
- Booking heading: **การจองและการชำระเงิน**
- Booking body: **ส่งคำขอจองแบบกรุ๊ป ทีมงานจะตรวจสอบความพร้อมและติดต่อคุณเพื่อตกลงรายละเอียดและยืนยันการจอง คุณสามารถชำระเป็นเงินสดในวันเข้าชม หรือโทรหาเราเพื่อจัดการชำระเงินด้วยบัตร**
- Payment action: **โทรเพื่อชำระเงินด้วยบัตร**
- Request heading: **ส่งคำขอจองแบบกรุ๊ป**
- Request introduction: **แจ้งรายละเอียดกรุ๊ปและวันที่ต้องการเข้าชม การส่งแบบฟอร์มนี้ยังไม่ถือเป็นการสำรองเวลาหรือยืนยันการจอง ทีมงานจะติดต่อคุณเพื่อพูดคุยรายละเอียด**
- Form labels: **บริษัทหรือองค์กร; ชื่อผู้ติดต่อ; อีเมล; หมายเลขโทรศัพท์; วันที่ต้องการเข้าชม; เวลาที่คาดว่าจะมาถึง; จำนวนผู้เข้าร่วม; จำนวนรถโค้ช; กิจกรรมหรือแพ็กเกจที่สนใจ; คำถามหรือความต้องการเพิ่มเติม**
- Optional-field indicator: **ไม่บังคับ**
- Submit action: **ส่งคำขอจอง**
- Success message: **เราได้รับคำขอจองแบบกรุ๊ปของคุณแล้ว หมายเลขอ้างอิง: {reference} การจองจะได้รับการยืนยันเมื่อทีมงานติดต่อคุณและยืนยันรายละเอียดอย่างชัดเจนเท่านั้น**
- Failure message: **ไม่สามารถส่งคำขอจองได้ การจองของคุณยังไม่ได้รับการยืนยัน กรุณาลองอีกครั้งหรือโทรหาทีมงาน**
- Preview-only notice: **ฉบับร่างสำหรับตรวจสอบ: ต้องยืนยันจำนวนรถโค้ชที่รองรับและระยะเวลาเข้าชมก่อนเปิดใช้งานจริง**

### Simplified Chinese

- Page title: **旅行社与旅游大巴团体 | Phuket Shooters**
- Description: **计划组团前往 Phuket Shooters，了解旅游大巴停车、游玩时长、咨询及付款信息。**
- Heading: **旅行社与旅游大巴团体**
- Introduction: **计划将 Phuket Shooters 加入行程？请联系我们的团队，沟通团体人数、预计抵达时间及行程安排。**
- Primary action: **提交团体预约申请**
- Secondary phone action: **致电团队**
- Summary label: **旅游大巴免费停车**
- Parking figure, provisional: **最多可停放 4 辆旅游大巴**
- Duration label: **规划到访行程**
- Duration figure, provisional: **建议预留约 1–4 小时**
- Duration supporting text: **到访时长取决于团体情况及所选活动。请联系我们，沟通您的行程可预留的时间。**
- Planning heading: **将到访安排融入您的行程**
- Planning body: **请告知希望到访的日期、抵达时间、预计人数及旅游大巴数量。我们的团队会与您沟通具体安排。**
- Arrival heading: **抵达与旅游大巴停车**
- Arrival body: **提供旅游大巴免费停车。请在到访前联系我们，沟通抵达及停车安排。**
- Directions action: **查看路线**
- Booking heading: **预约与付款**
- Booking body: **请提交团体预约申请。我们的团队将核实接待安排，并与您联系，商定详情后确认预约。您可以在到访当天支付现金，或致电我们安排银行卡付款。**
- Payment action: **致电安排银行卡付款**
- Request heading: **提交团体预约申请**
- Request introduction: **请告知团体情况及希望到访的时间。提交此表格不代表时段已预留或预约已确认。我们的团队将与您联系，沟通具体安排。**
- Form labels: **公司或机构; 联系人姓名; 电子邮箱; 电话号码; 希望到访的日期; 预计抵达时间; 到访人数; 旅游大巴数量; 感兴趣的活动或套餐; 问题或其他需求**
- Optional-field indicator: **选填**
- Submit action: **发送预约申请**
- Success message: **我们已收到您的团体预约申请。参考编号：{reference}。只有在我们的团队与您联系并明确确认安排后，预约才正式确认。**
- Failure message: **预约申请发送失败。您的预约尚未确认。请重试或致电我们的团队。**
- Preview-only notice: **预览草稿：停车容量及到访时长需在正式上线前确认。**

## 8. Map and contact behavior

Reuse the verified address, coordinates, map and phone number already present in the repository. Do not fabricate coordinates, routes, entrance positions or telephone numbers. If the project has a working map component, reuse it with its existing performance/privacy behavior. Otherwise, a lightweight location section plus a working directions link is sufficient for now.

A general map does not establish suitability of a route for coaches. Do not claim a particular approach is coach-accessible without confirmation. If an annotated arrival map is still needed, record it as outstanding and use a clearly labelled preview placeholder rather than a misleading map.

Use tel: links for calling, retaining the actual phone number. Reuse the existing WhatsApp/contact flow if available. Do not add a payment checkout or collect card numbers, expiry dates or security codes in any form, message template, URL or analytics payload. The card action starts a phone call; the enquiry action requests arrangements rather than confirming a booking.

## 9. Separate group booking request process

### 9.1 Customer journey

Build a distinct form and submission context for group bookings. Reuse visual components and utilities where suitable, but do not send users through the individual-customer booking journey or silently repurpose it.

1. On the operator information page, the primary action opens the localized group request page.
2. The operator enters the proposed visit and contact details. Explain above the form that availability will be checked manually and the request is not a confirmed booking.
3. The operator submits the request. Show an accessible submitting state and prevent accidental double submission while it is in flight.
4. After the backend has accepted the request under the delivery rules below, show a localized acknowledgement with an opaque request reference, the submitted date/time and group summary, and the next step. Identify all visit dates/times as Phuket local time. Do not promise a response within an invented timeframe.
5. Staff receive a structured notification, check availability and operational capacity, contact the operator and agree the visit details and price.
6. Staff explicitly confirm or decline through the agreed email/phone process. A request reference identifies the request; it is not proof of a reservation. Payment is cash on the day or arranged by card by telephone as agreed with the operator.

Keep one page of form fields rather than an unnecessary multi-step wizard. A review summary can appear before submission, or alongside the form if it is useful on desktop. On success, retain a readable receipt view; do not clear inputs or show success before the backend accepts the request. Make failure recovery straightforward and preserve inputs after recoverable errors.

### 9.2 Form fields and validation

| Field | Requirement and behavior |
| --- | --- |
| Company or organisation | Optional; independent group organisers can submit. |
| Contact name | Required. |
| Email address | Required for this proposed process so staff can reply with written arrangements. Use standard email validation; do not require a company domain. |
| Phone number | Optional; accept international formats. Explain that it helps staff discuss arrangements. |
| Preferred visit date | Required; validate against the current date in Asia/Bangkok. Do not invent a minimum notice period, blackout dates or live availability. |
| Approximate arrival time | Optional; label as Phuket local time. This is a preference, not an available slot. |
| Number of visitors | Required positive integer; include everyone visiting. Do not interpret this as the number simultaneously taking part. |
| Number of coaches | Optional non-negative integer; zero is valid. Do not reject requests over four using an unconfirmed parking assumption; staff must review the arrangements. |
| Activities or packages of interest | Optional; use existing verified package choices with a “Not sure yet” option, or a short text field if reliable package data is unavailable. Do not invent group prices or discounts. |
| Questions or requirements | Optional short text; no need for passenger lists, identity documents or sensitive personal information. |

Apply reasonable technical text-length and payload-size limits on both client and server. These are input controls, not business capacity limits. Use visible labels, autocomplete where suitable, field-linked errors and an accessible error summary. Do not add a mandatory marketing checkbox. Link the existing privacy information and describe the actual use of details for processing the request without making new legal or retention promises.

### 9.3 Build the missing backend

The absence of an enquiry backend is a required implementation item. Inspect the current hosting/deployment configuration and build the smallest appropriate server-side submission endpoint. Reuse an existing server runtime or serverless function convention. If this is a Cloudflare Pages deployment, check the repository and use a compatible server-side function/Worker approach; if hosting differs, adapt to the actual platform. A static component alone cannot perform this job.

Use an existing configured transactional email provider if available. Resend may be a suitable option if already integrated, but do not assume there is a working account, verified sender, API key or receiving inbox. Check current official provider/platform documentation during implementation where API/runtime details need verification. Do not create a paid account, purchase services or change DNS without existing authorization.

Implement the endpoint, server-side validation, notification formatting, frontend integration, configuration example and deployment/setup instructions. Use environment configuration for the real team recipient, verified sender and credentials. Never hard-code an invented mailbox or expose API keys to the frontend. Document the exact environment variable names chosen in the code; place only placeholders in the example configuration.

An illustrative contract, adapted to the project:

- POST a structured group request to a dedicated same-origin endpoint.
- Payload contains the validated form fields, locale from the supported allowlist, request type `group_booking_request`, and a retry/idempotency identifier.
- Server returns a success acknowledgement with an opaque request reference only after the request has been accepted for reliable processing as described below.
- Invalid input, rate limits, missing configuration and provider failures return meaningful non-success status/error codes. The frontend maps them to translated messages without exposing provider internals.
- Use the user's selected locale in the receipt and optional acknowledgement email; include it in the staff notification. Never infer the chosen language solely from the phone number or email address.

Minimum viable delivery can be a structured email to a configured staff inbox. A separate database, staff dashboard or account system is not required solely for this iteration. For an email-only implementation, return success only after the mail provider has accepted the staff notification for processing. This indicates provider acceptance, not proof that the email reached a human inbox. Verify real inbox delivery separately before launch. Use the provider's supported idempotency mechanism or an appropriate durable retry record; do not rely on an in-memory flag for a serverless deployment. A retry of the same request must preserve its reference and avoid duplicate staff notifications.

If the project already provides durable request storage/queueing, use it. In that case, success may follow durable acceptance only when there is a real delivery/retry path and a practical way for staff to retrieve pending requests. Do not mark a request successful merely because it was placed in browser storage, logged to the console or saved in a transient server process.

For the email-only approach, a provider failure means the request is not accepted: show the localized failure state, retain the form and expose the verified telephone/contact fallback. For a timeout with unknown outcome, preserve the retry identifier so a retry can resolve the original request safely. Do not silently submit the same request repeatedly with fresh identifiers.

Use an authenticated provider transport from the server, server-side rate limiting appropriate to the deployment, and a low-friction spam control such as a properly implemented honeypot. Validate origin where appropriate, safely render/escape user content and prevent email-header injection. Add a further challenge only if the existing project uses one or testing shows a need. Do not log full personal request bodies, put them in analytics events or public URLs, or store them in publicly accessible files.

### 9.4 Staff notification and acknowledgement

Send the staff notification from the configured verified site sender with a validated operator address as Reply-To. Subject example: `[Group booking request {reference}] {preferred date} — {visitor count} visitors`. Include the request reference, receipt timestamp, selected language, contact details, company if provided, Phuket-local preferred date/time, visitor count, coach count, interests and questions. Mark it clearly **REQUEST — NOT CONFIRMED** and state that staff must check capacity and contact the operator.

An optional automated acknowledgement to the operator is useful if the configured provider supports it. It must use the selected language and repeat that this is only a request. It must not call itself a booking confirmation, quote an invented price or imply a time has been held. Staff notification acceptance is the minimum success condition for the email-only implementation. If an additional customer acknowledgement fails, do not tell the operator the entire request failed or encourage duplicate submissions; keep the successful on-screen request receipt and record the secondary failure for operations.

For manual staff confirmation, document a short email template with fields for request reference, agreed visit date/time, group and coach counts, agreed activities/price, payment arrangement and the team's contact details. Those details must be supplied by staff; no template defaults should invent prices, cancellation terms or capacity. Staff must record confirmations and changes in an agreed shared operational record. Document that this is initially a manual process, and put its owner and recording method in the launch register rather than building an unsolicited admin platform.

### 9.5 Missing external configuration

Do not stop at “there is no working enquiry backend” and do not silently replace this scope with contact links. Complete all code, templates, configuration examples, local validation and focused transport-failure tests that do not require external credentials. If keys, a verified sender, a receiving inbox or platform provisioning are missing, list each exact dependency and setup step as an explicit launch blocker.

Keep an unconfigured public form from appearing operational. Use a truthful localized unavailable state with the real phone/contact fallback. In development, an explicitly labelled test transport may exercise the UI; it must not be enabled in production or claim external delivery. Build completion, external configuration, provider acceptance and real inbox-delivery verification must be reported separately. Do not claim this process is ready for launch until the real end-to-end path is verified.

### 9.6 Additional localized workflow strings

All UI states and acknowledgement text must exist in the three supported locales. The following copy extends the page strings above; Thai and Chinese remain drafts for fluent review. Use the established date/number formatting and named placeholders.

| Purpose | English | Thai | Simplified Chinese |
| --- | --- | --- | --- |
| Request page title | Group booking request \| Phuket Shooters | คำขอจองแบบกรุ๊ป \| Phuket Shooters | 团体预约申请 \| Phuket Shooters |
| Request page description | Send a group booking request to Phuket Shooters. Our team will check the arrangements and contact you to confirm. | ส่งคำขอจองแบบกรุ๊ปถึง Phuket Shooters ทีมงานจะตรวจสอบรายละเอียดและติดต่อคุณเพื่อยืนยันการจอง | 向 Phuket Shooters 提交团体预约申请。我们的团队将核实安排并与您联系确认。 |
| Back link | Back to tour operator information | กลับไปยังข้อมูลสำหรับผู้ประกอบการทัวร์ | 返回旅行社与团体信息页 |
| Process heading | How group bookings work | ขั้นตอนการจองแบบกรุ๊ป | 团体预约流程 |
| Step 1 | Send your booking request | ส่งคำขอจอง | 提交预约申请 |
| Step 2 | Discuss arrangements with our team | พูดคุยรายละเอียดกับทีมงาน | 与我们的团队沟通安排 |
| Step 3 | Receive explicit booking confirmation | รับการยืนยันการจองจากทีมงาน | 获得团队的明确预约确认 |
| Step 4 | Pay using the agreed arrangement | ชำระเงินตามที่ตกลงไว้ | 按商定方式付款 |
| Submitting | Sending your request… | กำลังส่งคำขอ… | 正在发送申请… |
| Receipt heading | Request received — awaiting confirmation | ได้รับคำขอแล้ว — รอการยืนยัน | 已收到申请，等待确认 |
| Reference label | Request reference | หมายเลขอ้างอิงคำขอ | 申请参考编号 |
| Date summary | Preferred date: {date} | วันที่ต้องการเข้าชม: {date} | 希望到访日期：{date} |
| Visitor summary | Visitors: {count} | จำนวนผู้เข้าร่วม: {count} | 到访人数：{count} |
| Coach summary | Coaches: {count} | จำนวนรถโค้ช: {count} | 旅游大巴数量：{count} |
| Timezone help | All visit dates and times are local to Phuket. | วันที่และเวลาเข้าชมทั้งหมดเป็นเวลาท้องถิ่นภูเก็ต | 所有到访日期和时间均为普吉岛当地时间。 |
| Activities placeholder | Not sure yet | ยังไม่แน่ใจ | 尚未确定 |
| Phone help | Add a phone number if you would like us to call about the arrangements. | หากต้องการให้เราโทรพูดคุยรายละเอียด กรุณาระบุหมายเลขโทรศัพท์ | 如需我们致电沟通安排，请填写电话号码。 |
| Required field | Please complete this field. | กรุณากรอกข้อมูลในช่องนี้ | 请填写此项。 |
| Email validation | Enter a valid email address. | กรุณากรอกอีเมลให้ถูกต้อง | 请输入有效的电子邮箱地址。 |
| Date validation | Choose today or a future visit date in Phuket local time. | กรุณาเลือกวันเข้าชมเป็นวันนี้หรือวันถัดไปตามเวลาท้องถิ่นภูเก็ต | 请按普吉岛当地时间选择今天或之后的到访日期。 |
| Visitor validation | Enter a whole number of visitors greater than zero. | กรุณาระบุจำนวนผู้เข้าร่วมเป็นจำนวนเต็มมากกว่าศูนย์ | 到访人数须为大于零的整数。 |
| Coach validation | Enter zero or a positive whole number of coaches. | กรุณาระบุจำนวนรถโค้ชเป็นศูนย์หรือจำนวนเต็มบวก | 旅游大巴数量须为零或正整数。 |
| Error summary | Please check the highlighted fields. | กรุณาตรวจสอบช่องข้อมูลที่ระบุ | 请检查标出的项目。 |
| Rate limit | Please wait a moment before trying again, or call the team. | กรุณารอสักครู่แล้วลองอีกครั้ง หรือโทรหาทีมงาน | 请稍后重试，或致电我们的团队。 |
| Unavailable | Online group booking requests are temporarily unavailable. Please call the team to arrange your visit. | ระบบส่งคำขอจองแบบกรุ๊ปออนไลน์ยังไม่พร้อมให้บริการชั่วคราว กรุณาโทรหาทีมงานเพื่อจัดการเข้าชม | 在线团体预约申请暂时不可用。请致电我们的团队安排到访。 |
| Connection/uncertain result | We couldn't confirm receipt of your request. Please retry, or call the team if you are unsure. | เรายังไม่สามารถยืนยันว่าได้รับคำขอแล้ว กรุณาลองอีกครั้ง หรือโทรหาทีมงานหากไม่แน่ใจ | 我们暂时无法确认是否已收到您的申请。请重试，如有疑问请致电团队。 |
| Email acknowledgement subject | Group booking request received — {reference} | ได้รับคำขอจองแบบกรุ๊ปแล้ว — {reference} | 已收到团体预约申请 — {reference} |
| Email acknowledgement body | We have received your group booking request. Your reference is {reference}. Our team will contact you to discuss availability and arrangements. This email does not confirm a booking. | เราได้รับคำขอจองแบบกรุ๊ปของคุณแล้ว หมายเลขอ้างอิงคือ {reference} ทีมงานจะติดต่อคุณเพื่อตรวจสอบความพร้อมและพูดคุยรายละเอียด อีเมลนี้ยังไม่ใช่การยืนยันการจอง | 我们已收到您的团体预约申请，参考编号为 {reference}。我们的团队将与您联系，沟通接待情况及具体安排。此邮件不代表预约已确认。 |

Localize any additional text introduced during implementation, including technical-length validation messages, retry/back actions, privacy-link labels and accessible announcements. Do not leave English validation text in Thai or Chinese flows.

## 10. Repository assumptions and launch checks

Create or update docs/launch-checks.md, following an existing register if one exists. Keep documentation in English; the three visitor-facing locales do not require three copies of the internal register.

Use columns: ID, topic, current evidence/assumption, consequence if wrong, required action, proposed owner, status, launch treatment. Mark proposed business owners as unassigned until accepted; do not silently assign people.

Initial entries:

| ID | Topic | Current evidence or assumption | Required action and launch treatment |
| --- | --- | --- | --- |
| TO-01 | Coach parking count | Free coach parking confirmed; four spaces provisional | Confirm vehicle sizes and simultaneous parking. If unconfirmed at launch, omit the number and retain “Free coach parking” and its translations. |
| TO-02 | Visitor capacity | Unknown; parking capacity does not establish visitor throughput | Confirm simultaneous participants, group scheduling and maximum group size. Do not publish numeric visitor capacity until verified. |
| TO-03 | Duration | 1–4 hours provisional | Confirm representative durations by activity and group size. If unconfirmed at launch, replace the range with a contact-to-plan message in all three locales. |
| TO-04 | Coach approach and map | Coaches can park; exact entrance/route guidance unconfirmed | Confirm approach, turning/drop-off arrangements and whether an annotated map is needed. Use only verified location/directions; omit unverified approach claims. |
| TO-05 | Booking | Separate request, staff review and explicit manual confirmation are the proposed process | Confirm lead time, staff availability checks, response ownership and shared booking record. Keep request wording and do not imply a submitted request reserves a slot. |
| TO-06 | Payment terms | Cash on day or card by telephone | Confirm payer, payment timing, deposits, supported cards/currencies, cancellations and refunds. Publish only the two known payment methods; omit invented terms. |
| TO-07 | Trade arrangements | Rates, commission and guide/driver benefits unknown | Confirm whether any exist. Omit offers until approved. This need not block a factual enquiry page. |
| TO-08 | Guest requirements | Group-specific age/ID, accessibility and other requirements not established in this brief | Reuse only approved existing policy. Confirm anything needed for arranging a group visit; do not invent eligibility claims. |
| TO-09 | Translation review | Thai/Chinese copy is draft; Chinese variant should match the existing site | Arrange fluent review and reconcile wording across locales before public release. |
| TO-10 | Backend implementation | No working enquiry backend exists | Build and connect the dedicated group request endpoint, validation, retry protection and staff notification. This functionality is in scope; do not mark it completed with a decorative form or contact links alone. |
| TO-11 | Delivery configuration | Sender, recipient, credentials and hosting capability require inspection | Identify exact external dependencies, configure them and verify provider acceptance plus real staff-inbox delivery. Missing configuration blocks launch of online submission; use a truthful unavailable state until resolved. |
| TO-12 | Operational booking ownership | Confirmation, changes and cancellation handling are not yet assigned | Agree who monitors requests, follows up, confirms bookings and records changes, and establish a shared booking record. Do not promise a response time until agreed. |
| TO-13 | Reliability and request data | New request endpoint accepts personal contact details | Verify server validation, throttling, retry/idempotency behavior and failure handling; agree operational data access/retention and reflect actual handling in existing privacy information. |

For TO-03, acceptable non-numeric English fallback is: “Contact us to plan the time needed for your group and chosen activities.” Provide equivalent reviewed Thai and Chinese strings if this fallback is used. Keep all three locales consistent when a fact changes. Link the register from the existing project documentation if appropriate.

## 11. Verification and completion report

Run the project's relevant build, lint/type checks and focused tests using the existing test tooling where available. Add meaningful coverage for this new backend: invalid input must not send email; valid input must reach the configured transport; provider rejection/missing configuration must not produce false success; a repeated submission with the same retry identifier must not create a duplicate notification or different reference. Check the uncertain-timeout retry path and verify that optional customer acknowledgement failure does not lose an accepted staff request. Isolate any test transport so production cannot mistake it for delivery. Verify the UI at desktop and mobile widths, including Thai wrapping and Chinese labels.

Acceptance checks:

- The homepage promotion below reviews is absent across all locales with no empty space or hidden focus targets.
- The ordinary footer link appears below social links in English, Thai and Chinese, linking to the correct locale page.
- Russian and Arabic receive neither a new operator page nor the new footer link. Their unrelated content continues to work.
- All three operator information pages and all three group booking request pages load directly and through the appropriate links; switching languages retains page context.
- Headings, buttons, metadata, form labels, errors and success messages use the selected locale.
- Parking capacity is not presented as simultaneous visitor capacity; the two provisional figures are tracked and identifiable in the preview.
- The map/directions and contact links use verified existing destinations. The phone payment action initiates a call.
- The separate group request flow leaves individual bookings unchanged and clearly distinguishes request received from booking confirmed.
- The new backend validates, routes and accepts real requests, creates a request reference and handles provider failure, missing configuration and safe retries. No simulated success or card-data collection is introduced.
- Staff receive all required details and the selected language. A real, explicitly marked test request verifies inbox delivery using an authorized test recipient; do not send a fake live booking to staff without arranging the test. If delivery cannot be verified, report the dependency honestly and keep online submission unavailable for launch.
- Localized request receipt, validation, submitting, failure, unavailable and optional acknowledgement states work in English, Thai and Chinese.
- Keyboard navigation, focus states, labels, contrast and mobile layout remain usable.
- The launch register exists and captures the remaining decisions.

Finish with the changed files, all six local preview routes, checks completed, any blocked checks and unresolved launch items. Include backend setup documentation with the exact environment variable names, provider/sender/recipient requirements, local testing steps and a brief staff operating procedure for manual confirmation. Distinguish code implemented, configuration complete, provider acceptance tested and real inbox delivery verified. Do not claim deployment, fluent translation approval, business confirmation or successful delivery that has not occurred.
