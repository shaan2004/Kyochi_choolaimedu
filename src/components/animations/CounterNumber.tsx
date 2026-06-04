'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useCounter } from '@/hooks/useCounter';
import { cn } from '@/lib/utils';

interface CounterNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const CounterNumber: React.FC<CounterNumberProps> = ({
  value,
  suffix = '',
  duration = 2000,
  className,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animatedValue = useCounter(value, duration, inView);
  const isFloat = value % 1 !== 0;

  const displayValue = isFloat 
    ? animatedValue.toFixed(1) 
    : Math.floor(animatedValue).toLocaleString('en-IN');

  return (
    <span ref={ref} className={cn("font-display", className)}>
      {displayValue}
      {suffix}
    </span>
  );
};
