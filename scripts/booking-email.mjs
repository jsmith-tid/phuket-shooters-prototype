const defaultSender = 'Phuket Shooters <bookings@mail.phuket-shooters.com>';
const mapImageUrl = 'https://phuket-shooters.com/assets/images/phuket-shooters-location-map.png';
const osmMapUrl = 'https://www.openstreetmap.org/?mlat=7.841593&mlon=98.3562825#map=17/7.841593/98.3562825';
const appleDirectionsUrl = 'https://maps.apple.com/?daddr=7.841593,98.3562825';
const googleDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=7.841593%2C98.3562825';
const locationAddress = '33, 54 Soi Palai, Chalong, Mueang Phuket District, Phuket 83130, Thailand';
const receiptUi = {
  en: { reference: 'Enquiry reference', location: 'Find us', hours: 'Open daily, 09:00–18:00', mapAlt: 'OpenStreetMap view of Soi Palai and nearby landmarks in Chalong, Phuket', mapLink: 'Open the pinned map', apple: 'Directions in Apple Maps', google: 'Directions in Google Maps', contact: 'Questions? Reply to this email or call us.' },
  th: { reference: 'หมายเลขอ้างอิงคำสอบถาม', location: 'การเดินทาง', hours: 'เปิดทุกวัน 09:00–18:00 น.', mapAlt: 'แผนที่ OpenStreetMap แสดงซอยป่าหล่ายและจุดสังเกตใกล้เคียงในฉลอง ภูเก็ต', mapLink: 'เปิดแผนที่พร้อมหมุดตำแหน่ง', apple: 'เส้นทางใน Apple Maps', google: 'เส้นทางใน Google Maps', contact: 'มีคำถาม? ตอบกลับอีเมลนี้หรือโทรหาเรา' },
  zh: { reference: '咨询编号', location: '如何找到我们', hours: '每天 09:00–18:00 营业', mapAlt: 'OpenStreetMap 地图，显示普吉查龙帕莱巷及周边地标', mapLink: '打开带定位标记的地图', apple: '在 Apple 地图中查看路线', google: '在 Google 地图中查看路线', contact: '有疑问？回复本邮件或致电我们。' },
  ar: { reference: 'رقم مرجع الاستفسار', location: 'كيفية الوصول إلينا', hours: 'نفتح يوميًا من 09:00 إلى 18:00', mapAlt: 'خريطة OpenStreetMap لشارع سوي بالاي والمعالم القريبة في تشالونغ، بوكيت', mapLink: 'فتح الخريطة مع علامة الموقع', apple: 'الاتجاهات في خرائط Apple', google: 'الاتجاهات في خرائط Google', contact: 'هل لديك سؤال؟ رد على هذه الرسالة أو اتصل بنا.' },
  ru: { reference: 'Номер запроса', location: 'Как нас найти', hours: 'Ежедневно, 09:00–18:00', mapAlt: 'Карта OpenStreetMap: Сой Палай и ближайшие ориентиры в Чалонге, Пхукет', mapLink: 'Открыть карту с меткой', apple: 'Маршрут в Apple Maps', google: 'Маршрут в Google Картах', contact: 'Есть вопросы? Ответьте на это письмо или позвоните нам.' }
};
// Keep the address check practical: reject common typos, then let delivery report
// whether the mailbox exists. Do not impose country-specific address rules.
const emailPattern = /^[^\s@.<>()[\],;:"\\]+(?:\.[^\s@.<>()[\],;:"\\]+)*@(?:[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?\.)+(?:[\p{L}]{2,63}|xn--[a-z0-9-]{2,59})$/iu;
const normalisePhoneDigits = value => value.replace(/[٠-٩۰-۹๐-๙０-９]/gu, digit => {
  const code = digit.codePointAt(0);
  const base = code >= 0xff10 ? 0xff10 : code >= 0x0e50 ? 0x0e50 : code >= 0x06f0 ? 0x06f0 : 0x0660;
  return String(code - base);
});
const validPhone = value => /^\+?[0-9().\-\s]+$/.test(value) && (value.match(/[0-9]/g) || []).length >= 6 && (value.match(/[0-9]/g) || []).length <= 20;
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const phuketToday = () => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};
const validDate = value => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value && value >= phuketToday();
};
const validTime = value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
const validId = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const language = (value, allowed) => value === undefined ? 'en' : typeof value === 'string' && allowed.includes(value) ? value : null;
const strings = (input, limits) => {
  const fields = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof input[key] !== 'string' || input[key].length > limit) return null;
    const value = input[key].normalize('NFC').replace(/\r\n?/g, '\n').trim();
    if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(value)) return null;
    if (!['extra', 'questions'].includes(key) && /[\n\t]/u.test(value)) return null;
    fields[key] = key === 'phone' ? normalisePhoneDigits(value) : ['name', 'company', 'activities'].includes(key) ? value.replace(/ {2,}/g, ' ') : value;
  }
  return fields;
};

const consumerKeys = ['name', 'phone', 'email', 'people', 'date', 'start', 'end', 'extra'];
const groupKeys = ['company', 'name', 'email', 'phone', 'date', 'time', 'visitors', 'coaches', 'activities', 'questions'];
const staffConsumerLabels = ['Name', 'Phone', 'Email entered in form', 'People', 'Date', 'Start', 'End', 'Additional information'];
const staffGroupLabels = ['Company or organisation', 'Contact name', 'Email entered in form', 'Phone', 'Preferred visit date', 'Approximate arrival time', 'Visitors', 'Coaches', 'Activities or packages of interest', 'Questions or requirements'];
const consumerCopy = {
  en: { subject: 'Your booking enquiry was received', title: 'Enquiry received', intro: 'Thank you for your enquiry. This receipt does not confirm a booking. Our team will contact you to confirm availability and arrangements.', directions: 'Open directions in Google Maps', details: 'Your enquiry details', labels: ['Name', 'Phone', 'Email', 'People', 'Preferred visit date', 'Start time', 'End time', 'Additional information'] },
  th: { subject: 'เราได้รับคำสอบถามของคุณแล้ว', title: 'ได้รับคำสอบถามแล้ว', intro: 'ขอบคุณสำหรับคำสอบถาม การได้รับอีเมลนี้ไม่ใช่การยืนยันการจอง ทีมงานจะติดต่อเพื่อยืนยันความพร้อมและรายละเอียดอีกครั้ง', directions: 'เปิดเส้นทางใน Google Maps', details: 'รายละเอียดคำสอบถามของคุณ', labels: ['ชื่อ', 'โทรศัพท์', 'อีเมล', 'จำนวนคน', 'วันที่', 'เวลาเริ่ม', 'เวลาสิ้นสุด', 'ข้อมูลเพิ่มเติม'] },
  zh: { subject: '我们已收到您的预约咨询', title: '已收到咨询', intro: '感谢您的咨询。收到此邮件并不代表预约已确认；我们的团队将另行确认是否有空位及具体安排。', directions: '在 Google 地图中查看路线', details: '您的咨询详情', labels: ['姓名', '电话', '电子邮箱', '人数', '日期', '开始时间', '结束时间', '补充信息'] },
  ar: { subject: 'تم استلام استفسارك بشأن الحجز', title: 'تم استلام الاستفسار', intro: 'شكرًا لاستفسارك. استلام هذا البريد لا يعني تأكيد الحجز؛ سيتواصل فريقنا معك لتأكيد التوافر والترتيبات.', directions: 'فتح الاتجاهات في خرائط Google', details: 'تفاصيل استفسارك', labels: ['الاسم', 'الهاتف', 'البريد الإلكتروني', 'عدد الأشخاص', 'التاريخ', 'وقت البدء', 'وقت الانتهاء', 'معلومات إضافية'] },
  ru: { subject: 'Ваш запрос на бронирование получен', title: 'Запрос получен', intro: 'Спасибо за ваш запрос. Это письмо не подтверждает бронирование; наша команда отдельно согласует наличие мест и детали.', directions: 'Открыть маршрут в Google Картах', details: 'Данные вашего запроса', labels: ['Имя', 'Телефон', 'Электронная почта', 'Количество человек', 'Дата', 'Время начала', 'Время окончания', 'Дополнительная информация'] }
};
const groupCopy = {
  en: { subject: 'Your group request was received', title: 'Group request received', intro: 'Thank you for your group enquiry. No visit or coach parking has been reserved. Our team will review your request and contact you to discuss arrangements; a booking is confirmed only when the team explicitly confirms it.', directions: 'Open directions in Google Maps', details: 'Your group request details', labels: ['Company or organisation', 'Contact name', 'Email', 'Phone', 'Preferred visit date', 'Approximate arrival time', 'Visitors', 'Coaches', 'Activities or packages of interest', 'Questions or requirements'] },
  th: { subject: 'เราได้รับคำขอสำหรับกรุ๊ปของคุณแล้ว', title: 'ได้รับคำขอสำหรับกรุ๊ปแล้ว', intro: 'ขอบคุณสำหรับคำขอของคุณ ยังไม่มีการจองเวลาเข้าชมหรือที่จอดรถโค้ช ทีมงานจะตรวจสอบคำขอและติดต่อเพื่อพูดคุยรายละเอียด การจองจะมีผลต่อเมื่อทีมงานยืนยันอย่างชัดเจนเท่านั้น', directions: 'เปิดเส้นทางใน Google Maps', details: 'รายละเอียดคำขอของคุณ', labels: ['บริษัทหรือองค์กร', 'ชื่อผู้ติดต่อ', 'อีเมล', 'โทรศัพท์', 'วันที่ต้องการเข้าชม', 'เวลาที่คาดว่าจะมาถึง', 'จำนวนผู้เข้าร่วม', 'จำนวนรถโค้ช', 'กิจกรรมหรือแพ็กเกจที่สนใจ', 'คำถามหรือความต้องการเพิ่มเติม'] },
  zh: { subject: '我们已收到您的团体预约申请', title: '已收到团体申请', intro: '感谢您提交团体申请。目前尚未预留到访时段或旅游大巴停车位。我们的团队会查看申请并与您联系商讨安排；只有收到团队明确确认后，预约才算成立。', directions: '在 Google 地图中查看路线', details: '您的团体申请详情', labels: ['公司或机构', '联系人姓名', '电子邮箱', '电话号码', '希望到访的日期', '预计抵达时间', '到访人数', '旅游大巴数量', '感兴趣的活动或套餐', '问题或其他需求'] }
};

function summary(details, keys, labels) {
  return `<dl>${keys.map((key, index) => `<dt><strong>${escapeHtml(labels[index])}</strong></dt><dd>${escapeHtml(details[key] === '' ? '—' : details[key])}</dd>`).join('')}</dl>`;
}
function receiptRows(details, keys, labels) {
  return keys.map((key, index) => `<tr><td style="padding:9px 0;vertical-align:top;border-bottom:1px solid #e5e2dd;color:#202124;font-size:15px;line-height:1.45;overflow-wrap:anywhere;word-break:break-word"><strong style="color:#555">${escapeHtml(labels[index])}:</strong> ${escapeHtml(details[key] === '' ? '—' : details[key])}</td></tr>`).join('');
}
function customerMessage(details, inbox, sender, copy, keys) {
  const ui = receiptUi[details.lang];
  const reference = escapeHtml(details.submissionId);
  const inner = `<p style="margin:0 0 8px;color:#dc2f2f;font-size:12px;font-weight:700;letter-spacing:.08em">PHUKET SHOOTERS</p>
    <h1 style="margin:0 0 20px;font-size:30px;line-height:1.18;color:#17191c">${escapeHtml(copy.title)}</h1>
    <p style="margin:0 0 22px;padding:14px 16px;background:#f5f2ec;border-inline-start:3px solid #dc2f2f;font-size:16px;line-height:1.55">${escapeHtml(copy.intro)}</p>
    <h2 style="margin:0 0 12px;font-size:20px;line-height:1.25">${escapeHtml(copy.details)}</h2>
    <p style="margin:0 0 15px;font-size:13px;color:#555">${escapeHtml(ui.reference)}: <strong>${reference}</strong></p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${receiptRows(details, keys, copy.labels)}</table>
    <h2 style="margin:26px 0 10px;font-size:20px;line-height:1.25">${escapeHtml(ui.location)}</h2>
    <p style="margin:0 0 8px;font-size:15px;line-height:1.5"><strong>Phuket Shooters</strong><br>${escapeHtml(locationAddress)}<br>${escapeHtml(ui.hours)}<br><a href="tel:+66811032598" style="color:#a91f24">+66 81 103 2598</a> · <a href="mailto:info@phuketshooters.com" style="color:#a91f24">info@phuketshooters.com</a></p>
    <a href="${osmMapUrl}" style="display:block;margin:18px 0 5px"><img src="${mapImageUrl}" width="552" alt="${escapeHtml(ui.mapAlt)}" style="display:block;width:100%;max-width:552px;height:auto;border:0"></a>
    <p style="margin:0 0 18px;font-size:12px;color:#666"><a href="${osmMapUrl}" style="color:#a91f24">${escapeHtml(ui.mapLink)}</a> · <a href="https://www.openstreetmap.org/copyright" style="color:#555">© OpenStreetMap contributors · ODbL</a></p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse"><tr><td style="padding:0 0 9px"><a href="${appleDirectionsUrl}" style="display:block;padding:12px 10px;background:#17191c;color:#fff;text-align:center;text-decoration:none;font-size:14px;font-weight:700">${escapeHtml(ui.apple)}</a></td></tr><tr><td><a href="${googleDirectionsUrl}" style="display:block;padding:12px 10px;background:#17191c;color:#fff;text-align:center;text-decoration:none;font-size:14px;font-weight:700">${escapeHtml(ui.google)}</a></td></tr></table>
    <p style="margin:14px 0 0;font-size:14px;line-height:1.5;color:#555">${escapeHtml(ui.contact)}</p>`;
  return { from: sender, to: [details.email], reply_to: inbox, subject: copy.subject,
    html: `<!doctype html><html lang="${details.lang}"${details.lang === 'ar' ? ' dir="rtl"' : ''}><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:12px;background:#f5f2ec;font-family:Arial,Tahoma,sans-serif;color:#17191c"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;margin:0 auto;background:#fff;border:1px solid #17191c"><tr><td style="padding:24px 20px;border-top:4px solid #dc2f2f">${inner}</td></tr></table></body></html>`,
    text: `${copy.title}\n\n${copy.intro}\n\n${ui.reference}: ${details.submissionId}\n\n${copy.details}\n${keys.map((key, index) => `${copy.labels[index]}: ${details[key] === '' ? '—' : details[key]}`).join('\n')}\n\n${ui.location}\nPhuket Shooters\n${locationAddress}\n${ui.hours}\n+66 81 103 2598\ninfo@phuketshooters.com\n\n${ui.mapLink}: ${osmMapUrl}\n${ui.apple}: ${appleDirectionsUrl}\n${ui.google}: ${googleDirectionsUrl}\n© OpenStreetMap contributors · ODbL\n\n${ui.contact}` };
}
function consumerMessages(details, inbox, sender) {
  return [
    { from: sender, to: [inbox], reply_to: details.email, subject: 'Consumer booking enquiry', html: `<h1>Consumer booking enquiry</h1><p>Reference: ${escapeHtml(details.submissionId)}</p>${summary(details, consumerKeys, staffConsumerLabels)}` },
    customerMessage(details, inbox, sender, consumerCopy[details.lang], consumerKeys)
  ];
}
function groupMessages(details, inbox, sender) {
  return [
    { from: sender, to: [inbox], reply_to: details.email, subject: 'Group booking request', html: `<h1>Group booking request</h1><p>Reference: ${escapeHtml(details.submissionId)}</p>${summary(details, groupKeys, staffGroupLabels)}` },
    customerMessage(details, inbox, sender, groupCopy[details.lang], groupKeys)
  ];
}

export function validate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || !validId(input.submissionId)) return null;
  const lang = language(input.lang, Object.keys(consumerCopy));
  const fields = strings(input, { name: 120, phone: 40, email: 254, date: 10, start: 5, end: 5, extra: 2000 });
  if (!lang || !fields || !fields.name || !validPhone(fields.phone) || !emailPattern.test(fields.email) || input.agree !== true) return null;
  if (!/^[1-9]\d{0,2}$/.test(String(input.people)) || Number(input.people) > 100) return null;
  if (!validDate(fields.date) || !validTime(fields.start) || !validTime(fields.end) || fields.start < '09:00' || fields.end > '18:00' || fields.start >= fields.end) return null;
  return { submissionId: input.submissionId.toLowerCase(), lang, ...fields, people: Number(input.people) };
}
export function validateGroup(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || !validId(input.submissionId)) return null;
  const lang = language(input.lang, Object.keys(groupCopy));
  const fields = strings(input, { company: 120, name: 120, email: 254, phone: 40, date: 10, time: 5, visitors: 5, coaches: 2, activities: 200, questions: 1000 });
  if (!lang || !fields || !fields.name || !emailPattern.test(fields.email) || !validDate(fields.date)) return null;
  if (fields.phone && !validPhone(fields.phone)) return null;
  if (fields.time && (!validTime(fields.time) || fields.time < '09:00' || fields.time >= '18:00')) return null;
  if (!/^[1-9]\d{0,2}$/.test(fields.visitors) || Number(fields.visitors) > 999) return null;
  if (fields.coaches && (!/^\d{1,2}$/.test(fields.coaches) || Number(fields.coaches) > 20)) return null;
  return { submissionId: input.submissionId.toLowerCase(), lang, ...fields, visitors: Number(fields.visitors), coaches: Number(fields.coaches || 0) };
}

function createService({ send, inbox, sender = defaultSender, now = () => Date.now(), onEvent = () => {}, validateInput, buildMessages, keys, prefix }) {
  const records = new Map();
  return async function submit(input) {
    const details = validateInput(input);
    if (!details) return { status: 400, body: { result: 'invalid' } };
    for (const [key, record] of records) if (now() - record.created > 86_400_000) records.delete(key);
    if (records.size > 500) return { status: 429, body: { result: 'busy' } };
    const fingerprint = JSON.stringify(details);
    let record = records.get(details.submissionId);
    if (record && record.fingerprint !== fingerprint) return { status: 409, body: { result: 'changed' } };
    if (!record) {
      record = { fingerprint, created: now(), accepted: [false, false], pending: null };
      records.set(details.submissionId, record);
    }
    if (record.pending) return record.pending;
    record.pending = (async () => {
      const emails = buildMessages(details, inbox, sender);
      for (let index = 0; index < emails.length; index++) {
        if (record.accepted[index]) continue;
        const role = index === 0 ? 'staff' : 'customer';
        emails[index].tags = [{ name: 'submission_id', value: details.submissionId }, { name: 'journey', value: prefix }, { name: 'recipient_role', value: role }];
        try {
          const accepted = await send(emails[index], `${prefix}-${details.submissionId}-${index === 0 ? 'business' : 'acknowledgement'}`);
          record.accepted[index] = Boolean(accepted?.id);
          onEvent({ event: record.accepted[index] ? 'email_accepted' : 'email_rejected', submissionId: details.submissionId, journey: prefix, role, ...(record.accepted[index] ? { emailId: accepted.id } : { reason: 'missing_provider_id' }) });
        } catch (error) {
          onEvent({ event: 'email_rejected', submissionId: details.submissionId, journey: prefix, role, reason: error?.status ? 'provider_http' : 'provider_unavailable', ...(error?.status ? { providerStatus: error.status } : {}) });
        }
      }
      const count = record.accepted.filter(Boolean).length;
      if (count !== 2) onEvent({ event: count === 1 ? 'email_partial' : 'email_failed', submissionId: details.submissionId, journey: prefix, staffAccepted: record.accepted[0], customerAccepted: record.accepted[1] });
      return { status: count === 2 ? 200 : count === 1 ? 207 : 502, body: { result: count === 2 ? 'accepted' : count === 1 ? 'partial' : 'failed', ...(count === 2 ? { details: Object.fromEntries(keys.map(key => [key, details[key]])) } : {}) } };
    })();
    try { return await record.pending; } finally { record.pending = null; }
  };
}
export const createBookingService = options => createService({ ...options, validateInput: validate, buildMessages: consumerMessages, keys: consumerKeys, prefix: 'booking' });
export const createGroupService = options => createService({ ...options, validateInput: validateGroup, buildMessages: groupMessages, keys: groupKeys, prefix: 'group' });
