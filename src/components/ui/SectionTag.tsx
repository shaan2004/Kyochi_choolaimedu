import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTagProps {
  text: string;
  className?: string;
}

export const SectionTag: React.FC<SectionTagProps> = ({ text, className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full border border-gold-border bg-surface-dark/50 backdrop-blur-md",
        "text-[10px] md:text-xs font-semibold tracking-[0.18em] uppercase text-gold-light select-none",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
      </span>
      <span>{text}</span>
    </div>
  );
};
