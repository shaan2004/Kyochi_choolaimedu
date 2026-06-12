import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/ui/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';

// Dynamic imports for below-the-fold components to optimize page load speeds
const StatsSection = dynamic(
  () => import('@/components/sections/StatsSection').then((mod) => mod.StatsSection),
  { ssr: true }
);

const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection').then((mod) => mod.AboutSection),
  { ssr: true }
);

const ServicesSection = dynamic(
  () => import('@/components/sections/ServicesSection').then((mod) => mod.ServicesSection),
  { ssr: true }
);

const BenefitsSection = dynamic(
  () => import('@/components/sections/BenefitsSection').then((mod) => mod.BenefitsSection),
  { ssr: true }
);

const ReviewsSection = dynamic(
  () => import('@/components/sections/ReviewsSection').then((mod) => mod.ReviewsSection),
  { ssr: true }
);

const FAQSection = dynamic(
  () => import('@/components/sections/FAQSection').then((mod) => mod.FAQSection),
  { ssr: true }
);

const BookingSection = dynamic(
  () => import('@/components/sections/BookingSection').then((mod) => mod.BookingSection),
  { ssr: true }
);

const Footer = dynamic(
  () => import('@/components/ui/Footer').then((mod) => mod.Footer),
  { ssr: true }
);

const FloatingSocials = dynamic(
  () => import('@/components/ui/FloatingSocials').then((mod) => mod.FloatingSocials),
  { ssr: true }
);

const PopupBooking = dynamic(
  () => import('@/components/ui/PopupBooking').then((mod) => mod.PopupBooking),
  { ssr: true }
);

const OfferSlideOver = dynamic(
  () => import('@/components/ui/OfferSlideOver').then((mod) => mod.OfferSlideOver),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main id="main-content" className="flex-grow">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <BenefitsSection />
        <ReviewsSection />
        <FAQSection />
        <BookingSection />
      </main>

      <Footer />

      {/* Floating social contact channels & scroll triggered reservation popup */}
      <FloatingSocials />
      <PopupBooking />
      <OfferSlideOver />
    </>
  );
}
