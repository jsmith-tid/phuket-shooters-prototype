const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const bookingModule = import('./booking-email.mjs');

const date = () => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};
const enquiry = () => ({ submissionId: crypto.randomUUID(), people: '2', date: date(), start: '10:00', end: '11:00', name: '<A & B>', phone: '+66 81 123 4567', email: 'customer@example.org', extra: '<script>alert(1)</script>', agree: true });

test('business email goes to the inbox, acknowledgement to the customer, and HTML is escaped', async () => {
  const { createBookingService } = await bookingModule;
  const sent = [];
  const submit = createBookingService({ inbox: 'fixed@example.com', send: async (email, key) => { sent.push([email, key]); return { id: String(sent.length) }; } });
  const input = enquiry();
  const result = await submit(input);
  assert.equal(result.body.result, 'accepted');
  assert.deepEqual(result.body.details, { name: input.name, phone: input.phone, email: input.email, people: 2, date: input.date, start: input.start, end: input.end, extra: input.extra });
  assert.equal(sent.length, 2);
  assert.deepEqual(sent.map(([email]) => email.to), [['fixed@example.com'], ['customer@example.org']]);
  assert.deepEqual(sent.map(([email]) => email.reply_to), ['customer@example.org', 'fixed@example.com']);
  assert.ok(sent.every(([email]) => email.from.includes('@mail.phuket-shooters.com')));
  assert.notEqual(sent[0][1], sent[1][1]);
  assert.ok(sent[0][0].html.includes('&lt;script&gt;'));
  assert.ok(!sent[0][0].html.includes('<script>'));
  assert.match(sent[1][0].html, /does not confirm a booking/);
  assert.equal((await submit(input)).body.result, 'accepted');
  assert.equal(sent.length, 2);
});

test('partial success retries only the missing email', async () => {
  const { createBookingService } = await bookingModule;
  const keys = [];
  let fail = true;
  const submit = createBookingService({ inbox: 'fixed@example.com', send: async (_email, key) => {
    keys.push(key);
    if (key.endsWith('acknowledgement') && fail) throw new Error('temporary');
    return { id: 'accepted' };
  } });
  const input = enquiry();
  assert.equal((await submit(input)).body.result, 'partial');
  fail = false;
  assert.equal((await submit(input)).body.result, 'accepted');
  assert.equal(keys.length, 3);
  assert.equal(keys[1], keys[2]);
});

test('failed requests can retry; changed payloads and invalid fields cannot send', async () => {
  const { createBookingService } = await bookingModule;
  let sends = 0;
  let fail = true;
  const submit = createBookingService({ inbox: 'fixed@example.com', send: async () => { sends++; if (fail) throw Error('temporary'); return { id: 'accepted' }; } });
  const input = enquiry();
  assert.equal((await submit(input)).body.result, 'failed');
  assert.equal((await submit({ ...input, name: 'Changed' })).status, 409);
  assert.equal((await submit({ ...input, agree: false })).status, 400);
  assert.equal((await submit({ ...input, date: '2024-01-01' })).status, 400);
  assert.equal((await submit({ ...input, start: '18:00', end: '18:00' })).status, 400);
  assert.equal(sends, 2);
  fail = false;
  assert.equal((await submit(input)).body.result, 'accepted');
  assert.equal(sends, 4);
});

test('concurrent repeats share one in-flight send', async () => {
  const { createBookingService } = await bookingModule;
  let sends = 0;
  const submit = createBookingService({ inbox: 'fixed@example.com', send: async () => { sends++; await new Promise(resolve => setTimeout(resolve, 5)); return { id: 'accepted' }; } });
  const input = enquiry();
  const results = await Promise.all([submit(input), submit(input)]);
  assert.deepEqual(results.map(result => result.body.result), ['accepted', 'accepted']);
  assert.equal(sends, 2);
});

test('consumer receipts use the selected language and escape submitted text', async () => {
  const { createBookingService } = await bookingModule;
  for (const [lang, subject] of Object.entries({ en: 'Your booking enquiry was received', th: 'เราได้รับคำสอบถามของคุณแล้ว', zh: '我们已收到您的预约咨询', ar: 'تم استلام استفسارك بشأن الحجز', ru: 'Ваш запрос на бронирование получен' })) {
    const sent = [];
    const submit = createBookingService({ inbox: 'staff@example.org', send: async email => { sent.push(email); return { id: String(sent.length) }; } });
    assert.equal((await submit({ ...enquiry(), lang })).status, 200);
    assert.equal(sent[1].subject, subject);
    assert.match(sent[1].html, new RegExp(`<html lang="${lang}"`));
    if (lang === 'ar') assert.match(sent[1].html, /dir="rtl"/);
    assert.match(sent[1].html, /&lt;script&gt;/);
    assert.deepEqual(sent[0].to, ['staff@example.org']);
  }
});

test('group requests send staff and localized customer receipts with validated details', async () => {
  const { createGroupService, validateGroup } = await bookingModule;
  const group = lang => ({ submissionId: crypto.randomUUID(), lang, company: 'Tour <Co>', name: 'Agent', email: 'customer@example.org', phone: '+66 81 123 4567', date: date(), time: '10:30', visitors: '40', coaches: '2', activities: 'Archery', questions: '<script>alert(1)</script>' });
  for (const [lang, subject] of Object.entries({ en: 'Your group request was received', th: 'เราได้รับคำขอสำหรับกรุ๊ปของคุณแล้ว', zh: '我们已收到您的团体预约申请' })) {
    const sent = [];
    const submit = createGroupService({ inbox: 'staff@example.org', send: async (email, key) => { sent.push([email, key]); return { id: String(sent.length) }; } });
    const input = group(lang);
    const response = await submit(input);
    assert.equal(response.status, 200);
    assert.equal(response.body.details.visitors, 40);
    assert.equal(response.body.details.coaches, 2);
    assert.deepEqual(sent.map(([email]) => email.to), [['staff@example.org'], ['customer@example.org']]);
    assert.equal(sent[1][0].subject, subject);
    assert.match(sent[1][0].html, /&lt;script&gt;/);
    assert.ok(!sent[1][0].html.includes('<script>'));
    assert.notEqual(sent[0][1], sent[1][1]);
    assert.equal((await submit(input)).status, 200);
    assert.equal(sent.length, 2);
  }
  assert.equal(validateGroup({ ...group('en'), date: '2020-01-01' }), null);
  assert.equal(validateGroup({ ...group('en'), lang: 'ru' }), null);
  assert.equal(validateGroup({ ...group('en'), visitors: '0' }), null);
  assert.equal(validateGroup({ ...group('en'), coaches: '-1' }), null);
});
