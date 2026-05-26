# BOOKING_FLOW.md — Booking UX Specification

## Primary Booking Flow
1. User clicks Book Now.
2. Booking form opens or navigates to booking page.
3. User selects service.
4. User selects duration/date/time.
5. User enters name and phone.
6. User submits.
7. Success message appears.
8. Staff receives notification.
9. Staff confirms manually via WhatsApp/Zalo/phone.

## Booking Entry Points
- Header button
- Hero button
- Floating contact widget
- Service card CTA
- Service detail sticky form
- Blog CTA
- Contact page

## Booking Form UI
Desktop:
- Right-side booking panel on service detail.
- Dedicated full booking page.

Mobile:
- Sticky bottom Book Now CTA.
- Full-screen booking drawer or page.

## Confirmation Message
“Thank you. Your booking request has been received. Serena Spa will contact you shortly to confirm your appointment.”

## Staff Notification Format
```txt
New Booking Request
Service: Serena Signature Massage
Duration: 90 mins
Date: 2026-07-24
Time: 14:30
People: 2
Name: Guest Name
Phone: +84...
Note: Couple room preferred
Source: /services/serena-signature-massage
```

## No Payment in MVP
Do not implement payment/deposit unless explicitly requested later.
