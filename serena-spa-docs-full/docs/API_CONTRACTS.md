# API_CONTRACTS.md — Booking and Contact API

## POST /api/booking
Creates a booking request. MVP does not take payment.

### Request
```json
{
  "serviceSlug": "serena-signature-massage",
  "serviceName": "Serena Signature Massage",
  "duration": "90 mins",
  "date": "2026-07-24",
  "time": "14:30",
  "people": 2,
  "name": "Guest Name",
  "phone": "+84935011151",
  "email": "guest@example.com",
  "note": "Prefer couple room"
}
```

### Validation
- serviceSlug required
- date required
- time required
- people min 1 max 10
- name required min 2 characters
- phone required
- email optional but valid if present
- note max 500 characters

### Success Response
```json
{
  "ok": true,
  "bookingId": "BK-20260526-001",
  "message": "Booking request received. Serena Spa will confirm shortly."
}
```

### Error Response
```json
{
  "ok": false,
  "message": "Please check your booking details."
}
```

## Notification Content
Send to staff:
- Booking ID
- Service
- Date/time
- People
- Customer name
- Phone
- Email
- Note
- Source page

## Anti-Spam
- Honeypot field
- Rate limit by IP
- Server-side validation
- Optional Turnstile later

## POST /api/contact
Fields:
- name
- phone/email
- message
- source page
