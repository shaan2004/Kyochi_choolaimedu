'use client';

import { Phone, MessageCircle, ChevronLeft } from 'lucide-react';
import { FloatButton } from './FloatButton';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Custom SVG components for brand icons since they were removed in Lucide v1.x
const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const FloatingSocials: React.FC = () => {
  return (
    <div
      role="group"
      aria-label="Quick contact options"
      className={cn(
        "z-40 pointer-events-none fixed right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3.5"
      )}
    >
      <motion.button
        suppressHydrationWarning
        onClick={() => window.dispatchEvent(new CustomEvent('open-kyochi-ghee-offer'))}
        aria-label="View Ghee Therapy Special Offer — ₹1500 (Save ₹1313)"
        title="View Ghee Therapy Special Offer"
        whileHover={{ scale: 1.12, y: -4 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full pointer-events-auto shadow-lg cursor-pointer",
          "bg-gold text-black border border-gold/80 hover:bg-gold-light hover:border-gold",
          "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-bg-dark"
        )}
      >
        <ChevronLeft size={22} className="stroke-[2.5]" />
      </motion.button>
      <FloatButton
        icon={<MessageCircle size={20} className="fill-current" />}
        href="https://wa.me/919566001066?text=Hello%20Kyochi!%20%F0%9F%8C%BF%20I'd%20like%20to%20know%20more%20about%20your%20reflexology%20services."
        ariaLabel="Book reflexology session on WhatsApp"
        className="bg-emerald-600/90 text-white border-emerald-500/30 hover:bg-emerald-500 hover:text-white hover:border-emerald-400 hover:shadow-[0_4px_15px_rgba(16,185,129,0.4)]"
      />
      <FloatButton
        icon={<InstagramIcon size={20} />}
        href="https://www.instagram.com/kyochi_choolaimedu/"
        ariaLabel="Follow Kyochi on Instagram"
      />
      <FloatButton
        icon={<FacebookIcon size={20} />}
        href="https://www.facebook.com/profile.php?id=61589085099683"
        ariaLabel="Follow Kyochi on Facebook"
      />
      <FloatButton
        icon={<Phone size={20} />}
        href="tel:+919566001066"
        ariaLabel="Call Kyochi Choolaimedu"
      />
    </div>
  );
};

