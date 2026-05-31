import { Box, Typography } from '@mui/material'
import { Clock } from 'lucide-react'
import EmailCapture from './EmailCapture.jsx'
import Globe from './Globe.jsx'
import { useColorMode } from '../context/ColorModeContext.jsx'

export default function Hero() {
  const { mode } = useColorMode()

  return (
    <section className="mx-auto max-w-container px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
        {/* Left: copy + capture */}
        <div className="fade-up order-2 lg:order-1">
          <Typography
            component="h1"
            className="display-heading"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.6rem', sm: '3.4rem', md: '3.9rem' },
              mb: 2.5,
            }}
          >
            The Source of Truth
            <br />
            in a Digital World
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', sm: '1.05rem' },
              maxWidth: 460,
              lineHeight: 1.6,
              mb: 3.5,
            }}
          >
            Presspaper is a global public information platform that centralizes
            and delivers verified updates from official institutional sources.
          </Typography>

          {/* Launching Soon pill */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.75,
              py: 1,
              mb: 3,
              borderRadius: '10px',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Clock size={15} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Launching Soon
            </Typography>
          </Box>

          <Box id="signup" sx={{ maxWidth: 480, scrollMarginTop: 96 }}>
            <EmailCapture buttonLabel="Get Updates" />
          </Box>
        </div>

        {/* Right: globe */}
        <div className="order-1 lg:order-2">
          <div className="mx-auto aspect-square w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px]">
            <Globe dark={mode === 'dark'} />
          </div>
        </div>
      </div>
    </section>
  )
}
