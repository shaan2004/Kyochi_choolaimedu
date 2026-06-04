'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OutlineButtonProps {
  children: React.ReactNode;
  ariaLabel: string;
  href?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

export const OutlineButton: React.FC<OutlineButtonProps> = ({
  children,
  className,
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
      boxShadow: "0 10px 20px rgba(201, 168, 76, 0.25)"
    },
    whileTap: { scale: 0.96 },
    onClick,
    "aria-label": ariaLabel,
    suppressHydrationWarning: true,
    className: cn(
      "relative select-none px-7 py-3.5 rounded-xl font-medium tracking-wide text-sm md:text-base cursor-pointer inline-flex items-center justify-center gap-2",
      "border border-gold/40 text-gold bg-transparent transition-colors duration-300",
      "hover:bg-gold hover:text-black hover:border-gold",
      "focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-bg-dark",
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
