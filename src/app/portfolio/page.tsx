'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/ui/Navbar';
import TextReveal from '@/components/ui/TextReveal';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Logos', 'Posters', 'Book Covers', 'Sketches/Paintings'];

const portfolioItems = [
  // Logos (7 actual images)
  { id: 70, title: 'Logo 1', category: 'Logos', aspect: 'aspect-[3/4]', image: '/images/logos/ChatGPT Image Jun 2, 2026, 01_52_00 PM.png', desc: undefined },
  { id: 71, title: 'Logo 2', category: 'Logos', aspect: 'aspect-[3/4]', image: '/images/logos/ChatGPT Image Jun 2, 2026, 02_12_01 PM1.png', desc: undefined },
  { id: 72, title: 'Logo 3', category: 'Logos', aspect: 'aspect-[3/4]', image: '/images/logos/ChatGPT Image Jun 2, 2026, 02_12_01 PM2.png', desc: undefined },
  { id: 73, title: 'Logo 4', category: 'Logos', aspect: 'aspect-[3/4]', image: '/images/logos/ChatGPT Image Jun 2, 2026, 02_12_01 PM3.png', desc: undefined },
  { id: 74, title: 'Logo 5', category: 'Logos', aspect: 'aspect-[3/4]', image: '/images/logos/ChatGPT Image Jun 2, 2026, 02_12_01 PM4.png', desc: undefined },
  { id: 75, title: 'Logo 6', category: 'Logos', aspect: 'aspect-[3/4]', image: '/images/logos/ChatGPT Image Jun 2, 2026, 05_25_40 PM.png', desc: undefined },
  { id: 76, title: 'Logo 7', category: 'Logos', aspect: 'aspect-[3/4]', image: '/images/logos/ChatGPT Image Jun 2, 2026, 05_34_58 PM.png', desc: undefined },

  // Posters (9 actual images)
  { id: 50, title: 'Poster 1', category: 'Posters', aspect: 'aspect-[3/4]', image: '/images/posters/ChatGPT Image Jun 2, 2026, 03_50_27 PM.png', desc: undefined },
  { id: 51, title: 'Poster 2', category: 'Posters', aspect: 'aspect-[3/4]', image: '/images/posters/ChatGPT Image Jun 2, 2026, 03_51_38 PM.png', desc: undefined },
  { id: 52, title: 'Poster 3', category: 'Posters', aspect: 'aspect-[3/4]', image: '/images/posters/ChatGPT Image Jun 2, 2026, 04_46_59 PM.png', desc: undefined },
  { id: 53, title: 'Poster 4', category: 'Posters', aspect: 'aspect-[3/4]', image: '/images/posters/ChatGPT Image Jun 2, 2026, 04_51_24 PM.png', desc: undefined },
  { id: 54, title: 'Poster 5', category: 'Posters', aspect: 'aspect-[3/4]', image: '/images/posters/file_000000003d24720ba5b4fd0b07d999ed.png', desc: undefined },
  { id: 55, title: 'Poster 6', category: 'Posters', aspect: 'aspect-[3/4]', image: '/images/posters/file_000000003e207207b074e3ecb6d1ede3.png', desc: undefined },
  { id: 56, title: 'Poster 7', category: 'Posters', aspect: 'aspect-[3/4]', image: '/images/posters/file_0000000048d871faab434e55aab2c966.png', desc: undefined },
  { id: 57, title: 'Poster 8', category: 'Posters', aspect: 'aspect-[3/4]', image: '/images/posters/file_0000000085b07209ade7c42ce6f813e2.png', desc: undefined },
  { id: 58, title: 'Poster 9', category: 'Posters', aspect: 'aspect-[3/4]', image: '/images/posters/file_00000000d944720bb0fab0990414dd67.png', desc: undefined },

  // Sketches/Paintings (18 actual images)
  { id: 60, title: 'Sketch 1', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/img225.jpg', desc: undefined },
  { id: 61, title: 'Sketch 2', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/img227.jpg', desc: undefined },
  { id: 62, title: 'Sketch 3', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/img228.jpg', desc: undefined },
  { id: 63, title: 'Sketch 4', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/img229.jpg', desc: undefined },
  { id: 64, title: 'Sketch 5', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/img230.jpg', desc: undefined },
  { id: 65, title: 'Sketch 6', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/img231.jpg', desc: undefined },
  { id: 66, title: 'Sketch 7', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/img232.jpg', desc: undefined },
  { id: 67, title: 'Sketch 8', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/img234.jpg', desc: undefined },
  { id: 68, title: 'Sketch 9', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/Untitled-1.jpg', desc: undefined },
  { id: 69, title: 'Sketch 10', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/Untitled-2.jpg', desc: undefined },
  { id: 100, title: 'Sketch 11', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/20260602_181623.jpg', desc: undefined },
  { id: 101, title: 'Sketch 12', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/20260602_181555.jpg', desc: undefined },
  { id: 102, title: 'Sketch 13', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/20260602_181830.jpg', desc: undefined },
  { id: 103, title: 'Sketch 14', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/20260602_181802.jpg', desc: undefined },
  { id: 104, title: 'Sketch 15', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/20260602_181720.jpg', desc: undefined },
  { id: 105, title: 'Sketch 16', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/20260602_181705.jpg', desc: undefined },
  { id: 106, title: 'Sketch 17', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/20260602_181649.jpg', desc: undefined },
  { id: 107, title: 'Sketch 18', category: 'Sketches/Paintings', aspect: 'aspect-[3/4]', image: '/images/sketches/20260602_181629.jpg', desc: undefined },

  // Book Covers (30 actual images)
  { id: 13, title: 'Book Cover 1', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/ajnisnan.jpg', desc: undefined },
  { id: 14, title: 'Book Cover 2', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/b01.jpg', desc: undefined },
  { id: 15, title: 'Book Cover 3', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/b02.jpg', desc: undefined },
  { id: 16, title: 'Book Cover 4', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/b03.jpg', desc: undefined },
  { id: 17, title: 'Book Cover 5', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/b04.jpg', desc: undefined },
  { id: 18, title: 'Book Cover 6', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/Backup_of_smaran santache.jpg', desc: undefined },
  { id: 19, title: 'Book Cover 7', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/bf.jpeg', desc: undefined },
  { id: 20, title: 'Book Cover 8', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/chatara pati-co.jpg', desc: undefined },
  { id: 21, title: 'Book Cover 9', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/cover peg.jpg', desc: undefined },
  { id: 22, title: 'Book Cover 10', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/cover.jpg', desc: undefined },
  { id: 23, title: 'Book Cover 11', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/e01.jpg', desc: undefined },
  { id: 24, title: 'Book Cover 12', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/e02.jpg', desc: undefined },
  { id: 25, title: 'Book Cover 13', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/g01.jpg', desc: undefined },
  { id: 26, title: 'Book Cover 14', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/g02.jpg', desc: undefined },
  { id: 27, title: 'Book Cover 15', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/gostrup shivaji cover-co.jpg', desc: undefined },
  { id: 28, title: 'Book Cover 16', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/k01.jpg', desc: undefined },
  { id: 29, title: 'Book Cover 17', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/narsinha sarwati.jpg', desc: undefined },
  { id: 30, title: 'Book Cover 18', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/pr045.jpg', desc: undefined },
  { id: 31, title: 'Book Cover 19', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/r01.jpg', desc: undefined },
  { id: 32, title: 'Book Cover 20', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/sant  Tukaram-co.jpg', desc: undefined },
  { id: 33, title: 'Book Cover 21', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/WhatsApp Image 2025-11-25 at 7.48.37 PM.jpeg', desc: undefined },
  { id: 34, title: 'Book Cover 22', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/WhatsApp Image 2026-02-10 at 4.04.29 PM.jpeg', desc: undefined },
  { id: 35, title: 'Book Cover 23', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/WhatsApp Image 2026-02-10 at 4.08.53 PM.jpeg', desc: undefined },
  { id: 36, title: 'Book Cover 24', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/WhatsApp Image 2026-03-11 at 10.36.17 AM.jpeg', desc: undefined },
  { id: 37, title: 'Book Cover 25', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/WhatsApp Image 2026-04-05 at 4.31.06 PM (8).jpeg', desc: undefined },
  { id: 38, title: 'Book Cover 26', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/WhatsApp Image 2026-04-05 at 4.31.32 PM.jpeg', desc: undefined },
  { id: 39, title: 'Book Cover 27', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/WhatsApp Image 2026-04-05 at 4.32.23 PM.jpeg', desc: undefined },
  { id: 40, title: 'Book Cover 28', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/WhatsApp Image 2026-04-11 at 10.18.43 AM.jpeg', desc: undefined },
  { id: 41, title: 'Book Cover 29', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/ye03.jpg', desc: undefined },
  { id: 42, title: 'Book Cover 30', category: 'Book Covers', aspect: 'aspect-[3/4]', image: '/images/books/ye05.jpg', desc: undefined },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.pf-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
    );
  }, [activeFilter]);

  return (
    <main className="relative min-h-screen" style={{ background: '#FAF7F2' }}>
      <Navbar />

      <section className="pt-36 pb-12 px-8 sm:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] font-medium tracking-[5px] uppercase mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}>
            Our Work
          </motion.p>
          <TextReveal mode="word" tag="h1" className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>
            Portfolio
          </TextReveal>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="h-[1.5px] mx-auto mb-6 w-[60px]" style={{ background: '#C9A84C', transformOrigin: 'center' }} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: '#6B6B6B' }}>
            A curated collection of our finest creative work
          </motion.p>
        </div>
      </section>

      <section className="px-8 sm:px-12 pb-12">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}>
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      <section className="px-8 sm:px-12 pb-28">
        <div ref={gridRef} className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="pf-card break-inside-avoid group"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden rounded-2xl border transition-all duration-500 group-hover:border-[#C9A84C] group-hover:shadow-[0_20px_50px_rgba(201,168,76,0.08)]" style={{ borderColor: '#E5DDD0' }}>
                  <div className={`${item.aspect} w-full relative`} style={{ background: '#F0EBE1' }}>
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-contain p-2" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-sm tracking-[3px] uppercase opacity-30" style={{ fontFamily: 'Montserrat, sans-serif', color: '#1A1A1A' }}>{item.category}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:backdrop-blur-sm" style={{ background: 'rgba(250,247,242,0.92)' }}>
                    <motion.h3 initial={{ y: 10 }} whileInView={{ y: 0 }} className="text-lg font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>{item.title}</motion.h3>
                    <div className="px-5 py-2 rounded-full text-[11px] font-medium tracking-[2px] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', background: '#C9A84C', color: '#FAF7F2' }}>View</div>
                  </div>
                </div>
                <div className="pt-3 pb-1 text-center">
                  <h3 className="text-sm font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>{item.title}</h3>
                  <p className="text-[11px] mt-0.5 tracking-[1px] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', color: '#B5B0A6' }}>{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative flex flex-col items-center justify-center max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.image ? (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-w-[90vw] max-h-[75vh] md:max-w-[80vw] md:max-h-[75vh] rounded-xl border border-white/10 shadow-2xl object-contain cursor-default"
                />
              ) : (
                <div className="w-[300px] aspect-[3/4] bg-[#F0EBE1] rounded-xl flex items-center justify-center border border-[#E5DDD0]">
                  <span className="text-base tracking-[4px] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}>{selectedItem.category}</span>
                </div>
              )}
              
              <div className="mt-6 text-center text-white/95">
                <h3 className="text-lg md:text-xl font-semibold tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {selectedItem.title}
                </h3>
                {selectedItem.desc && (
                  <p className="text-xs text-white/60 mt-1.5 max-w-md mx-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedItem.desc}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 md:-top-4 md:-right-12 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 border border-white/10 flex items-center justify-center"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
