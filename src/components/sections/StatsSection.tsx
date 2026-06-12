'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '@/lib/data';
import { StatCard } from '../ui/StatCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export const StatsSection: React.FC = () => {
  const { ref, hasRevealed } = useScrollReveal(0.1, true);

  return (
    <section
      id="stats"
      ref={ref as any}
      aria-label="Our Achievements"
      className="py-16 md:py-24 bg-bg-dark border-b border-gold-border/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {STATS.map((stat, idx) => (
            <div
              key={stat.id}
              className={cn(
                "relative",
                // Show divider lines between columns on large screens
                idx !== STATS.length - 1 && "lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-1/4 lg:after:h-1/2 lg:after:w-[1px] lg:after:bg-gold-border/40"
              )}
            >
              <StatCard stat={stat} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
