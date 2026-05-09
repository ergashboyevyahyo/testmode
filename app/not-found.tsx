'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const goldEase = [0.76, 0, 0.24, 1] as const

export default function NotFound() {
  return (
    <div className="bg-[#f3ebe4] min-h-screen flex flex-col items-center justify-center font-sans selection:bg-black selection:text-white">
      <motion.p
        className="text-[120px] font-light leading-none tracking-[-0.04em] text-black/10 select-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: goldEase }}
      >
        404
      </motion.p>

      <motion.h1
        className="text-2xl font-light tracking-tight text-black mt-4 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: goldEase }}
      >
        Page not found
      </motion.h1>

      <motion.p
        className="text-sm text-black/40 mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: goldEase }}
      >
        This page doesn&apos;t exist yet.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: goldEase }}
      >
        <Link
          href="/"
          className="text-[13px] tracking-widest font-medium text-black border-b border-black/20 pb-0.5 hover:border-black transition-colors duration-200"
        >
          Back to home
        </Link>
      </motion.div>
    </div>
  )
}
