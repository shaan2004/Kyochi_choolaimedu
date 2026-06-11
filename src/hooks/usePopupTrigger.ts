'use client';

import { useEffect, useState } from 'react';

export function usePopupTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const statsElement = document.getElementById('stats');
      if (statsElement) {
        const rect = statsElement.getBoundingClientRect();
        // If bottom of counters (stats) section has scrolled past the top of the viewport
        if (rect.bottom <= 0) {
          setIsOpen(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check immediately in case they refresh while already scrolled past
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isOpen, setIsOpen };
}
