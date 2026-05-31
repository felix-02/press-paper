import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  CircularProgress,
} from '@mui/material'
import { Send, ArrowRight, Lock, Check } from 'lucide-react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Field({ label, children }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        component="label"
        sx={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', mb: 1 }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  )
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'background.default',
    '& fieldset': { borderColor: 'divider' },
  },
}

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '', // honeypot
  })
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return

    if (!form.name.trim()) return fail('Please enter your name.')
    if (!EMAIL_RE.test(form.email.trim()))
      return fail('Please enter a valid email address.')
    if (!form.message.trim()) return fail('Please enter a message.')
    if (!agree) return fail('Please agree to the privacy policy and terms.')

    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
    } catch (err) {
      fail(err.message || 'Could not send your message. Please try again.')
    }
  }

  function fail(msg) {
    setStatus('error')
    setError(msg)
  }

  return (
    <Box
      sx={{
        borderRadius: '18px',
        border: '1px solid',
        borderColor: 'divider',
        p: { xs: 3, sm: 4 },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'divider',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Send size={22} strokeWidth={1.7} />
        </Box>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', sm: '1.8rem' } }}>
          Send Us a Message
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5 }}>
        Fill out the form below and we&apos;ll get back to you.
      </Typography>

      {status === 'success' ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
            p: 3,
            borderRadius: '12px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'action.hover',
          }}
        >
          <Check size={20} />
          <Box>
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
              Message sent
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Thanks for reaching out. We typically respond within 1–2 business
              days.
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box component="form" onSubmit={submit} noValidate>
          <Field label="Full Name">
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your full name"
              value={form.name}
              onChange={update('name')}
              sx={fieldSx}
            />
          </Field>

          <Field label="Email Address">
            <TextField
              fullWidth
              size="small"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={update('email')}
              sx={fieldSx}
            />
          </Field>

          <Field label="Subject">
            <TextField
              fullWidth
              size="small"
              placeholder="Enter the subject"
              value={form.subject}
              onChange={update('subject')}
              sx={fieldSx}
            />
          </Field>

          <Field label="Message">
            <TextField
              fullWidth
              multiline
              minRows={5}
              placeholder="Type your message here..."
              value={form.message}
              onChange={update('message')}
              sx={fieldSx}
            />
          </Field>

          {/* Honeypot */}
          <input
            type="text"
            value={form.company}
            onChange={update('company')}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
          />

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 2.5 }}>
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              size="small"
              sx={{ p: 0.5, mt: '-2px' }}
            />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              I agree to the{' '}
              <Box component="a" href="#" sx={{ color: 'text.primary' }}>
                privacy policy
              </Box>{' '}
              and{' '}
              <Box component="a" href="#" sx={{ color: 'text.primary' }}>
                terms of service
              </Box>
              .
            </Typography>
          </Box>

          {status === 'error' && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1.5 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={status === 'loading'}
            endIcon={status === 'loading' ? null : <ArrowRight size={18} />}
            sx={{ py: 1.5, fontSize: '1rem', mb: 2 }}
          >
            {status === 'loading' ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Send Message'
            )}
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
            <Lock size={13} />
            <Typography variant="caption">
              We respect your privacy. No spam, ever.
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}
