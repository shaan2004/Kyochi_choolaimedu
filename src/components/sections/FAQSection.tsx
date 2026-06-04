'use client';

import React, { useState, useEffect } from 'react';
import { FAQS } from '@/lib/data';
import { FAQItem } from '../ui/FAQItem';
import { SectionTag } from '../ui/SectionTag';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const { ref, hasRevealed } = useScrollReveal(0.12, true);

  useEffect(() => {
    if (FAQS.length > 0) {
      setOpenId(FAQS[0].id);
    }
  }, []);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      ref={ref as any}
      className="py-20 md:py-28 bg-[#0d0d0d] border-b border-gold-border/20 relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <SectionTag text="Common Inquiries" className="mb-4" />
          <h2 className="font-display text-3xl md:text-[44px] font-bold tracking-tight text-text-primary mb-4 leading-tight">
            Frequently Asked <span className="gold-shimmer-text">Questions</span>
          </h2>
          <p className="text-text-primary/70 font-light text-sm md:text-base leading-relaxed max-w-lg">
            Learn more about the differences between foot massage and reflexology, what to expect, and how the booking system operates.
          </p>
        </div>

        {/* Accordion container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="border-t border-b border-gold-border/20 py-2.5"
        >
          {FAQS.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};
