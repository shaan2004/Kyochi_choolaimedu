'use client';

import { useEffect, useState } from 'react';

export function usePopupTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (window.scrollY < 20) return;
      const statsElement = document.getElementById('stats');
      if (statsElement) {
        const rect = statsElement.getBoundingClientRect();
        // If top of counters (stats) section enters the viewport
        if (rect.top <= window.innerHeight) {
          setIsOpen(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isOpen, setIsOpen };
}
