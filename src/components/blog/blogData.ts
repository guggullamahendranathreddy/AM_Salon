import { BlogArticle } from "../../types";

export const BLOG_CATEGORIES: string[] = [
  "Hair Care",
  "Skin & Facials",
  "Bridal & Styling",
  "Salon News",
  "Offers & Tips",
];

// Curated preset photography for quick selection by the digital team
export const PRESET_BLOG_IMAGES = [
  {
    label: "Hair Transformation & Styling",
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80",
    category: "Hair Care",
  },
  {
    label: "Keratin & Smooth Hair Wash",
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    category: "Hair Care",
  },
  {
    label: "Vedic Skin Therapy & Facial",
    url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    category: "Skin & Facials",
  },
  {
    label: "Luxury Facial Spa Room",
    url: "/images/facial-room-01.webp",
    category: "Skin & Facials",
  },
  {
    label: "Bridal Makeup & Hair Couture",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    category: "Bridal & Styling",
  },
  {
    label: "Men's Luxury Grooming & Beard",
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
    category: "Hair Care",
  },
  {
    label: "AM Unisex Salon Reception",
    url: "/images/reception-01.webp",
    category: "Salon News",
  },
  {
    label: "Hair Wash & Spa Stations",
    url: "/images/hair-wash-station-01.webp",
    category: "Hair Care",
  },
];

// Production starts with ZERO articles. Real articles come exclusively from MongoDB Atlas.
export const INITIAL_BLOG_POSTS: BlogArticle[] = [];
