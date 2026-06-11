'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { SERVICES } from '@/lib/data';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-surface-dark/95 border-t border-gold-border/20 pt-16 pb-8 text-text-primary/75">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* Left Column: Brand & Tagline */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="relative w-32 h-10">
              <img 
                src="/assets/logo.png?v=2" 
                alt="Kyochi Art of Healing" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <p className="text-sm text-text-primary/60 leading-relaxed font-light">
            India's leading foot reflexology brand, providing clinical-grade reflex zone therapy through highly skilled visually impaired specialists.
          </p>
          <div className="pt-2 text-xs font-semibold text-gold uppercase tracking-wider">
            Choolaimedu, Chennai
          </div>
        </div>

        {/* Mid-Left Column: Services Quick Links */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-text-primary border-b border-gold-border/20 pb-2">
            Therapies
          </h3>
          <ul className="grid grid-cols-1 gap-2.5 text-sm">
            {SERVICES.slice(0, 10).map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, '#services')}
                  className="hover:text-gold transition-colors duration-300 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/45 group-hover:bg-gold transition-colors" />
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mid-Right Column: Section Links */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-text-primary border-b border-gold-border/20 pb-2">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-gold transition-colors">
                About Our Center
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-gold transition-colors">
                Our reflexology techniques
              </a>
            </li>
            <li>
              <a href="#benefits" onClick={(e) => handleLinkClick(e, '#benefits')} className="hover:text-gold transition-colors">
                Why choose Visually Impaired Therapists
              </a>
            </li>
            <li>
              <a href="#reviews" onClick={(e) => handleLinkClick(e, '#reviews')} className="hover:text-gold transition-colors">
                Customer Stories
              </a>
            </li>
            <li>
              <a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')} className="hover:text-gold transition-colors">
                Frequently Asked Questions
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column: Contact Details */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-text-primary border-b border-gold-border/20 pb-2">
            Contact Us
          </h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">Kyochi Choolaimedu</p>
                <p className="text-xs text-text-primary/60 mt-0.5 leading-relaxed">
                  No 14/5 Indira Gandhi 3rd Street,<br />
                  Near MMDA Bus Depot, Choolaimedu,<br />
                  Chennai, Tamil Nadu 600094
                </p>
                <a 
                  href="https://maps.google.com/?q=Kyochi+Choolaimedu+Chennai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold-light mt-1.5 font-medium transition-colors"
                >
                  View on Google Maps <ExternalLink size={10} />
                </a>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-gold shrink-0" />
              <a href="tel:+919566001066" className="hover:text-gold transition-colors">
                +91 95660 01066
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-gold shrink-0" />
              <a href="mailto:kyochichoolaimedu@gmail.com" className="hover:text-gold transition-colors">
                kyochichoolaimedu@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock size={16} className="text-gold shrink-0" />
              <span className="text-xs">
                Mon - Sun: 10:00 AM - 08:00 PM
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Local SEO city references */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gold-border/10 text-center text-xs text-text-primary/50 leading-relaxed">
        <p className="mb-4">
          Serving clients across Choolaimedu, Anna Nagar, Kilpauk, Nungambakkam, Aminjikarai, Chetpet, Kodambakkam, West Mambalam, T-Nagar, and all of Chennai, Tamil Nadu.
        </p>
        <p className="font-light">
          &copy; {currentYear} Kyochi — Art of Healing. All Rights Reserved. | <a href="#" className="hover:text-gold">Privacy Policy</a> | <a href="#" className="hover:text-gold">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};
