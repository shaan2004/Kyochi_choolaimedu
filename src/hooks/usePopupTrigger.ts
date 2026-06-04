'use client';

import { useEffect, useState } from 'react';

export function usePopupTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already shown during this session
    const shown = sessionStorage.getItem('kyochi_popup_shown');
    if (shown === 'true') return;

    let isTimeMet = false;
    let isScrollMet = false;
    let timeoutId: NodeJS.Timeout;

    const evaluateTrigger = () => {
      if (isTimeMet && isScrollMet) {
        setIsOpen(true);
        sessionStorage.setItem('kyochi_popup_shown', 'true');
        cleanup();
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0 && scrollY >= docHeight * 0.4) {
        isScrollMet = true;
        evaluateTrigger();
      }
    };

    // Wait at least 3 seconds before opening
    timeoutId = setTimeout(() => {
      isTimeMet = true;
      // In case user has already scrolled past 40% before 3s limit
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollY >= docHeight * 0.4) {
        isScrollMet = true;
      }
      evaluateTrigger();
    }, 3000);

    window.addEventListener('scroll', handleScroll, { passive: true });

    const cleanup = () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };

    return cleanup;
  }, []);

  return { isOpen, setIsOpen };
}
