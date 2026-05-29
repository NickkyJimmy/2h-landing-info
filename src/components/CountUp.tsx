'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollCount<T extends HTMLElement>(end: number, useLocale = false) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        cancelAnimationFrame(raf);
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(eased * end));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [end]);

  const display = useLocale ? value.toLocaleString('en-US') : String(value);
  return { ref, display };
}
