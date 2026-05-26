# Booking & Contact Flow

## MVP booking flow
```txt
User clicks Book Now
→ Booking form/page
→ User submits service/date/time/name/phone
→ Website shows success message
→ Team receives email/Telegram/Google Sheet
→ Team confirms via WhatsApp/Zalo/Kakao/phone
```

## Direct contact flow
Floating buttons:
- Zalo
- WhatsApp
- Call
- Messenger or KakaoTalk

## Booking fields
Required:
- service
- date
- time
- number of guests
- name
- phone

Optional:
- email
- preferred therapist
- special request
- language
- hotel pickup note if relevant later

## Success message
“Thank you. Your booking request has been received. Serena Spa will confirm your appointment shortly via WhatsApp/Zalo/KakaoTalk.”

## Backend recommendation
- API route: `/api/bookings`
- Validate with zod
- Send email via Resend
- Store in Supabase or Google Sheet
- Send Telegram notification optional

## Anti-spam
- Honeypot field
- Rate limit API route
- reCAPTCHA/Turnstile optional
