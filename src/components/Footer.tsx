import React from "react";
import { Phone, MapPin, Clock, ArrowUp, Instagram, Sparkle, Building2, Navigation } from "lucide-react";
import Logo from "./Logo";
import { NALLAGANDLA_BRANCH, PRAGATHI_NAGAR_BRANCH } from "../locationData";

interface FooterProps {
  onNavigate?: (
    view: "home" | "blog" | "admin" | "locations" | "location-nallagandla" | "location-pragathi-nagar",
    targetSection?: string
  ) => void;
}

export default function Footer({ onNavigate }: FooterProps = {}) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const servicesLinks = [
    { name: "Men's Cuts & Grooming", hash: "#services" },
    { name: "Women's Styling & Updos", hash: "#services" },
    { name: "Keratin & Botox Fillers", hash: "#services" },
    { name: "Vedic Skin Facials", hash: "#services" },
    { name: "Bridal Cosmetics & Saree Draping", hash: "#services" },
  ];

  const quickLinks = [
    { name: "AM Unisex Salon Home", view: "home", hash: "#home" },
    { name: "About AM Unisex Salon", view: "home", hash: "#about" },
    { name: "Salon Services", view: "home", hash: "#services" },
    { name: "Our Salon Locations", view: "locations", path: "/locations" },
    { name: "Nallagandla Branch (Primary)", view: "location-nallagandla", path: "/locations/nallagandla" },
    { name: "Pragathi Nagar Branch", view: "location-pragathi-nagar", path: "/locations/pragathi-nagar" },
    { name: "Hair Care & Beauty Blog", view: "blog", path: "/blog" },
    { name: "Salon Photo Gallery", view: "home", hash: "#gallery" },
    { name: "Book an Appointment", view: "home", hash: "#book" },
    { name: "Admin Portal", view: "admin", path: "/admin" },
  ];

  return (
    <footer className="relative bg-bg-dark border-t border-primary/20 pt-16 pb-8 text-luxury-cream/80 overflow-hidden select-none">
      
      {/* Decorative vertical bounds */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid divisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/5">
          
          {/* COLUMN 1: LOGO & ABOUT */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="mb-5 flex justify-start">
              <Logo size="md" />
            </div>
            
            <p className="text-xs sm:text-sm text-luxury-cream/60 leading-relaxed font-body font-light mb-6">
              Hyderabad's premier unisex family salon destination for precision haircuts, signature keratin, Molecular Hair Botox, and botanical skincare. Serving customers across our <strong>Nallagandla</strong> (Primary) and <strong>Pragathi Nagar</strong> branches.
            </p>

            <div className="flex flex-col gap-3 font-body">
              {/* Working Hours */}
              <div className="flex items-center gap-2.5 text-xs">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                <div>
                  <span className="text-white font-bold block uppercase tracking-wider text-[10px]">Operating Hours</span>
                  <span className="text-luxury-cream/60">Monday - Sunday | 9:00 AM - 9:00 PM (Both Branches)</span>
                </div>
              </div>

              {/* Instagram handle link */}
              <div className="flex items-center gap-2.5 text-xs">
                <Instagram className="w-4 h-4 text-secondary shrink-0" />
                <div>
                  <span className="text-white font-bold block uppercase tracking-wider text-[10px]">Instagram</span>
                  <a
                    href="https://www.instagram.com/akshaiunisexsalonpragathinagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-white transition-colors underline decoration-dotted"
                  >
                    @akshaiunisexsalonpragathinagar
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-5 font-body">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-body text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path || link.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.view === "blog") {
                        if (onNavigate) onNavigate("blog");
                        else window.location.hash = "#blog";
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                      }
                      if (link.view === "admin") {
                        if (onNavigate) onNavigate("admin");
                        else window.location.hash = "#admin";
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                      }
                      if (link.view === "locations") {
                        if (onNavigate) onNavigate("locations");
                        else window.location.hash = "#locations";
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                      }
                      if (link.view === "location-nallagandla") {
                        if (onNavigate) onNavigate("location-nallagandla");
                        else window.location.hash = "#locations/nallagandla";
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                      }
                      if (link.view === "location-pragathi-nagar") {
                        if (onNavigate) onNavigate("location-pragathi-nagar");
                        else window.location.hash = "#locations/pragathi-nagar";
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                      }
                      if (onNavigate) {
                        onNavigate("home", link.hash?.substring(1));
                        return;
                      }
                      if (link.hash) {
                        const element = document.getElementById(link.hash.substring(1));
                        if (element) {
                          const topOffset = element.offsetTop - 85;
                          window.scrollTo({ top: topOffset, behavior: "smooth" });
                        }
                      }
                    }}
                    className="hover:text-secondary hover:translate-x-1 transition-all inline-block duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SERVICES LINKS */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-5 font-body">
              Our Services
            </h4>
            <ul className="space-y-2.5 font-body text-xs">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) {
                        onNavigate("home", "services");
                      } else {
                        const element = document.getElementById("services");
                        if (element) {
                          const topOffset = element.offsetTop - 85;
                          window.scrollTo({ top: topOffset, behavior: "smooth" });
                        }
                      }
                    }}
                    className="hover:text-secondary hover:translate-x-1 transition-all inline-block duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: TWO PHYSICAL BRANCHES */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 font-body">
              Our Hyderabad Branches
            </h4>

            {/* Branch 1: Nallagandla (Primary) */}
            <div className="p-3.5 rounded bg-bg-charcoal border border-secondary/30 space-y-2 text-xs font-body">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                  Nallagandla Branch
                </span>
                <span className="text-[9px] uppercase font-bold text-secondary bg-primary/25 px-1.5 py-0.5 rounded">
                  Primary
                </span>
              </div>
              <p className="text-luxury-cream/70 text-[11px] leading-relaxed">
                Plot No. 87 & 88, Block B 201, HYTEK ARCADE, Kancha Gachibowli Road, Nallagandla, Hyderabad 500046
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px]">
                <a
                  href={NALLAGANDLA_BRANCH.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-white underline decoration-dotted font-semibold flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3 text-secondary" /> Map Link
                </a>
                <span className="text-white/20">&bull;</span>
                <a
                  href="/locations/nallagandla"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate("location-nallagandla");
                  }}
                  className="text-white hover:text-secondary font-semibold"
                >
                  View Details &rarr;
                </a>
              </div>
            </div>

            {/* Branch 2: Pragathi Nagar */}
            <div className="p-3.5 rounded bg-bg-charcoal border border-white/5 space-y-2 text-xs font-body">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-accent" />
                  Pragathi Nagar Branch
                </span>
              </div>
              <p className="text-luxury-cream/70 text-[11px] leading-relaxed">
                Near Shiva Medicals, 3rd Layout, Pragathi Nagar, Hyderabad 500090
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px]">
                <a
                  href={PRAGATHI_NAGAR_BRANCH.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-white underline decoration-dotted font-semibold flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3 text-secondary" /> Map Link
                </a>
                <span className="text-white/20">&bull;</span>
                <a
                  href="/locations/pragathi-nagar"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate("location-pragathi-nagar");
                  }}
                  className="text-white hover:text-secondary font-semibold"
                >
                  View Details &rarr;
                </a>
              </div>
            </div>

            {/* Reception Contact */}
            <div className="pt-2 text-xs font-body">
              <span className="text-luxury-cream/60">Appointments &amp; Inquiries: </span>
              <a href="tel:+917569979965" className="text-white font-semibold hover:text-secondary">
                +91 75699 79965
              </a>
            </div>

          </div>

        </div>

        {/* BOTTOM COLUMN: LICENSE + BACK TO TOP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body">
          
          <div className="text-center sm:text-left">
            <p className="text-xs text-luxury-cream/50">
              &copy; 2026 AM Unisex Salon. Hyderabad Branches in Nallagandla (HYTEK ARCADE) &amp; Pragathi Nagar. All Rights Reserved.
            </p>
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 bg-bg-charcoal/90 border border-white/5 hover:border-secondary/40 text-xs text-luxury-cream hover:text-white rounded-full transition-all duration-300 shadow shadow-inner active:scale-95 group cursor-pointer font-semibold uppercase tracking-wider"
            aria-label="Back to Top of Page"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-secondary group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </footer>
  );
}
