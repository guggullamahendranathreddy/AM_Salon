import React, { useEffect } from "react";

/**
 * SEOSchema Component
 * Injects and maintains structured data in the document head without creating duplicate schemas.
 * Primary HairSalon LocalBusiness JSON-LD is also embedded in index.html for instant crawler discovery.
 */
export default function SEOSchema() {
  useEffect(() => {
    // If business schema already exists in index.html, ensure it stays consistent
    const existingBusinessScript = document.getElementById("jsonld-business-schema");
    if (!existingBusinessScript) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "jsonld-business-schema";
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HairSalon",
        "@id": "https://am-salon-three.vercel.app/#hairsalon",
        "name": "AM Unisex Salon",
        "url": "https://am-salon-three.vercel.app/",
        "logo": "https://am-salon-three.vercel.app/images/akshai-logo.jpeg",
        "image": [
          "https://am-salon-three.vercel.app/images/reception-01.webp",
          "https://am-salon-three.vercel.app/images/hair-wash-station-01.webp",
          "https://am-salon-three.vercel.app/images/facial-room-01.webp"
        ],
        "telephone": "+917569979965",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot No 87&88, Block B 201, HYTEK ARCADE, Kancha Gacchibowli Road, Nallagandla",
          "addressLocality": "Serilingampalle",
          "addressRegion": "Telangana",
          "postalCode": "500046",
          "addressCountry": "IN"
        },
        "openingHoursSpecification": [
          {
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
          }
        ],
        "sameAs": [
          "https://www.instagram.com/akshaiunisexsalonpragathinagar"
        ]
      });
      document.head.appendChild(script);
    }

    return () => {
      const dynamicScript = document.getElementById("jsonld-business-schema");
      if (dynamicScript && dynamicScript.parentNode) {
        dynamicScript.parentNode.removeChild(dynamicScript);
      }
    };
  }, []);

  return null;
}
