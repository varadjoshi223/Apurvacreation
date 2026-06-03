'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const books = [
  { id: 1, title: 'स्मरण देवांचे संतांचे', author: 'Sudhakar Kulkarni', spine: '#9B7823', pages: '180', image: '/images/Backup_of_smaran santache.jpg' },
  { id: 2, title: 'अग्निस्नान', author: 'Anupama', spine: '#1A1A1A', pages: '240', image: '/images/ajnisnan.jpg' },
  { id: 3, title: 'भारतीय तत्त्वज्ञान (Lotus Cover)', author: 'Vasu Bhardwaj', spine: '#B8973E', pages: '312', image: '/images/ye03.jpg' },
  { id: 4, title: 'भारतीय तत्त्वज्ञान (Lamp Cover)', author: 'Vasu Bhardwaj', spine: '#D4B85A', pages: '298', image: '/images/ye05.jpg' },
  { id: 5, title: 'In The Zoo', author: 'Anupama Publication', spine: '#4A6B82', pages: '64', image: '/images/cover peg.jpg' },
  { id: 6, title: 'Birdie Worldie', author: 'Anupama Publication', spine: '#5C8001', pages: '80', image: '/images/cover.jpg' },
];

export default function BookCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mouseX, setMouseX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % books.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovering, activeIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouseX(((e.clientX - rect.left) / rect.width) * 100);
  };

  const getBookTransform = (index: number) => {
    const total = books.length;
    const diff = ((index - activeIndex) % total + total) % total;
    const offset = diff > total / 2 ? diff - total : diff;
    const absOffset = Math.abs(offset);

    // Fan spread — books fan out like a hand of cards
    const spreadAngle = offset * 12;
    const spreadX = offset * 140;
    const spreadY = absOffset * absOffset * 6;
    const rotateZ = offset * -4;
    const rotateY = offset * -15;
    const scale = absOffset === 0 ? 1.05 : 1 - absOffset * 0.08;
    const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.25;

    return { x: spreadX, y: spreadY, rotateZ, rotateY, scale, opacity, zIndex: 20 - absOffset };
  };

  const handleNext = () => setActiveIndex((p) => (p + 1) % books.length);
  const handlePrev = () => setActiveIndex((p) => (p - 1 + books.length) % books.length);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '620px', perspective: '2000px' }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Shelf surface */}
      <div
        className="absolute"
        style={{
          bottom: '18%',
          left: '10%',
          right: '10%',
          height: 3,
          background: 'linear-gradient(90deg, transparent 0%, #E5DDD0 20%, #C9A84C 50%, #E5DDD0 80%, transparent 100%)',
          borderRadius: 2,
          opacity: 0.6,
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: 'calc(18% - 1px)',
          left: '12%',
          right: '12%',
          height: 20,
          background: 'linear-gradient(to bottom, rgba(201,168,76,0.05), transparent)',
          borderRadius: '0 0 50% 50%',
        }}
      />

      {/* 3D Book Scene */}
      <div
        className="relative flex items-end justify-center"
        style={{
          width: 280,
          height: 400,
          transformStyle: 'preserve-3d',
        }}
      >
        <AnimatePresence initial={false}>
          {books.map((book, index) => {
            const t = getBookTransform(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={book.id}
                className="absolute cursor-pointer"
                style={{
                  width: 220,
                  height: 320,
                  bottom: 0,
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'bottom center',
                }}
                animate={{
                  x: t.x, y: t.y,
                  rotateZ: t.rotateZ,
                  rotateY: t.rotateY,
                  scale: t.scale,
                  opacity: t.opacity,
                  zIndex: t.zIndex,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setActiveIndex(index)}
                onDoubleClick={() => {
                  if (book.image) setSelectedImage(book.image);
                }}
                whileHover={isActive ? { y: -15, transition: { duration: 0.3 } } : {}}
              >
                {/* Book — 3D with spine */}
                <div
                  className="w-full h-full relative"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front cover */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '4px 16px 16px 4px',
                      background: `linear-gradient(135deg, #FAF7F2 0%, #F0EBE1 40%, #E8E0D2 100%)`,
                      border: isActive ? `2px solid ${book.spine}` : '1px solid #E5DDD0',
                      boxShadow: isActive
                        ? `8px 8px 30px rgba(0,0,0,0.12), -2px 0 8px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.5)`
                        : '4px 4px 15px rgba(0,0,0,0.06)',
                      overflow: 'hidden',
                      transition: 'border 0.4s, box-shadow 0.4s',
                    }}
                  >
                    {/* Optional Book Cover Image */}
                    {book.image && (
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, zIndex: 0 }} 
                      />
                    )}

                    {/* Spine edge effect */}
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 18,
                      background: `linear-gradient(to right, ${book.spine}60, transparent)`,
                      zIndex: 1,
                    }} />

                    {/* Only show default styling if there's no cover image */}
                    {!book.image && (
                      <>
                        {/* Top decorative band */}
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 6,
                          background: `linear-gradient(90deg, ${book.spine}, ${book.spine}80)`,
                          zIndex: 1,
                        }} />

                        {/* Bottom decorative band */}
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 6,
                          background: `linear-gradient(90deg, ${book.spine}80, ${book.spine})`,
                          zIndex: 1,
                        }} />

                        {/* Content */}
                        <div className="flex flex-col items-center justify-center h-full px-6 text-center relative" style={{ zIndex: 2 }}>
                          {/* Ornamental frame */}
                          <div style={{
                            position: 'absolute',
                            inset: 24,
                            border: `1px solid ${isActive ? book.spine + '50' : '#E5DDD0'}`,
                            borderRadius: 8,
                            transition: 'border 0.4s',
                          }} />

                          {/* Corner ornaments */}
                          {[{ top: 20, left: 20 }, { top: 20, right: 20 }, { bottom: 20, left: 20 }, { bottom: 20, right: 20 }].map((pos, i) => (
                            <motion.div
                              key={i}
                              animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                              style={{
                                position: 'absolute',
                                ...pos,
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: isActive ? book.spine : '#E5DDD0',
                                opacity: isActive ? 0.6 : 0.3,
                                transition: 'opacity 0.4s, background 0.4s',
                              }}
                            />
                          ))}

                          {/* Monogram */}
                          <motion.div
                            animate={isActive ? { rotate: [0, 360] } : {}}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: '50%',
                              border: `1.5px solid ${book.spine}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: 16,
                            }}
                          >
                            <span style={{
                              fontFamily: 'Playfair Display, serif',
                              fontSize: 16,
                              fontWeight: 700,
                              color: book.spine,
                            }}>AC</span>
                          </motion.div>

                          {/* Title */}
                          <h3 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: isActive ? 18 : 15,
                            fontWeight: 600,
                            color: isActive ? '#1A1A1A' : '#6B6B6B',
                            marginBottom: 6,
                            transition: 'all 0.4s',
                            lineHeight: 1.3,
                          }}>
                            {book.title}
                          </h3>

                          <p style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: 9,
                            letterSpacing: 3,
                            color: '#B5B0A6',
                            textTransform: 'uppercase',
                            marginBottom: 12,
                          }}>
                            {book.author}
                          </p>

                          {/* Page count */}
                          <motion.div
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                            transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '4px 12px',
                              borderRadius: 12,
                              background: '#F0EBE1',
                              fontSize: 9,
                              color: '#B5B0A6',
                              fontFamily: 'Montserrat, sans-serif',
                              letterSpacing: 1,
                            }}
                          >
                            {book.pages} pages
                          </motion.div>
                        </div>
                      </>
                    )}

                    {/* Moving light effect */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(${mouseX * 1.8}deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)`,
                      pointerEvents: 'none',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.3s',
                      zIndex: 10,
                    }} />
                  </div>

                  {/* Page edges (right side) */}
                  <div style={{
                    position: 'absolute',
                    top: 4,
                    right: -4,
                    bottom: 4,
                    width: 4,
                    background: 'repeating-linear-gradient(to bottom, #F0EBE1 0px, #E5DDD0 1px, #F0EBE1 2px)',
                    borderRadius: '0 2px 2px 0',
                    opacity: isActive ? 0.8 : 0.4,
                    transition: 'opacity 0.4s',
                  }} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation & Info */}
      <div className="flex items-center gap-6 mt-6 z-50">
        <button
          onClick={handlePrev}
          className="group w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ borderColor: '#C9A84C', background: 'rgba(250,247,242,0.8)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(250,247,242,0.8)'; }}
          aria-label="Previous Book"
        >
          <svg className="w-3.5 h-3.5 group-hover:stroke-[#FAF7F2]" fill="none" stroke="#C9A84C" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Active book info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-center min-w-[140px]"
          >
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: 2, color: '#B5B0A6', textTransform: 'uppercase' }}>
              {String(activeIndex + 1).padStart(2, '0')} of {String(books.length).padStart(2, '0')}
            </p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          className="group w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ borderColor: '#C9A84C', background: 'rgba(250,247,242,0.8)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(250,247,242,0.8)'; }}
          aria-label="Next Book"
        >
          <svg className="w-3.5 h-3.5 group-hover:stroke-[#FAF7F2]" fill="none" stroke="#C9A84C" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Bigger View"
                className="max-w-[90vw] max-h-[85vh] md:max-w-[85vw] md:max-h-[80vh] rounded-2xl border border-white/10 shadow-2xl object-contain cursor-default"
              />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
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
    </div>
  );
}
