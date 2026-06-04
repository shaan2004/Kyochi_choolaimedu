'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OutlineButton } from './OutlineButton';
import { cn } from '@/lib/utils';

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
            "bg-black/90 border-b border-gold-border/20 text-[10px] md:text-xs text-text-primary/70 transition-all duration-300 overflow-hidden",
            isScrolled ? "h-0 opacity-0" : "h-9 opacity-100"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <MapPin size={11} className="text-gold" /> Choolaimedu, Chennai
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Clock size={11} className="text-gold" /> Mon - Sat: 9 AM - 8 PM
              </span>
            </div>
            <div>
              <a href="tel:+919080389223" className="flex items-center gap-1.5 hover:text-gold transition-colors">
                <Phone size={11} className="text-gold animate-[pulse_2s_infinite]" /> +91 90803 89223
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
              className="flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold rounded"
            >
              <div className="p-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold group-hover:scale-105 transition-all duration-300">
                <Sparkles size={18} className="fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl md:text-2xl font-bold tracking-widest gold-gradient-text uppercase">
                  Kyochi
                </span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-gold-light/60 font-medium">
                  Art of Healing
                </span>
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

            {/* CTA Action Button */}
            <div className="hidden lg:block">
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-28 bg-[#0a0a0a]/98 backdrop-blur-lg flex flex-col p-6 border-b border-gold-border/20 lg:hidden"
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
              <div className="pt-6">
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
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-gold" /> Mon - Sat: 9 AM - 8 PM</span>
                <a href="tel:+919080389223" className="flex items-center gap-1.5 text-gold font-medium mt-1">
                  <Phone size={14} className="animate-pulse" /> +91 90803 89223
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
