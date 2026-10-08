import React, { useState } from "react";
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, Calendar, Navigation, ArrowRight, Building2, Sparkle } from "lucide-react";
import { SITE_CONFIG } from "../config/site";
import { NALLAGANDLA_BRANCH, PRAGATHI_NAGAR_BRANCH } from "../locationData";

interface LocationProps {
  onBookClick?: (service?: string, branch?: string) => void;
  onNavigate?: (view: "home" | "blog" | "admin" | "locations" | "location-nallagandla" | "location-pragathi-nagar", targetSection?: string) => void;
}

export default function Location({ onBookClick, onNavigate }: LocationProps) {
  const [activeBranchId, setActiveBranchId] = useState<"nallagandla" | "pragathi-nagar">("nallagandla");

  const currentBranch = activeBranchId === "nallagandla" ? NALLAGANDLA_BRANCH : PRAGATHI_NAGAR_BRANCH;

  return (
    <section id="contact" className="relative py-20 bg-bg-dark border-t border-primary/20 overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-3.5 h-3.5 text-secondary" /> Our Hyderabad Branches
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mt-1 mb-4 leading-tight">
            Visit <span className="text-gradient">AM Unisex Salon in Hyderabad</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 leading-relaxed font-body font-light">
            AM Unisex Salon operates two physical branches in Hyderabad. Our primary branch is in <strong>Nallagandla</strong> (HYTEK ARCADE), alongside our established branch in <strong>Pragathi Nagar</strong>.
          </p>

          {/* Branch Toggle Tabs */}
          <div className="inline-flex items-center p-1.5 rounded-lg bg-bg-charcoal border border-white/10 mt-6 gap-2">
            <button
              onClick={() => setActiveBranchId("nallagandla")}
              className={`px-4 sm:px-6 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider font-body transition-all cursor-pointer flex items-center gap-2 ${
                activeBranchId === "nallagandla"
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow"
                  : "text-luxury-cream/70 hover:text-white"
              }`}
            >
              <Sparkle className="w-3 h-3 text-white" />
              Nallagandla (Primary)
            </button>
            <button
              onClick={() => setActiveBranchId("pragathi-nagar")}
              className={`px-4 sm:px-6 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider font-body transition-all cursor-pointer ${
                activeBranchId === "pragathi-nagar"
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow"
                  : "text-luxury-cream/70 hover:text-white"
              }`}
            >
              Pragathi Nagar
            </button>
          </div>
        </div>

        {/* Location Info Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Business Details */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-lg bg-bg-charcoal border border-white/5 shadow-2xl">
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-body">
                    {currentBranch.isPrimary ? "Primary Physical Salon Storefront" : "Branch Storefront"}
                  </span>
                  {currentBranch.isPrimary && (
                    <span className="text-[9px] uppercase font-bold tracking-wider text-secondary bg-primary/20 px-2 py-0.5 rounded-full border border-secondary/30">
                      Primary
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                  {currentBranch.name}
                </h3>
                <p className="text-xs text-secondary font-semibold font-body uppercase tracking-wider mt-0.5">
                  Unisex Family Salon &bull; Hyderabad
                </p>
              </div>

              <div className="space-y-5 font-body">
                {/* Real Address */}
                <div className="flex items-start gap-3 text-xs sm:text-sm text-luxury-cream/80">
                  <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                      Salon Address
                    </span>
                    <address className="not-italic leading-relaxed text-luxury-cream/70 text-xs font-body">
                      {currentBranch.address.fullAddress}
                    </address>
                    {currentBranch.address.landmark && (
                      <p className="text-[10px] text-accent mt-0.5 font-body">
                        Landmark: {currentBranch.address.landmark}
                      </p>
                    )}
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3 text-xs sm:text-sm text-luxury-cream/80">
                  <div className="h-9 w-9 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                      Opening Hours
                    </span>
                    <p className="text-xs text-luxury-cream/90 font-medium">
                      Monday &ndash; Sunday: 9:00 AM &ndash; 9:00 PM
                    </p>
                    <p className="text-[10px] text-accent mt-0.5">Open all 7 days for men, women & kids</p>
                  </div>
                </div>

                {/* Contact Phone & WhatsApp */}
                <div className="flex items-start gap-3 text-xs sm:text-sm text-luxury-cream/80">
                  <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                      Direct Inquiries &amp; Reception
                    </span>
                    <a
                      href={`tel:${currentBranch.phone}`}
                      className="text-xs font-semibold text-white hover:text-secondary transition-colors block"
                      aria-label={`Call ${currentBranch.name} reception`}
                    >
                      {currentBranch.formattedPhone}
                    </a>
                    <a
                      href={`https://wa.me/${currentBranch.whatsappNumber}?text=${encodeURIComponent(`Hello ${currentBranch.name}! I would like to inquire about booking an appointment.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline text-xs inline-flex items-center gap-1 mt-1 font-body"
                      aria-label="Chat on WhatsApp"
                    >
                      <MessageSquare className="w-3 h-3 text-[#25D366]" /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="pt-6 mt-6 border-t border-white/5 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={currentBranch.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-bg-dark border border-secondary/40 hover:border-secondary text-xs font-semibold uppercase tracking-wider text-luxury-cream hover:text-white transition-all duration-200 text-center"
                  aria-label={`Get directions to ${currentBranch.name} on Google Maps`}
                >
                  <Navigation className="w-3.5 h-3.5 text-secondary" />
                  Get Directions
                  <ExternalLink className="w-3 h-3 text-accent" />
                </a>

                <button
                  onClick={() => {
                    if (onBookClick) onBookClick(undefined, currentBranch.shortName);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold uppercase tracking-wider hover:-translate-y-0.5 transition-all duration-200 shadow-md cursor-pointer text-center"
                  aria-label="Book an appointment online"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book Branch
                </button>
              </div>

              <a
                href={currentBranch.canonicalPath}
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate(currentBranch.isPrimary ? "location-nallagandla" : "location-pragathi-nagar");
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-bg-dark border border-white/10 hover:border-secondary/40 text-xs font-semibold uppercase tracking-wider text-luxury-cream hover:text-secondary transition-all"
              >
                View Full {currentBranch.shortName} Landing Page
                <ArrowRight className="w-3 h-3 text-secondary" />
              </a>
            </div>
          </div>

          {/* Card 2: Interactive Google Maps Embed */}
          <div className="lg:col-span-7 rounded-lg overflow-hidden border border-white/10 bg-bg-charcoal shadow-2xl relative min-h-[360px] flex flex-col">
            <div className="p-3 bg-bg-dark/90 border-b border-white/5 flex items-center justify-between px-4 text-xs">
              <span className="text-luxury-cream/80 font-body flex items-center gap-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span className="truncate">{currentBranch.address.fullAddress}</span>
              </span>
              <a
                href={currentBranch.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white underline decoration-dotted text-[11px] font-semibold uppercase tracking-wider shrink-0 ml-2"
              >
                Open in Full Map &rarr;
              </a>
            </div>

            <div className="relative flex-1 w-full min-h-[340px]">
              <iframe
                title={`${currentBranch.name} Google Map Location`}
                src={currentBranch.googleMapsEmbedUrl}
                className="w-full h-full border-none min-h-[340px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
