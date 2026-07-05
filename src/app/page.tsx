'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/ui/Navbar';
import GoldButton from '@/components/ui/GlowButton';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Link from 'next/link';
import Carousel3D from '@/components/ui/Carousel3D';
import BookCarousel from '@/components/ui/BookCarousel';
import AmbientAura from '@/components/ui/AmbientAura';
import TextReveal from '@/components/ui/TextReveal';
import HorizontalScrollGallery from '@/components/ui/HorizontalScrollGallery';

gsap.registerPlugin(ScrollTrigger);

/* ============================================= */
/* StrokeTextAnimation — SVG handwriting stroke   */
/* ============================================= */
function StrokeTextAnimation({
  text,
  className,
  style,
  trigger,
  delay = 0,
  strokeDuration = 2.5,
  strokeColor = '#C9A84C',
  glowColor = '#C9A84C',
  fillGradient = ['#C9A84C', '#E8D5A3', '#C9A84C', '#B8973E'],
  glowPulseColor = 'rgba(201,168,76,0.12)',
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  trigger: boolean;
  delay?: number;
  strokeDuration?: number;
  strokeColor?: string;
  glowColor?: string;
  fillGradient?: [string, string, string, string];
  glowPulseColor?: string;
}) {
  const svgTextRef = useRef<SVGTextElement>(null);
  const [textLength, setTextLength] = useState(0);
  const [started, setStarted] = useState(false);

  // Measure actual SVG text path length once mounted
  useEffect(() => {
    if (!svgTextRef.current) return;
    // Use a small timeout to ensure fonts are loaded
    const timer = setTimeout(() => {
      if (svgTextRef.current) {
        const len = svgTextRef.current.getComputedTextLength();
        setTextLength(len);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [text]);

  // Start animation after delay when triggered
  useEffect(() => {
    if (!trigger || textLength === 0) return;
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [trigger, textLength, delay]);

  // Animation states
  const dashOffset = started ? 0 : textLength;
  const fillOpacity = started ? 1 : 0;

  // Create a unique ID for gradients and filters based on text content
  const idPrefix = text.replace(/\s+/g, '').toLowerCase();

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        lineHeight: style?.lineHeight || 1.25,
      }}
    >
      {/* Invisible text for layout sizing */}
      <span
        className={className}
        style={{
          ...style,
          visibility: 'hidden',
          display: 'inline-block',
          paddingBottom: '0.15em',
        }}
      >
        {text}
      </span>

      {/* SVG overlay — same size as the text */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        <defs>
          {/* Dynamic gradient for fill */}
          <linearGradient id={`${idPrefix}Grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fillGradient[0]} />
            <stop offset="40%" stopColor={fillGradient[1]} />
            <stop offset="70%" stopColor={fillGradient[2]} />
            <stop offset="100%" stopColor={fillGradient[3]} />
          </linearGradient>

          {/* Dynamic glow filter */}
          <filter id={`${idPrefix}Glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor={glowColor} floodOpacity="0.6" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stroke layer — the "writing" effect */}
        <text
          ref={svgTextRef}
          x="50%"
          y="72%"
          textAnchor="middle"
          dominantBaseline="auto"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={started ? `url(#${idPrefix}Glow)` : 'none'}
          className={className}
          style={{
            ...style,
            strokeDasharray: textLength || 2000,
            strokeDashoffset: dashOffset,
            transition: started
              ? `stroke-dashoffset ${strokeDuration}s cubic-bezier(0.4, 0, 0.2, 1)`
              : 'none',
          }}
        >
          {text}
        </text>

        {/* Fill layer — appears after stroke completes */}
        <text
          x="50%"
          y="72%"
          textAnchor="middle"
          dominantBaseline="auto"
          fill={`url(#${idPrefix}Grad)`}
          stroke="none"
          className={className}
          style={{
            ...style,
            opacity: fillOpacity,
            transition: `opacity 0.8s ease ${strokeDuration * 0.7}s`,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
          }}
        >
          {text}
        </text>
      </svg>

      {/* Glow pulse during writing */}
      <motion.span
        style={{
          position: 'absolute',
          inset: '-10%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowPulseColor} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={started ? {
          opacity: [0, 0.8, 0.4, 0.7, 0],
        } : {}}
        transition={{
          duration: strokeDuration,
          ease: 'easeInOut',
        }}
      />
    </span>
  );
}

const serviceNames = [
  'Book Cover Design',
  'Banner Design',
  'Logo Design',
  'Invitation Design',
  'Visiting Card Design',
  'Poster Design',
  'Photo Editing',
  'Video Editing',
  'Sketching',
  'Paintings',
];

const stats = [
  { num: 500, suffix: '+', label: 'Projects Done' },
  { num: 200, suffix: '+', label: 'Happy Clients' },
  { num: 5, suffix: '+', label: 'Years Experience' },
];

const serviceItems = [
  { icon: 'book-cover', title: 'Book Covers', description: 'Captivating covers that tell your story before the first page.' },
  { icon: 'banner', title: 'Banners', description: 'Visual banners that command attention and elevate your brand.' },
  { icon: 'logo', title: 'Logos', description: 'Iconic logos that define your brand identity.' },
  { icon: 'invitation', title: 'Invitations', description: 'Elegant invitations for your special moments.' },
  { icon: 'card', title: 'Visiting Cards', description: 'Professional cards crafted with precision.' },
  { icon: 'poster', title: 'Posters', description: 'Bold posters that captivate audiences.' },
  { icon: 'photo', title: 'Photo Editing', description: 'Pixel-perfect retouching and enhancement.' },
  { icon: 'video', title: 'Video Editing', description: 'Cinematic edits that bring stories to life.' },
  { icon: 'sketching', title: 'Sketching', description: 'Hand-drawn sketches that bring raw ideas to life with artistic precision.' },
  { icon: 'painting', title: 'Paintings', description: 'Expressive paintings crafted with rich colors and soulful strokes.' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <span className="text-4xl sm:text-5xl font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C' }}>
        {count}{suffix}
      </span>
    </div>
  );
}



export default function HomePage() {

  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const textParallaxY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setShowLoader(false);
        // Refresh ScrollTrigger and trigger resize to let Lenis and elements recalculate
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event('resize'));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  // Lock scroll when loader is active to prevent offsets and weird layout behavior
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lenis = (window as any).lenis;
    
    if (showLoader) {
      if (lenis) lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [showLoader]);

  // GSAP scroll animations for various sections
  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      // Marquee speed reacts to scroll velocity
      if (marqueeRef.current) {
        const track = marqueeRef.current.querySelector('.marquee-track') as HTMLElement;
        if (track) {
          ScrollTrigger.create({
            trigger: marqueeRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              const velocity = Math.abs(self.getVelocity());
              const speed = Math.max(0.5, Math.min(3, velocity / 1000));
              track.style.animationDuration = `${30 / speed}s`;
            },
          });
        }
      }

      // Stagger reveal for service cards
      if (servicesRef.current) {
        const cards = servicesRef.current.querySelectorAll('.service-card-item');
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Portfolio section image grid reveal
      const gridItems = document.querySelectorAll('.portfolio-grid-item');
      if (gridItems.length) {
        gsap.fromTo(gridItems,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridItems[0].parentElement,
              start: 'top 80%',
            },
          }
        );
      }

      // CTA section parallax
      const ctaSection = document.querySelector('.cta-section');
      if (ctaSection) {
        gsap.fromTo(ctaSection,
          { backgroundPosition: '50% 0%' },
          {
            backgroundPosition: '50% 30%',
            ease: 'none',
            scrollTrigger: {
              trigger: ctaSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Footer links stagger
      const footerLinks = document.querySelectorAll('.footer-link');
      if (footerLinks.length) {
        gsap.fromTo(footerLinks,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerLinks[0].parentElement,
              start: 'top 90%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [loaded]);

  return (
    <main className="relative" style={{ background: '#FAF7F2' }}>
      {/* Cinematic Ambient Aura Background for Hero */}
      <AmbientAura />

      {/* Floating Geometric Shapes */}
      <div className="floating-shape floating-shape-1" style={{ top: '15%', right: '10%', fontSize: '2rem' }}>◇</div>
      <div className="floating-shape floating-shape-2" style={{ top: '35%', left: '5%', fontSize: '1.5rem' }}>○</div>
      <div className="floating-shape floating-shape-3" style={{ top: '60%', right: '15%', fontSize: '1.2rem' }}>△</div>
      <div className="floating-shape floating-shape-1" style={{ top: '80%', left: '12%', fontSize: '1rem' }}>◆</div>

      {/* Page Loader */}
      {showLoader && (
        <div className={`page-loader ${loaded ? 'hidden' : ''}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="loader-monogram"
          >
            <motion.span
              animate={{ 
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              AC
            </motion.span>
          </motion.div>
        </div>
      )}



      <Navbar />

      {/* ================================================ */}
      {/* HERO SECTION — EDITORIAL LAYOUT */}
      {/* ================================================ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-36 overflow-hidden"
      >
        {/* Full cover background image covering the entire section area */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none w-full h-full flex items-center justify-center">
          <img 
            src="/images/hero-bg.png" 
            alt="" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>


        {/* Decorative side lines */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={loaded ? { scaleY: 1 } : {}}
          transition={{ delay: 1.3, duration: 1.2, ease: 'easeOut' }}
          className="absolute left-8 sm:left-16 top-[25%] hidden sm:block"
          style={{ width: 1, height: '50%', background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)', transformOrigin: 'top' }}
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={loaded ? { scaleY: 1 } : {}}
          transition={{ delay: 1.5, duration: 1.2, ease: 'easeOut' }}
          className="absolute right-8 sm:right-16 top-[25%] hidden sm:block"
          style={{ width: 1, height: '50%', background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)', transformOrigin: 'top' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-[11px] font-medium tracking-[5px] uppercase mb-6"
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}
        >
          Creative Design Agency
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="max-w-5xl relative"
        >
          <h1 className="flex flex-col items-center gap-0 leading-none mb-6 relative" style={{ overflow: 'visible' }}>
            {/* Line 1: "We" — fades in first */}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.7, duration: 0.7, ease: 'easeOut' }}
              className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-[4px] sm:tracking-[6px] uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#B5B0A6', marginBottom: '0.3em' }}
            >
              We
            </motion.span>

            {/* Line 2: "Design" — SVG stroke handwriting animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ delay: 2.2, duration: 0.3 }}
            >
              <StrokeTextAnimation
                text="Design"
                className="text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] font-bold italic"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                  fontWeight: 700,
                }}
                trigger={loaded}
                delay={2.3}
                strokeDuration={2.0}
              />
            </motion.div>

            {/* Ornamental divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={loaded ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ delay: 4.5, duration: 0.6 }}
              className="flex items-center gap-4 my-2"
            >
              <div style={{ width: 50, height: 1, background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
              <motion.span
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ color: '#C9A84C', fontSize: 10, opacity: 0.6 }}
              >
                ◆
              </motion.span>
              <div style={{ width: 50, height: 1, background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
            </motion.div>

            {/* Line 3: "Your" — fades in */}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 4.8, duration: 0.7, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[6px] sm:tracking-[10px] uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B6B6B', marginBottom: '0.2em' }}
            >
              Your
            </motion.span>

            {/* Line 4: "Imagination" — normal fade-in animation */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 5.2, duration: 1.0, ease: 'easeOut' }}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-[9.5rem] font-semibold"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 600,
                color: '#1A1A1A',
                lineHeight: 1.1,
              }}
            >
              Imagination
            </motion.div>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 8.0, duration: 0.6 }}
          className="text-base sm:text-lg mb-3 max-w-xl leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B' }}
        >
          Transforming ideas into stunning visual experiences
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 8.3, duration: 0.5 }}
          className="text-[11px] font-medium tracking-[4px] uppercase mb-10"
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}
        >
          Design Beyond Imagination
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 8.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 z-10"
        >
          <GoldButton href="/portfolio" variant="filled" size="lg">
            View Our Work
          </GoldButton>
          <GoldButton href="/contact" variant="outlined" size="lg">
            Get In Touch
          </GoldButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 9.0 }}
          className="absolute bottom-10 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[3px] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', color: '#B5B0A6' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-[1px] h-8"
            style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)' }}
          />
        </motion.div>
      </motion.section>

      {/* ================================================ */}
      {/* MARQUEE */}
      {/* ================================================ */}
      <section ref={marqueeRef} className="overflow-hidden py-12 border-y" style={{ borderColor: '#E5DDD0' }}>
        <div className="marquee-track">
          {[...serviceNames, ...serviceNames].map((name, i) => (
            <span
              key={i}
              className="text-base sm:text-lg font-medium tracking-[3px] uppercase mx-8 whitespace-nowrap"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}
            >
              {name} <span className="mx-4" style={{ color: '#E5DDD0' }}>·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ================================================ */}
      {/* SERVICES PREVIEW - HORIZONTAL SCROLL */}
      {/* ================================================ */}
      <section className="pt-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="What We Do"
            title="Creative Services"
            subtitle="We craft premium designs that elevate brands and captivate audiences"
          />
        </div>
      </section>

      <HorizontalScrollGallery items={serviceItems.slice(0, 4)} />

      <section className="pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GoldButton href="/services" variant="outlined">
            All Services →
          </GoldButton>
        </motion.div>
      </section>

      {/* ================================================ */}
      {/* SELECTED WORKS (3D CAROUSEL) */}
      {/* ================================================ */}
      <section className="py-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <p className="text-[11px] font-medium tracking-[4px] uppercase mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#B5B0A6' }}>
              Selected Works
            </p>
            <TextReveal mode="word" tag="h2" className="text-4xl sm:text-5xl font-semibold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>
              Visual Poetics
            </TextReveal>
            <p className="text-base leading-relaxed" style={{ color: '#6B6B6B' }}>
              Where strategic branding meets artistic precision. Explore our curated collection of luxury design systems and visual identities.
            </p>
          </motion.div>

          {/* Container exactly matching the mockup */}
          <div className="bg-white/40 backdrop-blur border p-8 md:p-12 rounded-[2rem] relative shadow-sm" style={{ borderColor: '#E5DDD0' }}>
            <div className="text-center mb-16">
              <p className="text-[10px] tracking-[3px] uppercase mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#B5B0A6' }}>
                Design Portfolio
              </p>
              <h3 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>
                3D Gallery Zone
              </h3>
              <p className="text-sm italic" style={{ color: '#6B6B6B', fontFamily: 'Playfair Display, serif' }}>
                Explore our graphic design and visual identity packages
              </p>
            </div>
            
            {/* The 3D Carousel Component */}
            <Carousel3D />
          </div>

          {/* Book Publication Section */}
          <div className="bg-white/40 backdrop-blur border p-8 md:p-12 rounded-[2rem] relative shadow-sm mt-16" style={{ borderColor: '#E5DDD0' }}>
            <div className="flex flex-col items-center text-center mb-16">
              <img 
                src="/images/media__1775543465305.jpg" 
                alt="Anupama Book House" 
                className="h-20 w-auto object-contain mb-4 rounded-md shadow-sm" 
              />
              <p className="text-[10px] tracking-[3px] uppercase mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#B5B0A6' }}>
                Book Publication Division
              </p>
              <h3 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>
                Anupama Book House
              </h3>
              <p className="text-sm italic" style={{ color: '#6B6B6B', fontFamily: 'Playfair Display, serif' }}>
                Showcasing our exclusive books and editorial projects
              </p>
            </div>
            
            <BookCarousel />
          </div>



          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6 mt-20"
          >
            <div className="h-[1px] flex-1 max-w-[100px]" style={{ background: '#E5DDD0' }}></div>
            <Link href="/portfolio" className="text-xs tracking-[3px] uppercase font-medium hover:text-[#C9A84C] transition-colors" style={{ fontFamily: 'Montserrat, sans-serif', color: '#B5B0A6' }}>
              Browse Full Catalog
            </Link>
            <div className="h-[1px] flex-1 max-w-[100px]" style={{ background: '#E5DDD0' }}></div>
          </motion.div>
        </div>
      </section>

      {/* ================================================ */}
      {/* STATS */}
      {/* ================================================ */}
      <section className="py-24 px-6" style={{ background: '#F0EBE1' }}>
        <div className="max-w-4xl mx-auto">
          <TextReveal mode="word" tag="p" className="text-center text-[11px] font-medium tracking-[4px] uppercase mb-12" style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B6B6B' }}>
            Trusted by clients who value quality
          </TextReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="text-center"
              >
                <AnimatedCounter target={stat.num} suffix={stat.suffix} />
                <p className="text-xs tracking-[2px] uppercase mt-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B6B6B' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================ */}
      {/* CTA SECTION */}
      {/* ================================================ */}
      <section className="cta-section py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-medium tracking-[4px] uppercase mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}>
              Start A Project
            </p>
            <TextReveal mode="word" tag="h2" className="text-3xl sm:text-5xl font-semibold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>
              Ready to Create Something Beautiful?
            </TextReveal>
            <p className="text-base mb-10 max-w-md mx-auto leading-relaxed" style={{ color: '#6B6B6B' }}>
              Let&apos;s bring your vision to life with designs that inspire.
            </p>
            <GoldButton href="/contact" variant="filled" size="lg">
              Get In Touch →
            </GoldButton>
          </motion.div>
        </div>
      </section>

      {/* ================================================ */}
      {/* FOOTER */}
      {/* ================================================ */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: '#E5DDD0' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 footer-link">
            <img 
              src="/images/apurva-creation-logo.jpeg" 
              alt="Apurva Creation" 
              className="h-10 w-auto object-contain" 
            />
            <span className="text-[10px] font-medium tracking-[3px] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B6B6B' }}>
              Apurva Creation
            </span>
          </div>
          <p className="text-xs footer-link" style={{ color: '#B5B0A6' }}>
            © 2026 Apurva Creation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/' },
              { label: 'Facebook', href: 'https://www.facebook.com/' },
              { label: 'Email', href: 'mailto:apurvacreation2610@gmail.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="footer-link text-xs tracking-[1px] uppercase transition-colors duration-300"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B6B6B' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C9A84C'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#6B6B6B'; }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>


    </main>
  );
}
