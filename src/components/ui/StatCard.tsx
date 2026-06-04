import React from 'react';
import { motion } from 'framer-motion';
import { Stat } from '@/types';
import { CounterNumber } from '../animations/CounterNumber';

interface StatCardProps {
  stat: Stat;
}

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const { value, suffix, label } = stat;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="flex flex-col items-center justify-center p-6 text-center select-none rounded-2xl hover:bg-gold/5 border border-transparent hover:border-gold-border/20 transition-colors duration-300"
    >
      <div className="text-4xl md:text-5xl lg:text-6.5xl font-display font-bold text-gold mb-2 tracking-tight">
        <CounterNumber value={value} suffix={suffix} />
      </div>
      <p className="text-xs md:text-sm text-text-primary/65 font-body uppercase tracking-widest font-medium max-w-[200px]">
        {label}
      </p>
    </motion.div>
  );
};
