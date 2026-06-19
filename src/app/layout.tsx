import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';

// Configure Google Display & Body fonts
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

// ✅ Change this ONE env variable when deploying to your real domain.
// Set NEXT_PUBLIC_SITE_URL in your hosting platform (Vercel, Netlify, etc.)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kyochi.in';

// SEO Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Kyochi Choolaimedu | Foot Reflexology Center Chennai',
    template: '%s | Kyochi — Art of Healing',
  },
  description: 'Best foot reflexology center in Choolaimedu Chennai. Expert therapists, 10,000+ happy clients, 4.9★ Google rating. Relaxation, De-stress, Chronic Pain, Detox reflexology. Book now!',
  keywords: [
    'foot reflexology Choolaimedu',
    'reflexology center Chennai',
    'best foot massage Chennai',
    'foot reflexology near me',
    'reflexology clinic Choolaimedu',
    'holistic healing Chennai',
    'stress relief therapy Chennai',
    'chronic pain reflexology',
    'kyochi choolaimedu',
    'foot spa Chennai',
    'foot reflexology Choolaimedu Chennai',
    'visually impaired therapist reflexology',
    'ghee therapy Chennai',
    'Ayurvedic foot massage Chennai',
    'plantar fasciitis treatment Chennai',
    'foot reflexology near me Chennai',
  ],
  authors: [{ name: 'Kyochi Art of Healing' }],
  openGraph: {
    title: 'Kyochi — Foot Reflexology Center | Choolaimedu, Chennai',
    description: "India's leading foot reflexology brand. 10,000+ clients, 4.9★ rating, 150+ trained therapists.",
    url: SITE_URL,
    siteName: 'Kyochi',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyochi — Foot Reflexology Center | Choolaimedu, Chennai',
    description: "Best foot reflexology center in Choolaimedu, Chennai. Expert visually impaired therapists, 10,000+ happy clients, 4.9★ Google rating. Book now!",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// JSON-LD Local Business Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Kyochi — Art of Healing",
  "description": "Foot reflexology center in Choolaimedu, Chennai",
  "url": SITE_URL,
  "telephone": "+919566001066",
  "email": "kyochichoolaimedu@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No 14/5 Indira Gandhi 3rd Street, Near MMDA Bus Depot, Choolaimedu",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600094",
    "addressCountry": "IN"
  },
  "geo": { 
    "@type": "GeoCoordinates", 
    "latitude": 13.0782, 
    "longitude": 80.2217 
  },
  "openingHours": ["Mo-Su 10:00-20:00"],
  "priceRange": "₹₹",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1000",
    "bestRating": "5"
  },
  "serviceArea": ["Choolaimedu","Anna Nagar","Kilpauk","Nungambakkam","Chennai"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Reflexology Treatments",
    "itemListElement": [
      { "@type": "Offer", "name": "Relaxation Reflexology" },
      { "@type": "Offer", "name": "De-Stress Reflexology" },
      { "@type": "Offer", "name": "Chronic Pain Reflexology" }
    ]
  }
};

// JSON-LD FAQPage Schema for rich snippets
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is reflexology different from a regular foot massage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While a standard foot massage focuses on relaxing the superficial muscles of the feet, reflexology is a targeted therapeutic system. We map specific zones on the feet that correspond directly to major organ systems, nerves, and glands."
      }
    },
    {
      "@type": "Question",
      "name": "Why does Kyochi highlight visually impaired therapists?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visually impaired therapists naturally possess a heightened, exceptionally developed tactile sense. Free from visual distractions, their hands can feel minute crystalline deposits and tightness in muscle fibers, allowing highly precise reflex zone therapy."
      }
    },
    {
      "@type": "Question",
      "name": "Does reflexology hurt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Certain reflex zones corresponding to congested organs might feel slightly tender when stimulated. Our therapists communicate throughout the session to adjust pressure, ensuring a therapeutic yet deeply relaxing experience."
      }
    },
    {
      "@type": "Question",
      "name": "How many sessions do I need to see results for chronic pain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For acute stress, a single session provides immediate relief. For chronic conditions like plantar fasciitis or anxiety, we recommend 5–7 sessions spaced weekly, followed by bi-weekly maintenance visits."
      }
    },
    {
      "@type": "Question",
      "name": "How does booking work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fill our short booking form with your name, number, and preferred therapy. Your details are compiled into a WhatsApp message that opens automatically, connecting you to our Choolaimedu front desk to confirm your time slot."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link
          rel="preload"
          href="/assets/hero-poster.jpg"
          as="image"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-bg-dark text-text-primary flex flex-col">
        {/* Skip to Content Accessibility Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-gold text-black px-4 py-2 rounded-lg font-semibold border border-gold"
        >
          Skip to Content
        </a>
        {children}
      </body>
    </html>
  );
}
