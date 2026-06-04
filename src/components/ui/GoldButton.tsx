'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GoldButtonProps {
  children: React.ReactNode;
  pulse?: boolean;
  ariaLabel: string;
  href?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  children,
  className,
  pulse = false,
  ariaLabel,
  href,
  onClick,
  type = 'button',
  ...props
}) => {
  const commonProps = {
    inherit: false,
    whileHover: { 
      scale: 1.04, 
      y: -3,
      boxShadow: "0 12px 24px rgba(201, 168, 76, 0.35)"
    },
    whileTap: { scale: 0.96 },
    onClick,
    "aria-label": ariaLabel,
    suppressHydrationWarning: true,
    className: cn(
      "relative select-none overflow-hidden px-7 py-3.5 rounded-xl font-medium tracking-wide text-black text-sm md:text-base inline-flex items-center justify-center gap-2",
      "gold-gradient-bg cursor-pointer hover:gold-gradient-hover",
      "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-bg-dark transition-colors duration-300",
      pulse && "animate-pulse-gold",
      className
    ),
    ...props
  };

  if (href) {
    return (
      <motion.a href={href} {...(commonProps as any)}>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...(commonProps as any)}>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
