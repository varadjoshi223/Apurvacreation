'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  icon: string;
  title: string;
  description?: string;
}

interface HorizontalScrollGalleryProps {
  items: GalleryItem[];
}

/* Modern SVG icons for each service */
function ServiceIcon({ name }: { name: string }) {
  const iconStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    strokeWidth: 1.5,
    stroke: '#C9A84C',
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const icons: Record<string, React.ReactNode> = {
    'book-cover': (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M8 7h6" />
        <path d="M8 11h4" />
      </svg>
    ),
    'banner': (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 8h10" />
        <path d="M9 11h6" />
      </svg>
    ),
    'logo': (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    'invitation': (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    'card': (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <path d="M14 10h4" />
        <path d="M14 14h4" />
      </svg>
    ),
    'poster': (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <rect x="3" y="2" width="18" height="20" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h6" />
        <circle cx="16" cy="16" r="2" />
      </svg>
    ),
    'photo': (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
    'video': (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <path d="M7 2v2" />
        <path d="M17 2v2" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M10 10l5 3-5 3z" />
      </svg>
    ),
    'sketching': (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="M15 5l4 4" />
      </svg>
    ),
    'painting': (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        <circle cx="7.5" cy="11.5" r="1.5" style={{ ...iconStyle, fill: '#C9A84C', stroke: 'none' }} />
        <circle cx="10" cy="7.5" r="1.5" style={{ ...iconStyle, fill: '#C9A84C', stroke: 'none' }} />
        <circle cx="14.5" cy="7.5" r="1.5" style={{ ...iconStyle, fill: '#C9A84C', stroke: 'none' }} />
        <circle cx="17" cy="11" r="1.5" style={{ ...iconStyle, fill: '#C9A84C', stroke: 'none' }} />
      </svg>
    ),
  };

  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(232,213,163,0.15) 100%)',
        border: '1.5px solid rgba(201,168,76,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.25rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 16px rgba(201,168,76,0.06)',
      }}
      className="service-icon-circle"
    >
      {icons[name] || <span style={{ fontSize: '1.5rem', color: '#C9A84C' }}>✦</span>}
    </div>
  );
}

export default function HorizontalScrollGallery({ items }: HorizontalScrollGalleryProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll('.service-grid-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div className="px-6 sm:px-8 pb-12">
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="service-grid-card"
            style={{
              opacity: 0,
              background: '#FAF7F2',
              border: '1px solid #E5DDD0',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.4s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = '#C9A84C';
              el.style.boxShadow = '0 20px 50px rgba(201,168,76,0.08), 0 8px 24px rgba(0,0,0,0.04)';
              el.style.transform = 'translateY(-8px)';
              const iconCircle = el.querySelector('.service-icon-circle') as HTMLElement;
              if (iconCircle) {
                iconCircle.style.background = 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(232,213,163,0.3) 100%)';
                iconCircle.style.borderColor = 'rgba(201,168,76,0.5)';
                iconCircle.style.transform = 'scale(1.1)';
                iconCircle.style.boxShadow = '0 8px 24px rgba(201,168,76,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = '#E5DDD0';
              el.style.boxShadow = 'none';
              el.style.transform = 'translateY(0)';
              const iconCircle = el.querySelector('.service-icon-circle') as HTMLElement;
              if (iconCircle) {
                iconCircle.style.background = 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(232,213,163,0.15) 100%)';
                iconCircle.style.borderColor = 'rgba(201,168,76,0.25)';
                iconCircle.style.transform = 'scale(1)';
                iconCircle.style.boxShadow = '0 4px 16px rgba(201,168,76,0.06)';
              }
            }}
          >
            <ServiceIcon name={item.icon} />
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                color: '#1A1A1A',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}
            >
              {item.title}
            </h3>
            {item.description && (
              <p style={{ color: '#6B6B6B', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
