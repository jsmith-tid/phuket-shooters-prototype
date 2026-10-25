const defaultSender = 'Phuket Shooters <bookings@mail.phuket-shooters.com>';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    fields[key] = input[key].trim();
  }
  return fields;
};

const consumerKeys = ['name', 'phone', 'email', 'people', 'date', 'start', 'end', 'extra'];
const groupKeys = ['company', 'name', 'email', 'phone', 'date', 'time', 'visitors', 'coaches', 'activities', 'questions'];
const staffConsumerLabels = ['Name', 'Phone', 'Email entered in form', 'People', 'Date', 'Start', 'End', 'Additional information'];
const staffGroupLabels = ['Company or organisation', 'Contact name', 'Email entered in form', 'Phone', 'Preferred visit date', 'Approximate arrival time', 'Visitors', 'Coaches', 'Activities or packages of interest', 'Questions or requirements'];
const consumerCopy = {
  en: { subject: 'Your booking enquiry was received', title: 'Enquiry received', intro: 'Thank you for your enquiry. Receipt does not confirm a booking. The team must confirm availability and arrangements separately.', labels: ['Name', 'Phone', 'Email', 'People', 'Date', 'Start time', 'End time', 'Additional information'] },
  th: { subject: 'เราได้รับคำสอบถามของคุณแล้ว', title: 'ได้รับคำสอบถามแล้ว', intro: 'ขอบคุณสำหรับคำสอบถาม การได้รับอีเมลนี้ไม่ใช่การยืนยันการจอง ทีมงานจะติดต่อเพื่อยืนยันความพร้อมและรายละเอียดอีกครั้ง', labels: ['ชื่อ', 'โทรศัพท์', 'อีเมล', 'จำนวนคน', 'วันที่', 'เวลาเริ่ม', 'เวลาสิ้นสุด', 'ข้อมูลเพิ่มเติม'] },
  zh: { subject: '我们已收到您的预约咨询', title: '已收到咨询', intro: '感谢您的咨询。收到此邮件并不代表预约已确认；我们的团队将另行确认是否有空位及具体安排。', labels: ['姓名', '电话', '电子邮箱', '人数', '日期', '开始时间', '结束时间', '补充信息'] },
  ar: { subject: 'تم استلام استفسارك بشأن الحجز', title: 'تم استلام الاستفسار', intro: 'شكرًا لاستفسارك. استلام هذا البريد لا يعني تأكيد الحجز؛ سيتواصل فريقنا معك لتأكيد التوافر والترتيبات.', labels: ['الاسم', 'الهاتف', 'البريد الإلكتروني', 'عدد الأشخاص', 'التاريخ', 'وقت البدء', 'وقت الانتهاء', 'معلومات إضافية'] },
  ru: { subject: 'Ваш запрос на бронирование получен', title: 'Запрос получен', intro: 'Спасибо за ваш запрос. Это письмо не подтверждает бронирование; наша команда отдельно согласует наличие мест и детали.', labels: ['Имя', 'Телефон', 'Электронная почта', 'Количество человек', 'Дата', 'Время начала', 'Время окончания', 'Дополнительная информация'] }
};
const groupCopy = {
  en: { subject: 'Your group request was received', title: 'Group request received', intro: 'Thank you for your group enquiry. No visit or coach parking has been reserved. Our team will review your request and contact you to discuss arrangements; a booking is confirmed only when the team explicitly confirms it.', labels: ['Company or organisation', 'Contact name', 'Email', 'Phone', 'Preferred visit date', 'Approximate arrival time', 'Visitors', 'Coaches', 'Activities or packages of interest', 'Questions or requirements'] },
  th: { subject: 'เราได้รับคำขอสำหรับกรุ๊ปของคุณแล้ว', title: 'ได้รับคำขอสำหรับกรุ๊ปแล้ว', intro: 'ขอบคุณสำหรับคำขอของคุณ ยังไม่มีการจองเวลาเข้าชมหรือที่จอดรถโค้ช ทีมงานจะตรวจสอบคำขอและติดต่อเพื่อพูดคุยรายละเอียด การจองจะมีผลต่อเมื่อทีมงานยืนยันอย่างชัดเจนเท่านั้น', labels: ['บริษัทหรือองค์กร', 'ชื่อผู้ติดต่อ', 'อีเมล', 'โทรศัพท์', 'วันที่ต้องการเข้าชม', 'เวลาที่คาดว่าจะมาถึง', 'จำนวนผู้เข้าร่วม', 'จำนวนรถโค้ช', 'กิจกรรมหรือแพ็กเกจที่สนใจ', 'คำถามหรือความต้องการเพิ่มเติม'] },
  zh: { subject: '我们已收到您的团体预约申请', title: '已收到团体申请', intro: '感谢您提交团体申请。目前尚未预留到访时段或旅游大巴停车位。我们的团队会查看申请并与您联系商讨安排；只有收到团队明确确认后，预约才算成立。', labels: ['公司或机构', '联系人姓名', '电子邮箱', '电话号码', '希望到访的日期', '预计抵达时间', '到访人数', '旅游大巴数量', '感兴趣的活动或套餐', '问题或其他需求'] }
};

function summary(details, keys, labels) {
  return `<dl>${keys.map((key, index) => `<dt><strong>${escapeHtml(labels[index])}</strong></dt><dd>${escapeHtml(details[key] === '' ? '—' : details[key])}</dd>`).join('')}</dl>`;
}
function customerMessage(details, inbox, sender, copy, keys) {
  return { from: sender, to: [details.email], reply_to: inbox, subject: copy.subject,
    html: `<html lang="${details.lang}"${details.lang === 'ar' ? ' dir="rtl"' : ''}><body><h1>${escapeHtml(copy.title)}</h1><p>${escapeHtml(copy.intro)}</p>${summary(details, keys, copy.labels)}</body></html>` };
}
function consumerMessages(details, inbox, sender) {
  return [
    { from: sender, to: [inbox], reply_to: details.email, subject: 'Consumer booking enquiry', html: `<h1>Consumer booking enquiry</h1>${summary(details, consumerKeys, staffConsumerLabels)}` },
    customerMessage(details, inbox, sender, consumerCopy[details.lang], consumerKeys)
  ];
}
function groupMessages(details, inbox, sender) {
  return [
    { from: sender, to: [inbox], reply_to: details.email, subject: 'Group booking request', html: `<h1>Group booking request</h1>${summary(details, groupKeys, staffGroupLabels)}` },
    customerMessage(details, inbox, sender, groupCopy[details.lang], groupKeys)
  ];
}

export function validate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || !validId(input.submissionId)) return null;
  const lang = language(input.lang, Object.keys(consumerCopy));
  const fields = strings(input, { name: 120, phone: 40, email: 254, date: 10, start: 5, end: 5, extra: 2000 });
  if (!lang || !fields || !fields.name || !fields.phone || !emailPattern.test(fields.email) || input.agree !== true) return null;
  if (!/^[1-9]\d{0,2}$/.test(String(input.people)) || Number(input.people) > 100) return null;
  if (!validDate(fields.date) || !validTime(fields.start) || !validTime(fields.end) || fields.start < '09:00' || fields.end > '18:00' || fields.start >= fields.end) return null;
  return { submissionId: input.submissionId.toLowerCase(), lang, ...fields, people: Number(input.people) };
}
export function validateGroup(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || !validId(input.submissionId)) return null;
  const lang = language(input.lang, Object.keys(groupCopy));
  const fields = strings(input, { company: 120, name: 120, email: 254, phone: 40, date: 10, time: 5, visitors: 5, coaches: 2, activities: 200, questions: 1000 });
  if (!lang || !fields || !fields.name || !emailPattern.test(fields.email) || !validDate(fields.date)) return null;
  if (fields.time && !validTime(fields.time)) return null;
  if (!/^[1-9]\d{0,4}$/.test(fields.visitors) || Number(fields.visitors) > 10000) return null;
  if (fields.coaches && (!/^\d{1,2}$/.test(fields.coaches) || Number(fields.coaches) > 99)) return null;
  return { submissionId: input.submissionId.toLowerCase(), lang, ...fields, visitors: Number(fields.visitors), coaches: Number(fields.coaches || 0) };
}

function createService({ send, inbox, sender = defaultSender, now = () => Date.now(), validateInput, buildMessages, keys, prefix }) {
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
        try {
          const accepted = await send(emails[index], `${prefix}-${details.submissionId}-${index === 0 ? 'business' : 'acknowledgement'}`);
          record.accepted[index] = Boolean(accepted?.id);
        } catch { /* Return an accurate partial/failure state without exposing provider details. */ }
      }
      const count = record.accepted.filter(Boolean).length;
      return { status: count === 2 ? 200 : count === 1 ? 207 : 502, body: { result: count === 2 ? 'accepted' : count === 1 ? 'partial' : 'failed', ...(count === 2 ? { details: Object.fromEntries(keys.map(key => [key, details[key]])) } : {}) } };
    })();
    try { return await record.pending; } finally { record.pending = null; }
  };
}
export const createBookingService = options => createService({ ...options, validateInput: validate, buildMessages: consumerMessages, keys: consumerKeys, prefix: 'booking' });
export const createGroupService = options => createService({ ...options, validateInput: validateGroup, buildMessages: groupMessages, keys: groupKeys, prefix: 'group' });
