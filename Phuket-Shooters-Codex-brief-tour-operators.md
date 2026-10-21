# Codex brief: tour operator pages, group-request prototype and quieter homepage placement

Implement these changes in the existing Phuket Shooters repository. This is an implementation brief in English with proposed visitor-facing copy in English, Thai and Simplified Chinese. Use the site's existing Chinese variant if it is already established instead of introducing a competing variant.

This document supersedes the previous brief and incorporates the owner's later clarification: **the group-request form is a dummy prototype only**. It must not submit, transmit, email, store, reserve or confirm anything. Its button previews an in-page state, not a confirmation page. Do not build a backend or claim that a request was received. Inspect and retain correct work already completed without duplicating pages, components or register entries.

## 1. Objective and scope

The investor supports the new design but wants tour operators and coach groups to have less prominence on the homepage. Remove the promotional section beneath the homepage reviews from the rendered page, retain a discreet footer link, and build or update a dedicated operator information page and separate group booking request flow in English, Thai and Chinese only.

The proposed future operating process is: operator sends a real request → team reviews availability and arrangements → team explicitly confirms by email or phone → payment follows the agreed arrangement. **None of these steps is performed by the prototype form.** The site may explain the proposed process, but must make the current dummy status unmistakable.

Do not add Russian or Arabic versions of either page or its new footer link. Preserve unrelated existing Russian and Arabic site content. Do not add these pages to the main navigation or replace the removed homepage section with another operator promotion. Keep the existing individual-customer booking journey unchanged.

Read AGENTS.md and inspect the existing application before editing. Follow its router, translation system, shared footer, design tokens, contact components, forms and analytics conventions. Adapt the paths and component names in this brief to the actual project. Update existing operator pages rather than creating duplicates. Do not redesign unrelated parts of the site or publish/deploy as part of this task.

## 2. Facts and working assumptions

Confirmed by the project owner:

- There is free parking that accommodates coaches.
- Payment options are cash on the day or arranging card payment by telephone.
- The operator promotion beneath the homepage reviews should be removed from view.
- The operator page should remain discoverable through a quiet footer link beneath the social links.
- A separate group-request **preview** page is required.
- There is no working enquiry backend, and none is to be built for this prototype.

Provisional, for the design preview:

- Parking accommodates up to four coaches. This is a parking assumption, not a statement about shooting-range throughput or simultaneous visitor capacity.
- Visits last approximately one to four hours, depending on visitors and activities. This is not a guaranteed package duration.
- A location map and coach arrival information may be required. Specific approach instructions and entrance details are unconfirmed.

Unknown: visitor capacity, minimum group size, lead time, deposits, operational ownership of booking confirmation, cancellation/refund terms, trade rates, commission, driver/guide benefits, facilities, accessibility and group-specific participation requirements. Do not invent these. Record relevant questions in the register below; omit unsupported promises from visitor-facing copy. Do not imply the proposed request-and-manual-confirmation workflow is already operational.

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

On both pages, offer only the three supported page languages in the language selector. Switching language should retain the information-page or request-page context. It is acceptable for draft form values to reset when switching language; do not put personal values in navigation URLs or persist them in browser storage merely to preserve them. Do not create empty Russian/Arabic pages, silent English content under a Russian/Arabic URL, or broken language-switch links. Preserve the site's established language-selection behavior on unrelated pages.

## 6. Operator page design

Make this a practical itinerary-planning page using the established visual design. Use a restrained hero, a compact planning-summary row and readable sections. On mobile, use one column with no horizontal scrolling.

Suggested order:

1. Hero: title, brief introduction and primary action linking to the separate group booking request page.
2. Planning summary: free coach parking; provisional four-coach parking capacity; provisional 1–4 hour visit duration.
3. Plan your visit: explain which details operators should provide.
4. Arrival and parking: location, verified directions and parking information.
5. Proposed future group-booking process, labelled as illustrative: send a real request, discuss arrangements, receive explicit confirmation, then pay as agreed. The prototype form performs none of these steps.
6. Payment: the two known payment methods, followed by a repeated link to the group booking request page and secondary telephone/existing messaging options.

The separate request page should contain a short explanation, one manageable form and a clear **in-page preview** of the entered visit details. The preview must say that nothing was sent, saved, reserved or booked. Do not show a submitted state, request reference or fake confirmation page. Do not add accounts, a partner portal, live availability calendar, automatic pricing, automatic booking confirmation or online checkout in this iteration.

Use relevant existing photographs with suitable alt text. Prefer an existing entrance/parking photo if available. Do not invent an entrance image or use an unrelated location to illustrate access. Avoid fabricated testimonials, partnerships, discounts, availability guarantees and unsupported participation/safety claims.

Keep the provisional figures visible in the design preview, clearly identified as draft information through a preview-only notice or the project's existing preview mechanism. Record their source/status in code or content data and in the register. Do not put internal identifiers or technical verification language in normal customer copy. Before release, confirm the figures or use the approved less-specific wording recorded below.

## 7. Draft localized page copy

Use these strings through the existing translation mechanism. Adapt punctuation and line wrapping to the interface. These Thai and Chinese translations are draft copy and need a fluent reviewer before public release. Do not translate company names or invent contact details.

### English

- Page title: **Tour operators & coach groups | Phuket Shooters**
- Description: **Plan a group visit to Phuket Shooters. Find information about coach parking, visit timings, enquiries and payment.**
- Heading: **Tour operators & coach groups**
- Introduction: **Planning a stop at Phuket Shooters? Contact our team to discuss your group, preferred arrival time and itinerary.**
- Primary action: **Make a group request** (opens the dummy request page; also use this label on the repeated CTA)
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
- Booking body: **Contact our team to discuss a real group visit. They can check availability and confirm arrangements with you. You can pay cash on the day, or call us to arrange payment by card. The form on this prototype page does not contact the team.**
- Payment action: **Call to arrange card payment**
- Request heading: **Group booking request**
- Request introduction: **Explore the group request form. This is a prototype: nothing you enter is sent or saved, and no time is reserved or booking confirmed.**
- Form labels: **Company or organisation; Contact name; Email address; Phone number; Preferred visit date; Approximate arrival time; Number of visitors; Number of coaches; Activities or packages of interest; Questions or requirements**
- Optional-field indicator: **Optional**
- Preview action: **Preview request**
- In-page preview heading: **Request preview — nothing sent**
- In-page preview message: **This is only a demonstration. Your details have not been sent, no time has been reserved and no booking has been made.**
- Edit action: **Edit details**
- Form notice: **Prototype only — this form does not send a request or make a booking.**
- Preview-only notice: **Draft preview: parking capacity and visit timings need confirmation before launch.**

### Thai

- Page title: **ผู้ประกอบการทัวร์และกรุ๊ปรถโค้ช | Phuket Shooters**
- Description: **วางแผนพากรุ๊ปมาเยือน Phuket Shooters พร้อมข้อมูลที่จอดรถโค้ช ระยะเวลาเข้าชม การสอบถาม และการชำระเงิน**
- Heading: **ผู้ประกอบการทัวร์และกรุ๊ปรถโค้ช**
- Introduction: **กำลังวางแผนแวะ Phuket Shooters อยู่ใช่ไหม? ติดต่อทีมงานเพื่อพูดคุยเกี่ยวกับกรุ๊ปของคุณ เวลาที่ต้องการเดินทางมาถึง และแผนการเดินทาง**
- Primary action: **กรอกคำขอจองแบบกรุ๊ป** (also use on the repeated CTA)
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
- Booking body: **ติดต่อทีมงานเพื่อพูดคุยเกี่ยวกับการเข้าชมแบบกรุ๊ป ทีมงานสามารถตรวจสอบความพร้อมและยืนยันรายละเอียดกับคุณได้ คุณสามารถชำระเป็นเงินสดในวันเข้าชม หรือโทรหาเราเพื่อจัดการชำระเงินด้วยบัตร แบบฟอร์มต้นแบบนี้ไม่ได้ติดต่อทีมงาน**
- Payment action: **โทรเพื่อชำระเงินด้วยบัตร**
- Request heading: **คำขอจองแบบกรุ๊ป**
- Request introduction: **ทดลองกรอกแบบฟอร์มคำขอจองแบบกรุ๊ป นี่เป็นเพียงต้นแบบ: ข้อมูลจะไม่ถูกส่งหรือบันทึก และยังไม่มีการสำรองเวลาหรือยืนยันการจอง**
- Form labels: **บริษัทหรือองค์กร; ชื่อผู้ติดต่อ; อีเมล; หมายเลขโทรศัพท์; วันที่ต้องการเข้าชม; เวลาที่คาดว่าจะมาถึง; จำนวนผู้เข้าร่วม; จำนวนรถโค้ช; กิจกรรมหรือแพ็กเกจที่สนใจ; คำถามหรือความต้องการเพิ่มเติม**
- Optional-field indicator: **ไม่บังคับ**
- Preview action: **ดูตัวอย่างคำขอ**
- In-page preview heading: **ตัวอย่างคำขอ — ไม่มีการส่งข้อมูล**
- In-page preview message: **นี่เป็นเพียงตัวอย่าง ข้อมูลของคุณไม่ได้ถูกส่ง ไม่มีการสำรองเวลา และยังไม่มีการจอง**
- Edit action: **แก้ไขรายละเอียด**
- Form notice: **ต้นแบบเท่านั้น — แบบฟอร์มนี้ไม่ส่งคำขอหรือทำการจอง**
- Preview-only notice: **ฉบับร่างสำหรับตรวจสอบ: ต้องยืนยันจำนวนรถโค้ชที่รองรับและระยะเวลาเข้าชมก่อนเปิดใช้งานจริง**

### Simplified Chinese

- Page title: **旅行社与旅游大巴团体 | Phuket Shooters**
- Description: **计划组团前往 Phuket Shooters，了解旅游大巴停车、游玩时长、咨询及付款信息。**
- Heading: **旅行社与旅游大巴团体**
- Introduction: **计划将 Phuket Shooters 加入行程？请联系我们的团队，沟通团体人数、预计抵达时间及行程安排。**
- Primary action: **填写团体预约申请** (also use on the repeated CTA)
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
- Booking body: **请联系我们的团队，讨论团体到访安排。团队可以核实接待情况并与您确认详情。您可以在到访当天支付现金，或致电我们安排银行卡付款。此原型表格不会联系团队。**
- Payment action: **致电安排银行卡付款**
- Request heading: **团体预约申请**
- Request introduction: **体验团体预约申请表。这只是原型：所填信息不会发送或保存，也不会预留时段或确认预约。**
- Form labels: **公司或机构; 联系人姓名; 电子邮箱; 电话号码; 希望到访的日期; 预计抵达时间; 到访人数; 旅游大巴数量; 感兴趣的活动或套餐; 问题或其他需求**
- Optional-field indicator: **选填**
- Preview action: **预览申请**
- In-page preview heading: **申请预览——未发送**
- In-page preview message: **这只是演示。您的信息未被发送，未预留任何时段，也未完成预约。**
- Edit action: **修改信息**
- Form notice: **仅供原型演示——此表格不会发送申请或完成预约。**
- Preview-only notice: **预览草稿：停车容量及到访时长需在正式上线前确认。**

## 8. Map and contact behavior

Reuse the verified address, coordinates, map and phone number already present in the repository. Do not fabricate coordinates, routes, entrance positions or telephone numbers. If the project has a working map component, reuse it with its existing performance/privacy behavior. Otherwise, a lightweight location section plus a working directions link is sufficient for now.

A general map does not establish suitability of a route for coaches. Do not claim a particular approach is coach-accessible without confirmation. If an annotated arrival map is still needed, record it as outstanding and use a clearly labelled preview placeholder rather than a misleading map.

Use tel: links for calling, retaining the actual phone number. Reuse the existing WhatsApp/contact flow if available. Do not add a payment checkout or collect card numbers, expiry dates or security codes in the form, URL or analytics payload. The card action starts a phone call. The dummy form does not request arrangements from staff; use real phone or WhatsApp links for that.

## 9. Separate group-request prototype

### 9.1 Customer journey

Build a distinct, local-only form interaction for group bookings. Reuse visual components and utilities where suitable, but do not send users through the individual-customer booking journey or silently repurpose it.

1. On the operator information page, the primary action opens the localized group request page.
2. The operator enters proposed visit and contact details. Explain above the form that it is a demonstration and no information is sent or saved.
3. The operator chooses **Preview request**. Validate the required fields locally, then show an accessible in-page preview of the preferred date/time and group summary. Do not navigate to a fake confirmation page.
4. The preview explicitly says nothing has been sent, reserved or booked. Allow editing without clearing the inputs. Provide real phone and WhatsApp contact alternatives.

Keep one page of form fields rather than a multi-step wizard. Do not use a submit action, network request, email, backend, request reference, browser persistence, analytics payload containing form values, or simulated success/receipt. A preview state can show the entered visit details in the current page. Switching language may reset the draft values rather than storing personal information.

### 9.2 Form fields and validation

| Field | Requirement and behavior |
| --- | --- |
| Company or organisation | Optional; independent group organisers can try the prototype. |
| Contact name | Required. |
| Email address | Required to demonstrate the proposed future process; use standard email validation and do not require a company domain. It is not transmitted. |
| Phone number | Optional; accept international formats. Explain that it helps staff discuss arrangements. |
| Preferred visit date | Required; validate against the current date in Asia/Bangkok. Do not invent a minimum notice period, blackout dates or live availability. |
| Approximate arrival time | Optional; label as Phuket local time. This is a preference, not an available slot. |
| Number of visitors | Required positive integer; include everyone visiting. Do not interpret this as the number simultaneously taking part. |
| Number of coaches | Optional non-negative integer; zero is valid. Do not reject values over four using an unconfirmed parking assumption. |
| Activities or packages of interest | Optional; use existing verified package choices with a “Not sure yet” option, or a short text field if reliable package data is unavailable. Do not invent group prices or discounts. |
| Questions or requirements | Optional short text; no need for passenger lists, identity documents or sensitive personal information. |

Apply reasonable client-side text-length limits. These are input controls, not business capacity limits. Use visible labels, autocomplete where suitable, field-linked errors and an accessible error summary. Do not add a mandatory marketing checkbox. State plainly that entered details remain only in the current page and are not transmitted or saved. Do not make new legal or retention promises.

### 9.3 Prototype-only behaviour

The group form must be safe to try on the public static prototype. Its preview control is a button, not a real submit action. No form data goes to a URL, API, email address, log, analytics event or browser storage. If JavaScript is unavailable, the control must not fall back to a real form submission. No staff notification, automated acknowledgement or booking reference exists in this iteration.

Show a visible, localized dummy-form notice before the fields and repeat the “nothing sent or booked” message in the in-page preview. Keep the form values editable during the same page view. Do not imply the business has received the details. The existing telephone and WhatsApp links are the only real contact channels on these pages.

A real backend, delivery workflow, privacy handling and staff operating procedure are future production work. Record them as deferred launch items, not requirements for this prototype. Do not add credentials, a provider integration or a mock transport.

### 9.4 Additional localized prototype strings

All prototype UI states must exist in the three supported locales. The following copy extends the page strings above; Thai and Chinese remain drafts for fluent review. Use the established date/number formatting and named placeholders.

| Purpose | English | Thai | Simplified Chinese |
| --- | --- | --- | --- |
| Request page title | Group booking request \| Phuket Shooters | คำขอจองแบบกรุ๊ป \| Phuket Shooters | 团体预约申请 \| Phuket Shooters |
| Request page description | Preview a group booking request to Phuket Shooters. This prototype does not send information or make a booking. | ดูตัวอย่างคำขอจองแบบกรุ๊ปถึง Phuket Shooters ต้นแบบนี้ไม่ส่งข้อมูลหรือทำการจอง | 预览向 Phuket Shooters 提交团体预约申请的流程。此原型不会发送信息或完成预约。 |
| Back link | Back to tour operator information | กลับไปยังข้อมูลสำหรับผู้ประกอบการทัวร์ | 返回旅行社与团体信息页 |
| Process heading | How group bookings work | ขั้นตอนการจองแบบกรุ๊ป | 团体预约流程 |
| Step 1 | Send your booking request (future process only) | ส่งคำขอจอง (ขั้นตอนในอนาคตเท่านั้น) | 提交预约申请（仅为未来流程） |
| Step 2 | Discuss arrangements with our team | พูดคุยรายละเอียดกับทีมงาน | 与我们的团队沟通安排 |
| Step 3 | Receive explicit booking confirmation | รับการยืนยันการจองจากทีมงาน | 获得团队的明确预约确认 |
| Step 4 | Pay using the agreed arrangement | ชำระเงินตามที่ตกลงไว้ | 按商定方式付款 |
| Preview action | Preview request | ดูตัวอย่างคำขอ | 预览申请 |
| In-page preview heading | Request preview — nothing sent | ตัวอย่างคำขอ — ไม่มีการส่งข้อมูล | 申请预览——未发送 |
| In-page preview message | This is only a demonstration. Your details have not been sent, no time has been reserved and no booking has been made. | นี่เป็นเพียงตัวอย่าง ข้อมูลของคุณไม่ได้ถูกส่ง ไม่มีการสำรองเวลา และยังไม่มีการจอง | 这只是演示。您的信息未被发送，未预留任何时段，也未完成预约。 |
| Edit action | Edit details | แก้ไขรายละเอียด | 修改信息 |
| Date summary | Preferred date: {date} | วันที่ต้องการเข้าชม: {date} | 希望到访日期：{date} |
| Visitor summary | Visitors: {count} | จำนวนผู้เข้าร่วม: {count} | 到访人数：{count} |
| Coach summary | Coaches: {count} | จำนวนรถโค้ช: {count} | 旅游大巴数量：{count} |
| Timezone help | All visit dates and times are local to Phuket. | วันที่และเวลาเข้าชมทั้งหมดเป็นเวลาท้องถิ่นภูเก็ต | 所有到访日期和时间均为普吉岛当地时间。 |
| Activities placeholder | Not sure yet | ยังไม่แน่ใจ | 尚未确定 |
| Phone help | Phone number is optional in this preview; nothing is sent to the team. | หมายเลขโทรศัพท์ไม่บังคับในตัวอย่างนี้ และไม่มีการส่งข้อมูลให้ทีมงาน | 此预览中的电话号码为选填，信息不会发送给团队。 |
| Required field | Please complete this field. | กรุณากรอกข้อมูลในช่องนี้ | 请填写此项。 |
| Email validation | Enter a valid email address. | กรุณากรอกอีเมลให้ถูกต้อง | 请输入有效的电子邮箱地址。 |
| Date validation | Choose today or a future visit date in Phuket local time. | กรุณาเลือกวันเข้าชมเป็นวันนี้หรือวันถัดไปตามเวลาท้องถิ่นภูเก็ต | 请按普吉岛当地时间选择今天或之后的到访日期。 |
| Visitor validation | Enter a whole number of visitors greater than zero. | กรุณาระบุจำนวนผู้เข้าร่วมเป็นจำนวนเต็มมากกว่าศูนย์ | 到访人数须为大于零的整数。 |
| Coach validation | Enter zero or a positive whole number of coaches. | กรุณาระบุจำนวนรถโค้ชเป็นศูนย์หรือจำนวนเต็มบวก | 旅游大巴数量须为零或正整数。 |
| Error summary | Please check the highlighted fields. | กรุณาตรวจสอบช่องข้อมูลที่ระบุ | 请检查标出的项目。 |

Localize any additional text introduced during implementation, including technical-length validation messages, back actions and accessible announcements. Do not leave English validation text in Thai or Chinese flows.

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
| TO-05 | Booking | Separate request, staff review and explicit manual confirmation are a proposed future process | Confirm lead time, availability checks, response ownership and shared booking record before enabling real requests. The current form previews only. |
| TO-06 | Payment terms | Cash on day or card by telephone | Confirm payer, payment timing, deposits, supported cards/currencies, cancellations and refunds. Publish only the two known payment methods; omit invented terms. |
| TO-07 | Trade arrangements | Rates, commission and guide/driver benefits unknown | Confirm whether any exist. Omit offers until approved. This need not block a factual enquiry page. |
| TO-08 | Guest requirements | Group-specific age/ID, accessibility and other requirements not established in this brief | Reuse only approved existing policy. Confirm anything needed for arranging a group visit; do not invent eligibility claims. |
| TO-09 | Translation review | Thai/Chinese copy is draft; Chinese variant should match the existing site | Arrange fluent review and reconcile wording across locales before public release. |
| TO-10 | Backend implementation | No working enquiry backend exists; the form is intentionally dummy | Defer endpoint, validation, retry protection and staff notification to a separately approved production task. Never present the prototype as operational. |
| TO-11 | Delivery configuration | Sender, recipient, credentials and hosting capability are not needed for the dummy | Before a future live launch, choose a provider, verified sender and inbox; verify delivery. No external configuration is required for this prototype. |
| TO-12 | Operational booking ownership | Confirmation, changes and cancellation handling are not yet assigned | Agree who monitors requests, follows up, confirms bookings and records changes, and establish a shared booking record. Do not promise a response time until agreed. |
| TO-13 | Reliability and request data | No endpoint accepts or stores form details in this prototype | Verify the preview makes no network request, URL query, browser storage or analytics payload containing form values. Define retention, privacy and reliability requirements before any future live endpoint. |

For TO-03, acceptable non-numeric English fallback is: “Contact us to plan the time needed for your group and chosen activities.” Provide equivalent reviewed Thai and Chinese strings if this fallback is used. Keep all three locales consistent when a fact changes. Link the register from the existing project documentation if appropriate.

## 11. Verification and completion report

Run the project's relevant build and focused existing checks. Verify that the group form has no real submit action or network/persistence path, that invalid details produce localized errors, and that valid details produce only a localized in-page preview. Verify the UI at desktop and mobile widths, including Thai wrapping and Chinese labels.

Acceptance checks:

- The homepage promotion below reviews is absent across all locales with no empty space or hidden focus targets.
- The ordinary footer link appears below social links in English, Thai and Chinese, linking to the correct locale page.
- Russian and Arabic receive neither a new operator page nor the new footer link. Their unrelated content continues to work.
- All three operator information pages and all three group booking request pages load directly and through the appropriate links; switching languages retains page context.
- Headings, buttons, metadata, form labels, errors and preview messages use the selected locale.
- Parking capacity is not presented as simultaneous visitor capacity; the two provisional figures are tracked and identifiable in the preview.
- The map/directions and contact links use verified existing destinations. The phone payment action initiates a call.
- The separate group-request preview leaves individual bookings unchanged and never claims a request was received or a booking confirmed.
- The dummy form makes no network request, sends no email, stores no values, creates no reference and has no fake confirmation page. The in-page preview can be edited; phone and WhatsApp remain real contact options.
- Localized validation and preview states work in English, Thai and Chinese.
- Keyboard navigation, focus states, labels, contrast and mobile layout remain usable.
- The launch register exists and captures the remaining decisions.

Finish with the changed files, all six local preview routes, checks completed, any blocked checks and unresolved launch items. Explicitly state that the group form is a dummy and no backend or delivery is in scope. Do not claim deployment, fluent translation approval, business confirmation, request delivery or a real booking that has not occurred.
