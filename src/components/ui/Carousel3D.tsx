'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const projects = [
  { id: 1, title: 'Lotus India Prakashan', category: 'SKETCHING', icon: '◆', accent: 'rgba(201,168,76,0.15)', image: '/images/vp1.png', desc: 'Brand identity & logo design system' },
  { id: 2, title: 'Parivartan', category: 'BOOK COVER', icon: '✦', accent: 'rgba(181,176,166,0.15)', image: '/images/vp2.png', desc: 'Premium editorial cover layout & illustration' },
  { id: 3, title: 'Rajat Prakashan', category: 'VISITING CARD', icon: '◇', accent: 'rgba(201,168,76,0.2)', image: '/images/vp3.png', desc: 'Corporate stationery & brand assets' },
  { id: 4, title: 'Lotus India Logo', category: 'LOGO DESIGN', icon: '○', accent: 'rgba(229,221,208,0.3)', image: '/images/vp1.png', desc: 'Creative logo and vector brand mark' },
  { id: 5, title: 'Parivartan Editorial', category: 'DESIGN', icon: '△', accent: 'rgba(201,168,76,0.12)', image: '/images/vp2.png', desc: 'Hardcover book casing and typography styling' },
  { id: 6, title: 'Wedding Invitation', category: 'POSTER', icon: '□', accent: 'rgba(181,176,166,0.2)', image: '/images/vp4.png', desc: 'Luxury floral theme wedding invitation card' },
];

export default function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const rotateScene = useTransform(dragX, [-200, 200], [15, -15]);

  // Auto-rotate
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isDragging, activeIndex]);

  // Track mouse for card reflections
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const getCardTransform = (index: number) => {
    const total = projects.length;
    const diff = ((index - activeIndex) % total + total) % total;
    const offset = diff > total / 2 ? diff - total : diff;
    const absOffset = Math.abs(offset);

    // Orbital placement — cards fan out in a curved arc
    const angle = offset * 28;
    const radius = 420;
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = -Math.cos((angle * Math.PI) / 180) * radius + radius;
    const rotateY = offset * -22;
    const scale = absOffset === 0 ? 1.08 : absOffset === 1 ? 0.88 : 0.72;
    const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.3;
    const y = absOffset === 0 ? -10 : absOffset * 8;

    return { x, y, z: -z, rotateY, scale, opacity, zIndex: 20 - absOffset };
  };

  const handleNext = () => setActiveIndex((p) => (p + 1) % projects.length);
  const handlePrev = () => setActiveIndex((p) => (p - 1 + projects.length) % projects.length);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '620px', perspective: '1800px' }}
    >
      {/* Ambient glow behind active card */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 3D Scene */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: 320,
          height: 440,
          transformStyle: 'preserve-3d',
          rotateY: rotateScene,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          dragX.set(0);
          if (info.offset.x < -40) handleNext();
          else if (info.offset.x > 40) handlePrev();
        }}
      >
        <AnimatePresence initial={false}>
          {projects.map((project, index) => {
            const t = getCardTransform(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={project.id}
                className="absolute cursor-pointer"
                style={{
                  width: 300,
                  height: 420,
                  transformStyle: 'preserve-3d',
                  borderRadius: 24,
                  overflow: 'hidden',
                }}
                animate={{
                  x: t.x, y: t.y, z: t.z,
                  rotateY: t.rotateY,
                  scale: t.scale,
                  opacity: t.opacity,
                  zIndex: t.zIndex,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setActiveIndex(index)}
                onDoubleClick={() => {
                  if (project.image) setSelectedImage(project.image);
                }}
              >
                {/* Card body */}
                <div
                  className="w-full h-full relative"
                  style={{
                    background: `linear-gradient(145deg, #FAF7F2 0%, #F0EBE1 50%, #E8E0D2 100%)`,
                    border: isActive ? '1.5px solid #C9A84C' : '1px solid #E5DDD0',
                    borderRadius: 24,
                    boxShadow: isActive
                      ? '0 30px 80px rgba(201,168,76,0.15), 0 15px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)'
                      : '0 10px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.3)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Moving light reflection */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(201,168,76,0.08) 0%, transparent 50%)`,
                      pointerEvents: 'none',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.3s',
                    }}
                  />

                  {/* Top decorative band */}
                  <div
                    style={{
                      height: 180,
                      background: project.accent,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    ) : (
                      /* Large geometric icon */
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={isActive ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : {}}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <span style={{
                          fontSize: isActive ? 80 : 60,
                          color: '#C9A84C',
                          opacity: isActive ? 0.35 : 0.15,
                          fontWeight: 300,
                          transition: 'all 0.6s ease',
                        }}>
                          {project.icon}
                        </span>
                      </motion.div>
                    )}

                    {/* Diagonal line decor */}
                    <div style={{
                      position: 'absolute',
                      bottom: -1,
                      left: 0,
                      right: 0,
                      height: 40,
                      background: 'linear-gradient(to top, #FAF7F2, transparent)',
                    }} />
                  </div>

                  {/* Content */}
                  <div className="px-6 pt-6 pb-8 text-center relative">
                    {/* Category pill */}
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0.5, y: isActive ? 0 : 5 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        display: 'inline-block',
                        padding: '4px 14px',
                        borderRadius: 20,
                        border: '1px solid #E5DDD0',
                        fontSize: 9,
                        letterSpacing: 3,
                        fontFamily: 'Montserrat, sans-serif',
                        color: '#B5B0A6',
                        marginBottom: 12,
                        fontWeight: 500,
                      }}
                    >
                      {project.category}
                    </motion.div>

                    <h3 style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 22,
                      fontWeight: 600,
                      color: isActive ? '#1A1A1A' : '#6B6B6B',
                      marginBottom: 8,
                      transition: 'color 0.4s',
                    }}>
                      {project.title}
                    </h3>

                    <p style={{
                      fontSize: 12,
                      color: '#B5B0A6',
                      lineHeight: 1.6,
                      marginBottom: 20,
                    }}>
                      {project.desc || 'Premium visual identity & design showcase'}
                    </p>

                    {/* View button — slides up on active */}
                    <Link href="/portfolio">
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 15,
                          scale: isActive ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.4, delay: isActive ? 0.15 : 0 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '10px 28px',
                          borderRadius: 30,
                          background: 'linear-gradient(135deg, #C9A84C, #B8973E)',
                          color: '#FAF7F2',
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: 3,
                          fontFamily: 'Montserrat, sans-serif',
                          cursor: 'pointer',
                          boxShadow: '0 8px 25px rgba(201,168,76,0.25)',
                        }}
                      >
                        EXPLORE
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </Link>
                  </div>

                  {/* Bottom gold accent line */}
                  <motion.div
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '15%',
                      right: '15%',
                      height: 2,
                      background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
                      transformOrigin: 'center',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center gap-6 mt-8 z-50">
        <button
          onClick={handlePrev}
          className="group w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ borderColor: '#C9A84C', background: 'rgba(250,247,242,0.8)', backdropFilter: 'blur(8px)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(250,247,242,0.8)'; }}
          aria-label="Previous"
        >
          <svg className="w-4 h-4 transition-colors group-hover:stroke-[#FAF7F2]" fill="none" stroke="#C9A84C" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Progress dots */}
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-500"
              style={{
                width: i === activeIndex ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === activeIndex ? '#C9A84C' : '#E5DDD0',
                border: 'none',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="group w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ borderColor: '#C9A84C', background: 'rgba(250,247,242,0.8)', backdropFilter: 'blur(8px)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(250,247,242,0.8)'; }}
          aria-label="Next"
        >
          <svg className="w-4 h-4 transition-colors group-hover:stroke-[#FAF7F2]" fill="none" stroke="#C9A84C" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Active project title overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 text-center"
        >
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 10,
            letterSpacing: 4,
            color: '#B5B0A6',
            textTransform: 'uppercase',
          }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </motion.div>
      </AnimatePresence>
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
