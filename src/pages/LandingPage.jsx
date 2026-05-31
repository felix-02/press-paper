import { Box } from '@mui/material'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import WhatIsIt from '../components/WhatIsIt.jsx'
import WhoItsFor from '../components/WhoItsFor.jsx'
import BeFirstToKnow from '../components/BeFirstToKnow.jsx'
import Footer from '../components/Footer.jsx'

export default function LandingPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <WhatIsIt />
          <WhoItsFor />
          <BeFirstToKnow />
        </Box>
      </main>
      <Footer />
    </Box>
  )
}
