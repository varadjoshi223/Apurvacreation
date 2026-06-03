'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  mode?: 'word' | 'char' | 'line';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  triggerStart?: string;
}

export default function TextReveal({
  children,
  mode = 'word',
  tag: Tag = 'p',
  className = '',
  style = {},
  stagger = 0.04,
  duration = 0.8,
  delay = 0,
  once = true,
  triggerStart = 'top 85%',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const container = containerRef.current;
    const text = children;
    
    // Split text into fragments
    let fragments: string[] = [];
    if (mode === 'char') {
      fragments = text.split('');
    } else if (mode === 'word') {
      fragments = text.split(' ');
    } else {
      fragments = text.split('\n');
    }

    // Create spans
    container.innerHTML = fragments
      .map((frag, i) => {
        const content = mode === 'word' ? (i < fragments.length - 1 ? frag + '\u00A0' : frag) : frag;
        return `<span class="text-reveal-fragment" style="display:inline-block;opacity:0;transform:translateY(30px) rotate(2deg);">${content}</span>`;
      })
      .join('');

    const fragmentEls = container.querySelectorAll('.text-reveal-fragment');

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: triggerStart,
      onEnter: () => {
        if (once && hasAnimated.current) return;
        hasAnimated.current = true;
        gsap.to(fragmentEls, {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [children, mode, stagger, duration, delay, once, triggerStart]);

  return (
    <Tag
      // @ts-expect-error - dynamic tag ref
      ref={containerRef}
      className={`text-reveal-container ${className}`}
      style={{ ...style, overflow: 'hidden' }}
    >
      {children}
    </Tag>
  );
}
