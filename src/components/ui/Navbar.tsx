'use client';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastScrollY.current;
    setIsScrolled(latest > 20);

    // Hide on scroll down (after 100px), show on scroll up
    if (latest > 100) {
      if (diff > 5) {
        setIsHidden(true);
      } else if (diff < -5) {
        setIsHidden(false);
      }
    } else {
      setIsHidden(false);
    }

    lastScrollY.current = latest;
  });

  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 800);
    if (clickCount.current >= 3) {
      setEasterEgg(true);
      clickCount.current = 0;
      setTimeout(() => setEasterEgg(false), 2500);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ 
          y: isHidden ? -100 : 0, 
          opacity: isHidden ? 0 : 1 
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.25, 0.1, 0.25, 1] 
        }}
        className="fixed top-0 left-0 w-full z-50"
        style={{ 
          background: isScrolled ? 'rgba(250, 247, 242, 0.4)' : '#FAF7F2', 
          backdropFilter: isScrolled ? 'blur(16px)' : 'none', 
          borderBottom: isScrolled ? '1px solid rgba(229, 221, 208, 0.5)' : '1px solid transparent',
          transition: 'background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-12 flex items-center justify-between h-[72px]">
          {/* Logo — home button */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 group flex-shrink-0 no-underline"
            aria-label="Go to home"
          >
            <img
              src="/images/apurva-creation-logo.jpeg"
              alt="Apurva Creation Logo"
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span
                className="text-[11px] font-medium tracking-[4px] uppercase transition-colors duration-300 group-hover:opacity-70"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#1A1A1A' }}
              >
                Apurva Creation
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className={`nav-link text-[12px] font-medium tracking-[1.5px] uppercase  ${
                    pathname === link.href ? 'active' : ''
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right: CTA + Mobile */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-6 py-2.5 text-[11px] font-medium tracking-[1.5px] uppercase rounded-full  transition-all duration-300"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                background: '#C9A84C',
                color: '#FAF7F2',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#B8973E'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#C9A84C'; }}
            >
              Let&apos;s Talk
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-[5px]  p-2"
              aria-label="Menu"
            >
              <span className={`block w-5 h-[1.5px] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} style={{ background: '#1A1A1A' }} />
              <span className={`block w-5 h-[1.5px] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} style={{ background: '#1A1A1A' }} />
              <span className={`block w-5 h-[1.5px] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} style={{ background: '#1A1A1A' }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60] lg:hidden flex flex-col items-center justify-center gap-8"
            style={{ background: '#FAF7F2' }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-8 text-2xl "
              style={{ color: '#1A1A1A' }}
            >
              ✕
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-medium "
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    color: pathname === link.href ? '#C9A84C' : '#1A1A1A',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="text-6xl mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C' }}>
                AC
              </div>
              <p className="text-sm tracking-[3px] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}>
                Design Beyond Imagination
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
