import { Box, Typography } from '@mui/material'

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Box
      sx={{
        p: { xs: 3, sm: 3.5 },
        height: '100%',
        borderRadius: '14px',
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'text.secondary',
        },
      }}
    >
      <Box sx={{ mb: 2, color: 'text.primary' }}>
        <Icon size={26} strokeWidth={1.6} />
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 1 }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
      >
        {description}
      </Typography>
    </Box>
  )
}
