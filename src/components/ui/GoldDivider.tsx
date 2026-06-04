import React from 'react';
import { cn } from '@/lib/utils';

interface GoldDividerProps {
  className?: string;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({ className }) => {
  return (
    <hr
      className={cn(
        "h-[1px] border-none bg-gradient-to-r from-transparent via-gold/40 to-transparent w-full my-6",
        className
      )}
    />
  );
};
