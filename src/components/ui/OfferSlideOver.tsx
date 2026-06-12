'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageCircle, Sparkles, Flame, Percent } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { GoldButton } from './GoldButton';
import { cn } from '@/lib/utils';

interface OfferFormData {
  name: string;
  phone: string;
}

export const OfferSlideOver: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<OfferFormData | null>(null);
  const [offerCode, setOfferCode] = useState('');
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<OfferFormData>({
    defaultValues: {
      name: '',
      phone: '',
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Don't trigger if the user has already submitted the offer
    const isClaimed = localStorage.getItem('kyochi_ghee_offer_claimed');
    if (isClaimed) return;

    const target = document.getElementById('services');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOpen(true);
          // Disconnect observer after opening
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit = (data: OfferFormData) => {
    const now = new Date();
    const HH = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const DD = String(now.getDate()).padStart(2, '0');
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    
    // Format matches example "#11181206" (HourMinuteDayMonth)
    const code = `#${HH}${mm}${DD}${MM}`;
    
    setOfferCode(code);
    setSubmittedData(data);
    setIsSubmitted(true);
    localStorage.setItem('kyochi_ghee_offer_claimed', 'true');

    // Immediately trigger WhatsApp deep link redirect
    handleWhatsAppClaim(data, code);
  };

  const handleWhatsAppClaim = (data: OfferFormData, codeToSend?: string) => {
    const code = codeToSend || offerCode;
    const prefix = 'Hello Kyochi! 🌿\n\nI\'d like to claim the Ghee Therapy Offer!\n\n';
    const fields = [
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      `*Offer:* Ghee Therapy (₹1250 instead of ₹1850)`,
      `*Offer Code:* ${code}`,
    ].join('\n');

    const suffix = '\n\nPlease book my slot under this offer. Thank you!';
    const fullText = `${prefix}${fields}${suffix}`;
    const encodedText = encodeURIComponent(fullText);
    const whatsappUrl = `https://wa.me/919566001066?text=${encodedText}`;

    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '110%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '110%', opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-[440px] md:w-[50%] bg-surface-dark border border-gold-border/40 md:border-y-0 md:border-r-0 md:border-l shadow-2xl flex flex-col h-[85vh] md:h-full rounded-3xl md:rounded-none overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close offer panel"
              suppressHydrationWarning
              className="absolute top-4 right-4 p-2.5 rounded-full border border-gold-border/20 text-gold hover:bg-gold/10 hover:border-gold/60 bg-surface-dark/40 backdrop-blur-sm transition-all duration-300 cursor-pointer z-20"
            >
              <X size={18} aria-hidden="true" />
            </button>

            {/* Offer Banner Image */}
            <div className="relative w-full h-24 md:h-56 shrink-0 overflow-hidden rounded-t-3xl md:rounded-t-none">
              <Image 
                src="/assets/ghee.png"
                alt="Ghee Therapy Offer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent" />
              <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 bg-red-600 text-white font-bold text-[8px] md:text-[10px] tracking-widest uppercase px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-lg border border-red-500/30">
                Limited Time Offer
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 md:p-10 flex-grow flex flex-col justify-between">
              
              {!isSubmitted ? (
                /* Form View */
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h2 className="font-display text-lg md:text-4xl font-bold text-text-primary leading-tight">
                      Special Launch Offer
                    </h2>
                    <p className="text-gold font-semibold text-xs md:text-lg mt-0.5 md:mt-1 tracking-wide">
                      Traditional Kasa Ghee Therapy
                    </p>
                  </div>

                  {/* Pricing Comparison */}
                  <div className="flex items-center gap-2.5 md:gap-4 bg-bg-dark border border-gold-border/40 p-3 md:p-4 rounded-2xl">
                    <div className="flex flex-col">
                      <span className="text-[9px] md:text-xs text-text-primary/50 uppercase tracking-wider font-medium">Actual Rate</span>
                      <span className="text-sm md:text-lg text-text-primary/60 line-through font-bold">₹1850</span>
                    </div>
                    <div className="h-6 w-px bg-gold-border/30" />
                    <div className="flex flex-col">
                      <span className="text-[9px] md:text-xs text-gold uppercase tracking-wider font-semibold">Offer Price</span>
                      <span className="text-base md:text-3xl text-gold font-black">₹1250</span>
                    </div>
                    <div className="ml-auto bg-gold/15 border border-gold/30 text-gold text-[9px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-xl">
                      Save ₹600 (32% Off)
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-2 md:space-y-3 pt-1 md:pt-2">
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-primary/70 mb-1">Therapy Benefits</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      <div className="flex items-start gap-1.5 md:gap-2 text-[11px] md:text-sm text-text-primary/80">
                        <Sparkles size={14} className="text-gold shrink-0 mt-0.5 md:size-[16px]" />
                        <span><strong>Crack Heel Cure:</strong> Deeply hydrates & heals fissures.</span>
                      </div>
                      <div className="flex items-start gap-1.5 md:gap-2 text-[11px] md:text-sm text-text-primary/80">
                        <Sparkles size={14} className="text-gold shrink-0 mt-0.5 md:size-[16px]" />
                        <span><strong>Face Glow:</strong> Enhances complexion via facial reflex points.</span>
                      </div>
                      <div className="flex items-start gap-1.5 md:gap-2 text-[11px] md:text-sm text-text-primary/80">
                        <Flame size={14} className="text-gold shrink-0 mt-0.5 md:size-[16px]" />
                        <span><strong>Reduce Body Heat:</strong> Draws out excess Pitta with Kasa bowl.</span>
                      </div>
                      <div className="flex items-start gap-1.5 md:gap-2 text-[11px] md:text-sm text-text-primary/80">
                        <Sparkles size={14} className="text-gold shrink-0 mt-0.5 md:size-[16px]" />
                        <span><strong>Deep Sleep:</strong> Relieves foot fatigue & calms mind.</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Intake */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4 pt-3 md:pt-4 border-t border-gold-border/20">
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text-primary/70">Claim Your Offer</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label htmlFor="offer-name" className="block text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-text-primary/60 mb-1 md:mb-1.5">
                          Full Name
                        </label>
                        <input
                          id="offer-name"
                          type="text"
                          placeholder="Your name"
                          {...register('name', { required: 'Name is required' })}
                          className="w-full px-3.5 py-2.5 md:px-4 md:py-3 bg-bg-dark border border-gold-border/60 text-text-primary rounded-xl text-xs md:text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/15"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-[10px] md:text-xs mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="offer-phone" className="block text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-text-primary/60 mb-1 md:mb-1.5">
                          Phone Number
                        </label>
                        <input
                          id="offer-phone"
                          type="tel"
                          placeholder="10-digit number"
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^[6-9]\d{9}$/,
                              message: 'Enter valid 10-digit number'
                            }
                          })}
                          className="w-full px-3.5 py-2.5 md:px-4 md:py-3 bg-bg-dark border border-gold-border/60 text-text-primary rounded-xl text-xs md:text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/15"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-[10px] md:text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <GoldButton
                      type="submit"
                      ariaLabel="Claim launch offer"
                      className="w-full mt-1.5 py-2.5 md:py-3.5 font-bold text-xs md:text-base"
                    >
                      Generate Offer Code
                    </GoldButton>
                  </form>
                </div>
              ) : (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 md:space-y-6 text-center my-auto flex flex-col items-center"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold animate-bounce mb-1 md:mb-2">
                    <Sparkles size={20} className="md:size-[28px]" />
                  </div>

                  <div>
                    <h2 className="font-display text-xl md:text-3xl font-bold text-text-primary">
                      Offer Claimed Successfully!
                    </h2>
                    <p className="text-[11px] md:text-sm text-text-primary/75 mt-1.5 md:mt-2 max-w-sm mx-auto">
                      Here is your exclusive coupon code. Please copy it or book directly via WhatsApp to redeem your ₹600 discount.
                    </p>
                  </div>

                  {/* Coupon Code Panel */}
                  <div className="w-full max-w-sm bg-bg-dark border border-dashed border-gold/60 rounded-2xl p-4 md:p-6 relative overflow-hidden">
                    <div className="absolute -left-2 md:-left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-surface-dark border-r border-dashed border-gold/60" />
                    <div className="absolute -right-2 md:-right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-surface-dark border-l border-dashed border-gold/60" />
                    
                    <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-text-primary/50 font-bold block mb-0.5 md:mb-1">Your Code</span>
                    <span className="font-mono text-xl md:text-3xl font-black text-gold tracking-widest block py-1.5 px-3 md:py-2 md:px-4 bg-gold/5 rounded-xl border border-gold/15">
                      {offerCode}
                    </span>

                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 text-[10px] md:text-xs text-gold hover:text-gold-light mt-3 md:mt-4 font-semibold transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check size={12} className="text-green-500 md:size-[14px]" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} className="md:size-[14px]" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Booking CTA */}
                  <div className="w-full max-w-sm pt-2 md:pt-4 space-y-2.5 md:space-y-3">
                    <button
                      onClick={() => handleWhatsAppClaim(submittedData || { name: '', phone: '' })}
                      className="w-full py-3 md:py-4 px-4 md:px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 cursor-pointer text-xs md:text-base"
                    >
                      <MessageCircle size={16} className="fill-white stroke-none md:size-[20px]" />
                      Book Ghee Therapy on WhatsApp
                    </button>
                    <button
                      onClick={handleClose}
                      className="text-[10px] md:text-xs text-text-primary/50 hover:text-text-primary font-medium transition-colors"
                    >
                      Close & Continue Browsing
                    </button>
                  </div>
                </motion.div>
              )}

              {/* T&C Footer */}
              <div className="mt-6 md:mt-8 pt-3 md:pt-4 border-t border-gold-border/20 text-center">
                <p className="text-[8px] md:text-[10px] text-text-primary/40 leading-relaxed font-light">
                  *Offer valid for Ghee Therapy (60 Mins) only. Coupon code expires soon. One claim per user. Show code at the reception desk to redeem.
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
