import { ServiceItem, Stylist, GalleryItem, Testimonial, FAQItem, OfferItem, TransformationItem } from "./types";

export const LOCAL_ASSETS = {
  salonInteriorMain: "/images/reception-01.webp",
  hairWashSpa: "/images/hair-wash-station-01.webp",
  skinCareRoom: "/images/facial-room-01.webp",
  salonCelebration: "/images/salon-celebration-02.webp",
  salonSign: "/images/salon-sign-01.webp",
  productDisplay: "/images/product-display-01.webp",
  spaChair: "/images/spa-chair-01.webp",
  // New uploaded images
  salonInteriorBalloons: "/images/salon-interior-balloons-01.jpg",
  salonEntranceSign: "/images/salon-entrance-sign-01.jpg",
  facialRoom2: "/images/facial-room-02.jpg",
  hairWashStation2: "/images/hair-wash-station-02.jpg",
  hairWashStation3: "/images/hair-wash-station-03.jpg",
};

// Services Offered
export const SERVICE_ITEMS: ServiceItem[] = [
  // Men's Services
  {
    id: "m1",
    name: "Classic Haircut & Styling",
    description: "Tailored luxury cut matching your face structure, completed with a hair wash, scalp massage, and expert blow-dry finish.",
    duration: "45 mins",
    category: "men",
  },
  {
    id: "m2",
    name: "Premium Beard Sculpting",
    description: "Precise beard trimming, lining, hot towel shave prep, custom beard oils, and a soothing premium charcoal skin massage.",
    duration: "30 mins",
    category: "men",
  },
  {
    id: "m3",
    name: "Luxury Royal Shave",
    description: "Classic straight-razor shave with luxury hot towels, soothing pre-shave lather, post-shave balm, and cold compress therapy.",
    duration: "35 mins",
    category: "men",
  },
  {
    id: "m4",
    name: "Nourishing Hair Spa",
    description: "Deep conditioning root treatment to restore hair strength, prevent hair loss, and stimulate healthy root growth.",
    duration: "50 mins",
    category: "men",
  },
  {
    id: "m5",
    name: "Anti-Dandruff Root Therapy",
    description: "Specialized clarifying treatment to cure dryness, irritation, and eliminate dandruff with premium formulas.",
    duration: "40 mins",
    category: "men",
  },
  {
    id: "m6",
    name: "Men's Custom Hair Coloring",
    description: "Garnet-black, premium natural brown, or custom root touch-up with ammonia-free products.",
    duration: "60 mins",
    category: "men",
  },

  // Women's Services
  {
    id: "w1",
    name: "High-Fashion Haircut & Styling",
    description: "Luxury layer cuts, bobs, or custom transformations by senior stylists, finished with intensive blow-out styling.",
    duration: "60 mins",
    category: "women",
  },
  {
    id: "w2",
    name: "Couture Styling & Updos",
    description: "Soft waves, braids, iron curlers, or intricate wedding buns perfect for parties and formal events.",
    duration: "45 mins",
    category: "women",
  },
  {
    id: "w3",
    name: "Omniplex Hair Smoothening",
    description: "Intense structure rebuilding process, restoring silky, sleek, frizz-free straight hair for up to 6 months.",
    duration: "180 mins",
    category: "women",
  },
  {
    id: "w4",
    name: "Ultra-Rich Hair Botox",
    description: "Deep molecular hair filling treatment. Plumps thin strands, seals split ends, and injects luxurious life into dull hair.",
    duration: "150 mins",
    category: "women",
  },
  {
    id: "w5",
    name: "Luxury Bridal Hair & Saree Draping",
    description: "Complete elegant hair arrangement, accessorizing, and precision saree draping with assistance.",
    duration: "90 mins",
    category: "women",
  },

  // Skin Care
  {
    id: "s1",
    name: "Vedic Radiance Facial",
    description: "Natural herbal extracts blended to hydrate, tighten aging cells, and deliver beautiful natural glow.",
    duration: "60 mins",
    category: "skin",
  },
  {
    id: "s2",
    name: "O2 Power-Clarify Facial",
    description: "Advanced oxygen infusion that purges impurities from pores, repairs acne, and refines uneven skin tone.",
    duration: "65 mins",
    category: "skin",
  },
  {
    id: "s3",
    name: "Insta-Glow Brightening Cleanup",
    description: "Rapid skin exfoliation, extraction of blackheads, and skin brightening masks to restore tired skin.",
    duration: "40 mins",
    category: "skin",
  },
  {
    id: "s4",
    name: "Tan-Clear Full Face Therapy",
    description: "Therapeutic de-tan pack containing active ingredients to gently reverse sunburn and environmental tanning.",
    duration: "45 mins",
    category: "skin",
  },
  {
    id: "s5",
    name: "Organic Honey Waxing & Threading",
    description: "Gentle aesthetic waxing for sensitive face/body skin, accompanied by shape sculpting for brows and upper lips.",
    duration: "30 mins",
    category: "skin",
  },

  // Hair Treatments
  {
    id: "h1",
    name: "Pro-Keratin Protein Therapy",
    description: "Restores broken disulfide bonds, coating individual follicles with luxury keratin to minimize absolute frizz and curl.",
    duration: "120 mins",
    category: "hair",
  },
  {
    id: "h2",
    name: "Deep Nourishment Caviar Spa",
    description: "Premium hair pampering using antioxidant-rich caviar beads to intensely hydrate depleted strands.",
    duration: "60 mins",
    category: "hair",
  },
  {
    id: "h3",
    name: "Animate Hair Repair Service",
    description: "Multi-layered repair process addressing severe damage from bleaching, bleaching agents, heat, and pool chlorine.",
    duration: "75 mins",
    category: "hair",
  },
  {
    id: "h4",
    name: "Follicle Strengthening Treatment",
    description: "Microneedling-friendly herbal formulas massaged straight into the dermis to bolster hair elasticity and thickness.",
    duration: "50 mins",
    category: "hair",
  },

  // Bridal Services
  {
    id: "b1",
    name: "Airbrush Bridal Master Makeup",
    description: "High-definition flawless airbrush finish. Includes full face contouring, lash extension, and personalized consulting.",
    duration: "120 mins",
    category: "bridal",
  },
  {
    id: "b2",
    name: "Elegant Engagement makeover",
    description: "Lightweight, long-lasting dewy skin finish, featuring customized eyeshadow matching your festive bridal wear.",
    duration: "90 mins",
    category: "bridal",
  },
  {
    id: "b3",
    name: "Groom Grooming Portfolio",
    description: "Detailed haircut, beard sculpture, skin brightening cleanup, hairstyle locking, and facial tan clearance.",
    duration: "80 mins",
    category: "bridal",
  },
];

// Stylists / Experience Showcase
export const STYLISTS: Stylist[] = [
  {
    id: "st1",
    name: "Manish Kumar",
    role: "Senior Master Stylist",
    experience: "10+ Years Experience",
    specialization: "Signature Haircuts, Hair Botox, and Balayage Color",
    imageUrl: LOCAL_ASSETS.salonInteriorMain,
  },
  {
    id: "st2",
    name: "Pookar Singh",
    role: "Hair Specialist & Therapist",
    experience: "8+ Years Experience",
    specialization: "Keratin Treatment, Men's Sculpting, and Scalp Care",
    imageUrl: LOCAL_ASSETS.hairWashSpa,
  },
  {
    id: "st3",
    name: "Anjali Rao",
    role: "Lead Skincare & Makeup Expert",
    experience: "7+ Years Experience",
    specialization: "Bridal Cosmetics, Luxury Facials, and Glow Cleanups",
    imageUrl: LOCAL_ASSETS.skinCareRoom,
  },
];

// Testimonials / Reviews from Real Hyderabad Clients
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "r1",
    name: "Aravind Pappala",
    text: "Fantastic experience! Highly professional service at incredibly affordable prices. A massive shoutout to Manish who did an absolutely wonderful job. Highly recommend!",
    rating: 5,
  },
  {
    id: "r2",
    name: "Divya Gidugu",
    text: "I had a great experience at the salon. Pookar did my haircut and did an amazing job.",
    rating: 5,
  },
  {
    id: "r3",
    name: "Haritha Godugu",
    text: "Affordable prices with amazing services. Very friendly staff and great atmosphere.",
    rating: 5,
  },
  {
    id: "r4",
    name: "Priyanka Chowdary",
    text: "Hair Botox treatment results were amazing. Hospitality and service were top-notch.",
    rating: 5,
  },
  {
    id: "r5",
    name: "Chandu Vakita",
    text: "Wonderful experience. Hair service and facial were done perfectly.",
    rating: 5,
  },
  {
    id: "r6",
    name: "Padmaja Reddy",
    text: "Anti-dandruff Hair Spa was peaceful and worth every penny.",
    rating: 5,
  },
];

// Special Offers Selection
export const SPECIAL_OFFERS: OfferItem[] = [
  {
    id: "o1",
    title: "First-Time Guest Welcome Off",
    discount: "Flat 15% OFF",
    description: "First time at AM Salon? Enjoy flat savings across any hair highlight or premium global hair color.",
    code: "WELCOMEAM",
  },
  {
    id: "o2",
    title: "Luxury Botox & Spa Bundle",
    discount: "Save up to ₹1,499",
    description: "Book our premium Molecular Botox Filler together with deep scalp nourishment for healthy strands.",
    code: "BOTOXBUNDLE",
  },
  {
    id: "o3",
    title: "Complete Bridal Prep Pack",
    discount: "20% OFF Package",
    description: "Comprehensive package including master airbrush makeup, luxury de-tan, spa facial, and saree draping.",
    code: "BRIDEGLOW",
  },
];

// FAQ list
export const FAQS: FAQItem[] = [
  {
    id: "f1",
    question: "Where is AM Unisex Salon located?",
    answer: "AM Unisex Salon is conveniently located Near Shiva Medicals, 3rd Layout, Pragathi Nagar, Hyderabad, Telangana 500090, India.",
  },
  {
    id: "f2",
    question: "What are the opening hours?",
    answer: "AM Unisex Salon is open all 7 days a week, Monday through Sunday, from 9:00 AM to 9:00 PM.",
  },
  {
    id: "f3",
    question: "Do you provide services for both men and women?",
    answer: "Yes! AM Unisex Salon is a full-service unisex family salon. We have dedicated styling stations and private treatment rooms catering to men, women, and children.",
  },
  {
    id: "f4",
    question: "What hair services are available?",
    answer: "We offer classic and modern haircuts for men and women, beard sculpting, hair wash and blow-dry styling, Pro-Keratin smoothing, Molecular Hair Botox, ammonia-free hair coloring, root touch-ups, and revitalizing hair spas.",
  },
  {
    id: "f5",
    question: "How can I book an appointment?",
    answer: "You can book easily online through our website's booking form, call our reception directly at +91 75699 79965, or connect with us on WhatsApp for quick confirmation.",
  },
  {
    id: "f6",
    question: "What specialty treatments do you offer for damaged hair?",
    answer: "We are Hyderabad's leading specialists in restorative hair therapies. Our treatments include molecular Hair Botox (for shine and volume), signature Pro-Keratin protein treatments, and deep-root conditioning Caviar Spas.",
  },
  {
    id: "f7",
    question: "Is secure four-wheeler and two-wheeler parking available?",
    answer: "Yes, convenient parking space is available for both two-wheelers and family cars near Shiva Medicals, Pragathi Nagar.",
  },
  {
    id: "f8",
    question: "Which major professional beauty product brands do you use?",
    answer: "We strictly prioritize your hair and skin health. We use genuine international formulas such as L'Oréal Professional, Matrix, Schwarzkopf, and premium dermatological care brands.",
  },
];

// Before and After Transformations
export const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: "t1",
    title: "Salon Space Upgrade",
    category: "Interiors",
    beforeUrl: LOCAL_ASSETS.salonCelebration,
    afterUrl: LOCAL_ASSETS.salonInteriorMain,
  },
  {
    id: "t2",
    title: "Hair Wash & Spa Experience",
    category: "Hair Spa",
    beforeUrl: LOCAL_ASSETS.spaChair,
    afterUrl: LOCAL_ASSETS.hairWashSpa,
  },
];

// Rich Filterable Luxury Gallery Items — 6 unique professional salon photos
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "AM Unisex Salon Entrance",
    category: "interiors",
    imageUrl: LOCAL_ASSETS.salonEntranceSign,
  },
  {
    id: "g2",
    title: "Salon Interior & Celebration Decor",
    category: "interiors",
    imageUrl: LOCAL_ASSETS.salonInteriorBalloons,
  },
  {
    id: "g3",
    title: "Reception & Welcome Lounge",
    category: "interiors",
    imageUrl: LOCAL_ASSETS.salonInteriorMain,
  },
  {
    id: "g4",
    title: "Luxury Hair Wash & Spa Station",
    category: "hair-wash",
    imageUrl: LOCAL_ASSETS.hairWashStation2,
  },
  {
    id: "g5",
    title: "Premium Shampoo & Wash Zone",
    category: "hair-wash",
    imageUrl: LOCAL_ASSETS.hairWashStation3,
  },
  {
    id: "g6",
    title: "Private AC Facial Treatment Room",
    category: "facial",
    imageUrl: LOCAL_ASSETS.facialRoom2,
  },
];

