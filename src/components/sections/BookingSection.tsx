'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';
import { BookingForm } from '../ui/BookingForm';
import { SectionTag } from '../ui/SectionTag';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const BookingSection: React.FC = () => {
  const { ref, hasRevealed } = useScrollReveal(0.12, true);

  return (
    <section
      id="booking"
      ref={ref as any}
      className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/4 right-0 w-[260px] h-[260px] bg-gold/5 rounded-full filter blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[260px] h-[260px] bg-gold/5 rounded-full filter blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Healing Story & Support */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={hasRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <SectionTag text="Reservations" />
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
              Start Your <span className="gold-shimmer-text">Healing</span> Journey
            </h2>
            <p className="text-text-primary/75 text-sm md:text-base font-light leading-relaxed">
              Ready to relieve pain and melt away stress? Complete our short intake form. Your booking details will be compiled into a pre-filled WhatsApp message, instantly connecting you to our Choolaimedu front desk to finalize your therapist and time slot.
            </p>

            <div className="pt-6 border-t border-gold-border/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gold/10 text-gold border border-gold/15">
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Our Center</h4>
                  <p className="text-xs text-text-primary/60">Choolaimedu, Chennai, TN 600094</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gold/10 text-gold border border-gold/15">
                  <Clock size={18} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Opening Hours</h4>
                  <p className="text-xs text-text-primary/60">Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gold/10 text-gold border border-gold/15">
                  <Phone size={18} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Call Desk</h4>
                  <p className="text-xs text-text-primary/60">+91 90803 89223</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={hasRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 w-full bg-[#111111] border border-gold-border p-6.5 sm:p-9 rounded-3xl shadow-2xl relative"
          >
            {/* L-brackets inside form card */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/30 rounded-tr pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/30 rounded-bl pointer-events-none" />
            
            <h3 className="font-display text-2xl font-semibold text-gold mb-6 border-b border-gold-border/20 pb-3">
              Request Appointment
            </h3>
            <BookingForm defaultService="" idPrefix="section-" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
