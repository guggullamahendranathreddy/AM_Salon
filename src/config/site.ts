/**
 * Central Business & SEO Site Configuration
 * 
 * Configurable for easy transition to custom domains and environment overrides.
 * Default site URL: https://am-salon-three.vercel.app
 */

export const SITE_CONFIG = {
  // Domain / Site URL (configurable via VITE_SITE_URL in production / custom domains)
  siteUrl: (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) 
    ? import.meta.env.VITE_SITE_URL.replace(/\/$/, "") 
    : "https://am-salon-three.vercel.app",

  // Business Identity
  businessName: "AM Unisex Salon",
  legalName: "AM Unisex Salon",
  tagline: "Premium Unisex Family Salon in Hyderabad",
  
  // Contact Info
  telephone: "+917569979965",
  formattedPhone: "+91 75699 79965",
  whatsappNumber: "917569979965",
  
  // Physical Address Details
  address: {
    streetAddress: "Near Shiva Medicals, 3rd Layout, Pragathi Nagar",
    addressLocality: "Pragathi Nagar",
    addressRegion: "Telangana",
    postalCode: "500090",
    addressCountry: "IN",
    fullAddress: "Near Shiva Medicals, 3rd Layout, Pragathi Nagar, Hyderabad, Telangana 500090, India",
  },
  
  // Geographic Coordinates & Verified Maps
  geo: {
    latitude: 17.5165991,
    longitude: 78.3892702,
  },
  googleMapsCid: "14103202395395251575",
  googleMapsPlaceUrl: "https://maps.google.com/?cid=14103202395395251575",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=17.5165991,78.3892702",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8105574518427!2d78.3892702!3d17.5165991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91c53e8e2d45%3A0xc3b8a3db4cf8dd77!2sAkshai%20Unisex%20Salon!5e0!3m2!1sen!2sin!4v1700000000000",

  // Operating Hours
  openingHours: {
    days: "Monday–Sunday",
    hoursText: "9:00 AM – 9:00 PM",
    opens: "09:00",
    closes: "21:00",
  },

  // Social & Official Profiles
  instagramHandle: "@akshaiunisexsalonpragathinagar",
  instagramUrl: "https://www.instagram.com/akshaiunisexsalonpragathinagar",

  // Local Key Areas Served in Hyderabad
  areasServed: [
    "Pragathi Nagar",
    "Nallagandla",
    "Serilingampally",
    "Kukatpally",
    "Nizampet",
    "Bachupally",
    "Miyapur",
    "Hyderabad",
  ],

  // Brand Assets
  logoUrl: "/images/am-salon-logo.jpeg",
  heroImageUrl: "/images/reception-01.webp",
};
