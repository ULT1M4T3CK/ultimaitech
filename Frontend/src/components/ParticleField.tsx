import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  opacity: number
  color: string
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000))

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: `hsl(${200 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`
        })
      }
    }

    initParticles()

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(45, 45, 45, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Reset z-depth when particle goes too far
        if (particle.z <= 0 || particle.z >= 1000) {
          particle.z = 500
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }

        // Calculate perspective size and opacity
        const perspective = 1000 / (1000 + particle.z)
        const size = particle.size * perspective
        const opacity = particle.opacity * perspective

        // Draw particle
        ctx.save()
        ctx.globalAlpha = opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = size * 4
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.restore()

        // Draw connections between nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const alpha = (100 - distance) / 100 * 0.3 * perspective
            ctx.save()
            ctx.globalAlpha = alpha
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5 * perspective
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default ParticleField
