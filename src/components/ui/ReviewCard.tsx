'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Review } from '@/types';
import { StarRating } from './StarRating';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { name, stars, serviceTag, testimonial, date, location } = review;

  return (
    <article
      itemScope
      itemType="https://schema.org/Review"
      aria-label={`Review by ${name}`}
    >
    <motion.div
      initial={{ borderColor: "rgba(201, 168, 76, 0.09)" }}
      whileHover={{ 
        y: -6,
        scale: 1.015,
        borderColor: "rgba(201, 168, 76, 0.35)",
        boxShadow: "0 15px 30px rgba(201, 168, 76, 0.08)"
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn(
        "flex flex-col justify-between p-6 md:p-7 rounded-2xl bg-card-dark/80 border border-gold-border-muted",
        "h-full relative overflow-hidden"
      )}
    >
      <div className="absolute top-4 right-4 text-gold/10 pointer-events-none">
        <Quote size={56} className="fill-current" aria-hidden="true" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <StarRating rating={stars} size={14} />
          <span className="text-[9px] font-bold uppercase tracking-wider bg-gold/5 text-gold-light border border-gold/10 px-2 py-0.5 rounded-full">
            {serviceTag}
          </span>
        </div>

        <p className="text-sm md:text-[15px] text-text-primary/80 italic leading-relaxed mb-6 font-light">
          "{testimonial}"
        </p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gold-border/20 relative z-10">
        <div>
          <h4 className="font-display font-medium text-text-primary text-base">
            {name}
          </h4>
          {location && (
            <p className="text-[11px] text-text-primary/50">
              {location}, Chennai
            </p>
          )}
        </div>
        <span className="text-[10px] text-text-primary/45 font-medium">
          {date}
        </span>
      </div>
    </motion.div>
    </article>
  );
};
