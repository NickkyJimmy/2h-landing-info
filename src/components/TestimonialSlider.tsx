'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

interface Testimonial {
  avatar: string;
  name: string;
  title: string;
  comment: string;
}

const HEADING_WORDS = [
  { text: 'Các',         bold: true  },
  { text: 'nhà',         bold: true  },
  { text: 'lãnh',        bold: true  },
  { text: 'đạo',         bold: true  },
  { text: 'MoMo',        bold: true  },
  { text: 'chia',        bold: false },
  { text: 'sẻ',          bold: false },
  { text: 'cảm',         bold: false },
  { text: 'nhận',        bold: false },
  { text: 'thực',        bold: false },
  { text: 'tế',          bold: false },
  { text: 'sau',         bold: false },
  { text: 'khi',         bold: false },
  { text: 'tham',        bold: false },
  { text: 'gia',         bold: false },
  { text: 'Customer',    bold: false },
  { text: '2H.',         bold: false },
];

function WordToken({
  text, bold, progress, rangeStart, rangeEnd,
}: {
  text: string; bold: boolean;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  rangeStart: number; rangeEnd: number;
}) {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-2 ${bold ? 'font-bold text-gray-900' : 'font-normal text-gray-900'}`}>
      {text}
    </motion.span>
  );
}

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  // +1 "page" for word-reveal, then 1 per testimonial
  const totalPages = 1 + testimonials.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'reveal' | 'cards'>('reveal');
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Word-reveal maps over the first 1/totalPages of scroll
  const revealProgress = useTransform(scrollYProgress, [0, 1 / totalPages], [0, 1]);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const revealEnd = 1 / totalPages;
      if (v < revealEnd) {
        setPhase('reveal');
      } else {
        setPhase('cards');
        const cardProgress = (v - revealEnd) / (1 - revealEnd);
        const idx = Math.min(Math.floor(cardProgress * testimonials.length), testimonials.length - 1);
        setActive(idx);
      }
    });
    return unsub;
  }, [scrollYProgress, testimonials.length, totalPages]);

  const current = testimonials[active];

  return (
    <div id="testimonials">
      <div
        ref={containerRef}
        style={{ height: `${totalPages * 100}vh` }}
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

          <div className="relative max-w-5xl mx-auto px-6 w-full">
            <AnimatePresence mode="wait">

              {/* ── Phase 1: Word reveal ── */}
              {phase === 'reveal' && (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
                      <path d="M16 3.13a4 4 0 010 7.75"/><path d="M21 21v-2a4 4 0 00-3-3.87"/>
                    </svg>
                    Chia sẻ từ các nhà lãnh đạo
                  </div>
                  <p className="text-4xl sm:text-5xl leading-snug">
                    {HEADING_WORDS.map((w, i) => (
                      <WordToken
                        key={i}
                        text={w.text}
                        bold={w.bold}
                        progress={revealProgress}
                        rangeStart={i / HEADING_WORDS.length}
                        rangeEnd={(i + 1) / HEADING_WORDS.length}
                      />
                    ))}
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-xs text-gray-400 flex items-center gap-2"
                  >
                    <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>↓</motion.span>
                    Cuộn để xem cảm nhận
                  </motion.p>
                </motion.div>
              )}

              {/* ── Phase 2: Testimonial cards ── */}
              {phase === 'cards' && (
                <motion.div
                  key="cards"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-center"
                >
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
                      className="max-w-3xl mx-auto text-2xl sm:text-3xl font-medium text-gray-800 leading-snug"
                    >
                      {current.comment}
                    </motion.p>
                  </AnimatePresence>

                  {/* Divider */}
                  <div className="mt-8 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-[#f95396]/40 to-transparent" />

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
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
