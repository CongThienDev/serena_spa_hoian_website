# SECURITY.md — Security Rules

## Booking Form
- Validate on client and server.
- Never trust client data.
- Add honeypot spam field.
- Rate limit booking API.
- Do not expose API keys to client.

## Environment Variables
- Server secrets must not use `NEXT_PUBLIC_`.
- Store in Vercel environment settings.

## CMS
- Use read-only token for public data when possible.
- Never expose write tokens.

## External Links
- Use safe links.
- Add `rel="noopener noreferrer"` for target blank.

## User Data
Booking data includes personal information.
- Do not log full customer details unnecessarily.
- Do not store data unless needed.
- Add privacy policy.

## Future
- Add Cloudflare Turnstile if spam increases.
- Add WAF/CDN protections if needed.
