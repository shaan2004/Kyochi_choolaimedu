import { Service, Review, Benefit, Stat, FAQ } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'relaxation',
    title: 'Relaxation Reflexology',
    category: 'relaxation',
    excerpt: 'Soothing foot reflexology to ease tension, promote deep relaxation and quiet the mind.',
    description: 'A classic relaxation therapy that focuses on calming the nervous system, releasing muscular tension, and restoring calm. Rates: 30 Mins (₹500) | 40 Mins (₹600) | 60 Mins (₹700)',
    durationMin: 60,
    priceInr: 700,
    tags: ['Relaxation', '30/40/60 Mins'],
    iconName: 'Flower2'
  },
  {
    id: 'destress',
    title: 'De-Stress Reflexology',
    category: 'relaxation',
    excerpt: 'Relieve mental fatigue and reduce cortisol levels through targeted solar plexus reflexes.',
    description: 'Specially designed to combat stress. Targets head, neck, and solar plexus reflex zones to reduce stress and anxiety. Rates: 30 Mins (₹600) | 40 Mins (₹700) | 60 Mins (₹800)',
    durationMin: 60,
    priceInr: 800,
    tags: ['Mind Calm', '30/40/60 Mins'],
    iconName: 'Brain'
  },
  {
    id: 'chronic-pain',
    title: 'Chronic Pain Reflexology',
    category: 'therapy',
    excerpt: 'Targeted pressure for heel pain, plantar fasciitis, and local foot inflammation.',
    description: 'Deep therapeutic reflexology targeting local inflammation, heel spurs, and plantar fasciitis. Rates: 30 Mins (₹650) | 40 Mins (₹750) | 60 Mins (₹850)',
    durationMin: 60,
    priceInr: 850,
    tags: ['Therapeutic', 'Relief', '30/40/60 Mins'],
    iconName: 'Activity'
  },
  {
    id: 'soul-serenity',
    title: 'Soul Serenity',
    category: 'relaxation',
    excerpt: 'Relieves stress, soothes tired muscles and brings peace & balance to your body, mind and spirit.',
    description: 'A premium therapeutic session that targets full foot zones to relieve deep-seated stress and soothe tired muscles, bringing ultimate peace and balance.',
    durationMin: 60,
    priceInr: 950,
    tags: ['Specialty', '60 Mins'],
    iconName: 'Sparkles'
  },
  {
    id: 'detox',
    title: 'Detox',
    category: 'healing',
    excerpt: 'Detox clears toxins by stimulating specific reflex areas on the feet, enhancing energy flow & helps in weight control.',
    description: 'Designed to flush out waste and metabolic toxins. Stimulates primary cleansing organs like liver and kidney points on the feet, enhancing natural detoxification.',
    durationMin: 60,
    priceInr: 1100,
    tags: ['Detox', '60 Mins'],
    iconName: 'Droplets'
  },
  {
    id: 'femme-cycle',
    title: 'Femme Cycle',
    category: 'healing',
    excerpt: 'Non-invasive way to balance hormones and promote menstrual health.',
    description: 'A specialized treatment mapping uterine, ovarian, and endocrine reflexes to help balance female hormones, ease cramping, and promote cycle health.',
    durationMin: 60,
    priceInr: 1100,
    tags: ['Endocrine Care', '60 Mins'],
    iconName: 'Heart'
  },
  {
    id: 'face-detox',
    title: 'Face Detox',
    category: 'healing',
    excerpt: 'Helps improve skin health, reduce stress, and promote overall well-being through facial reflex points.',
    description: 'Works on the delicate facial reflex zones to stimulate lymphatic drainage, reduce sinus tension, and improve microcirculation for a healthy glow.',
    durationMin: 30,
    priceInr: 850,
    tags: ['Skin Health', '30 Mins'],
    iconName: 'Smile'
  },
  {
    id: 'little-feet',
    title: 'Little Feet',
    category: 'therapy',
    excerpt: 'Supports healthy growth and relaxation in children through gentle foot reflexology.',
    description: 'A very soft, soothing reflexology session customized specifically for children to promote better sleep, support growth, and ease hyper-activeness.',
    durationMin: 30,
    priceInr: 450,
    tags: ['Children', '30 Mins'],
    iconName: 'Baby'
  },
  {
    id: 'nasal',
    title: 'Nasal',
    category: 'therapy',
    excerpt: 'Relieves congestion, nasal irritation, sinus and cold.',
    description: 'Targets the sinus, bronchial, and lung reflex zones on the toes and foot pad to relieve nasal congestion, sinus pressure, and cold symptoms.',
    durationMin: 60,
    priceInr: 1100,
    tags: ['Sinus Relief', '60 Mins'],
    iconName: 'Wind'
  },
  {
    id: 'vita-flex',
    title: 'Vita Flex',
    category: 'healing',
    excerpt: 'Promotes the health and healing of every body system and energy booster for feet and body.',
    description: 'An ancient reflexology mapping system applying roll-and-release pressure. Boosts overall vitality, enhances spinal pathways, and energizes the entire body.',
    durationMin: 60,
    priceInr: 1100,
    tags: ['Vitality Boost', '60 Mins'],
    iconName: 'Zap'
  },
  {
    id: 'ghee-therapy',
    title: 'Ghee Therapy',
    category: 'healing',
    excerpt: 'Authentic Ayurvedic foot therapy using pure ghee to heal cracked heels, release body heat, and enhance skin radiance.',
    description: 'A traditional Ayurvedic foot massage using pure ghee. It draws out excess internal body heat, repairs and cures dry, cracked heels, enhances blood flow for a radiant face glow, and promotes deep, restorative sleep.',
    durationMin: 60,
    priceInr: 1850,
    tags: ['Ayurvedic', 'Crack Heel Cure', '60 Mins'],
    iconName: 'Sparkles'
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 'deep-relaxation',
    title: 'Deep Relaxation',
    description: 'Promotes deep systemic relaxation, soothing tired muscles and calming the nervous system.',
    iconName: 'Leaf'
  },
  {
    id: 'stress-relief',
    title: 'Stress Relief',
    description: 'Lowers cortisol levels and helps quiet an overactive mind to dissolve everyday stress.',
    iconName: 'Flower2'
  },
  {
    id: 'improves-immunity',
    title: 'Improves Immunity',
    description: 'Stimulates endocrine and organ reflex zones to bolster natural immune defenses.',
    iconName: 'ShieldPlus'
  },
  {
    id: 'better-circulation',
    title: 'Better Circulation',
    description: 'Boosts healthy blood flow and activates lymphatic drainage throughout the body.',
    iconName: 'RefreshCw'
  },
  {
    id: 'boosts-energy',
    title: 'Boosts Energy',
    description: 'Clears blocked energetic pathways to revitalize organs and restore vitality.',
    iconName: 'Zap'
  },
  {
    id: 'restores-balance',
    title: 'Restores Balance',
    description: 'Brings natural harmony and equilibrium to the mind, body, and spiritual systems.',
    iconName: 'Scale'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Haritha',
    stars: 5,
    serviceTag: 'Relaxation Reflexology',
    testimonial: 'Excellent foot therapy. I would highly recommend this. From start to finish done entirely by hands, activating each nerve in the foot. In a regular pedicure we hardly get 10 mins of massage, but here the entire session is pure therapy. The team is very friendly and they create meaningful employment opportunities for visually impaired individuals.',
    date: '4 Days Ago',
    location: 'Choolaimedu'
  },
  {
    id: 'rev-2',
    name: 'Varun V',
    stars: 5,
    serviceTag: 'Face Detox',
    testimonial: 'It\'s my 4th week doing face detox and the results are improving week by week. As my work consists of a lot of travelling during the day in the hot sun with dust and pollution, my face gets puffy by night. This face detox really helped me regain my actual debloated face back. Thank you Kyochi, especially Gopal sir!',
    date: '6 Days Ago',
    location: 'Choolaimedu'
  },
  {
    id: 'rev-3',
    name: 'Maha',
    stars: 5,
    serviceTag: 'De-Stress Reflexology',
    testimonial: 'Must visit place for foot therapy. The team handling the clients is amazing and truly appreciated. Prime and well-maintained place with an average cost that makes it worth the experience. The therapists are well-trained and it\'s inspiring to see them work.',
    date: '6 Days Ago',
    location: 'Choolaimedu'
  },
  {
    id: 'rev-4',
    name: 'Sandeep K',
    stars: 5,
    serviceTag: 'Vita Flex',
    testimonial: 'Had a wonderful experience at Kyochi Foot Reflexology Choolaimedu branch. The therapy was very relaxing and rejuvenating. The visually impaired therapists have incredible touch sensitivity and precision.',
    date: '2 Weeks Ago',
    location: 'Choolaimedu'
  },
  {
    id: 'rev-5',
    name: 'Rexy Arockiyasamy',
    stars: 5,
    serviceTag: 'Chronic Pain Reflexology',
    testimonial: 'Very good service. I tried it and my heel pain is completely gone. I decided to take it monthly three times. Thank you!',
    date: '2 Weeks Ago',
    location: 'Choolaimedu'
  },
  {
    id: 'rev-6',
    name: 'Nobi Dhanush',
    stars: 5,
    serviceTag: 'Relaxation Reflexology',
    testimonial: 'I visited Kyochi Foot Reflexology Choolaimedu for a relaxation session and was extremely satisfied. The ambiance is welcoming and peaceful, and the service quality is exceptional. The reflexology treatment was very effective in relieving stress and tiredness. One of the most professional wellness centres in Choolaimedu.',
    date: '1 Week Ago',
    location: 'Choolaimedu'
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
    answer: 'For acute stress or mild fatigue, a single session provides immediate relief. For chronic conditions such as plantar fasciitis, severe anxiety, or hormonal imbalances, we recommend a starter course of 5 to 7 sessions spaced weekly, followed by bi-weekly maintenance visits to sustain metabolic balance.'
  },
  {
    id: 'faq-5',
    question: 'Are there any contraindications for reflexology?',
    answer: 'Yes. Reflexology is not recommended if you have active blood clots (deep vein thrombosis), open foot wounds, severe foot fractures, infectious skin diseases on the feet, or during the first trimester of high-risk pregnancies. Please consult your physician if you have pre-existing cardiovascular conditions.'
  },
  {
    id: 'faq-6',
    question: 'What should I wear to my reflexology session?',
    answer: 'You may wear any comfortable clothing according to your preference. Since the treatment focuses only on the feet, no special attire is required. We recommend wearing something that allows you to relax and enjoy the session comfortably.'
  },
  {
    id: 'faq-7',
    question: 'How does booking work?',
    answer: 'Our booking form collects your name, contact details, and the service you like to book. Once you submit the form, WhatsApp opens with your booking details already filled in. Simply send the message, and our team will quickly confirm your appointment and preferred time slot.'
  }
];
