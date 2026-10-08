import { FAQItem } from "./types";

export interface BranchLocationData {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  isPrimary: boolean;
  address: {
    building?: string;
    streetAddress: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    fullAddress: string;
    landmark: string;
  };
  phone: string;
  formattedPhone: string;
  whatsappNumber: string;
  hours: string;
  opens: string;
  closes: string;
  placeId?: string;
  googleMapsPlaceUrl: string;
  googleMapsDirectionsUrl: string;
  googleMapsEmbedUrl: string;
  canonicalPath: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  faqs: FAQItem[];
  areasServed: string[];
}

export interface LocationGalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
  description: string;
  isFeatured?: boolean;
}

export const NALLAGANDLA_GALLERY_ITEMS: LocationGalleryItem[] = [
  {
    id: "ng-1",
    title: "Main Salon Floor & Styling Stations",
    category: "Wide Interior",
    imageUrl: "/images/nallagandla-salon-interior-main-01.jpg",
    alt: "AM Unisex Salon Nallagandla salon interior showing overall floor, styling stations, and modern aesthetics",
    description: "Spacious wide-angle interior of AM Unisex Salon Nallagandla featuring luxury gold-accented styling chairs, expansive LED mirrors, ceiling greenery canopy, and bright Italian marble flooring.",
    isFeatured: true,
  },
  {
    id: "ng-2",
    title: "Hair Styling Stations & Nail Care Bar",
    category: "Styling & Manicure",
    imageUrl: "/images/nallagandla-styling-stations-manicure-01.jpg",
    alt: "AM Unisex Salon Nallagandla hair styling chairs, manicure nail station table, and greenery arch wall",
    description: "Dedicated manicure station with professional nail polish display, UV curing setup, ergonomic styling chairs, and natural green accent feature wall.",
    isFeatured: false,
  },
  {
    id: "ng-3",
    title: "Luxury Pedicure & Foot Spa Lounge",
    category: "Pedicure & Spa",
    imageUrl: "/images/nallagandla-pedicure-spa-lounge-01.jpg",
    alt: "AM Unisex Salon Nallagandla luxury pedicure reclining massage chairs and foot spa area",
    description: "Reclining leather massage chairs with personal pedicure tubs, hygienic towel warmers, and private ambient pampering zone.",
    isFeatured: false,
  },
];

export const NALLAGANDLA_BRANCH: BranchLocationData = {
  id: "nallagandla",
  name: "AM Unisex Salon — Nallagandla",
  shortName: "Nallagandla",
  tagline: "Primary Salon Branch in Nallagandla, Serilingampalle",
  isPrimary: true,
  address: {
    building: "Block B 201, HYTEK ARCADE",
    streetAddress: "Plot No. 87 & 88, Block B 201, HYTEK ARCADE, Kancha Gachibowli Road",
    locality: "Nallagandla, Serilingampalle (M)",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500046",
    fullAddress: "Plot No. 87 & 88, Block B 201, HYTEK ARCADE, Kancha Gachibowli Road, Nallagandla, Serilingampalle (M), Hyderabad, Telangana 500046, India",
    landmark: "HYTEK ARCADE, Kancha Gachibowli Road, near Aparna Sarovar, opposite Spice Kitchen",
  },
  phone: "+917569979965",
  formattedPhone: "+91 75699 79965",
  whatsappNumber: "917569979965",
  hours: "Monday–Sunday: 9:00 AM–9:00 PM",
  opens: "09:00",
  closes: "21:00",
  placeId: "ChIJvYgW0eaTyzsR5RXPS5AUPoA",
  googleMapsPlaceUrl: "https://www.google.com/maps/search/?api=1&query=AM+Unisex+Salon+Nallagandla&query_place_id=ChIJvYgW0eaTyzsR5RXPS5AUPoA",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=AM+Unisex+Salon+Nallagandla&destination_place_id=ChIJvYgW0eaTyzsR5RXPS5AUPoA",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=AM+Unisex+Salon,+HYTEK+ARCADE,+Kancha+Gachibowli+Road,+Nallagandla,+Hyderabad&t=&z=16&ie=UTF8&iwloc=&output=embed",
  canonicalPath: "/locations/nallagandla",
  seoTitle: "AM Unisex Salon Nallagandla | Unisex Salon in Nallagandla Hyderabad",
  seoDescription: "Visit AM Unisex Salon in Nallagandla, Hyderabad at HYTEK ARCADE. Premium haircuts, Pro-Keratin, Molecular Hair Botox, restorative hair spa & skin facials. Open 7 days.",
  h1: "AM Unisex Salon — Nallagandla, Hyderabad",
  areasServed: [
    "Nallagandla",
    "Serilingampalle",
    "Aparna Sarovar",
    "Tellapur",
    "Gachibowli",
    "Financial District",
    "BHEL",
    "Chandanagar",
    "Hyderabad",
  ],
  faqs: [
    {
      id: "fn1",
      question: "Where is AM Unisex Salon Nallagandla located?",
      answer: "AM Unisex Salon Nallagandla is located at Plot No. 87 & 88, Block B 201, HYTEK ARCADE, Kancha Gachibowli Road, Nallagandla, Serilingampalle (M), Hyderabad, Telangana 500046, India. Landmark: HYTEK ARCADE, near Aparna Sarovar, opposite Spice Kitchen.",
    },
    {
      id: "fn2",
      question: "What are the opening hours of AM Unisex Salon Nallagandla?",
      answer: "AM Unisex Salon Nallagandla is open 7 days a week, Monday through Sunday, from 9:00 AM to 9:00 PM.",
    },
    {
      id: "fn3",
      question: "What services does AM Unisex Salon Nallagandla offer?",
      answer: "AM Unisex Salon Nallagandla offers professional salon services based on our authentic catalog: men's precision haircuts & beard sculpting, women's high-fashion styling & layer cuts, Pro-Keratin protein therapy, Molecular Hair Botox, caviar hair spa, Vedic radiance skin facials, O2 clarifying facials, de-tan therapies, gentle waxing & threading, and bridal groom/bridal makeover packages.",
    },
    {
      id: "fn4",
      question: "How can I reach AM Unisex Salon Nallagandla?",
      answer: "You can easily reach our salon on Kancha Gachibowli Road at HYTEK ARCADE in Nallagandla, conveniently accessible from Aparna Sarovar, Tellapur, and Gachibowli. Parking is available for two-wheelers and cars.",
    },
    {
      id: "fn5",
      question: "How can I book an appointment at AM Unisex Salon Nallagandla?",
      answer: "You can book an appointment online on our website booking form by selecting the Nallagandla branch, calling our reception at +91 75699 79965, or connecting directly with us on WhatsApp for rapid confirmation.",
    },
    {
      id: "fn6",
      question: "Does AM Unisex Salon have another branch in Hyderabad?",
      answer: "Yes. AM Unisex Salon operates two physical branches in Hyderabad under the same business: our primary branch in Nallagandla (HYTEK ARCADE) and our second branch in Pragathi Nagar (Near Shiva Medicals, 3rd Layout). Both branches offer identical high standards of hygiene, authentic products, and experienced master stylists.",
    },
  ],
};

export const PRAGATHI_NAGAR_BRANCH: BranchLocationData = {
  id: "pragathi-nagar",
  name: "AM Unisex Salon — Pragathi Nagar",
  shortName: "Pragathi Nagar",
  tagline: "Unisex Family Salon in Pragathi Nagar, Kukatpally",
  isPrimary: false,
  address: {
    streetAddress: "Near Shiva Medicals, 3rd Layout, Pragathi Nagar",
    locality: "Pragathi Nagar",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500090",
    fullAddress: "Near Shiva Medicals, 3rd Layout, Pragathi Nagar, Hyderabad, Telangana 500090, India",
    landmark: "Near Shiva Medicals, 3rd Layout",
  },
  phone: "+917569979965",
  formattedPhone: "+91 75699 79965",
  whatsappNumber: "917569979965",
  hours: "Monday–Sunday: 9:00 AM–9:00 PM",
  opens: "09:00",
  closes: "21:00",
  googleMapsPlaceUrl: "https://maps.google.com/?cid=14103202395395251575",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=17.5165991,78.3892702",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8105574518427!2d78.3892702!3d17.5165991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91c53e8e2d45%3A0xc3b8a3db4cf8dd77!2sAkshai%20Unisex%20Salon!5e0!3m2!1sen!2sin!4v1700000000000",
  canonicalPath: "/locations/pragathi-nagar",
  seoTitle: "AM Unisex Salon Pragathi Nagar | Unisex Salon in Pragathi Nagar Hyderabad",
  seoDescription: "AM Unisex Salon in Pragathi Nagar, Hyderabad Near Shiva Medicals offers haircuts for men & women, hair spa, keratin, hair botox, and skin facials. Open 7 days.",
  h1: "AM Unisex Salon — Pragathi Nagar, Hyderabad",
  areasServed: [
    "Pragathi Nagar",
    "Kukatpally",
    "Nizampet",
    "Bachupally",
    "Miyapur",
    "JNTU",
    "Hyderabad",
  ],
  faqs: [
    {
      id: "fp1",
      question: "Where is AM Unisex Salon Pragathi Nagar located?",
      answer: "AM Unisex Salon Pragathi Nagar is located Near Shiva Medicals, 3rd Layout, Pragathi Nagar, Hyderabad, Telangana 500090, India.",
    },
    {
      id: "fp2",
      question: "What are the opening hours of the Pragathi Nagar branch?",
      answer: "Our Pragathi Nagar salon is open 7 days a week, Monday through Sunday, from 9:00 AM to 9:00 PM.",
    },
    {
      id: "fp3",
      question: "What services are available at Pragathi Nagar?",
      answer: "We offer complete grooming and hair care including men's haircuts, beard sculpting, women's styling, hair botox, Pro-Keratin smoothing, deep caviar hair spa, and botanical skin facials.",
    },
    {
      id: "fp4",
      question: "Does AM Unisex Salon have another branch in Hyderabad?",
      answer: "Yes, AM Unisex Salon also operates our primary branch in Nallagandla at HYTEK ARCADE, Kancha Gachibowli Road. You can visit or book at either branch based on your location.",
    },
  ],
};
