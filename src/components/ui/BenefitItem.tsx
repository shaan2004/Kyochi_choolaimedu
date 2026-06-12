'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Benefit } from '@/types';
import { cn } from '@/lib/utils';

interface BenefitItemProps {
  benefit: Benefit;
}

// 1. Relaxation: Gently drifting green leaves across the card (Deep Relaxation)
const RelaxationAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.span
        key={i}
        className="absolute font-semibold text-emerald-400/25 text-xs md:text-sm select-none"
        style={{
          left: `${15 + i * 15}%`,
          bottom: "-20px"
        }}
        initial={{ opacity: 0, y: -i * 25, rotate: i * 45 }}
        animate={{
          opacity: [0, 0.65, 0],
          y: [-i * 25, -180],
          x: [0, i % 2 === 0 ? 12 : -12, i % 2 === 0 ? -8 : 8],
          rotate: [i * 45, 180 + i * 45, 360],
        }}
        transition={{
          duration: 3.2 + Math.random() * 1.2,
          repeat: Infinity,
          delay: 0,
          ease: "easeOut",
        }}
      >
        🍃
      </motion.span>
    ))}
  </div>
);

// 2. Reduce Stress: Gently drifting pink flower petals across the card (Stress Relief)
const ReduceStressAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.span
        key={i}
        className="absolute font-semibold text-pink-400/25 text-xs md:text-sm select-none"
        style={{
          left: `${15 + i * 15}%`,
          bottom: "-20px"
        }}
        initial={{ opacity: 0, y: -i * 25, rotate: i * 45 }}
        animate={{
          opacity: [0, 0.65, 0],
          y: [-i * 25, -180],
          x: [0, i % 2 === 0 ? 15 : -15, i % 2 === 0 ? -10 : 10],
          rotate: [i * 45, 180 + i * 45, 360],
        }}
        transition={{
          duration: 3 + Math.random() * 1,
          repeat: Infinity,
          delay: 0,
          ease: "easeOut",
        }}
      >
        🌸
      </motion.span>
    ))}
  </div>
);

// 3. Enhanced Circulation: Red flow dots representing blood flow horizontally
const CirculationAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-red-400/30"
        style={{
          left: "-10px",
          top: `${15 + i * 10}%`
        }}
        initial={{ opacity: 0, x: i * 40 }}
        animate={{
          opacity: [0.2, 0.7, 0],
          x: [i * 40, 380],
          y: [0, i % 2 === 0 ? 10 : -10],
        }}
        transition={{
          duration: 2.5 + Math.random() * 1,
          repeat: Infinity,
          delay: 0,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// 4. Improves Immunity: Green protective shield icons floating upward
const ImmunityAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.span
        key={i}
        className="absolute text-emerald-400/30 text-base select-none"
        style={{
          left: `${10 + i * 16}%`,
          bottom: "-20px"
        }}
        initial={{ opacity: 0, y: -i * 25, scale: 0.6 }}
        animate={{
          opacity: [0, 0.7, 0],
          y: [-i * 25, -180],
          scale: [0.6, 1.1, 0.8],
        }}
        transition={{
          duration: 2.8 + Math.random() * 0.8,
          repeat: Infinity,
          delay: 0,
          ease: "easeOut",
        }}
      >
        🛡️
      </motion.span>
    ))}
  </div>
);

// 5. Boosts Energy: Sparking electric yellow lightning bolts
const EnergyAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.span
        key={i}
        className="absolute text-yellow-400/40 text-lg select-none"
        style={{
          left: `${15 + i * 15}%`,
          top: `${20 + (i % 3) * 20}%`
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0, 0.85, 0],
          scale: [0.5, 1.3, 0.8],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut",
        }}
      >
        ⚡
      </motion.span>
    ))}
  </div>
);

// 6. Restores Balance: Sky blue mental focus sparkles glowing across the card
const FocusAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <motion.span
        key={i}
        className="absolute text-sky-300/45 text-lg select-none"
        style={{
          left: `${10 + i * 12}%`,
          top: `${10 + Math.random() * 70}%`
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.3, 0],
          opacity: [0, 0.8, 0],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 1.8 + Math.random() * 0.8,
          repeat: Infinity,
          delay: 0,
          ease: "easeInOut",
        }}
      >
        ✦
      </motion.span>
    ))}
  </div>
);

const renderHoverAnimation = (id: string) => {
  switch (id) {
    case 'deep-relaxation':
      return <RelaxationAnimation />;
    case 'stress-relief':
      return <ReduceStressAnimation />;
    case 'better-circulation':
      return <CirculationAnimation />;
    case 'improves-immunity':
      return <ImmunityAnimation />;
    case 'boosts-energy':
      return <EnergyAnimation />;
    case 'restores-balance':
      return <FocusAnimation />;
    default:
      return null;
  }
};

export const BenefitItem: React.FC<BenefitItemProps> = ({ benefit }) => {
  const { id, title, description, iconName } = benefit;
  const [isHovered, setIsHovered] = useState(false);

  // Resolve Lucide icon component dynamically
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ borderColor: "rgba(201, 168, 76, 0.09)" }}
      whileHover={{ 
        y: -6, 
        scale: 1.015,
        borderColor: "rgba(201, 168, 76, 0.4)",
        boxShadow: "0 15px 30px rgba(201, 168, 76, 0.1)"
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn(
        "p-3.5 md:p-6 rounded-2xl bg-card-dark border border-gold-border-muted",
        "relative overflow-hidden group min-h-[120px] md:min-h-[140px] flex flex-col justify-center"
      )}
    >
      {/* Hover glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Floating unique animations */}
      <AnimatePresence>
        {isHovered && renderHoverAnimation(id)}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row gap-2.5 md:gap-4 relative z-10">
        <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gold/5 border border-gold/15 text-gold group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-300 shrink-0 self-start">
          <IconComponent size={18} className="stroke-[1.5] md:size-[22px]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-sm md:text-lg text-text-primary mb-1 group-hover:text-gold-light transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[10px] md:text-sm text-text-primary/70 leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
