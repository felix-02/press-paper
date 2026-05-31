/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Disable preflight so Tailwind's reset doesn't fight MUI's <CssBaseline />.
  // MUI handles the base reset; Tailwind handles layout + utilities.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        paper: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1120px',
      },
    },
  },
  plugins: [],
}
