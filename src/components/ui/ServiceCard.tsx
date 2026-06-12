'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import * as Icons from 'lucide-react';
import { Service } from '@/types';
import { OutlineButton } from './OutlineButton';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  onBook?: (serviceTitle: string) => void;
  priority?: boolean;
}

const serviceBgImages: Record<string, string> = {
  'relaxation': '/assets/royal-foot.png',
  'destress': '/assets/de-stress.png',
  'chronic-pain': '/assets/chronic-pain.png',
  'soul-serenity': '/assets/service4.png',
  'detox': '/assets/detox.png',
  'femme-cycle': '/assets/service3.png',
  'face-detox': '/assets/service.png',
  'little-feet': '/assets/service1.png',
  'nasal': '/assets/service2.png',
  'vita-flex': '/assets/neuropathy.png',
  'ghee-therapy': '/assets/ghee.png',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook, priority = false }) => {
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
        "flex flex-col w-full rounded-2xl md:rounded-3xl border border-gold-border/30 overflow-hidden group shadow-xl relative min-h-[300px] md:min-h-[360px]"
      )}
    >
      {/* Full Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={bgImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          priority={priority}
        />
      </div>
      {/* Dark gradient overlay for text readability on bottom, transparent on top to show real image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent z-[1]" />

      {/* Content overlaid on top of background */}
      <div className="relative z-10 p-4 md:p-8 flex flex-col justify-end flex-grow">
        <div className="flex justify-between items-start mb-2 md:mb-4">
          <div className="p-1.5 md:p-2.5 rounded-lg md:rounded-xl bg-gold/15 border border-gold/30 text-gold backdrop-blur-sm">
            <IconComponent size={16} className="stroke-[1.5] md:size-[20px]" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={cn(
                  "text-[8px] md:text-[9px] font-bold tracking-wider uppercase bg-gold/15 text-gold border border-gold/30 px-2.5 py-0.5 rounded-full backdrop-blur-sm",
                  idx > 0 && "hidden sm:inline-block" // Hide subsequent tags on mobile
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="font-display text-sm md:text-2xl font-bold text-white mb-1 group-hover:text-gold transition-colors duration-300 line-clamp-1 md:line-clamp-none">
          {title}
        </h3>

        {/* Duration & Price Display */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 mb-2 md:mb-3 text-[10px] md:text-sm">
          <span className="font-bold text-gold">
            {id === 'relaxation' ? '₹500 - ₹700' : id === 'destress' ? '₹600 - ₹800' : id === 'chronic-pain' ? '₹650 - ₹850' : `₹${service.priceInr}`}
          </span>
          <span className="hidden sm:inline text-xs text-white/30">•</span>
          <span className="text-[9px] md:text-xs font-medium text-white/80">
            {id === 'relaxation' || id === 'destress' || id === 'chronic-pain' ? '30/40/60 Mins' : `${service.durationMin} Mins`}
          </span>
        </div>

        <p className="text-[10px] md:text-sm text-white/80 mb-3 md:mb-6 leading-normal md:leading-relaxed font-normal line-clamp-2 md:line-clamp-3">
          {excerpt}
        </p>

        <div className="pt-1 md:pt-2">
          <OutlineButton
            onClick={handleBookClick}
            ariaLabel={`Book ${title}`}
            className="w-full md:w-[150px] py-1.5 md:py-2.5 text-[10px] md:text-sm font-semibold rounded-lg md:rounded-xl bg-white/10 backdrop-blur-sm border-gold-border/40 text-white hover:bg-gold hover:text-black transition-all duration-300"
          >
            Book Now
          </OutlineButton>
        </div>
      </div>
    </motion.div>
  );
};
