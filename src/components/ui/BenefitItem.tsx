'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Benefit } from '@/types';
import { cn } from '@/lib/utils';

interface BenefitItemProps {
  benefit: Benefit;
}

// 1. ZZZ Animation for Sleep
const ZzzAnimation = () => (
  <div className="absolute right-4 top-4 pointer-events-none select-none overflow-hidden h-16 w-16 flex items-end justify-center">
    {[1, 2, 3].map((i) => (
      <motion.span
        key={i}
        className="absolute font-semibold text-gold/60 text-xs md:text-sm"
        initial={{ opacity: 0, y: 15, x: 0, scale: 0.5 }}
        animate={{
          opacity: [0, 0.8, 0],
          y: -40,
          x: [0, (i % 2 === 0 ? 8 : -8), (i % 2 === 0 ? -4 : 4)],
          scale: [0.5, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: (i - 1) * 0.6,
          ease: "easeOut",
        }}
      >
        Z
      </motion.span>
    ))}
  </div>
);

// 2. Reduce Stress: Calming rings pulsing outward from the icon
const ReduceStressAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-gold/15"
        style={{
          width: 54,
          height: 54,
          left: 24,
          top: 24,
          translateX: "-12%",
          translateY: "-12%",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 2.4],
          opacity: [0, 0.35, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          delay: (i - 1) * 1.1,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

// 3. Enhanced Circulation: Flowing dots representing blood flow
const CirculationAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-gold/45"
        initial={{ opacity: 0, x: -10, y: 25 + i * 12 }}
        animate={{
          opacity: [0, 0.7, 0],
          x: [0, 160, 320],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          delay: (i - 1) * 0.8,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

// 4. Improves Digestion: Spinning/orbiting dots representing digestion process
const DigestionAnimation = () => (
  <div className="absolute right-6 top-6 pointer-events-none select-none w-10 h-10">
    <motion.div
      className="w-full h-full rounded-full border border-dashed border-gold/30"
      animate={{ rotate: 360 }}
      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
    />
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-gold/60"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          x: [
            Math.cos((i * 120 * Math.PI) / 180) * 16,
            Math.cos(((i * 120 + 360) * Math.PI) / 180) * 16,
          ],
          y: [
            Math.sin((i * 120 * Math.PI) / 180) * 16,
            Math.sin(((i * 120 + 360) * Math.PI) / 180) * 16,
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    ))}
  </div>
);

// 5. Body-Mind Awareness: Expanding soft aura glow
const AwarenessAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute right-0 top-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl"
      animate={{
        scale: [1, 1.25, 1],
        opacity: [0.25, 0.55, 0.25],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// 6. Relaxation: Gently drifting flower petals
const RelaxationAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[1, 2, 3].map((i) => (
      <motion.span
        key={i}
        className="absolute font-semibold text-gold/25 text-[11px]"
        initial={{ opacity: 0, y: -10, x: 80 + i * 50, rotate: 0 }}
        animate={{
          opacity: [0, 0.55, 0],
          y: 110,
          x: [80 + i * 50, 60 + i * 50, 75 + i * 50],
          rotate: 360,
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          delay: (i - 1) * 1.3,
          ease: "easeOut",
        }}
      >
        🌸
      </motion.span>
    ))}
  </div>
);

// 7. Pain Relief: Floating medical healing pluses (+)
const PainReliefAnimation = () => (
  <div className="absolute right-6 top-6 pointer-events-none select-none overflow-hidden h-20 w-16 flex items-end justify-center">
    {[1, 2, 3].map((i) => (
      <motion.span
        key={i}
        className="absolute font-bold text-gold/65 text-sm md:text-base"
        initial={{ opacity: 0, y: 15, x: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 0.85, 0],
          y: -45,
          x: [0, (i % 2 === 0 ? 6 : -6), (i % 2 === 0 ? -3 : 3)],
          scale: [0.6, 1.1, 0.7],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          delay: (i - 1) * 0.5,
          ease: "easeOut",
        }}
      >
        +
      </motion.span>
    ))}
  </div>
);

// 8. Boosts Energy: Sparking lightning bolt symbols
const EnergyAnimation = () => (
  <div className="absolute right-6 top-6 pointer-events-none select-none overflow-hidden h-20 w-16 flex items-end justify-center">
    {[1, 2, 3].map((i) => (
      <motion.span
        key={i}
        className="absolute font-bold text-gold/70 text-sm"
        initial={{ opacity: 0, y: 15, x: 0 }}
        animate={{
          opacity: [0, 0.95, 0],
          y: -45,
          x: [0, (i % 2 === 0 ? 5 : -5)],
          scale: [0.7, 1.15, 0.8],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          delay: (i - 1) * 0.4,
          ease: "easeOut",
        }}
      >
        ⚡
      </motion.span>
    ))}
  </div>
);

// 9. Detoxifies: Rising water droplets fading out
const DetoxAnimation = () => (
  <div className="absolute right-6 top-6 pointer-events-none select-none overflow-hidden h-20 w-16 flex items-end justify-center">
    {[1, 2, 3].map((i) => (
      <motion.span
        key={i}
        className="absolute font-bold text-gold/60 text-xs"
        initial={{ opacity: 0, y: 15, x: 0, scale: 0.7 }}
        animate={{
          opacity: [0, 0.8, 0],
          y: -40,
          scale: [0.7, 1.1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: (i - 1) * 0.6,
          ease: "easeOut",
        }}
      >
        💧
      </motion.span>
    ))}
  </div>
);

// 10. Enhances Immunity: A breathing shield border animation
const ImmunityAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute border border-gold/15 rounded-2xl"
      style={{
        inset: 12,
      }}
      animate={{
        scale: [0.99, 1.01, 0.99],
        borderColor: ["rgba(201, 168, 76, 0.15)", "rgba(201, 168, 76, 0.4)", "rgba(201, 168, 76, 0.15)"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// 11. Promotes Flexibility: Bending arcs
const FlexibilityAnimation = () => (
  <div className="absolute right-6 top-6 pointer-events-none select-none w-10 h-10 flex items-center justify-center">
    <motion.div
      className="w-8 h-8 rounded-full border-2 border-transparent border-t-gold/45 border-r-gold/45"
      animate={{
        rotate: 360,
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// 12. Better Mental Focus: Sparkles in top right corner
const FocusAnimation = () => (
  <div className="absolute right-6 top-6 pointer-events-none select-none w-12 h-12">
    {[1, 2, 3].map((i) => (
      <motion.span
        key={i}
        className="absolute text-gold/75 text-xs"
        style={{
          top: i === 1 ? "10%" : i === 2 ? "50%" : "80%",
          left: i === 1 ? "80%" : i === 2 ? "20%" : "60%",
        }}
        animate={{
          scale: [0, 1.2, 0],
          opacity: [0, 0.95, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: (i - 1) * 0.5,
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
    case 'improve-sleep':
      return <ZzzAnimation />;
    case 'reduce-stress':
      return <ReduceStressAnimation />;
    case 'enhanced-circulation':
      return <CirculationAnimation />;
    case 'improves-digestion':
      return <DigestionAnimation />;
    case 'body-mind-awareness':
      return <AwarenessAnimation />;
    case 'relaxation':
      return <RelaxationAnimation />;
    case 'pain-relief':
      return <PainReliefAnimation />;
    case 'boosts-energy':
      return <EnergyAnimation />;
    case 'detoxifies':
      return <DetoxAnimation />;
    case 'enhances-immunity':
      return <ImmunityAnimation />;
    case 'promotes-flexibility':
      return <FlexibilityAnimation />;
    case 'better-mental-focus':
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
        "p-6 rounded-2xl bg-card-dark border border-gold-border-muted",
        "relative overflow-hidden group min-h-[140px] flex flex-col justify-center"
      )}
    >
      {/* Hover glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Floating unique animations */}
      <AnimatePresence>
        {isHovered && renderHoverAnimation(id)}
      </AnimatePresence>

      <div className="flex gap-4 relative z-10">
        <div className="p-3 rounded-xl bg-gold/5 border border-gold/15 text-gold group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-300 shrink-0 self-start">
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
