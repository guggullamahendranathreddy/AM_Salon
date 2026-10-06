import React from "react";
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, Calendar, Navigation } from "lucide-react";

interface LocationProps {
  onBookClick?: () => void;
}

export default function Location({ onBookClick }: LocationProps) {
  const addressString =
    "Near Shiva Medicals, 3rd Layout, Pragathi Nagar, Hyderabad, Telangana 500090, India";
  const googleMapsPlaceUrl =
    "https://maps.google.com/?cid=14103202395395251575";
  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=17.5165991,78.3892702";
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8105574518427!2d78.3892702!3d17.5165991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91c53e8e2d45%3A0xc3b8a3db4cf8dd77!2sAkshai%20Unisex%20Salon!5e0!3m2!1sen!2sin!4v1700000000000";

  return (
    <section id="contact" className="relative py-20 bg-bg-dark border-t border-primary/20 overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-3.5 h-3.5 text-secondary" /> Find Our Salon
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mt-1 mb-4 leading-tight">
            Visit <span className="text-gradient">AM Unisex Salon in Hyderabad</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 leading-relaxed font-body font-light">
            Conveniently located Near Shiva Medicals, 3rd Layout in Pragathi Nagar. We welcome walk-in guests and scheduled appointments 7 days a week.
          </p>
        </div>

        {/* Location Info Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Business Details */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-lg bg-bg-charcoal border border-white/5 shadow-2xl">
            <div>
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-body block mb-1">
                  Physical Salon Storefront
                </span>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                  AM Unisex Salon
                </h3>
                <p className="text-xs text-secondary font-semibold font-body uppercase tracking-wider mt-0.5">
                  Unisex Family Salon &bull; Pragathi Nagar, Hyderabad
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
                    <p className="leading-relaxed text-luxury-cream/70 text-xs">
                      {addressString}
                    </p>
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
                      href="tel:+917569979965"
                      className="text-xs font-semibold text-white hover:text-secondary transition-colors block"
                      aria-label="Call AM Unisex Salon reception directly"
                    >
                      +91 75699 79965
                    </a>
                    <a
                      href="https://wa.me/917569979965?text=Hello%20AM%20Unisex%20Salon!%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline text-xs inline-flex items-center gap-1 mt-1 font-body"
                      aria-label="Chat with AM Unisex Salon on WhatsApp"
                    >
                      <MessageSquare className="w-3 h-3 text-[#25D366]" /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="pt-6 mt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-bg-dark border border-secondary/40 hover:border-secondary text-xs font-semibold uppercase tracking-wider text-luxury-cream hover:text-white transition-all duration-200"
                aria-label="Get directions to AM Unisex Salon on Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 text-secondary" />
                Get Directions
                <ExternalLink className="w-3 h-3 text-accent" />
              </a>

              {onBookClick && (
                <button
                  onClick={onBookClick}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold uppercase tracking-wider hover:-translate-y-0.5 transition-all duration-200 shadow-md cursor-pointer"
                  aria-label="Book an appointment online"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book Online
                </button>
              )}
            </div>
          </div>

          {/* Card 2: Interactive Google Maps Embed */}
          <div className="lg:col-span-7 rounded-lg overflow-hidden border border-white/10 bg-bg-charcoal shadow-2xl relative min-h-[360px] flex flex-col">
            <div className="p-3 bg-bg-dark/90 border-b border-white/5 flex items-center justify-between px-4 text-xs">
              <span className="text-luxury-cream/80 font-body flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-secondary" /> Near Shiva Medicals, Pragathi Nagar, Hyderabad
              </span>
              <a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white underline decoration-dotted text-[11px] font-semibold uppercase tracking-wider"
              >
                Open in Full Map &rarr;
              </a>
            </div>

            <div className="relative flex-1 w-full min-h-[320px]">
              <iframe
                title="AM Unisex Salon Google Map Location - Near Shiva Medicals Pragathi Nagar Hyderabad"
                src={googleMapsEmbedUrl}
                className="w-full h-full border-none min-h-[320px]"
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
