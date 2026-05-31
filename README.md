# Presspaper — Coming Soon Landing Page

A landing page for Presspaper with email early-access capture and a contact form.
When someone submits their email, they instantly receive a branded "stay tuned"
welcome email. Built to run **entirely on free tiers** for your target of ~500
signups/month.

**Stack:** React (Vite) · MUI · Tailwind CSS · React Router · Resend · Vercel

---

## What's included

- **Landing page** (`/`) — hero, "What is it" features, "Who it's for", a "Be the
  first to know" CTA, and footer. Light + dark themes with a toggle (dark by default).
- **Contact page** (`/contact`) — info column + working contact form.
- **Email autoresponder** — every signup gets a welcome email; every contact
  message is forwarded to your inbox and the sender gets an acknowledgement.
- Animated dotted globe (`cobe`), spam honeypots, and full client-side validation.

```
src/
  components/   Navbar, Hero, Globe, EmailCapture, FeatureCard, WhatIsIt,
                WhoItsFor, BeFirstToKnow, Footer, ContactForm
  pages/        LandingPage, ContactPage
  theme/        MUI light/dark theme
api/            Vercel serverless functions
  subscribe.js  email signup → welcome email + (optional) add to mailing list
  contact.js    contact form → notify you + acknowledge sender
  _lib/         shared HTML email templates
```

---

## 1. Run locally

```bash
npm install
cp .env.example .env      # then fill in your Resend key (see step 2)
```

Two ways to run:

```bash
# Frontend only (fast). The /api email calls won't work here.
npm run dev

# Full app incl. the email API (recommended). Requires the Vercel CLI.
npm i -g vercel
vercel dev
```

> The email features live in `/api`, which only runs under `vercel dev` locally
> (or in production). `npm run dev` is fine for UI work.

---

## 2. Set up email (Resend — free)

1. Create an account at **https://resend.com**.
2. Create an API key at **API Keys → Create**. Put it in `.env` as `RESEND_API_KEY`.
3. **Verify your domain** (required to email real users):
   - Resend → **Domains → Add Domain** → enter `presspaper.ai`.
   - Add the shown DNS records (SPF/DKIM) at your domain registrar.
   - Once verified, set `FROM_EMAIL="Presspaper <hello@presspaper.ai>"`.

   ⚠️ **Until a domain is verified**, Resend's sandbox sender
   (`onboarding@resend.dev`) can only deliver to the email address you registered
   with. So verify the domain before launch, or test with your own email first.
4. **(Optional) Collect a mailing list:** Resend → **Audiences → Create**, copy the
   Audience ID into `RESEND_AUDIENCE_ID`. Every signup is then saved there so you
   can email everyone when you launch.

**Free-tier headroom:** Resend gives 3,000 emails/month and 100/day. At 500
signups/month you'll use ~500 welcome emails — comfortably free. Vercel's Hobby
plan (free) covers the hosting and serverless functions.

---

## 3. Deploy to Vercel (free)

**Easiest — via GitHub:**

1. Push this folder to a GitHub repo.
2. Go to **vercel.com → Add New → Project** and import the repo.
   Vercel auto-detects Vite (build `npm run build`, output `dist`).
3. In **Project → Settings → Environment Variables**, add:
   `RESEND_API_KEY`, `FROM_EMAIL`, `CONTACT_TO_EMAIL`, and optionally
   `RESEND_AUDIENCE_ID` (same values as your `.env`).
4. **Deploy.** Done.

**Or via CLI:**

```bash
vercel            # preview deploy
vercel --prod     # production deploy
# add env vars: vercel env add RESEND_API_KEY  (repeat for the others)
```

---

## Customizing

- **Copy / sections:** edit the components in `src/components/`.
- **Colors / fonts:** `src/theme/theme.js` (MUI palette) and `tailwind.config.js`.
- **Email content/design:** `api/_lib/templates.js`.
- **Globe look:** tweak the `cobe` params in `src/components/Globe.jsx`.
- **Legal links** (Privacy/Terms/Cookie) are placeholders (`href="#"`) — point
  them at real pages when ready.

## Abuse protection

Forms include hidden honeypot fields that silently drop bot submissions. If you
ever get hit with spam, add a free **Cloudflare Turnstile** captcha to the forms.
