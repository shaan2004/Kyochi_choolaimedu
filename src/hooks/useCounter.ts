'use client';

import { useEffect, useState } from 'react';

// Ease out quart function
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = easeOutQuart(progress);
      setCount(easeProgress * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, start]);

  return count;
}
