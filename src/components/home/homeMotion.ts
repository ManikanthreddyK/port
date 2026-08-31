import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'

export const MotionLink = motion.create(Link)
export const MotionNavLink = motion.create(NavLink)

export const easeOutQuint = [0.22, 1, 0.36, 1] as const

export const hoverLift = { duration: 0.35, ease: easeOutQuint }
export const cardSpring = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.55 }
