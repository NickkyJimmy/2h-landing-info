'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

function RevealToken({
  text,
  bold,
  progress,
  rangeStart,
  rangeEnd,
}: {
  text: string;
  bold?: boolean;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  rangeStart: number;
  rangeEnd: number;
}) {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0.15, 0.85]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.25em] inline-block${bold ? ' font-bold' : ''}`}
    >
      {text}
    </motion.span>
  );
}

export function WordRevealText({
  words,
  className = 'text-3xl sm:text-4xl lg:text-5xl leading-snug text-gray-900',
}: {
  words: { text: string; bold?: boolean }[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });
  return (
    <div ref={containerRef}>
      <p className={className}>
        {words.map((w, i) => (
          <RevealToken
            key={i}
            text={w.text}
            bold={w.bold}
            progress={scrollYProgress}
            rangeStart={i / words.length}
            rangeEnd={(i + 1) / words.length}
          />
        ))}
      </p>
    </div>
  );
}

const WORDS = [
  { text: 'Các',      bold: true  },
  { text: 'nhà',      bold: true  },
  { text: 'lãnh',     bold: true  },
  { text: 'đạo',      bold: true  },
  { text: 'MoMo',     bold: true  },
  { text: 'chia',     bold: false },
  { text: 'sẻ',       bold: false },
  { text: 'cảm',      bold: false },
  { text: 'nhận',     bold: false },
  { text: 'thực',     bold: false },
  { text: 'tế',       bold: false },
  { text: 'sau',      bold: false },
  { text: 'khi',      bold: false },
  { text: 'tham',     bold: false },
  { text: 'gia',      bold: false },
  { text: 'Customer', bold: false },
  { text: '2H.',      bold: false },
];

function WordToken({
  text,
  bold,
  progress,
  rangeStart,
  rangeEnd,
}: {
  text: string;
  bold: boolean;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  rangeStart: number;
  rangeEnd: number;
}) {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0.15, 0.85]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.25em] inline-block${bold ? ' font-bold' : ''}`}
    >
      {text}
    </motion.span>
  );
}

export default function WordReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  return (
    <div ref={containerRef} className="relative">
      <div className="relative bg-pink-50 overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-48">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">

          {/* Label */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 lg:hidden">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="7" r="4"/>
              <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
              <path d="M16 3.13a4 4 0 010 7.75"/>
              <path d="M21 21v-2a4 4 0 00-3-3.87"/>
            </svg>
            Testimonials
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start">

            {/* Left — label (desktop only) */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500 pt-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="7" r="4"/>
                <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
                <path d="M16 3.13a4 4 0 010 7.75"/>
                <path d="M21 21v-2a4 4 0 00-3-3.87"/>
              </svg>
              Testimonials
            </div>

            {/* Right — word-by-word reveal */}
            <div>
              <p className="text-3xl sm:text-4xl lg:text-5xl leading-snug text-gray-900">
                {WORDS.map((w, i) => (
                  <WordToken
                    key={i}
                    text={w.text}
                    bold={w.bold}
                    progress={scrollYProgress}
                    rangeStart={i / WORDS.length}
                    rangeEnd={(i + 1) / WORDS.length}
                  />
                ))}
              </p>
            </div>

          </div>
        </div>

        {/* Bottom fade — same as Noora section exit */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-pink-50 pointer-events-none" />
      </div>
    </div>
  );
}
