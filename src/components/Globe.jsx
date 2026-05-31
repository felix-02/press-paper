import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

/**
 * Lightweight WebGL dotted globe (cobe, ~6kb).
 * Rendered monochrome to match the Presspaper brand.
 */
export default function Globe({ dark = true, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    let phi = 0
    let width = 0
    const canvas = canvasRef.current
    if (!canvas) return

    const onResize = () => {
      width = canvas.offsetWidth
    }
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.18,
      dark: dark ? 1 : 0,
      diffuse: dark ? 1.2 : 1.6,
      mapSamples: 17000,
      mapBrightness: dark ? 6.5 : 2.2,
      baseColor: dark ? [1, 1, 1] : [0.28, 0.28, 0.3],
      markerColor: dark ? [0.92, 0.92, 0.95] : [0.15, 0.15, 0.18],
      glowColor: dark ? [0.05, 0.05, 0.06] : [1, 1, 1],
      markers: [
        { location: [40.71, -74.0], size: 0.04 }, // New York
        { location: [51.5, -0.12], size: 0.04 }, // London
        { location: [28.61, 77.2], size: 0.05 }, // Delhi
        { location: [35.68, 139.69], size: 0.04 }, // Tokyo
        { location: [-33.86, 151.2], size: 0.03 }, // Sydney
        { location: [-23.55, -46.63], size: 0.03 }, // SÃ£o Paulo
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.0035
        state.width = width * 2
        state.height = width * 2
      },
    })

    // Fade in once the first frame is painted.
    requestAnimationFrame(() => {
      if (canvas) canvas.style.opacity = '1'
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [dark])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: '1',
        opacity: 0,
        transition: 'opacity 1s ease',
        contain: 'layout paint size',
      }}
    />
  )
}
