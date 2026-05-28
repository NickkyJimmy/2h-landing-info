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
  const [direction, setDirection] = useState(1);

  function go(idx: number) {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }
  function prev() { if (active > 0) go(active - 1); }
  function next() { if (active < testimonials.length - 1) go(active + 1); }

  const current = testimonials[active];

  return (
    <div className="pt-0 pb-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start">

          {/* Left — stats card */}
          <div className="bg-white rounded-3xl p-8 relative select-none shadow-sm">
            <span className="absolute top-5 left-5 text-pink-200 text-xl font-light">+</span>
            <span className="absolute top-5 right-5 text-pink-200 text-xl font-light">+</span>

            <div className="text-center py-8">
              <p className="text-5xl font-bold text-pink-500">4.9/5</p>
              <p className="text-gray-400 text-sm mt-2">Điểm hài lòng từ học viên</p>
            </div>

            <div className="flex justify-center mb-2">
              <div className="flex -space-x-3">
                {testimonials.slice(0, 5).map((t, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white"
                    style={{ zIndex: testimonials.length - i }}
                  >
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={80}
                      height={80}
                      sizes="80px"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mb-8">100+ nhà lãnh đạo tin tưởng</p>

            <span className="absolute bottom-24 left-5 text-pink-200 text-xl font-light">+</span>
            <span className="absolute bottom-24 right-5 text-pink-200 text-xl font-light">+</span>

            <a
              href="#contact"
              className="block w-full bg-pink-500 hover:bg-pink-600 transition-colors text-white rounded-full py-3.5 text-center font-semibold text-sm"
            >
              Đăng ký ngay
            </a>
          </div>

          {/* Right — quote */}
          <div className="pt-2 flex flex-col">
            {/* Counter */}
            <p className="text-pink-400 text-sm mb-8 tabular-nums font-medium">
              {String(active + 1).padStart(2, '0')}
              <span className="mx-2 text-gray-300">/</span>
              {String(testimonials.length).padStart(2, '0')}
            </p>

            {/* Quote */}
            <div className="min-h-[180px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.p
                  key={active}
                  custom={direction}
                  initial={{ opacity: 0, y: direction * 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: direction * -20 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-2xl sm:text-3xl font-bold italic text-gray-900 leading-snug"
                >
                  &ldquo;{current.comment}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="mt-8 h-px bg-gradient-to-r from-pink-200 via-pink-400/40 to-transparent w-2/5" />

            {/* Person */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active + '-person'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className="flex items-center gap-4 mt-6"
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-pink-100">
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
                  <p className="text-pink-500 text-sm">{current.title}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={prev}
                disabled={active === 0}
                aria-label="Previous"
                className="w-10 h-10 rounded-full border border-pink-200 flex items-center justify-center text-pink-300 disabled:opacity-25 hover:border-pink-400 hover:text-pink-500 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={next}
                disabled={active === testimonials.length - 1}
                aria-label="Next"
                className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white disabled:opacity-25 hover:bg-pink-600 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
