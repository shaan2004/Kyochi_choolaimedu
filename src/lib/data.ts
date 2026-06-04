import { Service, Review, Benefit, Stat, FAQ } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'royal-reflexology',
    title: 'Royal Foot Reflexology',
    category: 'relaxation',
    excerpt: 'The ultimate royal indulgence mapping key zones for deep systemic relaxation.',
    description: 'Experience our signature royal treatment. Combines traditional warm herbal foot soak, intensive reflex zone stimulation, and soothing hot towels to release built-up tension and restore natural balance.',
    durationMin: 60,
    priceInr: 1499,
    tags: ['Best Seller', 'Relaxation', 'Signature'],
    iconName: 'Sparkles'
  },
  {
    id: 'de-stress',
    title: 'De-Stress Reflexology',
    category: 'relaxation',
    excerpt: 'Calm your overactive nervous system and relieve mental exhaustion.',
    description: 'Specially designed for busy professionals. Focuses on solar plexus and head reflexes to reduce cortisol levels, ease mental stress, and induce deep meditative relaxation.',
    durationMin: 45,
    priceInr: 1199,
    tags: ['Mind Calm', 'Popular'],
    iconName: 'Brain'
  },
  {
    id: 'chronic-pain',
    title: 'Chronic Pain Reflexology',
    category: 'therapy',
    excerpt: 'Targeted therapy for plantar fasciitis, heel pain, and arch stiffness.',
    description: 'Deep tissue reflexology targeting local inflammation, heel spurs, and fascia tightness. Highly recommended for runners, teachers, and anyone standing for prolonged hours.',
    durationMin: 60,
    priceInr: 1699,
    tags: ['Therapeutic', 'Relief'],
    iconName: 'Activity'
  },
  {
    id: 'detox-reflexology',
    title: 'Detox Reflexology',
    category: 'healing',
    excerpt: 'Stimulate kidney, liver, and digestive reflex points to promote waste elimination.',
    description: 'Promotes systemic detoxification by stimulating lymphatic, urinary, and digestive reflex areas. Increases cellular oxygenation and leaves you feeling lightweight.',
    durationMin: 60,
    priceInr: 1599,
    tags: ['Detox', 'Wellness'],
    iconName: 'Droplets'
  },
  {
    id: 'sleep-inducing',
    title: 'Sleep Inducing Therapy',
    category: 'relaxation',
    excerpt: 'Prepare your mind and body for deep, restorative sleep.',
    description: 'Slow, rhythmic pressure on pineal, pituitary, and nervous system reflex zones. Excellent for insomnia sufferers and frequent travelers experiencing jetlag.',
    durationMin: 60,
    priceInr: 1399,
    tags: ['Sleep Care', 'Gentle'],
    iconName: 'Moon'
  },
  {
    id: 'neuropathy-care',
    title: 'Neuropathy Reflexology',
    category: 'therapy',
    excerpt: 'Improve blood flow, alleviate numbness, and re-energize nerve endings.',
    description: 'Gentle, specific stimulation techniques that enhance peripheral blood circulation and neural conductivity. Ideal for managing diabetic neuropathy symptoms.',
    durationMin: 45,
    priceInr: 1499,
    tags: ['Medical Aid', 'Circulation'],
    iconName: 'Zap'
  },
  {
    id: 'senior-mobility',
    title: 'Senior Mobility Reflexology',
    category: 'healing',
    excerpt: 'Soften stiff ankle joints, boost circulation, and restore vital energy.',
    description: 'A gentle, slow-paced reflexology session modified specifically for seniors. Enhances joint lubrication, reduces swelling, and safely boosts overall energy levels.',
    durationMin: 45,
    priceInr: 1099,
    tags: ['Senior Care', 'Soft Touch'],
    iconName: 'Heart'
  },
  {
    id: 'lymphatic-drainage',
    title: 'Lymphatic Drainage Reflexology',
    category: 'healing',
    excerpt: 'Reduce leg swelling, edema, and fluid retention with soft pumping strokes.',
    description: 'Uses rhythmic, circular pressure along lymphatic pathways in the feet and lower legs to clear toxins, stimulate fluid flow, and reduce swelling.',
    durationMin: 60,
    priceInr: 1799,
    tags: ['Therapeutic', 'Swelling Relief'],
    iconName: 'Wind'
  },
  {
    id: 'sports-recovery',
    title: 'Sports Recovery Reflexology',
    category: 'therapy',
    excerpt: 'Speed up muscle recovery, clear lactic acid, and restore flex. flexibility.',
    description: 'A rigorous reflexology session for athletes. Speeds up waste product clearance, improves range of motion, and targets Achilles tendons and calf structures.',
    durationMin: 60,
    priceInr: 1699,
    tags: ['Athletes', 'Deep Pressure'],
    iconName: 'Flame'
  },
  {
    id: 'head-shoulder-foot-combo',
    title: 'Head, Shoulder & Foot Combo',
    category: 'relaxation',
    excerpt: 'Complete stress release targeting main tension reservoirs.',
    description: 'Combine 40 minutes of deep foot reflexology with 20 minutes of targeted upper back, neck, and shoulder acupressure to dissolve stress from top to bottom.',
    durationMin: 90,
    priceInr: 2299,
    tags: ['Premium', 'All-In-One'],
    iconName: 'User'
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 'visually-impaired',
    title: 'Visually Impaired Therapists',
    description: 'Our therapists possess an extraordinary, highly-developed sense of touch, allowing them to detect blockages and tension with unmatched precision.',
    iconName: 'EyeOff'
  },
  {
    id: 'ancient-techniques',
    title: 'Authentic Reflexology Maps',
    description: 'We follow traditional, clinically-proven reflex zones mapped to vital organs, avoiding simple foot rubbing for real therapeutic outcomes.',
    iconName: 'Map'
  },
  {
    id: 'tailored-pressure',
    title: 'Customizable Pressure Scale',
    description: 'Whether you prefer a soft, relaxing touch or intense, deep-tissue trigger point work, our specialists customize the therapy for your body.',
    iconName: 'Sliders'
  },
  {
    id: 'premium-oils',
    title: 'Gold Organic Oils',
    description: 'We use premium, chemical-free massage oils infused with healing botanicals that nourish the skin without leaving a sticky residue.',
    iconName: 'CheckCircle'
  },
  {
    id: 'peaceful-ambience',
    title: 'Tranquil Sound-Insulated Cabins',
    description: 'Escape the bustle of Chennai in our temperature-controlled, ambient-lit private rooms designed to induce alpha brainwave relaxation.',
    iconName: 'VolumeX'
  },
  {
    id: 'hygiene-first',
    title: 'Medical-Grade Hygiene',
    description: 'We maintain a strict sanitization protocol with single-use disposable sheets, freshly laundered towels, and thoroughly sanitized tools.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'free-consultation',
    title: 'Pre-Therapy Mapping',
    description: 'Every session includes a complimentary pulse review and reflex zone assessment to identify areas requiring specialized attention.',
    iconName: 'ClipboardList'
  },
  {
    id: 'herbal-foot-bath',
    title: 'Traditional Herbal Soak',
    description: 'Begin your treatment with a hot foot bath infused with Epsom salt, ginger, and essential oils to open pores and soften muscle fibers.',
    iconName: 'Coffee'
  },
  {
    id: 'post-therapy-tea',
    title: 'Detoxifying Herbal Brew',
    description: 'Conclude your healing journey with a hot cup of our organic herbal tea formulation, flushing out toxins released during the session.',
    iconName: 'Smile'
  },
  {
    id: 'convenient-location',
    title: 'Choolaimedu Center Access',
    description: 'Centrally located with dedicated two-wheeler and four-wheeler parking, making it convenient to schedule daily or weekly recovery runs.',
    iconName: 'MapPin'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Anirudh Raghavan',
    stars: 5,
    serviceTag: 'Chronic Pain Reflexology',
    testimonial: 'I suffered from plantar fasciitis for 6 months. After just 3 sessions with the visually impaired therapist at Kyochi, my heel pain has completely vanished. Their tactile precision is unbelievable!',
    date: '2 Weeks Ago',
    location: 'Nungambakkam'
  },
  {
    id: 'rev-2',
    name: 'Deepika Sundar',
    stars: 5,
    serviceTag: 'Royal Foot Reflexology',
    testimonial: 'The absolute best foot reflexology in Chennai. The atmosphere is quiet, clean, and smells wonderful. The therapists are extremely respectful, and the herbal soak before the massage is pure heaven.',
    date: '1 Month Ago',
    location: 'Choolaimedu'
  },
  {
    id: 'rev-3',
    name: 'Vikram Sethupathi',
    stars: 5,
    serviceTag: 'De-Stress Reflexology',
    testimonial: 'As an IT professional sitting 10 hours a day, my feet and lower back are always tense. The De-Stress session at Kyochi is my weekly ritual. Immediate relaxation, highly recommended!',
    date: '3 Days Ago',
    location: 'Anna Nagar'
  },
  {
    id: 'rev-4',
    name: 'Meera Krishnan',
    stars: 5,
    serviceTag: 'Sleep Inducing Therapy',
    testimonial: 'I had severe sleep issues and anxiety. My therapist worked extensively on my toes (pineal gland points). I slept like a baby that very night. It feels magical but is pure therapeutic science.',
    date: '3 Weeks Ago',
    location: 'Kilpauk'
  },
  {
    id: 'rev-5',
    name: 'Dr. Rajesh Kumar',
    stars: 5,
    serviceTag: 'Neuropathy Care',
    testimonial: 'I recommend Kyochi to my patients looking for complementary therapies. Their hygienic practices, respect for patients, and scientific approach to reflexology mapping are top-tier in Chennai.',
    date: '1 Month Ago',
    location: 'Chetpet'
  },
  {
    id: 'rev-6',
    name: 'Shalini Swaminathan',
    stars: 5,
    serviceTag: 'Lymphatic Drainage',
    testimonial: 'My feet swelling during pregnancy was a major issue. The therapist was so gentle and used light pumping movements. The swelling reduced significantly by the next morning. Lifesavers!',
    date: '2 Months Ago',
    location: 'Aminjikarai'
  }
];

export const STATS: Stat[] = [
  {
    id: 'stat-1',
    value: 10000,
    suffix: '+',
    label: 'Happy Clients Served'
  },
  {
    id: 'stat-2',
    value: 4.9,
    suffix: '★',
    label: 'Google Rating Score'
  },
  {
    id: 'stat-3',
    value: 150,
    suffix: '+',
    label: 'Trained Therapists'
  },
  {
    id: 'stat-4',
    value: 9,
    suffix: '+',
    label: 'Years of Excellence'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How is reflexology different from a regular foot massage?',
    answer: 'While a standard foot massage focuses on relaxing the superficial muscles of the feet, reflexology is a targeted therapeutic system. We map specific zones on the feet that correspond directly to major organ systems, nerves, and glands. Stimulating these reflex zones helps restore energetic balance and promotes systemic healing throughout the body.'
  },
  {
    id: 'faq-2',
    question: 'Why does Kyochi highlight visually impaired therapists?',
    answer: 'Visually impaired therapists naturally possess a heightened, exceptionally developed tactile sense. Free from visual distractions, their hands can feel minute crystalline deposits, temperature shifts, and tightness in muscle fibers that others might miss. This allows them to execute highly precise reflex zone therapy.'
  },
  {
    id: 'faq-3',
    question: 'Does reflexology hurt?',
    answer: 'Certain reflex zones corresponding to congested organs might feel slightly tender or sensitive when stimulated. This is completely normal and indicates a blockage. Our therapists communicate with you throughout the session to adjust pressure according to your tolerance, ensuring a therapeutic yet deeply relaxing experience.'
  },
  {
    id: 'faq-4',
    question: 'How many sessions do I need to see results for chronic pain?',
    answer: 'For acute stress or mild fatigue, a single session provides immediate relief. For chronic conditions such as plantar fasciitis, severe anxiety, or diabetic neuropathy, we recommend a starter course of 3 to 5 sessions spaced weekly, followed by bi-weekly maintenance visits to sustain metabolic balance.'
  },
  {
    id: 'faq-5',
    question: 'Are there any contraindications for reflexology?',
    answer: 'Yes. Reflexology is not recommended if you have active blood clots (deep vein thrombosis), open foot wounds, severe foot fractures, infectious skin diseases on the feet, or during the first trimester of high-risk pregnancies. Please consult your physician if you have pre-existing cardiovascular conditions.'
  },
  {
    id: 'faq-6',
    question: 'What should I wear to my reflexology session?',
    answer: 'We recommend wearing loose, comfortable trousers or shorts that can be easily rolled up to the knee. This allows the therapist to access your calf muscles and lower leg lymphatic zones, which are integral to the reflexology treatment.'
  },
  {
    id: 'faq-7',
    question: 'How does booking work and why is it completed on WhatsApp?',
    answer: 'To ensure a seamless booking flow, our website intake form gathers your name, contact details, and selected service. Upon submission, it instantly compiles the data into a pre-formatted message and opens WhatsApp. This connects you directly with our front desk in real-time, allowing us to confirm your therapist and slot in under 60 seconds.'
  }
];
