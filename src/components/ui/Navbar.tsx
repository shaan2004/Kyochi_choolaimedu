'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Phone, Clock, MapPin, Sparkles, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OutlineButton } from './OutlineButton';
import { cn } from '@/lib/utils';

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

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Therapies', href: '#services' },
    { name: 'Why Us', href: '#benefits' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Header/Navbar Wrapper */}
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300">
        
        {/* Contact Info Bar (Hidden when scrolled) */}
        <div 
          className={cn(
            "bg-bg-dark/95 border-b border-gold-border/20 text-[10px] md:text-xs text-text-primary/70 transition-all duration-300 overflow-hidden",
            isScrolled ? "h-0 opacity-0" : "h-9 opacity-100"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <MapPin size={11} className="text-gold" /> Choolaimedu, Chennai
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Clock size={11} className="text-gold" /> Mon - Sun: 10 AM - 8 PM
              </span>
            </div>
            <div>
              <a href="tel:+919566001066" className="flex items-center gap-1.5 hover:text-gold transition-colors">
                <Phone size={11} className="text-gold animate-[pulse_2s_infinite]" /> +91 95660 01066
              </a>
            </div>
          </div>
        </div>

        {/* Primary Navigation Bar */}
        <nav
          className={cn(
            "w-full transition-all duration-500 border-b",
            isScrolled 
              ? "py-3 bg-surface-dark/95 border-gold-border/40 backdrop-blur-md shadow-lg" 
              : "py-5 bg-transparent border-transparent"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            
            {/* Logo Brand Identity */}
            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, '#')}
              className="flex items-center group cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold rounded"
            >
              <div className="relative w-32 h-10 md:w-36 md:h-12 group-hover:scale-105 transition-all duration-300">
                <img 
                  src="/assets/logo.png?v=2" 
                  alt="Kyochi Art of Healing" 
                  className="w-full h-full object-contain"
                />
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-medium text-text-primary/75 hover:text-gold transition-colors duration-300 focus:outline-none focus:text-gold relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+919566001066"
                className="flex items-center gap-1.5 text-sm text-text-primary/80 hover:text-gold transition-colors duration-300"
              >
                +91 95660 01066
                <Phone size={14} className="text-gold" />
              </a>
              <a
                href="mailto:kyochichoolaimedu@gmail.com"
                className="flex items-center gap-1.5 text-sm text-text-primary/80 hover:text-gold transition-colors duration-300"
              >
                kyochichoolaimedu@gmail.com
                <Mail size={14} className="text-gold" />
              </a>
              <OutlineButton
                href="#booking"
                ariaLabel="Book reflexology appointment"
                className="py-2.5 px-5 text-sm font-semibold rounded-xl"
              >
                Book Appointment
              </OutlineButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Menu"
              suppressHydrationWarning
              className="lg:hidden p-2 rounded-xl border border-gold-border/30 text-gold hover:bg-gold/10 transition-all duration-300 cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-28 bg-bg-dark/98 backdrop-blur-lg flex flex-col p-6 border-b border-gold-border/20 lg:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display text-2xl font-medium text-text-primary hover:text-gold transition-colors py-2 border-b border-gold-border/10 focus:outline-none focus:text-gold"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 flex flex-col gap-3">
                <a
                  href="tel:+919566001066"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl border border-gold-border/30 text-gold hover:bg-gold/10 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm cursor-pointer"
                >
                  <Phone size={18} />
                  +91 95660 01066
                </a>
                <a
                  href="mailto:kyochichoolaimedu@gmail.com"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl border border-gold-border/30 text-gold hover:bg-gold/10 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm cursor-pointer"
                >
                  <Mail size={18} />
                  kyochichoolaimedu@gmail.com
                </a>
                <OutlineButton
                  href="#booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  ariaLabel="Book appointment"
                  className="w-full py-3.5 font-bold"
                >
                  Book Appointment
                </OutlineButton>
              </div>
              <div className="pt-8 flex flex-col items-center gap-3 text-sm text-text-primary/60">
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gold" /> Choolaimedu, Chennai</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-gold" /> Mon - Sun: 10 AM - 8 PM</span>
                <a href="tel:+919566001066" className="flex items-center gap-1.5 text-gold font-medium mt-1">
                  <Phone size={14} className="animate-pulse" /> +91 95660 01066
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
