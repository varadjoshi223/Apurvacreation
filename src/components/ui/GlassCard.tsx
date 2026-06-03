'use client';
import { motion } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface LuxuryCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

export default function GlassCard({ children, className = '', onClick, delay = 0 }: LuxuryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Tilt: max ±8 degrees
    setTilt({
      x: (y - 0.5) * -16,
      y: (x - 0.5) * 16,
    });

    // Glare position
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`luxury-card text-center ${className}`}
      style={{
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.1s ease-out, border-color 0.4s, box-shadow 0.4s'
          : 'transform 0.5s ease-out, border-color 0.4s, box-shadow 0.4s',
        borderColor: isHovered ? '#C9A84C' : undefined,
        boxShadow: isHovered
          ? '0 20px 50px rgba(201,168,76,0.08), 0 8px 24px rgba(0,0,0,0.04)'
          : undefined,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shimmer glare overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isHovered
            ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(201,168,76,0.08) 0%, transparent 60%)`
            : 'none',
          pointerEvents: 'none',
          transition: 'opacity 0.3s',
          opacity: isHovered ? 1 : 0,
          borderRadius: 'inherit',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
}
