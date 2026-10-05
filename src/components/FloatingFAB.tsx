import React from "react";
import { MessageSquare, Phone, Instagram } from "lucide-react";

export default function FloatingFAB() {
  const whatsappUrl = "https://wa.me/917569979965?text=Hello%20AM%20Unisex%20Salon!%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20availabilities.";

  return (
    <div className="fixed bottom-5 right-4 md:right-6 md:bottom-6 z-30 flex flex-col items-center gap-2.5 sm:gap-3">
      
      {/* Instagram Floating Trigger */}
      <a
        href="https://www.instagram.com/akshaiunisexsalonpragathinagar"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center h-12 w-12 rounded-full bg-bg-charcoal/90 border border-white/10 hover:border-pink-500/50 hover:bg-[#E1306C]/10 text-luxury-cream hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95 group"
        aria-label="Direct message us on Instagram"
      >
        <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform text-pink-500" />
        <span className="absolute right-14 bg-bg-charcoal border border-white/5 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none hidden md:block">
          Instagram Feed
        </span>
      </a>

      {/* Direct Phone Call Floating Trigger */}
      <a
        href="tel:+917569979965"
        className="relative flex items-center justify-center h-12 w-12 rounded-full bg-bg-charcoal/90 border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white transition-all shadow-2xl hover:scale-105 active:scale-95 group"
        aria-label="Call AM Salon reception directly"
      >
        {/* Soft custom warning pulse */}
        <div className="absolute inset-0 rounded-full bg-secondary/10 animate-ping opacity-75 pointer-events-none" />
        
        <Phone className="w-5 h-5 group-hover:scale-110 transition-transform text-secondary font-bold" />
        <span className="absolute right-14 bg-bg-charcoal border border-white/5 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none hidden md:block">
          Call Reception
        </span>
      </a>

      {/* WhatsApp Chat Floating Trigger */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white transition-all shadow-[0_4px_24px_rgba(37,211,102,0.55)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.85)] hover:scale-105 active:scale-95 group"
        aria-label="Instant WhatsApp support chat"
      >
        {/* Glowing pulse */}
        <div className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: '2s' }} />
        
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform fill-white/15" />
        <span className="absolute right-14 bg-bg-charcoal border border-white/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none hidden md:block">
          WhatsApp Desk
        </span>
      </a>

    </div>
  );
}
