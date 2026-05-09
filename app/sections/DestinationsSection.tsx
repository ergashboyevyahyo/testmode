'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { tours } from '../lib/tours'

const goldEase = [0.76, 0, 0.24, 1] as const

export default function DestinationsSection() {
  const [query, setQuery] = useState('')

  const filtered = tours.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="bg-[#f3ebe4] min-h-screen font-sans selection:bg-black selection:text-white destinations-page">
      {/* 
        Responsive Padding: Mobileda 6px, Desktopda 30px.
        Topdan 100px margin-top bilan joy tashladik.
      */}
      <div id='destcontainer' className="transition-all duration-500">

        {/* Search bar: Border yo'q, text centered va size kichraytirildi */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: goldEase }}
        >
          <div className='w-full flex items-center justify-center'>
            <input
            id='searchInput'
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Find your tour"
              className="w-100 max-w-2xl bg-transparent text-[clamp(24px,4vw,42px)] font-light tracking-[-0.02em] outline-none placeholder-black/20 caret-black/40 text-center"
              autoFocus
            />
          </div>
        </motion.div>

        {/* Popular label: Cardlar bilan orasi 15px */}
        <motion.p
          id='Popular'
          className="text-sm font-medium tracking-widest mb-[15px] opacity-60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: goldEase }}
        >
          Popular
        </motion.p>

        {/* Cards: Sening original width/height mantiqing saqlanib qoldi */}
        <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {filtered.length === 0 && (
            <p className="text-black/40 text-sm pt-4">No tours found for &quot;{query}&quot;</p>
          )}
          {filtered.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: goldEase }}
              style={{ width: tour.w, flexShrink: 0 }}
            >
              <Link href={`/destinations/${tour.id}`} className="flex flex-col gap-3 group">
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ height: tour.imgH }}
                >
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium leading-tight">{tour.name}</h3>
                  <p className="text-sm text-black/45 mt-1">{tour.priceDisplay} / person</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}