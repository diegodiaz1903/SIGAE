"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface AnimatedLogoProps {
  className?: string
  size?: number
  animate?: boolean
}

export function AnimatedLogo({ className = "", size = 64, animate = true }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (animate) {
      const interval = setInterval(() => {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 2000)
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [animate])

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={
        isAnimating || isHovered
          ? {
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }
          : {}
      }
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <Image src="/images/logo.png" alt="SIGAE Logo" fill className="object-contain" />

      {(isHovered || isAnimating) && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle, rgba(112, 170, 216, 0.4) 0%, rgba(0, 69, 170, 0) 70%)`,
          }}
        />
      )}
    </motion.div>
  )
}
