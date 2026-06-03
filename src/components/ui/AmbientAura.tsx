'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AmbientAura() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse pos from -1 to 1
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
      {/* Orb 1: Gold */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.45) 0%, rgba(201,168,76,0) 70%)' }}
        animate={{
          x: mousePos.x * -70,
          y: mousePos.y * -70,
          scale: [1, 1.15, 1],
        }}
        transition={{
          scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 2, ease: 'easeOut' },
          y: { duration: 2, ease: 'easeOut' },
        }}
      />

      {/* Orb 2: Ivory/Cream */}
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[900px] h-[900px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(229,221,208,0.7) 0%, rgba(229,221,208,0) 70%)' }}
        animate={{
          x: mousePos.x * 60,
          y: mousePos.y * 60,
          scale: [1, 1.25, 1],
        }}
        transition={{
          scale: { duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 },
          x: { duration: 2.5, ease: 'easeOut' },
          y: { duration: 2.5, ease: 'easeOut' },
        }}
      />
      
      {/* Orb 3: Subtle Accent */}
      <motion.div
        className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(181,176,166,0.3) 0%, rgba(181,176,166,0) 70%)' }}
        animate={{
          x: mousePos.x * -40,
          y: mousePos.y * 50,
        }}
        transition={{
          x: { duration: 3, ease: 'easeOut' },
          y: { duration: 3, ease: 'easeOut' },
        }}
      />
    </div>
  );
}
