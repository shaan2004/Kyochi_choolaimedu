'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(threshold = 0.15, once = true) {
  const ref = useRef<HTMLElement | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setHasRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // slightly offset for better feel
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, once]);

  return { ref, hasRevealed };
}
