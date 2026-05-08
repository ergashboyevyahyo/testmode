'use client'

import { useState, useEffect } from 'react'
import { useAnimate, motion, AnimatePresence } from 'framer-motion'
import { Star, Menu, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const goldEase = [0.85, 0, 0.15, 1] as const

function HeroContent({ ready }: { ready: boolean }) {
  return (
    // Matnni biroz teparoq surish uchun translate-y ni mosladik
    <div className="flex flex-col items-center justify-center transform -translate-y-[40px] md:-translate-y-[20px] px-6">
      <div className="overflow-hidden">
        <motion.h1
          className="font-light leading-[1.05] tracking-[-0.04em] text-[clamp(42px,9vw,140px)]"
          initial={{ y: "110%" }}
          animate={ready ? { y: 0 } : { y: "110%" }}
          transition={{ duration: 1.2, ease: goldEase }}
        >
          Discover the beauty
        </motion.h1>
      </div>
      <div className="overflow-hidden mb-8">
        <motion.h1
          className="font-light leading-[1.05] tracking-[-0.04em] text-[clamp(42px,9vw,140px)]"
          initial={{ y: "110%" }}
          animate={ready ? { y: 0 } : { y: "110%" }}
          transition={{ duration: 1.2, ease: goldEase, delay: 0.1 }}
        >
          of the world around
        </motion.h1>
      </div>
      
      <motion.p
        className="text-[clamp(14px,1vw,16px)] leading-[1.7] max-w-[550px] mx-auto opacity-80 font-light tracking-wide"
        initial={{ opacity: 0, y: 15 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8, delay: 0.7, ease: goldEase }}
      >
        Escape the ordinary and find inspiration in the most breathtaking corners of the globe.
        We curate unique travel experiences tailored to your rhythm and spirit.
      </motion.p>
    </div>
  )
}

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const [starScope, animateStar] = useAnimate<HTMLDivElement>()

  useEffect(() => {
    async function play() {
      if (!starScope.current || !scope.current) return

      const star = starScope.current
      const top = scope.current.querySelector('.intro-top')
      const bot = scope.current.querySelector('.intro-bot')

      if (!top || !bot) return

      const offsetX = window.innerWidth / 2 - 30 - 16
      const offsetY = window.innerHeight / 2 - 30 - 16

      await animateStar(star, { x: offsetX, y: offsetY }, { duration: 0 })

      await animateStar(star,
        { rotate: 1080, scale: [1, 1.2, 1] },
        { duration: 3.2, ease: "easeInOut" }
      )

      await Promise.all([
        animateStar(star, { x: 0, y: 0 }, { duration: 1.1, ease: goldEase }),
        animate(top, { y: '-100%' }, { duration: 1.1, ease: goldEase }),
        animate(bot, { y: '100%' }, { duration: 1.1, ease: goldEase }),
      ])

      setIntroComplete(true)
    }
    play()
  }, [animate, animateStar])

  return (
    <div className="bg-[#f3ebe4] selection:bg-black selection:text-white min-h-screen overflow-hidden font-sans">
      
      {/* Star Icon: Logic for color switching */}
      <div 
        ref={starScope} 
        className={`fixed z-[1001] transition-colors duration-500 ${
          menuOpen ? 'text-black' : 'text-[#1c1c1c] max-[850px]:text-white'
        }`}
        style={{ top: 30, left: 30 }}
      >
        <Star size={30} fill="currentColor" strokeWidth={0} />
      </div>

      {/* Intro Overlay */}
      {!introComplete && (
        <div ref={scope} className="fixed inset-0 z-[1000] pointer-events-none">
          <div className="intro-top pointer-events-auto absolute inset-x-0 top-0 h-1/2 bg-[#f3ebe4]" />
          <div className="intro-bot pointer-events-auto absolute inset-x-0 bottom-0 h-1/2 bg-[#f3ebe4]" />
        </div>
      )}

      {/* Menu Icon: Always white on mobile hero */}
      <button 
        onClick={() => setMenuOpen(true)}
        className="fixed top-[30px] right-[30px] z-[300] text-white md:text-[#1c1c1c] max-[850px]:text-white cursor-pointer hover:scale-110 transition-transform"
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
            transition={{ duration: 0.9, ease: goldEase }}
            className="fixed inset-0 bg-white z-[500] flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setMenuOpen(false)} 
              className="absolute top-[30px] right-[30px] text-black cursor-pointer hover:rotate-90 transition-transform"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {['About', 'Destinations', 'Booking', 'FAQ'].map((link, i) => (
                <motion.a
                  key={link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  href="#"
                  className="text-5xl md:text-7xl font-light tracking-tighter hover:italic"
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
              className="w-full h-full"
              initial={{ scale: 1.1 }}
              animate={introComplete ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 2.5, ease: goldEase }}
            >
              <Image src="/img5.jpg" alt="Hero" fill className="object-cover" priority />
            </motion.div>
            {/* Subtle overlay for better text readability on mobile */}
            <div className="absolute inset-0 bg-black/20 md:bg-transparent" />
          </div>

          <motion.div
            className="gem-card"
            initial={{ y: 60, opacity: 0 }}
            animate={introComplete ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: goldEase }}
          >
            <div className="gem-image-box relative flex-shrink-0 overflow-hidden">
              <Image src="/img3.jpg" alt="Gem" fill className="object-cover" />
            </div>
            
            <div className="gem-content">
              <div className="mb-5 md:mb-0">
                <h3 className="font-semibold text-[#1c1c1c] text-xl md:text-base mb-2">Hidden Gems</h3>
                <p className="text-gray-500 text-sm md:text-xs leading-relaxed max-w-[300px]">
                  Explore our handpicked collection of authentic stays and secluded retreats.
                </p>
              </div>
              <button className="bg-black text-white px-8 py-4 md:px-5 md:py-2.5 rounded-full text-xs flex items-center gap-2 self-start hover:bg-zinc-800 transition-all active:scale-95">
                Explore more <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Layered Text for Split Effect */}
        <div className="text-layer-wrapper text-black-side">
          <HeroContent ready={introComplete} />
        </div>
        <div className="text-layer-wrapper text-white-side">
          <HeroContent ready={introComplete} />
        </div>
      </main>

      {/* Desktop Footer Nav: Hidden below 850px */}
      <nav className="fixed bottom-[40px] left-[40px] hidden min-[851px]:flex flex-col gap-5 z-40">
        {['About', 'Destinations', 'Booking', 'FAQ'].map((link, i) => (
          <motion.a
            key={link}
            href="#"
            className="text-[13px] tracking-widest font-medium text-[#1c1c1c] opacity-50 hover:opacity-100 transition-all uppercase"
            initial={{ x: -30, opacity: 0 }}
            animate={introComplete ? { x: 0, opacity: 0.5 } : { x: -30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.2 + i * 0.15, ease: goldEase }}
          >
            {link}
          </motion.a>
        ))}
      </nav>
    </div>
  )
}