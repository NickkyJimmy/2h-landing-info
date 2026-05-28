'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

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
  progress,
  rangeStart,
  rangeEnd,
}: {
  text: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  rangeStart: number;
  rangeEnd: number;
}) {
  const opacity    = useTransform(progress, [rangeStart, rangeEnd], [0.18, 1]);
  const fontWeight = useTransform(progress, [rangeStart, rangeEnd], [400, 700]);
  return (
    <motion.span style={{ opacity, fontWeight }} className="mr-[0.3em] text-gray-900 inline-block">
      {text}
    </motion.span>
  );
}

export default function WordReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} style={{ height: '200vh' }} className="relative">
      <div className="sticky top-0 h-screen flex items-center bg-gradient-to-br from-pink-50 to-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="7" r="4"/>
              <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
              <path d="M16 3.13a4 4 0 010 7.75"/>
              <path d="M21 21v-2a4 4 0 00-3-3.87"/>
            </svg>
            Chia sẻ từ các nhà lãnh đạo
          </div>
          <p className="text-4xl sm:text-5xl leading-snug">
            {WORDS.map((w, i) => (
              <WordToken
                key={i}
                text={w.text}
                progress={scrollYProgress}
                rangeStart={i / WORDS.length}
                rangeEnd={(i + 1) / WORDS.length}
              />
            ))}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-xs text-gray-400 flex items-center gap-2"
          >
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>↓</motion.span>
            Cuộn để xem cảm nhận
          </motion.p>
        </div>
      </div>
    </div>
  );
}
