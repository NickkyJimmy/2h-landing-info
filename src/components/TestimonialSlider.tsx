'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// ---------- Word-reveal heading ----------
const HEADING_BOLD = ['Các', 'nhà', 'lãnh', 'đạo', 'MoMo'];
const HEADING_LIGHT = ['chia', 'sẻ', 'cảm', 'nhận', 'thực', 'tế', 'sau', 'khi', 'tham', 'gia', 'chương', 'trình', 'Customer', '2H.'];
const ALL_WORDS = [...HEADING_BOLD, ...HEADING_LIGHT];

function WordReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.3'] });

  return (
    <div ref={ref} className="py-24 bg-[#f7f7f6]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M16 3.13a4 4 0 010 7.75"/><path d="M21 21v-2a4 4 0 00-3-3.87"/></svg>
          Testimonials
        </div>
        <p className="text-4xl sm:text-5xl font-bold leading-snug">
          {ALL_WORDS.map((word, i) => {
            const start = i / ALL_WORDS.length;
            const end = (i + 1) / ALL_WORDS.length;
            return (
              <WordToken
                key={i}
                word={word}
                progress={scrollYProgress}
                rangeStart={start}
                rangeEnd={end}
                bold={i < HEADING_BOLD.length}
              />
            );
          })}
        </p>
      </div>
    </div>
  );
}

function WordToken({
  word, progress, rangeStart, rangeEnd, bold,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  rangeStart: number;
  rangeEnd: number;
  bold: boolean;
}) {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0.18, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={bold ? 'text-gray-900 mr-2' : 'text-gray-900 mr-2 font-normal'}
    >
      {word}{' '}
    </motion.span>
  );
}

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

  // Map scroll progress → active index
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        Math.floor(v * testimonials.length),
        testimonials.length - 1
      );
      setActive(idx);
    });
    return unsub;
  }, [scrollYProgress, testimonials.length]);

  const current = testimonials[active];

  return (
    <div id="testimonials">
      <WordReveal />
      {/* Tall scroll container (100vh per testimonial) */}
      <div
        ref={containerRef}
        style={{ height: `${testimonials.length * 100}vh` }}
        className="relative"
    >
      {/* Sticky panel */}
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

          {/* Quote text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-2xl sm:text-3xl font-medium text-gray-800 leading-snug"
            >
              {current.comment}
            </motion.p>
          </AnimatePresence>

          {/* Divider */}
          <motion.div
            className="mt-8 mx-auto h-px bg-gradient-to-r from-transparent via-[#f95396]/40 to-transparent"
            animate={{ width: ['0%', '40%'] }}
            transition={{ duration: 0.6, delay: 0.2 }}
            key={active + '-divider'}
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

          {/* Scroll hint */}
          {active === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-xs text-gray-400 flex items-center justify-center gap-2"
            >
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >↓</motion.span>
              Cuộn để xem thêm
            </motion.p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
