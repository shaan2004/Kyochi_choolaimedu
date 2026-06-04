'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionTag } from '../ui/SectionTag';
import { GoldButton } from '../ui/GoldButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const AboutSection: React.FC = () => {
  const { ref, hasRevealed } = useScrollReveal(0.15, true);

  return (
    <section
      id="about"
      ref={ref as any}
      className="py-20 md:py-28 bg-[#0d0d0d] border-b border-gold-border/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Luxury Border Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={hasRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative group"
          >
            {/* Double Border Frame effect */}
            <div className="absolute -inset-4 border border-gold/15 rounded-2xl pointer-events-none group-hover:border-gold/35 transition-all duration-500" />
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gold-border/80 bg-black shadow-2xl">
              <Image
                src="/assets/about-therapist.jpg"
                alt="Tactile reflexology session highlighting the precision of visually impaired therapists at Kyochi"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
                sizes="(max-w-768px) 100vw, 450px"
              />
            </div>
            
            {/* Corner styling accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold/50 rounded-tl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold/50 rounded-br pointer-events-none" />
          </motion.div>

          {/* Right Column: Copywriting Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={hasRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <SectionTag text="Art of Healing" className="mb-5" />
            
            <h2 className="font-display text-3xl md:text-4.5xl lg:text-5xl font-bold tracking-tight text-text-primary mb-6 leading-[1.15]">
              Healing From Within Through <span className="gold-shimmer-text">Tactile Precision</span>
            </h2>

            <p className="text-text-primary/75 text-sm md:text-base font-light leading-relaxed mb-5">
              At Kyochi Choolaimedu, we practice reflexology as a precise clinical therapy rather than a basic massage. Our center is renowned for training and deploying visually impaired specialists who have developed an exceptional, highly-focused sense of touch.
            </p>

            <p className="text-text-primary/70 text-sm md:text-base font-light leading-relaxed mb-6">
              Without visual distractions, their hands feel minute crystalline blockages, temperature imbalances, and stress deposits along the 7,200 nerve endings in your feet, unlocking path points to ease chronic pain, trigger lymphatic drainage, and reset your body's wellness.
            </p>

            {/* Structured features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              {[
                'Tactile sensitivity zone mapping',
                'Visually impaired skilled therapists',
                'Relief from chronic plantar pain',
                'Premium non-greasy organic gold oils'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gold/10 border border-gold/20 text-gold shrink-0">
                    <Check size={11} className="stroke-[2.5]" aria-hidden="true" />
                  </div>
                  <span className="text-xs md:text-sm text-text-primary/80 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <GoldButton
              ariaLabel="Book your appointment and start healing today"
              href="#booking"
              className="px-8 py-3.5 font-semibold"
            >
              Start Your Healing Journey
            </GoldButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
