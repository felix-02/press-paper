import { Resend } from 'resend'
import { welcomeEmail } from './_lib/templates.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Robust body parsing (Vercel usually parses JSON, but be defensive).
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  body = body || {}

  const email = String(body.email || '').trim().toLowerCase()
  const honeypot = String(body.company || '').trim()

  // Bot trap: silently accept and drop.
  if (honeypot) return res.status(200).json({ ok: true })

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Email service is not configured yet.' })
  }

  const resend = new Resend(apiKey)
  const from = process.env.FROM_EMAIL || 'Presspaper <onboarding@resend.dev>'

  try {
    // 1) Send the welcome / stay-tuned email.
    const { subject, html } = welcomeEmail()
    const { error } = await resend.emails.send({ from, to: email, subject, html })
    if (error) throw new Error(error.message || 'Failed to send email')

    // 2) Optionally store the contact in a Resend Audience (your mailing list).
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      try {
        await resend.contacts.create({ email, audienceId, unsubscribed: false })
      } catch (e) {
        // Don't fail the signup if list-add fails (e.g. duplicate).
        console.warn('contacts.create warning:', e?.message)
      }
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('subscribe error:', err)
    return res.status(500).json({ error: 'Could not subscribe right now. Please try again.' })
  }
}
