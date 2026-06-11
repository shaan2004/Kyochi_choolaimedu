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

// SEO Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://www.kyochi.in'),
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
  ],
  authors: [{ name: 'Kyochi Art of Healing' }],
  openGraph: {
    title: 'Kyochi — Foot Reflexology Center | Choolaimedu, Chennai',
    description: "India's leading foot reflexology brand. 10,000+ clients, 4.9★ rating, 150+ trained therapists.",
    url: 'https://www.kyochi.in',
    siteName: 'Kyochi',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { 
    card: 'summary_large_image', 
    title: 'Kyochi Reflexology',
  },
  robots: { 
    index: true, 
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { 
    canonical: 'https://www.kyochi.in',
  },
  verification: { 
    google: 'YOUR_GOOGLE_VERIFY_TOKEN',
  },
};

// JSON-LD Local Business Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Kyochi — Art of Healing",
  "description": "Foot reflexology center in Choolaimedu, Chennai",
  "url": "https://www.kyochi.in",
  "telephone": "+919566001066",
  "email": "kyochichoolaimedu@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Choolaimedu",
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
  "openingHours": ["Mo-Sa 09:00-20:00"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
