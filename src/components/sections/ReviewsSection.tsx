'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '@/lib/data';
import { ReviewCard } from '../ui/ReviewCard';
import { SectionTag } from '../ui/SectionTag';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export const ReviewsSection: React.FC = () => {
  const { ref, hasRevealed } = useScrollReveal(0.1, true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 10);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth - 15
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons, { passive: true });
      // Run once on load
      checkScrollButtons();
      // Handle resizing adjustments
      window.addEventListener('resize', checkScrollButtons);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollButtons);
      }
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollOffset = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollOffset : scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="reviews"
      ref={ref as any}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client Testimonials"
      className="py-20 md:py-28 bg-bg-dark border-b border-gold-border/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col items-start text-left">
            <SectionTag text="Client Testimonials" className="mb-4" />
            <h2 className="font-display text-3xl md:text-[44px] font-bold tracking-tight text-text-primary leading-tight">
              Stories of <span className="gold-shimmer-text">Restoration</span>
            </h2>
            <p className="text-text-primary/70 font-light max-w-lg text-sm md:text-base mt-2">
              Read how our reflexology mapping and Visually Impaired specialists have transformed the health of our local Chennai clients.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3.5 shrink-0 self-end">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous review"
              suppressHydrationWarning
              className={cn(
                "p-3 rounded-full border border-gold-border/40 text-gold cursor-pointer transition-all duration-300",
                canScrollLeft 
                  ? "hover:bg-gold hover:text-black hover:border-gold hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(201,168,76,0.25)]" 
                  : "opacity-35 cursor-not-allowed text-gold/40 border-gold-border/10"
              )}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next review"
              suppressHydrationWarning
              className={cn(
                "p-3 rounded-full border border-gold-border/40 text-gold cursor-pointer transition-all duration-300",
                canScrollRight 
                  ? "hover:bg-gold hover:text-black hover:border-gold hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(201,168,76,0.25)]" 
                  : "opacity-35 cursor-not-allowed text-gold/40 border-gold-border/10"
              )}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Testimonials List */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          ref={scrollContainerRef}
          role="list"
          className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-none select-none scroll-smooth"
        >
          {REVIEWS.map((review, idx) => (
            <div
              key={review.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Review ${idx + 1} of ${REVIEWS.length}`}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] shrink-0 snap-start snap-always"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
export default ReviewsSection;
