import { Box, Typography } from '@mui/material'
import {
  Building2,
  Mic,
  Scale,
  Briefcase,
  BarChart3,
  GraduationCap,
  CandlestickChart,
  UsersRound,
} from 'lucide-react'

const AUDIENCES = [
  { icon: Building2, label: 'Businesses' },
  { icon: Mic, label: 'Journalists' },
  { icon: Scale, label: 'Legal Professionals' },
  { icon: Briefcase, label: 'Policy Makers' },
  { icon: BarChart3, label: 'Researchers' },
  { icon: GraduationCap, label: 'Students' },
  { icon: CandlestickChart, label: 'Traders' },
  { icon: UsersRound, label: 'Global Citizens' },
]

export default function WhoItsFor() {
  return (
    <section className="mx-auto max-w-container px-5 py-16 sm:px-8 sm:py-20">
      <div className="mb-10 text-center sm:mb-12">
        <Typography
          sx={{
            color: 'text.secondary',
            letterSpacing: '0.18em',
            fontSize: '0.75rem',
            fontWeight: 600,
            mb: 1.5,
          }}
        >
          WHO IT'S FOR
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.6rem', sm: '2rem' },
            letterSpacing: '-0.01em',
          }}
        >
          Built for Professionals. Useful for Everyone.
        </Typography>
      </div>

      <div className="grid grid-cols-2 gap-y-9 sm:grid-cols-4 lg:grid-cols-8">
        {AUDIENCES.map(({ icon: Icon, label }) => (
          <Box
            key={label}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.25,
              color: 'text.primary',
              transition: 'opacity 0.2s ease',
              '&:hover': { opacity: 0.7 },
            }}
          >
            <Icon size={26} strokeWidth={1.6} />
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 500, px: 1 }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </div>
    </section>
  )
}
