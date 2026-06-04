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

const serviceBgImages: Record<string, string> = {
  'royal-reflexology': '/assets/royal-foot.png',
  'de-stress': '/assets/de-stress.png',
  'chronic-pain': '/assets/chronic-pain.png',
  'detox-reflexology': '/assets/detox.png',
  'sleep-inducing': '/assets/sleep-inducing.png',
  'neuropathy-care': '/assets/neuropathy.png',
  'senior-mobility': '/assets/senior-mobility.png',
  'lymphatic-drainage': '/assets/lympatic-drainage.png',
  'sports-recovery': '/assets/sports-recovery.png',
  'head-shoulder-foot-combo': '/assets/head,shoulder-and-foot.png',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const { id, title, excerpt, tags, iconName } = service;
  
  // Resolve Lucide icon component dynamically
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  const bgImage = serviceBgImages[id] || '/assets/service.png';

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
        y: -4,
        scale: 1.01,
        borderColor: "rgba(201, 168, 76, 0.45)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn(
        "flex flex-col w-full rounded-3xl border border-gold-border/30 overflow-hidden group shadow-xl relative min-h-[360px]"
      )}
    >
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20 z-[1]" />

      {/* Content overlaid on top of background */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold backdrop-blur-sm">
            <IconComponent size={20} className="stroke-[1.5]" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[9px] font-bold tracking-wider uppercase bg-gold/10 text-gold-light border border-gold/25 px-2.5 py-0.5 rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-medium text-text-primary mb-2.5 group-hover:text-gold-light transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-sm text-text-primary/80 mb-6 leading-relaxed font-light line-clamp-3">
          {excerpt}
        </p>

        <div className="pt-2">
          <OutlineButton
            onClick={handleBookClick}
            ariaLabel={`Book ${title}`}
            className="w-full md:w-[150px] py-2.5 text-xs md:text-sm font-semibold rounded-xl bg-black/40 backdrop-blur-sm border-gold-border/40 hover:bg-gold hover:text-black transition-all duration-300"
          >
            Book Now
          </OutlineButton>
        </div>
      </div>
    </motion.div>
  );
};
