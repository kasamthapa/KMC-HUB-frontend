

import type React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState, useCallback } from "react"

interface AnimatedCursorProps {
  className?: string
  size?: number
  trailSize?: number
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({ 
  className = "", 
  size = 20, 
  trailSize = 8 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const trailX = useMotionValue(0)
  const trailY = useMotionValue(0)

  // Spring configurations for smooth movement
  const cursorSpring = { damping: 25, stiffness: 700, mass: 0.5 }
  const trailSpring = { damping: 30, stiffness: 300, mass: 0.8 }

  const cursorXSpring = useSpring(cursorX, cursorSpring)
  const cursorYSpring = useSpring(cursorY, cursorSpring)
  const trailXSpring = useSpring(trailX, trailSpring)
  const trailYSpring = useSpring(trailY, trailSpring)

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    trailX.set(e.clientX)
    trailY.set(e.clientY)
    
    if (!isVisible) {
      setIsVisible(true)
    }
  }, [cursorX, cursorY, trailX, trailY, isVisible])

  // Handle mouse enter/leave
  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])

  // Handle mouse down/up for click effect
  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])

  // Handle hover states for interactive elements
  const handleElementHover = useCallback(() => setIsHovering(true), [])
  const handleElementLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementHover)
      el.addEventListener("mouseleave", handleElementLeave)
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover)
        el.removeEventListener("mouseleave", handleElementLeave)
      })
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp, handleElementHover, handleElementLeave])

  if (!isVisible) return null

  return (
    <div className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference ${className}`}>
      {/* Main cursor */}
      <motion.div
        className="absolute rounded-full will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.2, ease: "easeOut" },
          opacity: { duration: 0.3 },
        }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-white"
          style={{
            background: isHovering 
              ? "radial-gradient(circle, rgba(96,165,250,0.3) 0%, rgba(167,139,250,0.2) 50%, transparent 70%)"
              : "transparent",
            boxShadow: isHovering 
              ? "0 0 20px rgba(96,165,250,0.4), 0 0 40px rgba(167,139,250,0.2)"
              : "0 0 10px rgba(255,255,255,0.3)",
          }}
        />
        
        {/* Inner dot */}
        <div 
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            boxShadow: "0 0 8px rgba(255,255,255,0.8)",
          }}
        />
      </motion.div>

      {/* Trail cursor */}
      <motion.div
        className="absolute rounded-full will-change-transform"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          width: trailSize,
          height: trailSize,
          marginLeft: -trailSize / 2,
          marginTop: -trailSize / 2,
        }}
        animate={{
          scale: isClicking ? 1.2 : 1,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{
          scale: { duration: 0.3, ease: "easeOut" },
          opacity: { duration: 0.3 },
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-white"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 70%)",
            boxShadow: "0 0 15px rgba(255,255,255,0.5)",
          }}
        />
      </motion.div>

      {/* Particle effects on click */}
      {isClicking && (
        <motion.div
          className="absolute"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            marginLeft: -10,
            marginTop: -10,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: 10,
                top: 10,
              }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 6) * 30,
                y: Math.sin((i * Math.PI * 2) / 6) * 30,
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
