import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import {
  SiInstagram,
  SiSnapchat,
  SiTiktok,
  SiX,
  SiYoutube,
} from 'react-icons/si'

const SOCIALS = [
  { icon: SiInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: SiSnapchat, label: 'Snapchat', href: 'https://snapchat.com' },
  { icon: SiTiktok, label: 'TikTok', href: 'https://tiktok.com' },
  { icon: SiX, label: 'X', href: 'https://x.com' },
  { icon: SiYoutube, label: 'YouTube', href: 'https://youtube.com' },
]

function FooterLink({ children, to, href }) {
  const sx = {
    color: 'text.secondary',
    fontSize: '0.9rem',
    textDecoration: 'none',
    '&:hover': { color: 'text.primary' },
    display: 'block',
    mb: 1,
  }
  if (to) {
    return (
      <Box component={Link} to={to} sx={sx}>
        {children}
      </Box>
    )
  }
  return (
    <Box component="a" href={href} sx={sx}>
      {children}
    </Box>
  )
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ borderTop: '1px solid', borderColor: 'divider' }}
    >
      <div className="mx-auto max-w-container px-5 py-12 sm:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', mb: 1.5 }}>
              Presspaper
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', maxWidth: 240, lineHeight: 1.55 }}
            >
              Building the world&apos;s most trusted public information
              infrastructure.
            </Typography>
          </div>

          <div>
            <Typography
              sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.75 }}
            >
              Company
            </Typography>
            <FooterLink to="/contact">Contact</FooterLink>
          </div>

          <div>
            <Typography
              sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.75 }}
            >
              Legal
            </Typography>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
          </div>

          <div>
            <Typography
              sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.75 }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.25 }}>
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <Box
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'text.secondary',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'text.primary',
                      borderColor: 'text.primary',
                    },
                  }}
                >
                  <Icon size={16} />
                </Box>
              ))}
            </Box>
          </div>
        </div>
      </div>

      <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: 'text.secondary',
            py: 2.5,
          }}
        >
          © 2026 Presspaper. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}
