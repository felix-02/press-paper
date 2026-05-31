// Branded, inline-styled HTML emails (inline styles = best email-client support).

const BRAND = '#ffffff'
const BG = '#0a0a0a'
const CARD = '#111111'
const MUTED = '#9b9b9b'
const BORDER = '#262626'

function layout({ title, bodyHtml, preheader = '' }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark light" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:${BG};font-family:'Helvetica Neue',Arial,sans-serif;">
    <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:${CARD};border:1px solid ${BORDER};border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:32px 36px 0;">
                <div style="font-size:22px;font-weight:800;color:${BRAND};letter-spacing:-0.5px;">Presspaper</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 36px 36px;">
                ${bodyHtml}
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
            <tr>
              <td style="padding:24px 36px;text-align:center;color:${MUTED};font-size:12px;line-height:1.6;">
                © 2026 Presspaper. All rights reserved.<br />
                The Source of Truth in a Digital World.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function welcomeEmail() {
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:26px;font-weight:800;color:${BRAND};line-height:1.2;">
      You're on the list.
    </h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#d4d4d4;">
      Thanks for signing up for early access to <strong style="color:${BRAND};">Presspaper</strong> —
      a global public information platform that centralizes and delivers
      <strong style="color:${BRAND};">verified updates from official institutional sources</strong>.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#d4d4d4;">
      We're building infrastructure for information you can trust and updates you can act on:
      real-time, neutral, and preserved as a permanent public record.
    </p>
    <div style="margin:24px 0;padding:16px 20px;border:1px solid ${BORDER};border-radius:12px;background:#0d0d0d;">
      <p style="margin:0;font-size:15px;line-height:1.6;color:${BRAND};font-weight:600;">
        Stay tuned — we'll email you the moment early access opens.
      </p>
    </div>
    <p style="margin:0;font-size:14px;line-height:1.65;color:${MUTED};">
      Have a question in the meantime? Just reply to this email.
    </p>
  `
  return {
    subject: "You're on the list — Presspaper early access",
    html: layout({
      title: 'Welcome to Presspaper',
      preheader: "Thanks for signing up — we'll be in touch when early access opens.",
      bodyHtml,
    }),
  }
}

export function contactNotification({ name, email, subject, message }) {
  const safe = (s) => String(s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:${BRAND};">New contact message</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;color:#d4d4d4;">
      <tr><td style="padding:6px 0;color:${MUTED};width:90px;">Name</td><td style="padding:6px 0;color:${BRAND};">${safe(name)}</td></tr>
      <tr><td style="padding:6px 0;color:${MUTED};">Email</td><td style="padding:6px 0;color:${BRAND};">${safe(email)}</td></tr>
      <tr><td style="padding:6px 0;color:${MUTED};">Subject</td><td style="padding:6px 0;color:${BRAND};">${safe(subject) || '—'}</td></tr>
    </table>
    <div style="margin:20px 0 0;padding:16px 20px;border:1px solid ${BORDER};border-radius:12px;background:#0d0d0d;">
      <p style="margin:0;font-size:14px;line-height:1.65;color:#d4d4d4;white-space:pre-wrap;">${safe(message)}</p>
    </div>
  `
  return {
    subject: `New contact: ${subject || 'No subject'} — from ${name}`,
    html: layout({ title: 'New contact message', bodyHtml }),
  }
}

export function contactAck({ name }) {
  const first = String(name || '').trim().split(' ')[0] || 'there'
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:${BRAND};">Thanks, ${first}.</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#d4d4d4;">
      We've received your message and will get back to you within
      <strong style="color:${BRAND};">1–2 business days</strong>.
    </p>
    <p style="margin:0;font-size:14px;line-height:1.65;color:${MUTED};">— The Presspaper team</p>
  `
  return {
    subject: 'We received your message — Presspaper',
    html: layout({
      title: 'Thanks for contacting Presspaper',
      preheader: "We'll get back to you within 1–2 business days.",
      bodyHtml,
    }),
  }
}
