'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, PlayCircle, Star, Trophy, Users } from 'lucide-react';
import { GoldButton } from '../ui/GoldButton';
import { OutlineButton } from '../ui/OutlineButton';
import { SectionTag } from '../ui/SectionTag';
import { cn } from '@/lib/utils';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Intersection observer to play/pause video depending on viewport to save CPU/data
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Hero — Welcome to Kyochi"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg-dark"
    >
      
      {/* Decorative Gold Corner L-Brackets */}
      <div className="absolute top-28 left-6 w-5 h-5 border-t border-l border-gold/30 pointer-events-none z-20" />
      <div className="absolute top-28 right-6 w-5 h-5 border-t border-r border-gold/30 pointer-events-none z-20" />
      
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-95"
        aria-hidden="true"
      >
        <source src="/assets/vid.mp4" type="video/mp4" />
      </video>



      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg-dark to-transparent z-1 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16 flex flex-col items-center">
        
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <SectionTag text="Choolaimedu's Premier Reflexology Center" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,7.5vw,6rem)] font-bold tracking-tight text-text-primary leading-[1.05] mb-6 max-w-4xl"
        >
          Heal From The <span className="gold-shimmer-text">Ground</span> Up
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-base md:text-lg lg:text-xl text-text-primary font-normal leading-relaxed max-w-2xl mb-8"
        >
          Experience India's leading foot reflexology brand. Re-energize your body, relieve stress, and target chronic pain under the expert care of our highly-skilled visually impaired therapists.
        </motion.p>


        {/* CTA Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4.5 w-full sm:w-auto mb-16"
        >
          <GoldButton
            ariaLabel="Book your reflexology session"
            pulse={true}
            href="#booking"
            className="w-full sm:w-auto font-semibold px-9 py-4"
          >
            Book Your Session
          </GoldButton>
          <OutlineButton
            ariaLabel="Explore our range of therapies"
            href="#services"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-9 py-4 font-semibold"
          >
            <PlayCircle size={20} className="stroke-[1.5]" />
            Explore Therapies
          </OutlineButton>
        </motion.div>

        {/* Trust Badges Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
        >
          <div className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-full border border-gold-border/40 bg-card-dark/30 backdrop-blur-sm select-none">
            <Users size={16} className="text-gold" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-text-primary/80">10,000+ Happy Clients</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-full border border-gold-border/40 bg-card-dark/30 backdrop-blur-sm select-none">
            <Star size={16} className="text-gold fill-gold" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-text-primary/80">4.9★ Google Rating</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-full border border-gold-border/40 bg-card-dark/30 backdrop-blur-sm select-none">
            <Trophy size={16} className="text-gold" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-text-primary/80">9+ Yrs Excellence</span>
          </div>
        </motion.div>

      </div>

      {/* Fixed bottom-center scroll indicator */}
      <a 
        href="#stats"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer text-gold/60 hover:text-gold transition-colors duration-300 z-10 animate-float"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Discover</span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>

    </section>
  );
};
