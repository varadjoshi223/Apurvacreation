'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/ui/Navbar';
import TextReveal from '@/components/ui/TextReveal';

gsap.registerPlugin(ScrollTrigger);

interface FormData { name: string; email: string; phone: string; service: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Please enter a valid email';
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitting(true);
      try {
        await fetch("https://formsubmit.co/ajax/apurvacreation2610@gmail.com", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "Form Subject": `Design Inquiry from ${formData.name}`,
            Name: formData.name,
            Email: formData.email,
            Phone: formData.phone || "Not provided",
            Service: formData.service || "Not specified",
            Message: formData.message
          })
        });

        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 6000);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setFileName('');
      } catch (err) {
        console.error("Form submission failed", err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Stagger form fields in
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(fields,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.6, ease: 'power2.out' }
        );
      }
      if (infoRef.current) {
        const cards = infoRef.current.querySelectorAll('.info-card');
        gsap.fromTo(cards,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.8, ease: 'power2.out' }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const contactLinks = [
    { icon: '✉️', label: 'Email Us', value: 'apurvacreation2610@gmail.com', href: 'mailto:apurvacreation2610@gmail.com' },
    { icon: '📷', label: 'Instagram', value: 'Follow on Instagram', href: 'https://www.instagram.com/' },
    { icon: '👤', label: 'Facebook', value: 'Follow on Facebook', href: 'https://www.facebook.com/' },
  ];

  return (
    <main className="relative min-h-screen" style={{ background: '#FAF7F2' }}>
      <Navbar />

      <section className="pt-36 pb-12 px-8 sm:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] font-medium tracking-[5px] uppercase mb-6" style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}>
            Let&apos;s Connect
          </motion.p>
          <TextReveal mode="word" tag="h1" className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>
            Get In Touch
          </TextReveal>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="h-[1.5px] mx-auto mb-6 w-[60px]" style={{ background: '#C9A84C', transformOrigin: 'center' }} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: '#6B6B6B' }}>
            Have a project in mind? We&apos;d love to hear about it. Reach out and we&apos;ll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="pb-28 px-8 sm:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div ref={formRef} className="lg:col-span-3">
            <div className="rounded-2xl p-8 sm:p-10 border relative overflow-hidden" style={{ background: '#FAF7F2', borderColor: '#C9A84C' }}>
              {submitted && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl p-6" style={{ background: 'rgba(250,247,242,0.98)' }}>
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="text-center max-w-sm">
                    <div className="text-4xl mb-4" style={{ color: '#C9A84C' }}>✓</div>
                    <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>Inquiry Sent Successfully</h3>
                    <p className="text-xs mb-3 leading-relaxed" style={{ color: '#6B6B6B' }}>Your message has been sent directly to apurvacreation2610@gmail.com.</p>
                    <p className="text-[10px] italic border-t pt-3" style={{ color: '#B5B0A6', borderColor: '#E5DDD0' }}>
                      Note: If this is your first submission, check your email inbox to activate FormSubmit.
                    </p>
                  </motion.div>
                </motion.div>
              )}
              <h3 className="text-xl font-semibold mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A1A' }}>Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="form-field" style={{ opacity: 0 }}>
                    <label className="text-[11px] font-medium tracking-[2px] uppercase block mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: focusedField === 'name' ? '#C9A84C' : '#6B6B6B' }}>Full Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField('')} placeholder="John Doe" className="luxury-input" style={errors.name ? { borderBottomColor: '#c0392b' } : {}} />
                    {errors.name && <span className="text-xs mt-1 block" style={{ color: '#c0392b' }}>{errors.name}</span>}
                  </div>
                  <div className="form-field" style={{ opacity: 0 }}>
                    <label className="text-[11px] font-medium tracking-[2px] uppercase block mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: focusedField === 'email' ? '#C9A84C' : '#6B6B6B' }}>Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField('')} placeholder="john@example.com" className="luxury-input" style={errors.email ? { borderBottomColor: '#c0392b' } : {}} />
                    {errors.email && <span className="text-xs mt-1 block" style={{ color: '#c0392b' }}>{errors.email}</span>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="form-field" style={{ opacity: 0 }}>
                    <label className="text-[11px] font-medium tracking-[2px] uppercase block mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: focusedField === 'phone' ? '#C9A84C' : '#6B6B6B' }}>Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField('')} placeholder="+91 99999 99999" className="luxury-input" />
                  </div>
                  <div className="form-field" style={{ opacity: 0 }}>
                    <label className="text-[11px] font-medium tracking-[2px] uppercase block mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: focusedField === 'service' ? '#C9A84C' : '#6B6B6B' }}>Select Service</label>
                    <select value={formData.service} onChange={(e) => handleChange('service', e.target.value)} onFocus={() => setFocusedField('service')} onBlur={() => setFocusedField('')} className="luxury-input appearance-none" style={{ background: 'transparent' }}>
                      <option value="">Choose a service</option>
                      <option value="logo">Logo Design</option>
                      <option value="banner">Banner Design</option>
                      <option value="poster">Poster Design</option>
                      <option value="invitation">Invitation Design</option>
                      <option value="card">Visiting Card Design</option>
                      <option value="book">Book Cover Design</option>
                      <option value="photo">Photo Editing</option>
                      <option value="video">Video Editing</option>
                    </select>
                  </div>
                </div>
                <div className="form-field" style={{ opacity: 0 }}>
                  <label className="text-[11px] font-medium tracking-[2px] uppercase block mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: focusedField === 'message' ? '#C9A84C' : '#6B6B6B' }}>Your Message *</label>
                  <textarea value={formData.message} onChange={(e) => handleChange('message', e.target.value)} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField('')} placeholder="Tell us about your project..." rows={4} className="luxury-input resize-none" style={errors.message ? { borderBottomColor: '#c0392b' } : {}} />
                  {errors.message && <span className="text-xs mt-1 block" style={{ color: '#c0392b' }}>{errors.message}</span>}
                </div>
                <div className="form-field" style={{ opacity: 0 }}>
                  <label className="text-[11px] font-medium tracking-[2px] uppercase block mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B6B6B' }}>Upload Reference</label>
                  <div onClick={() => fileInputRef.current?.click()} className="py-3 flex items-center justify-center gap-3 border-b transition-colors cursor-pointer" style={{ borderColor: '#E5DDD0', color: '#B5B0A6' }}>
                    <span style={{ color: '#C9A84C' }}>📎</span>
                    <span className="text-sm">{fileName || 'Click to attach a file'}</span>
                  </div>
                  <input ref={fileInputRef} type="file" onChange={(e) => { const f = e.target.files?.[0]; if (f) setFileName(f.name); }} className="hidden" accept="image/*,.pdf,.doc,.docx" />
                </div>
                <div className="form-field" style={{ opacity: 0 }}>
                  <motion.button 
                    whileHover={!submitting ? { y: -2, background: '#B8973E' } : {}} 
                    whileTap={!submitting ? { scale: 0.99 } : {}} 
                    type="submit" 
                    disabled={submitting}
                    className="w-full py-4 rounded-full text-[12px] font-medium tracking-[2px] uppercase transition-all flex items-center justify-center gap-2" 
                    style={{ 
                      fontFamily: 'Montserrat, sans-serif', 
                      background: submitting ? '#D4B85A' : '#C9A84C', 
                      color: '#FAF7F2', 
                      border: 'none',
                      cursor: submitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {submitting ? 'Sending Mail...' : 'Send Mail →'}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>

          <div ref={infoRef} className="lg:col-span-2 space-y-5">
            {contactLinks.map((link) => (
              <motion.a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -3, borderColor: '#C9A84C' }}
                className="info-card block rounded-2xl p-6 border transition-all text-center sm:text-left"
                style={{ background: '#FAF7F2', borderColor: '#E5DDD0', opacity: 0 }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="text-xl">{link.icon}</div>
                  <div>
                    <p className="text-[11px] font-medium tracking-[2px] uppercase mb-0.5" style={{ fontFamily: 'Montserrat, sans-serif', color: '#C9A84C' }}>{link.label}</p>
                    <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{link.value}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
