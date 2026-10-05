import React, { useEffect } from "react";

export default function SEOSchema() {
  useEffect(() => {
    // 1. Local Business & Beauty Salon Schema
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "name": "AM Unisex Salon",
      "image": [
        "https://akshaiunisexsalon.com/images/reception-01.webp",
        "https://akshaiunisexsalon.com/images/salon-sign-01.webp"
      ],
      "@id": "https://akshaiunisexsalon.com/#salon",
      "url": "https://akshaiunisexsalon.com",
      "telephone": "+917569979965",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Near Shiva Medicals, 3rd Layout, Pragathi Nagar",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500090",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "17.5165991",
        "longitude": "78.3892702"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      },
      "sameAs": [
        "https://www.instagram.com/akshaiunisexsalonpragathinagar"
      ]
    };

    // 2. FAQ Page Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do I need to book an appointment in advance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While we gladly welcome walk-in guests based on chair availability, booking an appointment online or via WhatsApp guarantees you get paired with your favorite senior stylist right on your scheduled time."
          }
        },
        {
          "@type": "Question",
          "name": "What specialty treatments do you offer for damaged hair?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are Pragathi Nagar's leading specialists in restorative therapies. This includes premium molecular Hair Botox (for shine and volume), signature Pro-Keratin Protein treatments, and deep-root conditioning Caviar Spas."
          }
        },
        {
          "@type": "Question",
          "name": "Is secure four-wheeler and two-wheeler parking available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we have comfortable front parking space available for both two-wheelers and family cars near Shiva Medicals, Pragathi Nagar."
          }
        }
      ]
    };

    // Inject Local Business Tag
    const businessScript = document.createElement("script");
    businessScript.type = "application/ld+json";
    businessScript.id = "jsonld-business-schema";
    businessScript.innerHTML = JSON.stringify(businessSchema);
    document.head.appendChild(businessScript);

    // Inject FAQ Tag
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "jsonld-faq-schema";
    faqScript.innerHTML = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    // Cleanup on unmount to prevent duplicate structural scripts
    return () => {
      const existingBusiness = document.getElementById("jsonld-business-schema");
      const existingFaq = document.getElementById("jsonld-faq-schema");
      if (existingBusiness) document.head.removeChild(existingBusiness);
      if (existingFaq) document.head.removeChild(existingFaq);
    };
  }, []);

  return null; // Side-effect only component
}
