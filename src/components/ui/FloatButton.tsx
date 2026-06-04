'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatButtonProps {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
  className?: string;
}

export const FloatButton: React.FC<FloatButtonProps> = ({
  icon,
  href,
  ariaLabel,
  className,
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      whileHover={{ scale: 1.12, y: -4 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full",
        "bg-surface-dark/90 backdrop-blur-md border border-gold-border/80 text-gold shadow-lg cursor-pointer",
        "hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_4px_15px_rgba(201,168,76,0.35)]",
        "transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-bg-dark",
        className
      )}
    >
      {icon}
    </motion.a>
  );
};
