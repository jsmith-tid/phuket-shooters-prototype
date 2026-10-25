const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const hostedModule = import('../src/booking-hosted.mjs');
const workerModule = import('../worker/index.mjs');

const origin = 'https://prototype.example';
const enabled = {
  BOOKING_EMAIL_ENABLED: 'true', RESEND_API_KEY: 'test-key', RESEND_TEST_INBOX: 'staff@example.org',
  BOOKING_ALLOWED_EMAILS: 'first@example.org, second@example.org'
};
const today = () => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};
const input = () => ({ submissionId: randomUUID(), people: '2', date: today(), start: '10:00', end: '11:00', name: 'Test Customer', phone: '+66 81 123 4567', email: 'first@example.org', extra: 'Two beginners', agree: true });
const context = (payload, env = enabled, headers = {}) => ({
  env,
  request: new Request(`${origin}/api/booking-enquiry`, {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers },
    body: typeof payload === 'string' ? payload : JSON.stringify(payload)
  })
});

test('hosted mode is disabled until every test setting is present', async () => {
  const { bookingConfig, bookingMode } = await hostedModule;
  assert.equal(bookingConfig({ ...enabled, BOOKING_EMAIL_ENABLED: 'false' }), null);
  assert.equal(bookingConfig({ ...enabled, BOOKING_ALLOWED_EMAILS: '' }), null);
  assert.equal(bookingConfig({ ...enabled, RESEND_API_KEY: '' }), null);
  assert.deepEqual(await (await bookingMode({ env: enabled })).json(), { enabled: true });
  assert.deepEqual(await (await bookingMode({ env: {} })).json(), { enabled: false });
});

test('valid hosted request sends two emails and returns submitted details', async () => {
  const { handleBooking } = await hostedModule;
  const sent = [];
  const fakeFetch = async (url, options) => { sent.push({ url, options }); return Response.json({ id: `email-${sent.length}` }); };
  const response = await handleBooking(context(input()), fakeFetch);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const body = await response.json();
  assert.equal(body.result, 'accepted');
  assert.equal(body.details.email, 'first@example.org');
  assert.deepEqual(sent.map(item => JSON.parse(item.options.body).to), [['staff@example.org'], ['first@example.org']]);
  assert.ok(sent.every(item => item.url === 'https://api.resend.com/emails' && item.options.headers.Authorization === 'Bearer test-key'));
  assert.notEqual(sent[0].options.headers['Idempotency-Key'], sent[1].options.headers['Idempotency-Key']);
});

test('hosted route rejects unavailable, cross-origin, malformed, oversized and non-allowlisted requests before sending', async () => {
  const { handleBooking } = await hostedModule;
  let sends = 0;
  const fakeFetch = async () => { sends++; return Response.json({ id: String(sends) }); };
  assert.equal((await handleBooking(context(input(), { ...enabled, BOOKING_EMAIL_ENABLED: 'false' }), fakeFetch)).status, 503);
  assert.equal((await handleBooking(context(input(), enabled, { Origin: 'https://other.example' }), fakeFetch)).status, 403);
  assert.equal((await handleBooking(context(input(), enabled, { 'Content-Type': 'text/plain' }), fakeFetch)).status, 415);
  assert.equal((await handleBooking(context('{not json}'), fakeFetch)).status, 400);
  assert.equal((await handleBooking(context('null'), fakeFetch)).status, 400);
  assert.equal((await handleBooking(context('x'.repeat(9000)), fakeFetch)).status, 413);
  assert.equal((await handleBooking(context({ ...input(), email: 'unknown@example.org' }), fakeFetch)).status, 403);
  assert.equal((await handleBooking(context({ ...input(), agree: false }), fakeFetch)).status, 400);
  assert.equal(sends, 0);
});

test('provider failure stays retryable and partial send is not called a success', async () => {
  const { handleBooking } = await hostedModule;
  const sent = [];
  const fakeFetch = async (_url, options) => {
    sent.push(options.headers['Idempotency-Key']);
    if (sent.length === 2) return Response.json({ error: 'temporary' }, { status: 503 });
    return Response.json({ id: `email-${sent.length}` });
  };
  const payload = input();
  const first = await handleBooking(context(payload), fakeFetch);
  assert.equal(first.status, 207);
  assert.deepEqual(await first.json(), { result: 'partial' });
  const second = await handleBooking(context(payload), fakeFetch);
  assert.equal(second.status, 200);
  assert.equal((await second.json()).result, 'accepted');
  assert.equal(sent[0], sent[2]);
  assert.equal(sent[1], sent[3]);
});

test('Worker routes booking requests and delegates ordinary pages to static assets', async () => {
  const { default: worker } = await workerModule;
  let assetRequests = 0;
  const env = { ASSETS: { fetch: async () => { assetRequests++; return new Response('static page'); } } };
  const mode = await worker.fetch(new Request(`${origin}/api/booking-mode`), env);
  assert.deepEqual(await mode.json(), { enabled: false });
  assert.equal((await worker.fetch(new Request(`${origin}/api/booking-mode`, { method: 'POST' }), env)).status, 405);
  assert.equal((await worker.fetch(new Request(`${origin}/api/booking-enquiry`), env)).status, 405);
  assert.equal((await worker.fetch(new Request(`${origin}/api/group-enquiry`), env)).status, 405);
  const page = await worker.fetch(new Request(`${origin}/book/`), env);
  assert.equal(await page.text(), 'static page');
  assert.equal(assetRequests, 1);
});

test('hosted group endpoint uses the existing inbox and allowlist', async () => {
  const { handleGroup } = await hostedModule;
  const payload = { submissionId: randomUUID(), lang: 'zh', company: 'Operator', name: 'Agent', email: 'first@example.org', phone: '', date: today(), time: '10:00', visitors: '40', coaches: '2', activities: '', questions: '' };
  const sent = [];
  const fakeFetch = async (_url, options) => { sent.push(JSON.parse(options.body)); return Response.json({ id: String(sent.length) }); };
  assert.equal((await handleGroup(context(payload), fakeFetch)).status, 200);
  assert.deepEqual(sent.map(message => message.to), [['staff@example.org'], ['first@example.org']]);
  assert.match(sent[1].subject, /团体/);
  assert.equal((await handleGroup(context({ ...payload, submissionId: randomUUID(), email: 'other@example.org' }), fakeFetch)).status, 403);
  assert.equal((await handleGroup(context(payload, { ...enabled, BOOKING_EMAIL_ENABLED: 'false' }), fakeFetch)).status, 503);
  assert.equal(sent.length, 2);
});
