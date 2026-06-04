'use client';

import React, { useEffect } from 'react';
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
              "relative z-10 w-full h-full sm:h-auto max-w-none sm:max-w-lg p-6 sm:p-8 bg-[#111111] border border-gold-border/80 shadow-[0_40px_80px_rgba(0,0,0,0.75)]",
              "flex flex-col justify-center sm:block sm:rounded-3xl"
            )}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close booking form"
              className="absolute top-5 right-5 p-2.5 rounded-full border border-gold-border/20 text-gold hover:bg-gold/10 hover:border-gold/60 transition-all duration-300 cursor-pointer"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="mb-6.5 mt-4 sm:mt-0">
              <h2 id="modal-title" className="font-display text-3xl sm:text-4xl font-semibold text-gold mb-1">
                Book Consultation
              </h2>
              <p className="text-xs sm:text-sm text-text-primary/70 font-light">
                Secure your healing session in 60 seconds on WhatsApp.
              </p>
            </div>

            <BookingForm
              defaultService=""
              onSuccess={handleClose}
              idPrefix="popup-"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
