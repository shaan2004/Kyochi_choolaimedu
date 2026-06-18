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
          <div className="flex items-center justify-center gap-2 mt-5 bg-gold/5 border border-gold/15 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-primary flex items-center gap-1">
              4.9 ★ Rating on 
              <span className="inline-flex">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
              (50+ Reviews)
            </span>
          </div>
        </div>

        {/* Centered Featured Video */}
        <div className="flex justify-center mb-20 max-w-3xl mx-auto">
          {/* Client Review Video */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full rounded-3xl overflow-hidden border border-gold-border/40 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-surface-dark"
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
                className="w-[210px] sm:w-[280px] md:w-[350px] shrink-0"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Google Reviews CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 text-center relative z-10"
        >
          <a
            href="https://www.google.com/maps/search/?api=1&query=Kyochi+Foot+Reflexology+Choolaimedu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold text-xs hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)] transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.507 0-6.35-2.843-6.35-6.35s2.843-6.35 6.35-6.35c1.629 0 3.103.626 4.226 1.636l3.055-3.055C19.123 2.503 15.897 1 12.24 1A11.24 11.24 0 001 12.24a11.24 11.24 0 0011.24 11.24c6.2 0 11.24-5.04 11.24-11.24 0-.766-.078-1.5-.216-2.195H12.24z"/>
            </svg>
            <span>Write a Google Review</span>
          </a>
          
          <a
            href="https://www.google.com/maps/search/?api=1&query=Kyochi+Foot+Reflexology+Choolaimedu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-gold-border/40 text-text-primary hover:bg-gold/10 font-semibold text-xs transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center bg-surface-dark/10"
          >
            <span>View All Google Reviews</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ReviewsSection;
