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
      {/* Hidden Schema.org required fields: author and itemReviewed */}
      <span
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
        className="hidden"
      >
        <span itemProp="name">{name}</span>
      </span>

      <span
        itemProp="itemReviewed"
        itemScope
        itemType="https://schema.org/HealthAndBeautyBusiness"
        className="hidden"
      >
        <span itemProp="name">Kyochi — Art of Healing</span>
        <span itemProp="url">https://www.kyochi.in</span>
        <span itemProp="telephone">+919566001066</span>
        <span itemProp="priceRange">₹₹</span>
        <meta itemProp="image" content="https://www.kyochi.in/assets/logo.png" />
        <span
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <span itemProp="streetAddress">No 14/5 Indira Gandhi 3rd Street, Near MMDA Bus Depot, Choolaimedu</span>
          <span itemProp="addressLocality">Chennai</span>
          <span itemProp="addressRegion">Tamil Nadu</span>
          <span itemProp="postalCode">600094</span>
          <span itemProp="addressCountry">IN</span>
        </span>
      </span>

      {/* Hidden reviewRating */}
      <span
        itemProp="reviewRating"
        itemScope
        itemType="https://schema.org/Rating"
        className="hidden"
      >
        <meta itemProp="ratingValue" content={String(stars)} />
        <meta itemProp="bestRating" content="5" />
        <meta itemProp="worstRating" content="1" />
      </span>

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
          "flex flex-col justify-between p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-card-dark/80 border border-gold-border-muted",
          "h-full relative overflow-hidden"
        )}
      >
        <div className="absolute top-3 right-3 text-gold/10 pointer-events-none">
          <Quote className="w-8 h-8 sm:w-14 sm:h-14 fill-current" aria-hidden="true" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <StarRating rating={stars} size={12} className="sm:scale-110 origin-left" />
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-gold/5 text-gold-light border border-gold/10 px-1.5 py-0.5 rounded-full">
                {serviceTag}
              </span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1 text-text-primary/40">
              <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="text-[7.5px] sm:text-[9px] tracking-wider font-bold uppercase flex items-center">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
            </div>
          </div>

          <p
            itemProp="reviewBody"
            className="text-[11px] sm:text-sm md:text-[15px] text-text-primary/80 italic leading-relaxed mb-4 sm:mb-6 font-light"
          >
            "{testimonial}"
          </p>
        </div>

        <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gold-border/20 relative z-10">
          <div>
            <h4 className="font-display font-medium text-text-primary text-xs sm:text-base">
              {name}
            </h4>
            {location && (
              <p
                itemProp="locationCreated"
                className="text-[9px] sm:text-[11px] text-text-primary/50"
              >
                {location}, Chennai
              </p>
            )}
          </div>
          <span
            itemProp="datePublished"
            className="text-[8px] sm:text-[10px] text-text-primary/45 font-medium"
          >
            {date}
          </span>
        </div>
      </motion.div>
    </article>
  );
};
