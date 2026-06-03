'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/ui/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeading from '@/components/ui/SectionHeading';
import GoldButton from '@/components/ui/GlowButton';
import TextReveal from '@/components/ui/TextReveal';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: '2020', title: 'The Beginning', desc: 'Founded with a passion for visual storytelling and a belief that great design transforms brands.' },
  { year: '2021', title: 'Building Trust', desc: 'Grew to serve 50+ clients. Built a reputation for delivering refined, high-quality designs.' },
  { year: '2022', title: 'Expanding Horizons', desc: 'Launched video editing and photo retouching services. Invested in premium tools.' },
  { year: '2023', title: 'Growing Recognition', desc: 'Crossed 300+ projects. Began collaborating with brands across diverse industries.' },
  { year: '2024', title: 'Embracing Innovation', desc: 'Integrated modern design workflows. Combined timeless aesthetics with contemporary techniques.' },
  { year: '2025', title: 'The Journey Continues', desc: 'With 500+ projects and 200+ happy clients, we continue pushing the boundaries of creative design.' },
];

const values = [
  { icon: '✦', title: 'Creativity', desc: 'Original thinking and artistic vision guide every project.' },
  { icon: '◆', title: 'Quality', desc: 'Meticulous attention to detail ensures every pixel is purposeful.' },
  { icon: '⬡', title: 'Collaboration', desc: 'Your vision is our compass. We work closely with every client.' },
  { icon: '▸', title: 'Excellence', desc: 'We pursue perfection relentlessly, raising the bar with every design.' },
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
          const dur = 2000;
          const st = performance.now();
          const anim = (now: number) => {
            const el = now - st;
            const p = Math.min(el / dur, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(anim);
          };
          requestAnimationFrame(anim);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return (
    <div ref={ref}>
      <span className="text-4xl sm:text-5xl font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C' }}>{count}{suffix}</span>
    </div>
  );
}

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll('.tl-item');
        items.forEach((item, i) => {
          gsap.fromTo(item,
            { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 85%' } }
          );
        });
        const line = timelineRef.current.querySelector('.tl-line');
        if (line) {
          gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: timelineRef.current, start: 'top 70%', end: 'bottom 50%', scrub: 1 } });
        }
      }
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, { y: -40, ease: 'none', scrollTrigger: { trigger: heroImgRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen" style={{ background: '#FAF7F2' }}>
      <Navbar />

      <section className="pt-36 pb-20 px-8 sm:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div ref={heroImgRef} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative rounded-2xl overflow-hidden aspect-[4/5] mx-auto lg:mx-0 max-w-md w-full parallax-img-container" style={{ background: '#F0EBE1' }}>
            <img 
              src="/images/about_hero.png" 
              alt="About Apurva Creation" 
              className="absolute inset-0 w-full h-full object-contain p-8" 
            />
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/5 to-transparent" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="text-center lg:text-left">
            <p className="text-[11px] font-medium tracking-[5px] uppercase mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}>About Us</p>
            <TextReveal mode="word" tag="h1" className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>
              We are Apurva Creation
            </TextReveal>
            <div className="w-[60px] h-[1.5px] mb-6 mx-auto lg:mx-0" style={{ background: '#C9A84C' }} />
            <p className="text-base leading-relaxed mb-4" style={{ color: '#6B6B6B' }}>Apurva Creation was founded with a singular mission — to transform ideas into stunning visual experiences that leave lasting impressions.</p>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#6B6B6B' }}>We believe that design is not just about aesthetics; it&apos;s about storytelling, connection, and purpose.</p>
            <div className="flex justify-center lg:justify-start">
              <GoldButton href="/contact" variant="filled">Work With Us →</GoldButton>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-8 sm:px-12" style={{ background: '#F0EBE1' }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="Our Values" title="What Drives Us" subtitle="The principles that shape our craft and define our culture" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <GlassCard key={v.title} delay={i * 0.1} className="!bg-[#F0EBE1]">
                <div className="text-2xl mb-3" style={{ color: '#C9A84C' }}>{v.icon}</div>
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>{v.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 sm:px-12">
        <div className="max-w-3xl mx-auto">
          <SectionHeading label="Our Journey" title="The Path We've Walked" />
          <div ref={timelineRef} className="relative">
            <div className="tl-line absolute left-5 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-px" style={{ background: '#E5DDD0', transformOrigin: 'top' }} />
            <div className="space-y-14">
              {timeline.map((item, i) => (
                <div key={item.year} className={`tl-item relative flex flex-row ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`} style={{ opacity: 0 }}>
                  <div className="absolute left-5 sm:left-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2 mt-2 z-10" style={{ background: '#C9A84C' }} />
                  <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-28px)] ${i % 2 === 0 ? 'sm:pr-6 sm:text-right' : 'sm:pl-6'}`}>
                    <div className="luxury-card" style={{ padding: '24px' }}>
                      <span className="text-[11px] font-medium tracking-[3px] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}>{item.year}</span>
                      <h3 className="text-lg font-semibold mt-1 mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 sm:px-12" style={{ background: '#F0EBE1' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[{ num: 500, suffix: '+', label: 'Projects Delivered' }, { num: 200, suffix: '+', label: 'Happy Clients' }, { num: 5, suffix: '+', label: 'Years of Excellence' }].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <AnimatedCounter target={s.num} suffix={s.suffix} />
                <p className="text-xs tracking-[2px] uppercase mt-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B6B6B' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 sm:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <TextReveal mode="word" tag="h2" className="text-3xl sm:text-4xl font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>
              Let's Create Together
            </TextReveal>
            <div className="w-[60px] h-[1.5px] mx-auto mb-6" style={{ background: '#C9A84C' }} />
            <p className="text-base mb-8 max-w-md mx-auto leading-relaxed" style={{ color: '#6B6B6B' }}>Ready to bring your ideas to life? We&apos;d love to hear from you.</p>
            <GoldButton href="/contact" variant="filled" size="lg">Get In Touch →</GoldButton>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
