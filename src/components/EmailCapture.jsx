import { useState } from 'react'
import {
  Box,
  InputBase,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material'
import { Check, Lock } from 'lucide-react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EmailCapture({
  buttonLabel = 'Get Updates',
  showPrivacy = true,
  className = '',
}) {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('') // bot trap
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return

    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, company: honeypot }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
      setMessage("You're on the list — check your inbox for a welcome note.")
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Could not subscribe. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <Box className={className}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 2,
            py: 1.75,
            borderRadius: '12px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'action.hover',
          }}
        >
          <Check size={18} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {message}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box component="form" onSubmit={submit} noValidate className={className}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 0.75,
          p: 0.75,
          borderRadius: '12px',
          border: '1px solid',
          borderColor: status === 'error' ? 'error.main' : 'divider',
          bgcolor: 'background.default',
          transition: 'border-color 0.2s ease',
        }}
      >
        <InputBase
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder="Enter your email address"
          inputProps={{ 'aria-label': 'Email address' }}
          sx={{
            flex: 1,
            px: 1.5,
            fontSize: 15,
            color: 'text.primary',
            '& input::placeholder': { color: 'text.secondary', opacity: 1 },
          }}
        />

        {/* Honeypot — hidden from humans, tempting to bots */}
        <InputBase
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            left: '-9999px',
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={status === 'loading'}
          sx={{ px: 2.5, whiteSpace: 'nowrap', minWidth: 130 }}
        >
          {status === 'loading' ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            buttonLabel
          )}
        </Button>
      </Box>

      {status === 'error' && (
        <Typography
          variant="caption"
          color="error"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        >
          {message}
        </Typography>
      )}

      {showPrivacy && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            mt: 1.5,
            color: 'text.secondary',
          }}
        >
          <Lock size={13} />
          <Typography variant="caption">
            We respect your privacy. No spam, ever.
          </Typography>
        </Box>
      )}
    </Box>
  )
}
