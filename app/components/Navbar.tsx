'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const goldEase = [0.76, 0, 0.24, 1] as const

const desktopLinks = [
  { label: 'About',        href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Booking',      href: '/booking' },
  { label: 'FAQ',          href: '/faq' },
  { label: 'Account',      href: '/account' },
]

const mobileLinks = [
  { label: 'About',        href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Booking',      href: '/booking' },
  { label: 'FAQ',          href: '/faq' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isTourDetail = pathname.startsWith('/destinations/') && pathname !== '/destinations'

  const starColor = menuOpen
    ? 'text-black'
    : isTourDetail
    ? 'text-white'
    : isHome
    ? 'max-[850px]:text-white min-[851px]:text-black'
    : 'text-black'

  return (
    <>
      <div
        className={`fixed z-1001 transition-colors duration-500 ${starColor}`}
        style={{ top: 30, left: 30 }}
      >
        <Star size={30} fill="currentColor" strokeWidth={0} />
      </div>

      <button
        onClick={() => setMenuOpen(true)}
        className={`fixed top-7.5 right-7.5 z-300 cursor-pointer hover:scale-110 transition-transform duration-300 ease-out ${
          isHome || isTourDetail ? 'text-white' : 'text-black'
        }`}
      >
        <Menu size={32} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.75, ease: goldEase }}
            className="fixed inset-0 bg-white z-500 flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-7.5 right-7.5 text-black cursor-pointer hover:rotate-90 transition-transform duration-300 ease-out"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col gap-8 text-center">
              {mobileLinks.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 28 }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.55, ease: goldEase }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-5xl md:text-7xl font-light tracking-tighter hover:italic transition-all duration-200"
                    >
                      {isActive && <span className="mr-1">/</span>}{link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`fixed bottom-10 left-10 hidden z-40 flex-col gap-1 ${isTourDetail ? '' : 'min-[851px]:flex'}`}>
        {desktopLinks.map((link, i) => {
          const isActive = pathname === link.href
          return (
            <motion.div
              key={link.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: goldEase }}
            >
              <Link
                href={link.href}
                className="footerLink text-[13px] tracking-widest font-medium transition-all duration-300 text-black"
              >
                {isActive && <span className="mr-0.5">/</span>}{link.label}
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </>
  )
}
