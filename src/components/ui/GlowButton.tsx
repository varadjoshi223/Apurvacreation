'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

interface GoldButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
}

export default function GoldButton({
  children,
  onClick,
  href,
  variant = 'filled',
  size = 'md',
  className = '',
  fullWidth = false,
}: GoldButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-2.5 text-[11px]',
    md: 'px-8 py-3 text-[12px]',
    lg: 'px-10 py-3.5 text-[13px]',
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-full font-medium tracking-[2px] uppercase
    transition-all duration-300
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantStyles = {
    filled: {
      background: '#C9A84C',
      color: '#FAF7F2',
      border: 'none',
    },
    outlined: {
      background: 'transparent',
      color: '#1A1A1A',
      border: '1px solid #E5DDD0',
    },
  };

  const hoverStyles = {
    filled: {
      background: '#B8973E',
    },
    outlined: {
      borderColor: '#C9A84C',
      color: '#C9A84C',
    },
  };

  if (href) {
    const MotionLink = motion(Link);
    return (
      <MotionLink
        href={href}
        onClick={onClick}
        whileHover={{ y: -2, ...hoverStyles[variant] }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${className}`}
        style={{ fontFamily: 'Montserrat, sans-serif', ...variantStyles[variant] }}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, ...hoverStyles[variant] }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${className}`}
      style={{ fontFamily: 'Montserrat, sans-serif', ...variantStyles[variant] }}
    >
      {children}
    </motion.button>
  );
}
