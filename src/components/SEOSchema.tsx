import React, { useEffect } from "react";
import { FAQS } from "../data";
import { NALLAGANDLA_BRANCH, PRAGATHI_NAGAR_BRANCH } from "../locationData";
import { BlogArticle, BlogPost } from "../types";
import { SITE_CONFIG } from "../config/site";

interface SEOSchemaProps {
  currentView?:
    | "home"
    | "blog"
    | "blog-detail"
    | "admin"
    | "locations"
    | "location-nallagandla"
    | "location-pragathi-nagar"
    | "not-found";
  selectedBlog?: BlogArticle | BlogPost | null;
}

/**
 * SEOSchema Component
 * Injects structured data dynamically into document head:
 * 1. FAQPage JSON-LD (strictly mirroring visible FAQs on each respective page)
 * 2. BreadcrumbList JSON-LD (mirroring current route navigation hierarchy)
 * 3. Dedicated Location Schema for Nallagandla and Pragathi Nagar landing pages
 */
export default function SEOSchema({ currentView = "home", selectedBlog }: SEOSchemaProps) {
  useEffect(() => {
    const base = SITE_CONFIG.siteUrl;

    // 1. Dynamic FAQPage Schema
    const faqScriptId = "jsonld-faq-schema";
    let faqScript = document.getElementById(faqScriptId) as HTMLScriptElement | null;

    let targetFaqs = null;
    if (currentView === "home") {
      targetFaqs = FAQS;
    } else if (currentView === "location-nallagandla") {
      targetFaqs = NALLAGANDLA_BRANCH.faqs;
    } else if (currentView === "location-pragathi-nagar") {
      targetFaqs = PRAGATHI_NAGAR_BRANCH.faqs;
    }

    if (targetFaqs && targetFaqs.length > 0) {
      if (!faqScript) {
        faqScript = document.createElement("script");
        faqScript.type = "application/ld+json";
        faqScript.id = faqScriptId;
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": targetFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      });
    } else if (faqScript && faqScript.parentNode) {
      faqScript.parentNode.removeChild(faqScript);
    }

    // 2. Dynamic BreadcrumbList Schema
    const breadcrumbScriptId = "jsonld-breadcrumb-schema";
    let breadcrumbScript = document.getElementById(breadcrumbScriptId) as HTMLScriptElement | null;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement("script");
      breadcrumbScript.type = "application/ld+json";
      breadcrumbScript.id = breadcrumbScriptId;
      document.head.appendChild(breadcrumbScript);
    }

    const breadcrumbs: Array<{ "@type": string; position: number; name: string; item: string }> = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${base}/`,
      },
    ];

    if (currentView === "locations") {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": `${base}/locations`,
      });
    } else if (currentView === "location-nallagandla") {
      breadcrumbs.push(
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Locations",
          "item": `${base}/locations`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Nallagandla (Primary)",
          "item": `${base}/locations/nallagandla`,
        }
      );
    } else if (currentView === "location-pragathi-nagar") {
      breadcrumbs.push(
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Locations",
          "item": `${base}/locations`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Pragathi Nagar",
          "item": `${base}/locations/pragathi-nagar`,
        }
      );
    } else if (currentView === "blog") {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${base}/blog`,
      });
    } else if (currentView === "blog-detail" && selectedBlog) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${base}/blog`,
      });
      const slug = selectedBlog.slug || (selectedBlog as { _id?: string })._id || selectedBlog.id;
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 3,
        "name": selectedBlog.title,
        "item": `${base}/blog/${slug}`,
      });
    } else if (currentView === "admin") {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Admin Portal",
        "item": `${base}/admin`,
      });
    }

    breadcrumbScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs,
    });

    // 3. Dynamic Location Specific Schema
    const locationScriptId = "jsonld-location-schema";
    let locationScript = document.getElementById(locationScriptId) as HTMLScriptElement | null;

    if (currentView === "location-nallagandla") {
      if (!locationScript) {
        locationScript = document.createElement("script");
        locationScript.type = "application/ld+json";
        locationScript.id = locationScriptId;
        document.head.appendChild(locationScript);
      }
      locationScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["HairSalon", "BeautySalon", "HealthAndBeautyBusiness"],
        "@id": `${base}/locations/nallagandla#hairsalon`,
        "name": "AM Unisex Salon — Nallagandla",
        "parentOrganization": {
          "@type": "Organization",
          "@id": `${base}/#organization`,
          "name": "AM Unisex Salon",
          "url": `${base}/`,
        },
        "url": `${base}/locations/nallagandla`,
        "logo": `${base}/images/am-salon-logo.webp`,
        "image": [
          `${base}/images/nallagandla-salon-interior-main-01.jpg`,
          `${base}/images/nallagandla-styling-stations-manicure-01.jpg`,
          `${base}/images/nallagandla-pedicure-spa-lounge-01.jpg`
        ],
        "telephone": "+917569979965",
        "priceRange": "$$",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot No. 87 & 88, Block B 201, HYTEK ARCADE, Kancha Gachibowli Road",
          "addressLocality": "Nallagandla, Serilingampalle (M)",
          "addressRegion": "Telangana",
          "postalCode": "500046",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 17.472714,
          "longitude": 78.315582,
        },
        "hasMap": NALLAGANDLA_BRANCH.googleMapsPlaceUrl,
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
              "Sunday",
            ],
            "opens": "09:00",
            "closes": "21:00",
          },
        ],
        "areaServed": NALLAGANDLA_BRANCH.areasServed.map((area) => ({
          "@type": "AdministrativeArea",
          "name": area,
        })),
      });
    } else if (currentView === "location-pragathi-nagar") {
      if (!locationScript) {
        locationScript = document.createElement("script");
        locationScript.type = "application/ld+json";
        locationScript.id = locationScriptId;
        document.head.appendChild(locationScript);
      }
      locationScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["HairSalon", "BeautySalon", "HealthAndBeautyBusiness"],
        "@id": `${base}/locations/pragathi-nagar#hairsalon`,
        "name": "AM Unisex Salon — Pragathi Nagar",
        "alternateName": "Am Akshai Unisex Salon",
        "parentOrganization": {
          "@type": "Organization",
          "@id": `${base}/#organization`,
          "name": "AM Unisex Salon",
          "url": `${base}/`,
        },
        "url": `${base}/locations/pragathi-nagar`,
        "logo": `${base}/images/am-salon-logo.webp`,
        "image": [
          `${base}/images/reception-01.webp`,
          `${base}/images/hair-wash-station-01.webp`,
          `${base}/images/facial-room-01.webp`,
        ],
        "telephone": "+917569979965",
        "priceRange": "$$",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "6-300012, near Shiva Medicals, 3rd Layout, Pragathi Nagar",
          "addressLocality": "Pragathi Nagar",
          "addressRegion": "Telangana",
          "postalCode": "500090",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 17.5165991,
          "longitude": 78.3892702,
        },
        "hasMap": PRAGATHI_NAGAR_BRANCH.googleMapsPlaceUrl,
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
              "Sunday",
            ],
            "opens": "09:00",
            "closes": "21:00",
          },
        ],
        "areaServed": PRAGATHI_NAGAR_BRANCH.areasServed.map((area) => ({
          "@type": "AdministrativeArea",
          "name": area,
        })),
      });
    } else if (locationScript && locationScript.parentNode) {
      locationScript.parentNode.removeChild(locationScript);
    }

    return () => {
      const dynamicFaq = document.getElementById(faqScriptId);
      if (dynamicFaq && dynamicFaq.parentNode) {
        dynamicFaq.parentNode.removeChild(dynamicFaq);
      }
      const dynamicBreadcrumb = document.getElementById(breadcrumbScriptId);
      if (dynamicBreadcrumb && dynamicBreadcrumb.parentNode) {
        dynamicBreadcrumb.parentNode.removeChild(dynamicBreadcrumb);
      }
      const dynamicLocation = document.getElementById(locationScriptId);
      if (dynamicLocation && dynamicLocation.parentNode) {
        dynamicLocation.parentNode.removeChild(dynamicLocation);
      }
    };
  }, [currentView, selectedBlog]);

  return null;
}
