import { Typography } from '@mui/material'
import {
  ShieldCheck,
  Crosshair,
  Globe as GlobeIcon,
  Lock,
  Zap,
  Users,
  FileText,
} from 'lucide-react'
import FeatureCard from './FeatureCard.jsx'

const ROW_ONE = [
  {
    icon: ShieldCheck,
    title: 'Trust First',
    description:
      'We prioritize accuracy and rely on official, verifiable sources.',
  },
  {
    icon: Crosshair,
    title: 'Clarity in Complexity',
    description:
      'We turn complex information into clear, actionable understanding.',
  },
  {
    icon: GlobeIcon,
    title: 'Built for Everyone',
    description:
      'From policymakers to researchers, our infrastructure is for every informed citizen.',
  },
  {
    icon: Lock,
    title: 'Independent & Neutral',
    description:
      'We are not aligned with any agenda—only with the truth and public record.',
  },
]

const ROW_TWO = [
  {
    icon: Zap,
    title: 'Real-Time & Relevant',
    description:
      'Receive important updates as they happen, tailored to the topics that matter to you.',
  },
  {
    icon: Users,
    title: 'Engage with Confidence',
    description:
      'Discuss, react, and share in a space built for real people, not bots.',
  },
  {
    icon: FileText,
    title: 'Permanent Public Record',
    description:
      'A searchable archive of what was said, when it happened—preserved for the public.',
  },
]

export default function WhatIsIt() {
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
          WHAT IS IT
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.6rem', sm: '2rem' },
            letterSpacing: '-0.01em',
          }}
        >
          Information you can trust. Updates you can act on.
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ROW_ONE.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>

      <div className="mx-auto mt-4 grid max-w-[840px] grid-cols-1 gap-4 sm:grid-cols-3">
        {ROW_TWO.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  )
}
