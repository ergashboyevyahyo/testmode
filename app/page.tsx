'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Menu, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const goldEase = [0.76, 0, 0.24, 1] as const

function HeroContent() {
  return (
    <div id='topContent' className="flex flex-col items-center justify-center transform -translate-y-[40px] md:-translate-y-[20px] px-6">
      <div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-light leading-[1.05] tracking-[-0.04em] text-[clamp(42px,6vw,80px)]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: goldEase }}
          >
            Discover the beauty
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="font-light leading-[1.05] tracking-[-0.04em] text-[clamp(42px,6vw,80px)]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: goldEase, delay: 0.08 }}
          >
            of the world around
          </motion.h1>
        </div>
      </div>

      <motion.p
        className="text-[clamp(14px,1vw,16px)] leading-[1.7] max-w-[550px] mx-auto opacity-80 font-light tracking-wide"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: goldEase }}
      >
        Escape the ordinary and find inspiration in the most breathtaking corners of the globe.
        We curate unique travel experiences tailored to your rhythm and spirit.
      </motion.p>
    </div>
  )
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-[#f3ebe4] selection:bg-black selection:text-white min-h-screen overflow-hidden font-sans">

      {/* Star Icon: always white, black only when modal is open */}
      <div
        className={`fixed z-[1001] transition-colors duration-500 ${menuOpen ? 'text-black' : 'max-[850px]:text-white min-[851px]:text-black'
          }`}
        style={{ top: 30, left: 30 }}
      >
        <Star size={30} fill="currentColor" strokeWidth={0} />
      </div>

      {/* Hamburger: always white on all screen sizes */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-7.5 right-7.5 z-300 text-white cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
      >
        <Menu size={32} />
      </button>

      {/* Menu Modal */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
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
              {['About', 'Destinations', 'Booking', 'FAQ'].map((link, i) => (
                <motion.a
                  key={link}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 28 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.55, ease: goldEase }}
                  href="#"
                  className="text-5xl md:text-7xl font-light tracking-tighter hover:italic transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="hero-container">
        <div className="left-bg" />

        <div className="right-bg">
          <div className="bg-image-wrapper">
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.2, ease: goldEase }}
            >
              <Image src="/img5.jpg" alt="Hero" fill className="object-cover" priority />
            </motion.div>
            <div className="absolute inset-0 bg-black/20 md:bg-transparent" />
          </div>

          <motion.div
            className="gem-card"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: goldEase }}
          >
            <div className="gem-image-box relative shrink-0 overflow-hidden">
              <Image src="/img9.jpg" alt="Gem" fill className="object-cover" />
            </div>

            <div className="gem-content gap-[20px]">
              <div className="mb-5 md:mb-0">
                <h3 className="font-semibold text-[#1c1c1c] text-xl md:text-base mb-2">Hidden Gems</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Explore our handpicked collection of authentic stays and secluded retreats, where nature meets comfort in perfect harmony.
                </p>
              </div>
              <button id='explorebtn' className="bg-black text-white px-8 py-4 md:px-5 md:py-2.5 rounded-full text-xs flex items-center gap-2 self-start hover:bg-zinc-800 transition-all duration-300 active:scale-95 cursor-pointer">
                Explore more <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Layered Text for Split Effect */}
        <div className="text-layer-wrapper text-black-side">
          <HeroContent />
        </div>
        <div className="text-layer-wrapper text-white-side">
          <HeroContent />
        </div>
      </main>

      {/* Desktop Footer Nav: Hidden below 850px */}
      <nav className="fixed bottom-10 left-10 hidden min-[851px]:flex flex-col gap-3 z-40">
        {['/About', 'Destinations', 'Booking', 'FAQ', 'Accaunt'].map((link, i) => (
          <motion.a
            id="footerLink"
            key={link}
            href="#"
            className="text-[13px] tracking-widest font-medium text-black transition-all duration-300 "
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: goldEase }}
          >
            {link}
          </motion.a>
        ))}
      </nav>
    </div>
  )
}
