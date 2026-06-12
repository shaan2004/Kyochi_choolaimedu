'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { REVIEWS } from '@/lib/data';
import { ReviewCard } from '../ui/ReviewCard';
import { SectionTag } from '../ui/SectionTag';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const ReviewsSection: React.FC = () => {
  const { ref, hasRevealed } = useScrollReveal(0.1, true);

  return (
    <section
      id="reviews"
      ref={ref as any}
      role="region"
      aria-label="Client Testimonials"
      className="py-20 md:py-28 bg-bg-dark border-b border-gold-border/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header - Center Justified */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <SectionTag text="Client Testimonials" className="mb-4" />
          <h2 className="font-display text-3xl md:text-[44px] font-bold tracking-tight text-text-primary leading-tight">
            Stories of <span className="gold-shimmer-text">Restoration</span>
          </h2>
          <p className="text-text-primary/70 font-light text-sm md:text-base mt-3 leading-relaxed">
            Read how our reflexology mapping and Visually Impaired specialists have transformed the health of our local Chennai clients.
          </p>
        </div>

        {/* Featured Video and Instagram View Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20 max-w-5xl mx-auto">
          {/* Left Column: Client Review Video */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={hasRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 w-full max-w-xl mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-gold-border/40 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-surface-dark"
          >
            <video
              src="/assets/client-review.mp4"
              controls
              playsInline
              preload="none"
              className="w-full h-auto aspect-video object-contain"
              aria-label="Kyochi client review video testimonial"
            >
              <track
                kind="captions"
                label="English captions"
                srcLang="en"
                default
              />
            </video>
          </motion.div>

          {/* Right Column: About Us & Instagram Page */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={hasRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-5 bg-surface-dark/40 backdrop-blur-md p-8 rounded-3xl border border-gold-border/20 shadow-[0_15px_30px_rgba(0,0,0,0.25)] relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors duration-500 pointer-events-none" />
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gold/10 rounded-2xl text-gold border border-gold-border/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">
                Follow Our Journey
              </h3>
            </div>
            
            <p className="text-text-primary/70 text-sm leading-relaxed font-light">
              Get an insider look at Kyochi Choolaimedu. Follow our Instagram to see daily wellness routines, therapeutic updates, and real reflexology stories directly from our center.
            </p>
            
            <a
              href="https://www.instagram.com/kyochi_choolaimedu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)] transition-all duration-300 w-full lg:w-fit cursor-pointer"
            >
              <span>Visit our Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Continuous Scrolling Reviews Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full overflow-hidden py-4 marquee-mask"
        >
          <div className="animate-marquee gap-6">
            {[...REVIEWS, ...REVIEWS].map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="w-[280px] sm:w-[350px] shrink-0"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ReviewsSection;
