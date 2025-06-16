

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface AnimatedButtonProps {
  children: React.ReactNode
  type?: "button" | "submit"
  onClick?: () => void
  loading?: boolean
  variant?: "primary" | "secondary"
  className?: string
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  type = "button",
  onClick,
  loading = false,
  variant = "primary",
  className = "",
}) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 200)
    if (onClick) onClick()
  }

  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
    secondary: "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={loading}
      className={`
        relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white
        transition-all duration-300 transform-gpu
        ${variants[variant]}
        ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
        shadow-lg hover:shadow-xl
        ${variant === "primary" ? "shadow-cyan-500/25 hover:shadow-cyan-500/40" : "shadow-purple-500/25 hover:shadow-purple-500/40"}
        ${className}
      `}
      whileHover={{ scale: loading ? 1 : 1.05 }}
      whileTap={{ scale: loading ? 1 : 0.95 }}
      animate={{
        boxShadow: isClicked
          ? variant === "primary"
            ? "0 0 30px rgba(6, 182, 212, 0.6)"
            : "0 0 30px rgba(168, 85, 247, 0.6)"
          : undefined,
      }}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={isClicked ? { scale: 2, opacity: [0, 1, 0] } : {}}
        transition={{ duration: 0.6 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative flex items-center justify-center space-x-2">
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Loader2 className="w-5 h-5" />
          </motion.div>
        )}
        <span>{children}</span>
      </div>
    </motion.button>
  )
}
