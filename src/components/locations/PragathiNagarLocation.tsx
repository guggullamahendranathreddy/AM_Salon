import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Navigation,
  ExternalLink,
  Calendar,
  Sparkle,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Building2,
  Camera,
  Scissors,
} from "lucide-react";
import { PRAGATHI_NAGAR_BRANCH, NALLAGANDLA_BRANCH } from "../../locationData";
import { SERVICE_ITEMS, GALLERY_ITEMS } from "../../data";

interface PragathiNagarLocationProps {
  onBookClick?: (service?: string, branch?: string) => void;
  onNavigate?: (view: "home" | "blog" | "admin" | "locations" | "location-nallagandla" | "location-pragathi-nagar", targetSection?: string) => void;
}

export default function PragathiNagarLocation({ onBookClick, onNavigate }: PragathiNagarLocationProps) {
  const branch = PRAGATHI_NAGAR_BRANCH;
  const [openFaq, setOpenFaq] = useState<string | null>("fp1");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Services" },
    { id: "men", label: "Men's Grooming" },
    { id: "women", label: "Women's Hair" },
    { id: "hair", label: "Hair Treatments" },
    { id: "skin", label: "Skin Care & Facials" },
    { id: "bridal", label: "Bridal" },
  ];

  const filteredServices = activeCategory === "all"
    ? SERVICE_ITEMS
    : SERVICE_ITEMS.filter((s) => s.category === activeCategory);

  const handleBookBranch = (serviceName?: string) => {
    if (onBookClick) {
      onBookClick(serviceName, "Pragathi Nagar");
    }
  };

  return (
    <div className="pt-24 pb-20 bg-bg-dark text-luxury-cream overflow-hidden">
      
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-body text-luxury-cream/60">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("home");
            }}
            className="hover:text-secondary transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <a
            href="/locations"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("locations");
            }}
            className="hover:text-secondary transition-colors"
          >
            Locations
          </a>
          <span>/</span>
          <span className="text-secondary font-medium">Pragathi Nagar</span>
        </nav>
      </div>

      {/* 2. Hero Section */}
      <section className="relative py-12 lg:py-16 bg-gradient-to-b from-bg-charcoal/80 to-bg-dark border-b border-primary/20">
        <div className="absolute top-0 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/45 bg-primary/25 px-3.5 py-1.5 backdrop-blur-md mb-4">
              <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-luxury-cream">
                AM Unisex Salon &bull; Pragathi Nagar Branch
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-4">
              AM Unisex Salon — <span className="text-gradient">Pragathi Nagar, Hyderabad</span>
            </h1>

            <p className="text-sm sm:text-base text-luxury-cream/80 font-body leading-relaxed mb-6 font-light">
              Welcome to <strong>AM Unisex Salon Pragathi Nagar</strong>, established near Shiva Medicals, 3rd Layout. We offer haircuts for men and women, restorative hair spa, Pro-Keratin smoothing, Molecular Hair Botox, and radiant botanical skincare in a clean, welcoming ambience.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs font-body">
                <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                <span>Estd. 2018 in Hyderabad</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-body">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>Open 7 Days (9 AM–9 PM)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-body">
                <Scissors className="w-4 h-4 text-secondary shrink-0" />
                <span>Men & Women Care</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-body">
                <Building2 className="w-4 h-4 text-accent shrink-0" />
                <span>Near Shiva Medicals</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                onClick={() => handleBookBranch()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold uppercase tracking-wider hover:-translate-y-0.5 transition-all duration-200 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book at Pragathi Nagar
              </button>

              <a
                href={branch.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-sm bg-bg-charcoal border border-secondary/40 hover:border-secondary text-xs font-semibold uppercase tracking-wider text-luxury-cream hover:text-white transition-all duration-200"
              >
                <Navigation className="w-4 h-4 text-secondary" />
                Get Directions
                <ExternalLink className="w-3 h-3 text-accent" />
              </a>

              <a
                href={`https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent("Hello AM Unisex Salon Pragathi Nagar, I would like to book an appointment.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-sm bg-bg-charcoal border border-[#25D366]/40 hover:border-[#25D366] text-xs font-semibold uppercase tracking-wider text-luxury-cream hover:text-white transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                WhatsApp Branch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Location Details & Map */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-lg bg-bg-charcoal border border-white/5 shadow-2xl">
            <div>
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-body block mb-1">
                  Salon Storefront
                </span>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                  AM Unisex Salon
                </h3>
                <p className="text-xs text-secondary font-semibold font-body uppercase tracking-wider mt-0.5">
                  Pragathi Nagar Branch &bull; Hyderabad
                </p>
              </div>

              <div className="space-y-5 font-body">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-luxury-cream/80">
                  <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                      Salon Address
                    </span>
                    <address className="not-italic leading-relaxed text-luxury-cream/75 text-xs font-body">
                      {branch.address.fullAddress}
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-luxury-cream/80">
                  <div className="h-9 w-9 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                      Opening Hours
                    </span>
                    <p className="text-xs text-luxury-cream/90 font-medium">
                      {branch.hours}
                    </p>
                    <p className="text-[10px] text-accent mt-0.5">Open 7 days a week</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-luxury-cream/80">
                  <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                      Direct Inquiries
                    </span>
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-xs font-semibold text-white hover:text-secondary transition-colors block"
                    >
                      {branch.formattedPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3">
              <a
                href={branch.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-bg-dark border border-secondary/40 hover:border-secondary text-xs font-semibold uppercase tracking-wider text-luxury-cream hover:text-white transition-all duration-200 text-center"
              >
                <Navigation className="w-3.5 h-3.5 text-secondary" />
                Get Directions
                <ExternalLink className="w-3 h-3 text-accent" />
              </a>

              <a
                href={branch.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-bg-dark border border-white/10 hover:border-white/30 text-xs font-semibold uppercase tracking-wider text-luxury-cream hover:text-white transition-all duration-200 text-center"
              >
                <MapPin className="w-3.5 h-3.5 text-accent" />
                View on Google Maps
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-lg overflow-hidden border border-white/10 bg-bg-charcoal shadow-2xl relative min-h-[360px] flex flex-col">
            <div className="p-3 bg-bg-dark/90 border-b border-white/5 flex items-center justify-between px-4 text-xs">
              <span className="text-luxury-cream/80 font-body flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-secondary" /> 6-300012, near Shiva Medicals, Pragathi Nagar, Hyderabad
              </span>
              <a
                href={branch.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white underline decoration-dotted text-[11px] font-semibold uppercase tracking-wider"
              >
                Open in Map &rarr;
              </a>
            </div>

            <div className="relative flex-1 w-full min-h-[340px]">
              <iframe
                title="AM Unisex Salon Pragathi Nagar Google Maps Location"
                src={branch.googleMapsEmbedUrl}
                className="w-full h-full border-none min-h-[340px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Verified Pragathi Nagar Photos */}
      <section className="py-16 bg-bg-charcoal/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-2">
              <Camera className="w-3.5 h-3.5 text-secondary" /> Branch Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              AM Unisex Salon — <span className="text-gradient">Pragathi Nagar Facility</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="rounded-md overflow-hidden bg-bg-charcoal border border-white/5 shadow-xl group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={`${item.title} at AM Unisex Salon Pragathi Nagar Hyderabad`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-4 bg-bg-charcoal">
                  <h4 className="text-sm font-semibold text-white font-body">{item.title}</h4>
                  <p className="text-[10px] text-secondary uppercase tracking-wider mt-1 font-body">
                    Pragathi Nagar Branch
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Services Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-2">
            <Scissors className="w-3.5 h-3.5 text-secondary" /> Treatments & Care
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Services Available at Pragathi Nagar
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-body transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-secondary text-bg-dark shadow"
                    : "bg-bg-charcoal text-luxury-cream/70 hover:text-white border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-lg bg-bg-charcoal border border-white/5 hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-body">
                    {service.category === "men" ? "Men's Grooming" : service.category === "women" ? "Women's Hair" : service.category === "hair" ? "Hair Therapy" : service.category === "skin" ? "Skincare" : "Bridal"}
                  </span>
                  <span className="text-[11px] text-luxury-cream/50 font-body">
                    {service.duration}
                  </span>
                </div>
                <h3 className="text-base font-display font-bold text-white group-hover:text-secondary transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-luxury-cream/70 font-body leading-relaxed mt-2 font-light">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-secondary font-semibold font-body">
                  Available at Pragathi Nagar
                </span>
                <button
                  onClick={() => handleBookBranch(service.name)}
                  className="text-xs font-semibold text-white group-hover:text-secondary flex items-center gap-1 cursor-pointer"
                >
                  Book Slot <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Pragathi Nagar FAQs */}
      <section className="py-16 bg-bg-charcoal/60 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-secondary" /> Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Pragathi Nagar Branch FAQs
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {branch.faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-sm bg-bg-dark border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-body outline-none cursor-pointer"
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-secondary shrink-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="p-5 pt-0 border-t border-white/5 bg-bg-charcoal/20 font-body text-xs sm:text-sm text-luxury-cream/80 leading-relaxed font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Link to Nallagandla (Primary) Branch */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-lg bg-gradient-to-r from-bg-charcoal to-secondary/20 border border-secondary/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary font-body block mb-1">
              Primary Branch in Hyderabad
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Visit our Nallagandla Branch (HYTEK ARCADE)
            </h3>
            <p className="text-xs sm:text-sm text-luxury-cream/70 font-body mt-1">
              Located on Kancha Gachibowli Road near Aparna Sarovar, Nallagandla.
            </p>
          </div>

          <a
            href="/locations/nallagandla"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("location-nallagandla");
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold uppercase tracking-wider hover:-translate-y-0.5 transition-all whitespace-nowrap shadow-md"
          >
            View Nallagandla Branch
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

    </div>
  );
}
