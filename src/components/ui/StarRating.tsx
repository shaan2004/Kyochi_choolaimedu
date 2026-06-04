import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  className?: string;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  className,
  size = 16,
}) => {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rating: ${rating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        return (
          <Star
            key={index}
            size={size}
            className={cn(
              "transition-colors duration-300",
              isFilled ? "fill-gold text-gold" : "text-gold/20"
            )}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
};
