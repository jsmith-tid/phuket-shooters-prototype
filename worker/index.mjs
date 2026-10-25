import { bookingMode, handleBooking, methodNotAllowed } from '../src/booking-hosted.mjs';

export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    if (pathname === '/api/booking-mode') {
      return request.method === 'GET' ? bookingMode({ request, env }) : methodNotAllowed();
    }
    if (pathname === '/api/booking-enquiry') {
      return request.method === 'POST' ? handleBooking({ request, env }) : methodNotAllowed();
    }
    return env.ASSETS.fetch(request);
  }
};
