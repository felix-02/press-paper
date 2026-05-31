import { createTheme } from '@mui/material/styles'

// Monochrome, dark-first brand to match the Presspaper mockups.
export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: { main: '#ffffff', contrastText: '#0a0a0a' },
            background: { default: '#0a0a0a', paper: '#0e0e0e' },
            text: {
              primary: '#f5f5f5',
              secondary: 'rgba(245,245,245,0.62)',
            },
            divider: 'rgba(255,255,255,0.12)',
          }
        : {
            primary: { main: '#0a0a0a', contrastText: '#ffffff' },
            background: { default: '#ffffff', paper: '#ffffff' },
            text: {
              primary: '#0a0a0a',
              secondary: 'rgba(10,10,10,0.6)',
            },
            divider: 'rgba(10,10,10,0.1)',
          }),
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 10, paddingInline: 20 },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },
    },
  })
