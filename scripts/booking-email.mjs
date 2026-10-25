const defaultSender = 'Phuket Shooters <bookings@mail.phuket-shooters.com>';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const phuketToday = () => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};

export function validate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const id = input.submissionId;
  if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return null;
  const fields = {};
  for (const [key, limit] of Object.entries({ name: 120, phone: 40, email: 254, date: 10, start: 5, end: 5, extra: 2000 })) {
    if (typeof input[key] !== 'string' || input[key].length > limit) return null;
    fields[key] = input[key].trim();
  }
  if (!fields.name || !fields.phone || !emailPattern.test(fields.email) || input.agree !== true) return null;
  if (!/^[1-9]\d{0,2}$/.test(String(input.people)) || Number(input.people) > 100) return null;
  const dateValue = new Date(`${fields.date}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date) || Number.isNaN(dateValue.getTime()) || dateValue.toISOString().slice(0, 10) !== fields.date || fields.date < phuketToday()) return null;
  if (!/^\d{2}:\d{2}$/.test(fields.start) || !/^\d{2}:\d{2}$/.test(fields.end) || fields.start < '09:00' || fields.end > '18:00' || fields.start >= fields.end) return null;
  return { submissionId: id.toLowerCase(), ...fields, people: Number(input.people) };
}

function messages(details, inbox, sender) {
  const lines = [
    ['Name', details.name], ['Phone', details.phone], ['Email entered in form', details.email],
    ['People', details.people], ['Date', details.date], ['Start', details.start], ['End', details.end],
    ['Additional information', details.extra || 'None']
  ];
  const summary = `<dl>${lines.map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value)}</dd>`).join('')}</dl>`;
  return [
    { from: sender, to: [inbox], reply_to: details.email, subject: 'Consumer booking enquiry', html: `<h1>Consumer booking enquiry</h1>${summary}` },
    { from: sender, to: [details.email], reply_to: inbox, subject: 'Your booking enquiry was received', html: `<h1>Enquiry received</h1><p>Thank you for your enquiry. Receipt does not confirm a booking. The team must confirm availability and arrangements separately.</p>${summary}` }
  ];
}

export function createBookingService({ send, inbox, sender = defaultSender, now = () => Date.now() }) {
  const records = new Map();
  return async function submit(input) {
    const details = validate(input);
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
      const emails = messages(details, inbox, sender);
      for (let index = 0; index < emails.length; index++) {
        if (record.accepted[index]) continue;
        try {
          const accepted = await send(emails[index], `booking-${details.submissionId}-${index === 0 ? 'business' : 'acknowledgement'}`);
          record.accepted[index] = Boolean(accepted?.id);
        } catch { /* Return an accurate partial/failure state without exposing provider details. */ }
      }
      const count = record.accepted.filter(Boolean).length;
      return { status: count === 2 ? 200 : count === 1 ? 207 : 502, body: { result: count === 2 ? 'accepted' : count === 1 ? 'partial' : 'failed', ...(count === 2 ? { details: { name: details.name, phone: details.phone, email: details.email, people: details.people, date: details.date, start: details.start, end: details.end, extra: details.extra } } : {}) } };
    })();
    try { return await record.pending; } finally { record.pending = null; }
  };
}
