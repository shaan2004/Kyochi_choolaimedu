'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '@/lib/data';
import { ServiceCard } from '../ui/ServiceCard';
import { SectionTag } from '../ui/SectionTag';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'relaxation' | 'therapy' | 'healing'>('all');
  const { ref, hasRevealed } = useScrollReveal(0.1, true);

  const categories = [
    { id: 'all', label: 'All Therapies' },
    { id: 'relaxation', label: 'Relaxation' },
    { id: 'therapy', label: 'Therapeutic' },
    { id: 'healing', label: 'Healing & Detox' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((service) => service.category === activeCategory);

  return (
    <section
      id="services"
      ref={ref as any}
      className="py-20 md:py-28 bg-bg-dark border-b border-gold-border/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <SectionTag text="Our Spa Treatment Menu" className="mb-4" />
          <h2 className="font-display text-3xl md:text-[44px] font-bold tracking-tight text-text-primary mb-4 leading-tight">
            Curated Reflexology <span className="gold-shimmer-text">Therapies</span>
          </h2>
          <p className="text-text-primary/70 font-light max-w-xl text-sm md:text-base leading-relaxed">
            Choose a therapy specifically engineered to relieve muscle stiffness, stimulate metabolic paths, clear toxins, or calm stress.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12.5 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider border cursor-pointer transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-gold border-gold text-black hover:bg-gold-light"
                  : "bg-surface-dark/60 border-gold-border/40 text-text-primary/70 hover:text-gold hover:border-gold/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Services Grid with Layout Animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
