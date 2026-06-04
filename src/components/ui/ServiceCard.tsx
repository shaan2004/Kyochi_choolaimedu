'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Service } from '@/types';
import { OutlineButton } from './OutlineButton';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  onBook?: (serviceTitle: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const { title, excerpt, durationMin, priceInr, tags, iconName } = service;
  
  // Resolve Lucide icon component dynamically
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  const handleBookClick = () => {
    if (onBook) {
      onBook(title);
    } else {
      const element = document.getElementById('booking');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Attempt to auto-select the service in any rendered booking form
        const select = (document.getElementById('section-service-select') || 
                        document.getElementById('popup-service-select') || 
                        document.getElementById('booking-service-select')) as HTMLSelectElement;
        if (select) {
          select.value = title;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ borderColor: "rgba(201, 168, 76, 0.09)" }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        borderColor: "rgba(201, 168, 76, 0.4)",
        boxShadow: "0 20px 40px rgba(201, 168, 76, 0.12)"
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn(
        "flex flex-col justify-between p-6.5 rounded-2xl bg-card-dark border border-gold-border-muted"
      )}
    >
      <div>
        <div className="flex justify-between items-start mb-4.5">
          <div className="p-3 rounded-xl bg-gold/10 border border-gold/20 text-gold">
            <IconComponent size={22} className="stroke-[1.5]" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[9px] font-bold tracking-wider uppercase bg-gold/5 text-gold-light border border-gold/10 px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-medium text-text-primary mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-text-primary/70 mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-gold-border/30">
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-xs text-text-primary/55 flex items-center gap-1">
            <Icons.Clock size={12} className="text-gold/60" /> {durationMin} Mins
          </span>
          <span className="text-base font-semibold text-gold tracking-wide">
            ₹{priceInr}
          </span>
        </div>

        <OutlineButton
          onClick={handleBookClick}
          ariaLabel={`Book ${title}`}
          className="w-full py-2 text-xs md:text-sm font-semibold rounded-lg"
        >
          Book Now
        </OutlineButton>
      </div>
    </motion.div>
  );
};
