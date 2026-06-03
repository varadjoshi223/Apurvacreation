'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import HorizontalScrollGallery from '@/components/ui/HorizontalScrollGallery';
import GoldButton from '@/components/ui/GlowButton';
import TextReveal from '@/components/ui/TextReveal';

const services = [
  { icon: 'book-cover', title: 'Book Cover Design', description: 'Captivating covers that tell your story before the first page is turned.' },
  { icon: 'banner', title: 'Banner Design', description: 'Visual banners that command attention and elevate your brand presence.' },
  { icon: 'logo', title: 'Logo Design', description: 'Iconic logos that define your brand and leave a lasting impression.' },
  { icon: 'invitation', title: 'Invitation Design', description: 'Elegant invitations that set the perfect tone for your special moments.' },
  { icon: 'card', title: 'Visiting Card Design', description: 'Professional cards crafted with precision and refined sophistication.' },
  { icon: 'poster', title: 'Poster Design', description: 'Bold posters that captivate audiences and communicate with impact.' },
  { icon: 'photo', title: 'Photo Editing', description: 'Pixel-perfect retouching that transforms ordinary into extraordinary.' },
  { icon: 'video', title: 'Video Editing', description: 'Cinematic edits that bring your stories to life with elegance.' },
  { icon: 'sketching', title: 'Sketching', description: 'Hand-drawn sketches that bring raw ideas to life with artistic precision.' },
  { icon: 'painting', title: 'Paintings', description: 'Expressive paintings crafted with rich colors and soulful strokes.' },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen" style={{ background: '#FAF7F2' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 px-8 sm:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-medium tracking-[5px] uppercase mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}
          >
            What We Offer
          </motion.p>
          <TextReveal mode="word" tag="h1" className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>
            Our Services
          </TextReveal>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="h-[1.5px] mx-auto mb-6 w-[60px]"
            style={{ background: '#C9A84C', transformOrigin: 'center' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base max-w-lg mx-auto leading-relaxed"
            style={{ color: '#6B6B6B' }}
          >
            Premium creative solutions crafted with meticulous attention to detail
          </motion.p>
        </div>
      </section>

      {/* Services Grid (reusing the Homepage component layout & icons) */}
      <HorizontalScrollGallery items={services} />

      {/* CTA */}
      <section className="py-24 px-8 sm:px-12 border-t" style={{ background: '#F0EBE1', borderColor: '#E5DDD0' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TextReveal mode="word" tag="h2" className="text-2xl sm:text-4xl font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>
              Need Something Custom?
            </TextReveal>
            <div className="w-[60px] h-[1.5px] mx-auto mb-6" style={{ background: '#C9A84C' }} />
            <p className="text-base mb-8 max-w-md mx-auto leading-relaxed" style={{ color: '#6B6B6B' }}>
              Every project is unique. Let&apos;s discuss your specific vision and create something extraordinary.
            </p>
            <GoldButton href="/contact" variant="filled" size="lg">
              Get In Touch →
            </GoldButton>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
