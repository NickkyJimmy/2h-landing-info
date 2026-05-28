'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  avatar: string;
  name: string;
  title: string;
  comment: string;
}

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Decorative quote mark */}
        <div className="text-[#f95396]/30 text-8xl font-serif leading-none select-none mb-2">"</div>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="text-2xl sm:text-3xl font-medium text-gray-800 leading-snug"
          >
            {current.comment}
          </motion.p>
        </AnimatePresence>

        {/* Divider */}
        <div className="mt-8 mx-auto w-12 h-0.5 bg-gradient-to-r from-[#ff82b2] to-[#f95396] rounded-full" />

        {/* Name + title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + '-name'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <span className="font-semibold text-gray-900 text-sm">{current.name}</span>
            <span className="text-[#f95396] text-sm ml-2">{current.title}</span>
          </motion.div>
        </AnimatePresence>

        {/* Avatar strip */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300 focus:outline-none"
              style={{
                width:        i === active ? 56 : 40,
                height:       i === active ? 56 : 40,
                opacity:      i === active ? 1 : 0.4,
                borderRadius: '14px',
                overflow:     'hidden',
                flexShrink:   0,
                outline:      i === active ? '2.5px solid #f95396' : 'none',
                outlineOffset: '2px',
              }}
              aria-label={t.name}
            >
              <Image
                src={t.avatar}
                alt={t.name}
                width={112}
                height={112}
                sizes="112px"
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
