'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll } from 'motion/react';

interface Testimonial {
  avatar: string;
  name: string;
  title: string;
  comment: string;
}

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * testimonials.length), testimonials.length - 1);
      setActive(idx);
    });
    return unsub;
  }, [scrollYProgress, testimonials.length]);

  const current = testimonials[active];

  return (
    <div
      ref={containerRef}
      style={{ height: `${testimonials.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center bg-gradient-to-br from-pink-50 to-white overflow-hidden">
        {/* Background blob */}
        <motion.div
          className="absolute rounded-full bg-[#f95396]/8 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        />

        <div className="relative max-w-4xl mx-auto px-6 w-full text-center">
          {/* Counter */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="text-2xl font-bold text-[#f95396] tabular-nums">
              {String(active + 1).padStart(2, '0')}
            </span>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ width: i === active ? 28 : 6, backgroundColor: i === active ? '#f95396' : '#f9539640' }}
                  transition={{ duration: 0.3 }}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>
            <span className="text-sm text-gray-400 tabular-nums">
              {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>

          {/* Quote mark */}
          <div className="text-[#f95396]/20 text-9xl font-serif leading-none select-none -mb-4">"</div>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-3xl mx-auto text-2xl sm:text-3xl font-medium text-gray-800 leading-snug"
            >
              {current.comment}
            </motion.p>
          </AnimatePresence>

          {/* Divider */}
          <motion.div
            key={active + '-div'}
            className="mt-8 mx-auto h-px bg-gradient-to-r from-transparent via-[#f95396]/40 to-transparent"
            initial={{ width: '0%' }}
            animate={{ width: '40%' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {/* Person */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + '-person'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="mt-6 flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-[#f95396]/30">
                <Image
                  src={current.avatar}
                  alt={current.name}
                  width={112}
                  height={112}
                  sizes="112px"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{current.name}</p>
                <p className="text-[#f95396] text-sm">{current.title}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
