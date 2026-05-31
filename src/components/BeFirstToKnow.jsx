import { Box, Typography } from '@mui/material'
import { Mail } from 'lucide-react'
import EmailCapture from './EmailCapture.jsx'

export default function BeFirstToKnow() {
  return (
    <section className="mx-auto max-w-container px-5 pb-20 sm:px-8">
      <Box
        sx={{
          borderRadius: '18px',
          border: '1px solid',
          borderColor: 'divider',
          p: { xs: 3, sm: 5 },
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { lg: 'center' },
          gap: { xs: 3, lg: 5 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2.5,
            flex: 1,
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: '1px solid',
              borderColor: 'divider',
              display: 'grid',
              placeItems: 'center',
              color: 'text.primary',
            }}
          >
            <Mail size={26} strokeWidth={1.6} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1.35rem', mb: 0.5 }}>
              Be the First to Know
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', lineHeight: 1.55, maxWidth: 360 }}
            >
              Presspaper is launching. Sign up to receive early access and
              important updates.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: '100%', maxWidth: { lg: 440 } }}>
          <EmailCapture buttonLabel="Get Updates" />
        </Box>
      </Box>
    </section>
  )
}
