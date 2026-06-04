'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Benefit } from '@/types';
import { cn } from '@/lib/utils';

interface BenefitItemProps {
  benefit: Benefit;
}

export const BenefitItem: React.FC<BenefitItemProps> = ({ benefit }) => {
  const { title, description, iconName } = benefit;

  // Resolve Lucide icon component dynamically
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ borderColor: "rgba(201, 168, 76, 0.09)" }}
      whileHover={{ 
        y: -6, 
        scale: 1.015,
        borderColor: "rgba(201, 168, 76, 0.4)",
        boxShadow: "0 15px 30px rgba(201, 168, 76, 0.1)"
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn(
        "p-6 rounded-2xl bg-card-dark border border-gold-border-muted",
        "relative overflow-hidden group"
      )}
    >
      {/* Hover glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex gap-4">
        <div className="p-3 rounded-xl bg-gold/5 border border-gold/15 text-gold group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-300 shrink-0">
          <IconComponent size={22} className="stroke-[1.5]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display font-medium text-lg text-text-primary mb-1.5 group-hover:text-gold-light transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-text-primary/70 leading-relaxed font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
