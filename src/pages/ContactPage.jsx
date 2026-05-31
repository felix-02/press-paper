import { Box, Typography, Divider } from '@mui/material'
import { Mail, Clock, ShieldCheck } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Globe from '../components/Globe.jsx'
import { useColorMode } from '../context/ColorModeContext.jsx'

const INFO = [
  {
    icon: Mail,
    title: 'Email Us',
    body: 'hello@presspaper.ai',
  },
  {
    icon: Clock,
    title: 'Response Time',
    body: 'We typically respond within 1–2 business days.',
  },
  {
    icon: ShieldCheck,
    title: 'Your Privacy Matters',
    body: 'All messages are treated with the strictest confidentiality. We will never share your information.',
  },
]

export default function ContactPage() {
  const { mode } = useColorMode()

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="mx-auto grid max-w-container gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
          {/* Left: info */}
          <div className="relative z-10">
            <Typography
              sx={{
                color: 'text.secondary',
                letterSpacing: '0.18em',
                fontSize: '0.75rem',
                fontWeight: 600,
                mb: 2,
              }}
            >
              CONTACT US
            </Typography>
            <Typography
              component="h1"
              className="display-heading"
              sx={{ fontWeight: 800, fontSize: { xs: '2.4rem', sm: '3.2rem' }, mb: 2.5 }}
            >
              We&apos;d Love to Hear from You
            </Typography>
            <Typography
              sx={{ color: 'text.secondary', maxWidth: 360, lineHeight: 1.6, mb: 4 }}
            >
              Have a question, suggestion, or partnership opportunity? Reach out
              — our team will get back to you.
            </Typography>

            <Divider sx={{ maxWidth: 300, mb: 4 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {INFO.map(({ icon: Icon, title, body }) => (
                <Box key={title} sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Icon size={20} strokeWidth={1.7} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{title}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', maxWidth: 280, lineHeight: 1.55 }}
                    >
                      {body}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Decorative globe, bottom-left like the mockup */}
            <div className="pointer-events-none absolute -bottom-40 -left-24 hidden h-[360px] w-[360px] opacity-50 lg:block">
              <Globe dark={mode === 'dark'} />
            </div>
          </div>

          {/* Right: form */}
          <div className="relative z-10">
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </Box>
  )
}
