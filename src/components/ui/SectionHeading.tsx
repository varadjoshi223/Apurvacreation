'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ title, subtitle, label, align = 'center' }: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const labelEl = el.querySelector('.sh-label');
    const titleEl = el.querySelector('.sh-title');
    const dividerEl = el.querySelector('.sh-divider');
    const subtitleEl = el.querySelector('.sh-subtitle');

    // Split title into words
    if (titleEl) {
      const words = title.split(' ');
      titleEl.innerHTML = words
        .map((w) => `<span class="sh-word" style="display:inline-block;opacity:0;transform:translateY(40px) rotate(2deg);">${w}</span>`)
        .join('<span style="display:inline-block;width:0.3em;"></span>');
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });

      if (labelEl) {
        tl.fromTo(labelEl, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      }

      const wordEls = el.querySelectorAll('.sh-word');
      if (wordEls.length) {
        tl.to(wordEls, {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
        }, labelEl ? '-=0.2' : 0);
      }

      if (dividerEl) {
        tl.fromTo(dividerEl, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');
      }

      if (subtitleEl) {
        tl.fromTo(subtitleEl, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
      }
    }, el);

    return () => ctx.revert();
  }, [title]);

  return (
    <div
      ref={containerRef}
      className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      {label && (
        <p
          className="sh-label text-[11px] font-medium tracking-[4px] uppercase mb-4"
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C', opacity: 0 }}
        >
          {label}
        </p>
      )}
      <h2
        className="sh-title text-3xl sm:text-4xl lg:text-5xl font-semibold mb-5 leading-tight"
        style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A', overflow: 'hidden' }}
      >
        {title}
      </h2>
      <div
        className="sh-divider gold-divider mb-6"
        style={{
          ...(align === 'center' ? {} : { margin: '0 0 24px 0' }),
          transformOrigin: align === 'center' ? 'center' : 'left',
          transform: 'scaleX(0)',
        }}
      />
      {subtitle && (
        <p
          className="sh-subtitle text-base max-w-xl leading-relaxed"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#6B6B6B',
            opacity: 0,
            ...(align === 'center' ? { margin: '0 auto' } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
