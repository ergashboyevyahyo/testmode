'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Tour } from '../lib/tours'

const goldEase = [0.76, 0, 0.24, 1] as const

export default function TourDetailSection({ tour }: { tour: Tour }) {
  return (
    // Asosiy container: Fon rasmi bilan
    <div id='tourcontainer' className="relative min-h-screen w-full flex items-end justify-end font-sans selection:bg-black selection:text-white overflow-hidden p-4 md:p-10">

      {/* Background Image: Butun fonni qoplaydi */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: goldEase }}
        >
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            sizes="100vw"
            quality={75}
            className="object-cover brightness-90"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/10 md:bg-transparent md:bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Main Content Card: O'ng tomonda joylashgan (Flex justify-end orqali) */}
      <motion.div
        id='infocard'
        className="relative z-10 w-full max-w-[400px] bg-[#f3ebe4] rounded-[20px] shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar sm:gap-6 gap-2 flex flex-col"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: goldEase }}
      >
        <div className='flex flex-col gap-[10px]'>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-black  px-4 py-2 rounded-full transition-all"
          >
            <ArrowLeft size={15} />
            Back to explore
          </Link>

          {/* Title */}
          <h1 className="text-[20px] font-semibold text-[#1c1c1c] mb-4 tracking-tight">{tour.name}</h1>
        </div>

        {/* Description */}
        <p className="sm:text-[15px] text-[12px] text-black/70 leading-relaxed mb-8">
          {tour.description}
        </p>

        {/* Friends Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex items-center">
            {tour.images.slice(0, 3).map((img, i) => (
              <div
                key={i}
                className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#f3ebe4] shadow-sm"
                style={{ marginLeft: i === 0 ? 0 : -12, zIndex: 3 - i }}
              >
                <Image src={img} alt="friend" fill sizes="36px" quality={60} className="object-cover" />
              </div>
            ))}
            <div
              className="w-9 h-9 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center border-2 border-[#f3ebe4]"
              style={{ marginLeft: -12, zIndex: 0 }}
            >
              +{tour.friends - 3}
            </div>
          </div>
          <span className="text-[13px] font-medium text-black/60">{tour.friends} friends been there</span>
        </div>

        {/* Info Rows: Soddalashtirilgan va chiziqli (Border bottom bilan) */}
        <div className="space-y-4 mb-10 gap-2 flex flex-col">
          <div className="flex justify-between items-center pb-4 border-b border-black/10">
            <span className="text-[13px] text-black/40 font-medium uppercase tracking-wider">Avg cost per trip</span>
            <span className="text-sm font-bold text-black/90">{tour.priceDisplay}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-black/10">
            <span className="text-[13px] text-black/40 font-medium uppercase tracking-wider">Best time to visit</span>
            <span className="text-sm font-bold text-black/90">{tour.bestTime}</span>
          </div>
          <div className="flex justify-between items-center pb-2">
            <span className="text-[13px] text-black/40 font-medium uppercase tracking-wider">Visa</span>
            <span className="text-sm font-bold text-black/90 flex items-center gap-1">
              <span className="text-blue-600">🇪🇺</span> {tour.visa}
            </span>
          </div>
        </div>

        {/* Bottom Grid Images: Card ichidagi kichik suratlar */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {tour.images.slice(0, 3).map((img, i) => (
            <div key={i} className="relative aspect-square rounded-[20px] overflow-hidden group">
              <Image
                src={img}
                alt={`${tour.name} gallery`}
                fill
                sizes="130px"
                quality={70}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Main CTA Button */}
        <motion.button
          id='bookbtn'
          className="w-full bg-[#0f1115] text-white rounded-[24px] text-[15px] font-bold tracking-tight hover:bg-black active:scale-[0.98] transition-all duration-300"
          whileHover={{ y: -2 }}
        >
          Book this tour
        </motion.button>
      </motion.div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}