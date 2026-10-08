/**
 * Central Business & SEO Site Configuration
 * 
 * Supports multi-branch structure for AM Unisex Salon:
 * 1. Nallagandla (Primary Focus)
 * 2. Pragathi Nagar (Second Branch)
 */

export const SITE_CONFIG = {
  // Domain / Site URL (configurable via VITE_SITE_URL in production / custom domains)
  siteUrl: (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) 
    ? import.meta.env.VITE_SITE_URL.replace(/\/$/, "") 
    : "https://am-salon-three.vercel.app",

  // Brand / Organization Identity
  businessName: "AM Unisex Salon",
  legalName: "AM Unisex Salon",
  tagline: "Premium Unisex Family Salon in Hyderabad",
  
  // Primary Contact Info
  telephone: "+917569979965",
  formattedPhone: "+91 75699 79965",
  whatsappNumber: "917569979965",
  
  // Operating Hours (Uniform across branches)
  openingHours: {
    days: "Monday–Sunday",
    hoursText: "9:00 AM – 9:00 PM",
    opens: "09:00",
    closes: "21:00",
  },

  // Social & Official Profiles
  instagramHandle: "@akshaiunisexsalonpragathinagar",
  instagramUrl: "https://www.instagram.com/akshaiunisexsalonpragathinagar",

  // Brand Assets
  logoUrl: "/images/am-salon-logo.webp",
  heroImageUrl: "/images/reception-01.webp",

  // Multi-Branch Configurations
  locations: {
    nallagandla: {
      id: "nallagandla",
      branchName: "AM Unisex Salon — Nallagandla",
      shortName: "Nallagandla",
      isPrimary: true,
      tagline: "Primary Salon Branch in Nallagandla, Serilingampalle",
      address: {
        building: "Block B 201, HYTEK ARCADE",
        plotNo: "Plot No. 87 & 88",
        streetAddress: "Plot No. 87 & 88, Block B 201, HYTEK ARCADE, Kancha Gachibowli Road",
        addressLocality: "Nallagandla, Serilingampalle (M)",
        addressRegion: "Telangana",
        postalCode: "500046",
        addressCountry: "IN",
        fullAddress: "Plot No. 87 & 88, Block B 201, HYTEK ARCADE, Kancha Gachibowli Road, Nallagandla, Hyderabad, Telangana 500046, India",
        landmark: "HYTEK ARCADE, Kancha Gachibowli Road, near Aparna Sarovar, opposite Spice Kitchen",
      },
      geo: {
        latitude: 17.472714,
        longitude: 78.315582,
      },
      phone: "+917569979965",
      formattedPhone: "+91 75699 79965",
      whatsappNumber: "917569979965",
      placeId: "ChIJvYgW0eaTyzsR5RXPS5AUPoA",
      googleMapsPlaceUrl: "https://www.google.com/maps/search/?api=1&query=AM+Unisex+Salon+Nallagandla&query_place_id=ChIJvYgW0eaTyzsR5RXPS5AUPoA",
      googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=AM+Unisex+Salon+Nallagandla&destination_place_id=ChIJvYgW0eaTyzsR5RXPS5AUPoA",
      googleMapsEmbedUrl: "https://maps.google.com/maps?q=AM+Unisex+Salon,+HYTEK+ARCADE,+Kancha+Gachibowli+Road,+Nallagandla,+Hyderabad&t=&z=16&ie=UTF8&iwloc=&output=embed",
      canonicalPath: "/locations/nallagandla",
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
    },
    pragathiNagar: {
      id: "pragathi-nagar",
      branchName: "AM Unisex Salon — Pragathi Nagar",
      listingName: "Am Akshai Unisex Salon",
      shortName: "Pragathi Nagar",
      isPrimary: false,
      tagline: "Unisex Family Salon in Pragathi Nagar, Kukatpally",
      address: {
        doorNo: "6-300012",
        streetAddress: "6-300012, near Shiva Medicals, 3rd Layout, Pragathi Nagar",
        addressLocality: "Pragathi Nagar",
        addressRegion: "Telangana",
        postalCode: "500090",
        addressCountry: "IN",
        fullAddress: "6-300012, near Shiva Medicals, 3rd Layout, Pragathi Nagar, Hyderabad, Telangana 500090, India",
        landmark: "Near Shiva Medicals, 3rd Layout",
      },
      geo: {
        latitude: 17.5165991,
        longitude: 78.3892702,
      },
      phone: "+917569979965",
      formattedPhone: "+91 75699 79965",
      whatsappNumber: "917569979965",
      placeId: "ChIJDZFPymePyzsR0XnQiH8WQk4",
      googleMapsPlaceUrl: "https://www.google.com/maps/search/?api=1&query=Am+Akshai+Unisex+Salon+Pragathi+Nagar&query_place_id=ChIJDZFPymePyzsR0XnQiH8WQk4",
      googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=17.5165991,78.3892702&destination_place_id=ChIJDZFPymePyzsR0XnQiH8WQk4",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8105574518427!2d78.3892702!3d17.5165991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91c53e8e2d45%3A0xc3b8a3db4cf8dd77!2sAkshai%20Unisex%20Salon!5e0!3m2!1sen!2sin!4v1700000000000",
      canonicalPath: "/locations/pragathi-nagar",
      areasServed: [
        "Pragathi Nagar",
        "Kukatpally",
        "Nizampet",
        "Bachupally",
        "Miyapur",
        "JNTU",
        "Hyderabad",
      ],
    },
  },

  // Primary address fallback
  address: {
    streetAddress: "Plot No. 87 & 88, Block B 201, HYTEK ARCADE, Kancha Gachibowli Road, Nallagandla",
    addressLocality: "Nallagandla & Pragathi Nagar",
    addressRegion: "Telangana",
    postalCode: "500046",
    addressCountry: "IN",
    fullAddress: "Plot No. 87 & 88, Block B 201, HYTEK ARCADE, Kancha Gachibowli Road, Nallagandla, Hyderabad, Telangana 500046, India",
  },
  
  googleMapsPlaceUrl: "https://www.google.com/maps/search/?api=1&query=AM+Unisex+Salon+Nallagandla&query_place_id=ChIJvYgW0eaTyzsR5RXPS5AUPoA",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=AM+Unisex+Salon+Nallagandla&destination_place_id=ChIJvYgW0eaTyzsR5RXPS5AUPoA",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=AM+Unisex+Salon,+HYTEK+ARCADE,+Kancha+Gachibowli+Road,+Nallagandla,+Hyderabad&t=&z=16&ie=UTF8&iwloc=&output=embed",

  areasServed: [
    "Nallagandla",
    "Pragathi Nagar",
    "Serilingampalle",
    "Aparna Sarovar",
    "Tellapur",
    "Gachibowli",
    "Financial District",
    "BHEL",
    "Chandanagar",
    "Kukatpally",
    "Nizampet",
    "Bachupally",
    "Miyapur",
    "JNTU",
    "Hyderabad",
  ],
};
