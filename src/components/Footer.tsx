import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowUp, Instagram, Heart, Flame } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onNavigate?: (view: "home" | "blog" | "admin", targetSection?: string) => void;
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
    { name: "AM Unisex Salon Home", hash: "#home" },
    { name: "About AM Unisex Salon", hash: "#about" },
    { name: "View Our Salon Services", hash: "#services" },
    { name: "Hair Care & Beauty Blog", hash: "#blog" },
    { name: "Salon Photo Gallery", hash: "#gallery" },
    { name: "Customer Reviews", hash: "#reviews" },
    { name: "Book an Appointment", hash: "#book" },
    { name: "Contact AM Unisex Salon", hash: "#contact" },
    { name: "Admin Portal", hash: "#admin" },
  ];

  return (
    <footer className="relative bg-bg-dark border-t border-primary/20 pt-16 pb-8 text-luxury-cream/80 overflow-hidden select-none">
      
      {/* Decorative vertical bounds */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid divisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/5">
          
          {/* LIGCOLUMN 1: LOGO & ABOUT */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="mb-5 flex justify-start">
              <Logo size="md" />
            </div>
            
            <p className="text-xs sm:text-sm text-luxury-cream/60 leading-relaxed font-body font-light mb-6">
              Hyderabad's premier unisex family destination for cutting-edge hair therapies, signature keratin, and botanical skincare. Serving customers with hygiene and affordable luxury since 2018.
            </p>

            <div className="flex flex-col gap-3 font-body">
              {/* Working Hours */}
              <div className="flex items-center gap-2.5 text-xs">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                <div>
                  <span className="text-white font-bold block uppercase tracking-wider text-[10px]">Operating Hours</span>
                  <span className="text-luxury-cream/60">Monday - Sunday | 9:00 AM - 9:00 PM</span>
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

          {/* LIGCOLUMN 2: REUSABLE ANCHOR QUICK LINKS */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-5 font-body">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-body text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.hash === "#blog") {
                        if (onNavigate) onNavigate("blog");
                        else window.location.hash = "#blog";
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                      }
                      if (link.hash === "#admin") {
                        if (onNavigate) onNavigate("admin");
                        else window.location.hash = "#admin";
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                      }
                      if (onNavigate) {
                        onNavigate("home", link.hash.substring(1));
                        return;
                      }
                      const element = document.getElementById(link.hash.substring(1));
                      if (element) {
                        const topOffset = element.offsetTop - 85;
                        window.scrollTo({ top: topOffset, behavior: "smooth" });
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

          {/* LIGCOLUMN 3: SERVICES LINKS */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-5 font-body">
              Our Specializations
            </h4>
            <ul className="space-y-2.5 font-body text-xs">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById("services");
                      if (element) {
                        const topOffset = element.offsetTop - 85;
                        window.scrollTo({ top: topOffset, behavior: "smooth" });
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

          {/* LIGCOLUMN 4: SATELLITE MAP, NEWSLETTER & ADDRS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Address with phone triggers */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 font-body">
                Location Details
              </h4>
              <div className="space-y-2.5 font-body text-xs">
                <div className="flex items-start gap-2 text-luxury-cream/70">
                  <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Plot No 87&amp;88, Block B 201, HYTEK ARCADE,<br />
                    Kancha Gacchibowli Road, Nallagandla,<br />
                    Serilingampalle, Hyderabad, Telangana 500046, India
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <div className="flex flex-col gap-1">
                    <a href="tel:+917569979965" className="hover:text-secondary font-semibold font-body text-xs text-luxury-cream">
                      Call Salon Reception
                    </a>
                    <a href="https://wa.me/917569979965" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline text-xs flex items-center gap-1 font-body">
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Mini Embed */}
            <div className="w-full h-32 rounded-sm overflow-hidden border border-white/5 bg-bg-charcoal group shadow-inner relative">
              <iframe
                title="AM Unisex Salon Google Map Location - Nallagandla Hyderabad"
                src="https://maps.google.com/maps?q=Plot+No+87%2688,+Block+B+201,+HYTEK+ARCADE,+Kancha+Gacchibowli+Road,+Nallagandla,+Serilingampalle,+Hyderabad,+Telangana+500046&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-none filter invert contrast-110 opacity-70 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-all" />
            </div>



          </div>

        </div>

        {/* BOTTOM COLUMN: LICENSE + BACK TO TOP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body">
          
          <div className="text-center sm:text-left">
            <p className="text-xs text-luxury-cream/40">
              &copy; 2026 AM Unisex Salon. HYTEK ARCADE, Nallagandla, Hyderabad. All Rights Reserved.
            </p>
            <p className="text-[10px] text-accent mt-1 tracking-wide uppercase font-semibold">
              Elegantly Handcrafted | Luxury Burgundy & Slate theme | Inspired by genuine branding
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
