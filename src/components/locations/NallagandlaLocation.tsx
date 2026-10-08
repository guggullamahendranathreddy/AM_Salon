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
  Star,
  Scissors,
  Sparkles,
  Heart,
} from "lucide-react";
import { NALLAGANDLA_BRANCH, PRAGATHI_NAGAR_BRANCH, NALLAGANDLA_GALLERY_ITEMS, LocationGalleryItem } from "../../locationData";
import { SERVICE_ITEMS } from "../../data";
import { X, ZoomIn } from "lucide-react";

interface NallagandlaLocationProps {
  onBookClick?: (service?: string, branch?: string) => void;
  onNavigate?: (view: "home" | "blog" | "admin" | "locations" | "location-nallagandla" | "location-pragathi-nagar", targetSection?: string) => void;
}

export default function NallagandlaLocation({ onBookClick, onNavigate }: NallagandlaLocationProps) {
  const branch = NALLAGANDLA_BRANCH;
  const [openFaq, setOpenFaq] = useState<string | null>("fn1");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeImageModal, setActiveImageModal] = useState<LocationGalleryItem | null>(null);

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
      onBookClick(serviceName, "Nallagandla");
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
          <span className="text-secondary font-medium">Nallagandla (Primary)</span>
        </nav>
      </div>

      {/* 2. Hero / Header Section */}
      <section className="relative py-12 lg:py-16 bg-gradient-to-b from-bg-charcoal/80 to-bg-dark border-b border-primary/20">
        <div className="absolute top-0 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Primary Branch Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/45 bg-primary/25 px-3.5 py-1.5 backdrop-blur-md mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-luxury-cream">
                Primary Branch &bull; Nallagandla, Hyderabad
              </span>
            </div>

            {/* Clear H1 mentioning AM Unisex Salon and Nallagandla */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-4">
              AM Unisex Salon — <span className="text-gradient">Nallagandla, Hyderabad</span>
            </h1>

            {/* Short Introduction with Natural Local Keywords */}
            <p className="text-sm sm:text-base text-luxury-cream/80 font-body leading-relaxed mb-6 font-light">
              Welcome to <strong>AM Unisex Salon Nallagandla</strong>, your premier unisex salon in Nallagandla, Hyderabad. Located at HYTEK ARCADE on Kancha Gachibowli Road near Aparna Sarovar, our beauty salon offers premium haircuts for men and women, restorative hair spa, Pro-Keratin protein smoothing, Molecular Hair Botox, and radiant botanical facials.
            </p>

            {/* Quick Key Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs font-body">
                <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                <span>100% Hygienic Salon</span>
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
                <span>HYTEK ARCADE Location</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                onClick={() => handleBookBranch()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold uppercase tracking-wider hover:-translate-y-0.5 transition-all duration-200 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book at Nallagandla Branch
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
                href={`https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent("Hello AM Unisex Salon Nallagandla, I would like to book an appointment at your Nallagandla branch.")}`}
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

      {/* 3. Verified Branch Location & Google Maps Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-3.5 h-3.5 text-secondary" /> Verified Location
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Find AM Unisex Salon — <span className="text-gradient">Nallagandla</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 mt-2 font-body font-light">
            Easily accessible from Kancha Gachibowli Road, Aparna Sarovar, Tellapur, Serilingampally, and Gachibowli.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Business Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-lg bg-bg-charcoal border border-white/5 shadow-2xl">
            <div>
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-body block mb-1">
                  Primary Salon Branch
                </span>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                  AM Unisex Salon
                </h3>
                <p className="text-xs text-secondary font-semibold font-body uppercase tracking-wider mt-0.5">
                  Nallagandla Branch &bull; Hyderabad
                </p>
              </div>

              <div className="space-y-5 font-body">
                {/* Verified Address */}
                <div className="flex items-start gap-3 text-xs sm:text-sm text-luxury-cream/80">
                  <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                      Branch Address
                    </span>
                    <address className="not-italic leading-relaxed text-luxury-cream/75 text-xs font-body">
                      {branch.address.fullAddress}
                    </address>
                    <p className="text-[10px] text-accent mt-1">
                      Landmark: {branch.address.landmark}
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
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
                    <p className="text-[10px] text-accent mt-0.5">Open 7 days a week for all treatments</p>
                  </div>
                </div>

                {/* Contact Phone & WhatsApp */}
                <div className="flex items-start gap-3 text-xs sm:text-sm text-luxury-cream/80">
                  <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                      Direct Reception &amp; Booking
                    </span>
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-xs font-semibold text-white hover:text-secondary transition-colors block"
                    >
                      {branch.formattedPhone}
                    </a>
                    <a
                      href={`https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent("Hello AM Unisex Salon Nallagandla! I would like to book an appointment.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline text-xs inline-flex items-center gap-1 mt-1 font-body"
                    >
                      <MessageSquare className="w-3 h-3 text-[#25D366]" /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation & Maps Buttons */}
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

          {/* Interactive Google Maps Embed Pointing to Nallagandla */}
          <div className="lg:col-span-7 rounded-lg overflow-hidden border border-white/10 bg-bg-charcoal shadow-2xl relative min-h-[360px] flex flex-col">
            <div className="p-3 bg-bg-dark/90 border-b border-white/5 flex items-center justify-between px-4 text-xs">
              <span className="text-luxury-cream/80 font-body flex items-center gap-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span className="truncate">HYTEK ARCADE, Kancha Gachibowli Road, Nallagandla</span>
              </span>
              <a
                href={branch.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white underline decoration-dotted text-[11px] font-semibold uppercase tracking-wider shrink-0 ml-2"
              >
                Open in Google Maps &rarr;
              </a>
            </div>

            <div className="relative flex-1 w-full min-h-[340px]">
              <iframe
                title="AM Unisex Salon Nallagandla - HYTEK ARCADE Google Maps Location"
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

      {/* 4. Authentic Nallagandla Salon Interior Gallery Section */}
      <section className="py-16 bg-bg-charcoal/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-2">
              <Camera className="w-3.5 h-3.5 text-secondary" /> Authentic Salon Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              AM Unisex Salon — <span className="text-gradient">Nallagandla Interior</span>
            </h2>
            <p className="text-xs sm:text-sm text-luxury-cream/70 mt-2 font-body font-light">
              Authentic photographs of our newly opened Nallagandla salon floor at HYTEK ARCADE, featuring luxury styling stations, manicure bar, and dedicated pedicure spa lounge.
            </p>
          </div>

          {/* Authentic Gallery Grid */}
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Featured Primary Image: Best wide-angle salon interior */}
            {NALLAGANDLA_GALLERY_ITEMS.filter((item) => item.isFeatured).map((item) => (
              <div
                key={item.id}
                className="lg:col-span-7 rounded-lg overflow-hidden bg-bg-charcoal border border-secondary/40 shadow-2xl relative group cursor-pointer flex flex-col"
                onClick={() => setActiveImageModal(item)}
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-bg-dark flex-1">
                  <img
                    src={item.imageUrl}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent" />
                  
                  {/* Primary Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg backdrop-blur-md">
                    Featured Interior &bull; Nallagandla Branch
                  </div>

                  {/* Zoom indicator */}
                  <div className="absolute top-4 right-4 bg-bg-dark/80 text-secondary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 bg-bg-charcoal">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-accent font-body">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-display font-bold text-white mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-luxury-cream/70 font-body leading-relaxed mt-1 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Secondary Authentic Photos */}
            <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {NALLAGANDLA_GALLERY_ITEMS.filter((item) => !item.isFeatured).map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden bg-bg-charcoal border border-white/10 hover:border-secondary/40 shadow-xl relative group cursor-pointer flex flex-col transition-all"
                  onClick={() => setActiveImageModal(item)}
                >
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] overflow-hidden bg-bg-dark">
                    <img
                      src={item.imageUrl}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 right-3 bg-bg-dark/80 text-secondary p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="p-4 bg-bg-charcoal">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-secondary font-body">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-display font-bold text-white mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-luxury-cream/70 font-body leading-relaxed mt-1 font-light line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. Nallagandla Services Catalog (Based on verified services) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-2">
            <Scissors className="w-3.5 h-3.5 text-secondary" /> Service Menu
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Services at <span className="text-gradient">AM Unisex Salon Nallagandla</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 mt-2 font-body font-light">
            All services are provided by experienced master stylists utilizing genuine international formulas.
          </p>

          {/* Category Switcher */}
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

        {/* Services Grid */}
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
                  Available at Nallagandla
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

        <div className="mt-10 text-center">
          <button
            onClick={() => handleBookBranch()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold uppercase tracking-wider hover:-translate-y-0.5 transition-all duration-200 shadow-lg cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Book Full Service Appointment
          </button>
        </div>
      </section>

      {/* 6. AEO FAQs Section for Nallagandla */}
      <section className="py-16 bg-bg-charcoal/60 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-secondary" /> Direct Answers
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Nallagandla Branch <span className="text-gradient">FAQs</span>
            </h2>
            <p className="text-xs sm:text-sm text-luxury-cream/70 mt-2 font-body font-light">
              Clear, factual answers about AM Unisex Salon Nallagandla.
            </p>
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

      {/* 7. Second Branch Link / Cross-Promotion */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-lg bg-gradient-to-r from-bg-charcoal to-primary/20 border border-secondary/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent font-body block mb-1">
              Second Salon Branch in Hyderabad
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Looking for our Pragathi Nagar Branch?
            </h3>
            <p className="text-xs sm:text-sm text-luxury-cream/70 font-body mt-1">
              Visit AM Unisex Salon Near Shiva Medicals, 3rd Layout in Pragathi Nagar, Hyderabad.
            </p>
          </div>

          <a
            href="/locations/pragathi-nagar"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("location-pragathi-nagar");
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-bg-dark border border-secondary/50 hover:border-secondary text-xs font-semibold uppercase tracking-wider text-white hover:text-secondary transition-all whitespace-nowrap"
          >
            View Pragathi Nagar Branch
            <ArrowRight className="w-3.5 h-3.5 text-secondary" />
          </a>
        </div>
      </section>

      {/* 8. Internal Navigation Links */}
      <section className="py-8 border-t border-white/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider font-body text-luxury-cream/60">
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("home", "services");
            }}
            className="hover:text-secondary transition-colors"
          >
            Salon Services
          </a>
          <span>&bull;</span>
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("home", "about");
            }}
            className="hover:text-secondary transition-colors"
          >
            About AM Salon
          </a>
          <span>&bull;</span>
          <a
            href="/booking"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("home", "book");
            }}
            className="hover:text-secondary transition-colors"
          >
            Online Booking
          </a>
          <span>&bull;</span>
          <a
            href="/locations"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("locations");
            }}
            className="hover:text-secondary transition-colors"
          >
            All Hyderabad Branches
          </a>
        </div>
      </section>

      {/* 9. Lightbox Image Viewer Modal */}
      <AnimatePresence>
        {activeImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-dark/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveImageModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full bg-bg-charcoal border border-secondary/40 rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[75vh] overflow-hidden bg-bg-dark flex items-center justify-center">
                <img
                  src={activeImageModal.imageUrl}
                  alt={activeImageModal.alt}
                  className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
                />
                <button
                  onClick={() => setActiveImageModal(null)}
                  className="absolute top-4 right-4 bg-bg-dark/80 text-white p-2 rounded-full hover:bg-primary transition-colors cursor-pointer border border-white/10"
                  aria-label="Close image preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 bg-bg-charcoal border-t border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary font-body">
                  {activeImageModal.category} &bull; AM Unisex Salon Nallagandla
                </span>
                <h3 className="text-lg font-display font-bold text-white mt-0.5">
                  {activeImageModal.title}
                </h3>
                <p className="text-xs text-luxury-cream/80 font-body mt-1 leading-relaxed">
                  {activeImageModal.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
