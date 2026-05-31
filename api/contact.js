import { Resend } from 'resend'
import { contactNotification, contactAck } from './_lib/templates.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  body = body || {}

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim().toLowerCase()
  const subject = String(body.subject || '').trim()
  const message = String(body.message || '').trim()
  const honeypot = String(body.company || '').trim()

  if (honeypot) return res.status(200).json({ ok: true })

  if (!name) return res.status(400).json({ error: 'Please enter your name.' })
  if (!EMAIL_RE.test(email))
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (!message) return res.status(400).json({ error: 'Please enter a message.' })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Email service is not configured yet.' })
  }

  const resend = new Resend(apiKey)
  const from = process.env.FROM_EMAIL || 'Presspaper <onboarding@resend.dev>'
  const to = process.env.CONTACT_TO_EMAIL || 'hello@presspaper.ai'

  try {
    // 1) Notify the Presspaper inbox (reply-to = sender so you can reply directly).
    const notify = contactNotification({ name, email, subject, message })
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: notify.subject,
      html: notify.html,
    })
    if (error) throw new Error(error.message || 'Failed to send email')

    // 2) Acknowledge the sender (best-effort).
    try {
      const ack = contactAck({ name })
      await resend.emails.send({ from, to: email, subject: ack.subject, html: ack.html })
    } catch (e) {
      console.warn('ack email warning:', e?.message)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact error:', err)
    return res.status(500).json({ error: 'Could not send your message. Please try again.' })
  }
}
