

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState, useCallback, useMemo } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  glowIntensity: number
  twinkleSpeed: number
  category: 'regular' | 'bright' | 'super'
}

export const InteractiveStars = () => {
  const [stars, setStars] = useState<Star[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Optimized spring config
  const springConfig = useMemo(() => ({ damping: 30, stiffness: 400 }), [])
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  // Memoized star generation function
  const generateStars = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    setDimensions({ width, height })
    
    const newStars: Star[] = []
    const starCount = Math.min(200, Math.floor((width * height) / 8000)) // Adaptive star count

    for (let i = 0; i < starCount; i++) {
      const starType = Math.random()
      let size, opacity, glowIntensity, category: Star['category']

      if (starType < 0.8) {
        // Regular stars - 80%
        category = 'regular'
        size = Math.random() * 1.5 + 1
        opacity = Math.random() * 0.4 + 0.3
        glowIntensity = 0
      } else if (starType < 0.95) {
        // Bright stars - 15%
        category = 'bright'
        size = Math.random() * 2 + 1.5
        opacity = Math.random() * 0.3 + 0.5
        glowIntensity = Math.random() * 1.5 + 0.5
      } else {
        // Super bright stars - 5%
        category = 'super'
        size = Math.random() * 2.5 + 2
        opacity = Math.random() * 0.2 + 0.6
        glowIntensity = Math.random() * 2 + 1.5
      }

      newStars.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        opacity,
        speed: Math.random() * 0.4 + 0.1, 
        glowIntensity,
        twinkleSpeed: Math.random() * 1.5 + 1,
        category,
      })
    }
    setStars(newStars)
  }, [])

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Only update if movement is significant
    const threshold = 5
    const deltaX = Math.abs(e.clientX - mouseX.get())
    const deltaY = Math.abs(e.clientY - mouseY.get())
    
    if (deltaX > threshold || deltaY > threshold) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    generateStars()
    
    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(generateStars, 300)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [generateStars])

  useEffect(() => {
    let lastTime = 0
  
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime >= 16) { // ~60fps
        handleMouseMove(e)
        lastTime = now
      }
    }
  
    window.addEventListener("mousemove", throttledMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
    }
  }, [handleMouseMove])
  

  // Memoized star components grouped by category for better rendering
  const renderStars = useMemo(() => {
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    return stars.map((star) => {
      const isGlowing = star.glowIntensity > 0
      
      return (
        <motion.div
          key={star.id}
          className="absolute rounded-full will-change-transform"
          style={{
            width: star.size,
            height: star.size,
            background: isGlowing
              ? `radial-gradient(circle, rgba(255,255,255,${star.opacity}) 0%, rgba(255,255,255,${star.opacity * 0.6}) 50%, transparent 100%)`
              : "white",
            opacity: star.opacity,
            boxShadow: isGlowing
              ? `0 0 ${star.glowIntensity * 2}px rgba(255,255,255,${star.opacity * 0.6})`
              : "none",
          }}
          animate={{
            x: star.x + (mouseXSpring.get() - centerX) * star.speed * 0.08, 
            y: star.y + (mouseYSpring.get() - centerY) * star.speed * 0.08,
            opacity: [star.opacity * 0.8, star.opacity, star.opacity * 0.9],
          }}
          transition={{
            x: { type: "spring", damping: 25, stiffness: 200 },
            y: { type: "spring", damping: 25, stiffness: 200 },
            opacity: {
              duration: star.twinkleSpeed,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          initial={{
            x: star.x,
            y: star.y,
          }}
        />
      )
    })
  }, [stars, dimensions.width, dimensions.height, mouseXSpring, mouseYSpring])


  const shootingStars = useMemo(() => 
    [...Array(4)].map((_, i) => (
      <motion.div
        key={`shooting-${i}`}
        className="absolute rounded-full will-change-transform"
        style={{
          width: 2,
          height: 2,
          background: "linear-gradient(45deg, #60A5FA, #A78BFA)",
          boxShadow: "0 0 4px rgba(96, 165, 250, 0.6)",
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%",
        }}
        animate={{
          x: [0, 200],
          y: [0, 100],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 2.5,
          ease: "easeOut",
        }}
      />
    )), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Performance optimized container */}
      <div 
        className="absolute inset-0" 
        style={{ 
          transform: 'translateZ(0)', // Force hardware acceleration
          backfaceVisibility: 'hidden'
        }}
      >
        {renderStars}
        {shootingStars}
      </div>
    </div>
  )
}