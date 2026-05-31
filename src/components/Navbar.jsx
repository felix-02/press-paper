import { Link, useLocation } from 'react-router-dom'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { Sun, Moon } from 'lucide-react'
import { useColorMode } from '../context/ColorModeContext.jsx'

export default function Navbar() {
  const { mode, toggleColorMode } = useColorMode()
  const { pathname } = useLocation()
  const onContact = pathname === '/contact'

  return (
    <Box
      component="header"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'saturate(180%) blur(8px)',
      }}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="text-[22px] font-extrabold tracking-tight no-underline"
          style={{ color: 'inherit' }}
        >
          Presspaper
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <Button
            component={Link}
            to="/contact"
            color="inherit"
            sx={{
              fontWeight: 500,
              color: onContact ? 'text.primary' : 'text.secondary',
              borderBottom: onContact ? '2px solid' : '2px solid transparent',
              borderColor: onContact ? 'text.primary' : 'transparent',
              borderRadius: 0,
              px: 1,
              '&:hover': { color: 'text.primary', bgcolor: 'transparent' },
            }}
          >
            Contact
          </Button>

          <Button
            component="a"
            href="/#signup"
            variant="contained"
            sx={{ px: 2.5 }}
          >
            Get Updates
          </Button>

          <Tooltip title={mode === 'dark' ? 'Switch to light' : 'Switch to dark'}>
            <IconButton
              onClick={toggleColorMode}
              size="small"
              sx={{ color: 'text.secondary' }}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </IconButton>
          </Tooltip>
        </Box>
      </div>
    </Box>
  )
}
