'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { usePopupTrigger } from '@/hooks/usePopupTrigger';
import { BookingForm } from './BookingForm';
import { cn } from '@/lib/utils';

export const PopupBooking: React.FC = () => {
  const { isOpen, setIsOpen } = usePopupTrigger();

  // Handle Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, setIsOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="popup-booking-root"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { type: 'spring', stiffness: 380, damping: 28 },
            }}
            exit={{ scale: 0.92, opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className={cn(
              "relative z-10 w-[calc(100%-2rem)] max-w-[400px] sm:max-w-lg bg-surface-dark border border-gold-border/80 shadow-[0_40px_80px_rgba(0,0,0,0.75)] overflow-y-auto max-h-[85vh] sm:max-h-none rounded-2xl sm:rounded-3xl flex flex-col"
            )}
          >
            {/* Banner Image */}
            <div className="relative w-full h-20 sm:h-44 shrink-0 overflow-hidden rounded-t-2xl sm:rounded-t-none">
              <Image 
                src="/assets/og-image.jpg"
                alt="Kyochi Healing Center"
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent" />
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close booking form"
              suppressHydrationWarning
              className="absolute top-3 right-3 p-2 rounded-full border border-gold-border/20 text-gold hover:bg-gold/10 hover:border-gold/60 bg-surface-dark/40 backdrop-blur-sm transition-all duration-300 cursor-pointer z-20"
            >
              <X size={16} aria-hidden="true" className="sm:size-[18px]" />
            </button>

            <div className="p-4 sm:p-8 pt-2.5 sm:pt-6">
              <div className="mb-3.5 sm:mb-5 mt-1 sm:mt-2">
                <h2 id="modal-title" className="font-display text-lg sm:text-3xl font-semibold text-gold mb-0.5 sm:mb-1">
                  Book Consultation
                </h2>
                <p className="text-[10px] sm:text-sm text-text-primary/70 font-light">
                  Secure your healing session in 60 seconds on WhatsApp.
                </p>
              </div>

              <BookingForm
                defaultService=""
                onSuccess={handleClose}
                idPrefix="popup-"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
