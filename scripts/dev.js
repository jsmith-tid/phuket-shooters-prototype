const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
require('./build');

const root = path.resolve(__dirname, '../dist');
const port = Number(process.env.PORT || 8080);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8' };
const inbox = (process.env.BOOKING_STAFF_INBOX === undefined ? process.env.RESEND_TEST_INBOX : process.env.BOOKING_STAFF_INBOX)?.trim();
let apiKey = process.env.RESEND_API_KEY?.trim();
if (!apiKey && process.env.RESEND_API_KEY_FILE) apiKey = fs.readFileSync(process.env.RESEND_API_KEY_FILE, 'utf8').trim();
if ((apiKey && !inbox) || (!apiKey && inbox)) throw new Error('Set both a Resend API key and BOOKING_STAFF_INBOX, or neither.');
if (inbox && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inbox)) throw new Error('BOOKING_STAFF_INBOX must be an email address.');

const send = async (email, idempotencyKey) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(email),
    signal: AbortSignal.timeout(12000)
  });
  if (!response.ok) throw new Error(`Resend rejected email: HTTP ${response.status}`);
  return response.json();
};
let submitBooking = null;
let submitGroup = null;
const json = (res, status, body) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(JSON.stringify(body)); };

async function handleBooking(req, res, submit) {
  if (req.method !== 'POST') return json(res, 405, { result: 'method_not_allowed' });
  if (!submit) return json(res, 503, { result: 'unavailable' });
  if (req.headers.origin !== `http://127.0.0.1:${port}`) return json(res, 403, { result: 'forbidden' });
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return json(res, 415, { result: 'invalid_type' });
  if (Number(req.headers['content-length'] || 0) > 8192) return json(res, 413, { result: 'too_large' });
  let body = '';
  try {
    for await (const chunk of req) {
      body += chunk;
      if (Buffer.byteLength(body) > 8192) return json(res, 413, { result: 'too_large' });
    }
    const result = await submit(JSON.parse(body));
    json(res, result.status, result.body);
  } catch { json(res, 400, { result: 'invalid' }); }
}

import('./booking-email.mjs').then(({ createBookingService, createGroupService }) => {
submitBooking = apiKey ? createBookingService({ send, inbox, sender: process.env.RESEND_FROM_EMAIL?.trim() || undefined }) : null;
submitGroup = apiKey ? createGroupService({ send, inbox, sender: process.env.RESEND_FROM_EMAIL?.trim() || undefined }) : null;
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, `http://127.0.0.1:${port}`).pathname); }
  catch { res.writeHead(400); return res.end(); }
  if (pathname === '/api/booking-mode') return req.method === 'GET' ? json(res, 200, { enabled: Boolean(submitBooking) }) : json(res, 405, { result: 'method_not_allowed' });
  if (pathname === '/api/booking-enquiry') return void handleBooking(req, res, submitBooking);
  if (pathname === '/api/group-enquiry') return void handleBooking(req, res, submitGroup);
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  let file = path.resolve(root, `.${pathname}`);
  if (!path.extname(file)) file = path.join(file, 'index.html');
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404); return res.end('Not found'); }
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    if (req.method === 'HEAD') return res.end();
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log(`Local preview: http://127.0.0.1:${port}${submitBooking ? ' (Resend test enabled)' : ''}`));
}).catch(error => { console.error(error); process.exitCode = 1; });
