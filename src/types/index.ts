import { ReactNode } from 'react';

export interface Service {
  id: string;
  title: string;
  category: 'relaxation' | 'therapy' | 'healing';
  excerpt: string;
  description: string;
  durationMin: number;
  priceInr: number;
  tags: string[];
  iconName: string; // Dynamic icon rendering maps to Lucide key
}

export interface Review {
  id: string;
  name: string;
  stars: number;
  serviceTag: string;
  testimonial: string;
  date: string;
  avatarUrl?: string;
  location?: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name mapping
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
