'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@/types';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle }) => {
  const { question, answer } = faq;

  return (
    <div className="border-b border-gold-border/30 last:border-0 py-4.5">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        suppressHydrationWarning
        className="flex justify-between items-center w-full text-left font-display font-medium text-[17px] md:text-[19px] text-text-primary hover:text-gold-light transition-colors duration-300 py-1.5 focus:outline-none focus:text-gold-light group cursor-pointer"
      >
        <span className="pr-4">{question}</span>
        <ChevronDown
          size={18}
          className={cn(
            "text-gold transition-transform duration-300 shrink-0",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="faq-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-sm md:text-[15px] text-text-primary/70 leading-relaxed pt-2 pb-4 font-light">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
