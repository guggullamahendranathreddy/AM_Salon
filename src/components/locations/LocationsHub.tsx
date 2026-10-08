import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Navigation,
  ExternalLink,
  Calendar,
  Sparkle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Scissors,
  CheckCircle,
} from "lucide-react";
import { NALLAGANDLA_BRANCH, PRAGATHI_NAGAR_BRANCH } from "../../locationData";

interface LocationsHubProps {
  onBookClick?: (service?: string, branch?: string) => void;
  onNavigate?: (view: "home" | "blog" | "admin" | "locations" | "location-nallagandla" | "location-pragathi-nagar", targetSection?: string) => void;
}

export default function LocationsHub({ onBookClick, onNavigate }: LocationsHubProps) {
  const branches = [NALLAGANDLA_BRANCH, PRAGATHI_NAGAR_BRANCH];

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
          <span className="text-secondary font-medium">Locations</span>
        </nav>
      </div>

      {/* 2. Header */}
      <section className="relative py-12 lg:py-16 bg-gradient-to-b from-bg-charcoal/80 to-bg-dark border-b border-primary/20">
        <div className="absolute top-0 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/45 bg-primary/25 px-3.5 py-1.5 backdrop-blur-md mb-4">
            <Sparkle className="w-3 h-3 text-secondary" />
            <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-luxury-cream">
              Two Physical Branches in Hyderabad
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-4">
            Our Salon <span className="text-gradient">Locations</span>
          </h1>

          <p className="text-sm sm:text-base text-luxury-cream/80 font-body leading-relaxed mb-6 font-light">
            AM Unisex Salon operates two modern branch locations across Hyderabad. Experience the same world-class hair styling, Pro-Keratin, Molecular Hair Botox, and rejuvenating skincare treatments at your nearest branch.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-luxury-cream/70 font-body">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-secondary" />
              Unified Pricing &amp; Menu
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-secondary" />
              Certified Senior Stylists
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-secondary" />
              Open 7 Days (9 AM – 9 PM)
            </span>
          </div>
        </div>
      </section>

      {/* 3. Branch Selector Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {branches.map((b) => (
            <div
              key={b.id}
              className={`p-8 rounded-lg bg-bg-charcoal border transition-all flex flex-col justify-between shadow-2xl relative ${
                b.isPrimary
                  ? "border-secondary/50 ring-1 ring-secondary/30"
                  : "border-white/10"
              }`}
            >
              {/* Primary Label */}
              {b.isPrimary && (
                <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
                  Primary Location
                </div>
              )}

              <div>
                <div className="mb-6 pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-body block mb-1">
                    Hyderabad Branch
                  </span>
                  <h2 className="text-2xl font-display font-bold text-white tracking-tight">
                    {b.name}
                  </h2>
                  <p className="text-xs text-secondary font-semibold font-body uppercase tracking-wider mt-0.5">
                    {b.tagline}
                  </p>
                </div>

                <div className="space-y-4 font-body text-xs sm:text-sm text-luxury-cream/80 mb-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                        Address
                      </span>
                      <p className="leading-relaxed text-luxury-cream/70 text-xs font-body">
                        {b.address.fullAddress}
                      </p>
                      {b.address.landmark && (
                        <p className="text-[10px] text-accent mt-0.5">
                          Landmark: {b.address.landmark}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                        Hours
                      </span>
                      <p className="text-xs text-luxury-cream/90 font-medium">
                        {b.hours} (Open All 7 Days)
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-white font-bold block uppercase tracking-wider text-[11px] mb-0.5">
                        Contact
                      </span>
                      <a
                        href={`tel:${b.phone}`}
                        className="text-xs font-semibold text-white hover:text-secondary transition-colors"
                      >
                        {b.formattedPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                <a
                  href={b.canonicalPath}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate(b.isPrimary ? "location-nallagandla" : "location-pragathi-nagar");
                    }
                  }}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-200 text-center ${
                    b.isPrimary
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:-translate-y-0.5"
                      : "bg-bg-dark border border-secondary/40 hover:border-secondary text-white"
                  }`}
                >
                  View Location Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={b.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-bg-dark border border-white/10 hover:border-white/30 text-xs font-semibold uppercase tracking-wider text-luxury-cream hover:text-white transition-all duration-200 text-center"
                >
                  <Navigation className="w-3.5 h-3.5 text-secondary" />
                  Directions
                </a>

                <button
                  onClick={() => {
                    if (onBookClick) {
                      onBookClick(undefined, b.shortName);
                    }
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-sm bg-bg-dark border border-secondary/30 hover:border-secondary text-xs font-semibold uppercase tracking-wider text-secondary hover:text-white transition-all duration-200 cursor-pointer text-center"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 4. Hyderabad Local Area Coverage */}
      <section className="py-12 bg-bg-charcoal/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-display font-bold text-white mb-3">
            Serving Greater Hyderabad
          </h3>
          <p className="text-xs sm:text-sm text-luxury-cream/70 font-body leading-relaxed mb-6 font-light">
            With branches in Nallagandla and Pragathi Nagar, we proudly welcome guests from across Hyderabad:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Nallagandla",
              "Serilingampalle",
              "Aparna Sarovar",
              "Tellapur",
              "Gachibowli",
              "Financial District",
              "BHEL",
              "Chandanagar",
              "Pragathi Nagar",
              "Kukatpally",
              "Nizampet",
              "Bachupally",
              "Miyapur",
            ].map((area) => (
              <span
                key={area}
                className="px-3 py-1 rounded-full bg-bg-charcoal border border-white/5 text-[11px] font-body text-luxury-cream/80"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
