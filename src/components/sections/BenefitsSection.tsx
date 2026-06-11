'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BENEFITS } from '@/lib/data';
import { BenefitItem } from '../ui/BenefitItem';
import { SectionTag } from '../ui/SectionTag';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const BenefitsSection: React.FC = () => {
  const { ref, hasRevealed } = useScrollReveal(0.08, true);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' } 
    },
  };

  return (
    <section
      id="benefits"
      ref={ref as any}
      className="py-20 md:py-28 bg-bg-dark border-b border-gold-border/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <SectionTag text="Therapeutic Benefits" className="mb-4" />
          <h2 className="font-display text-3xl md:text-[44px] font-bold tracking-tight text-text-primary mb-4 leading-tight">
            The Benefits of <span className="gold-shimmer-text">Foot Reflexology</span>
          </h2>
          <p className="text-text-primary/70 font-light max-w-2xl text-sm md:text-base leading-relaxed">
            Discover how stimulating precise reflex points on the feet triggers natural biological healing throughout your organs and systems.
          </p>
        </div>

        {/* Staggered Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasRevealed ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {BENEFITS.map((benefit) => (
            <motion.div key={benefit.id} variants={itemVariants}>
              <BenefitItem benefit={benefit} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
