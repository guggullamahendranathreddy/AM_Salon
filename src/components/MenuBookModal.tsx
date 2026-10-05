import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Phone, MessageSquare, BookOpen } from "lucide-react";
import akshaiLogo from "../assets/akshai-logo.jpeg";

interface MenuBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceItemData {
  name: string;
  prices: string[];
  tag?: string;
}

interface CategoryGroup {
  label: string;
  services: ServiceItemData[];
}

interface CategoryData {
  number: string;
  title: string;
  category: string;
  columns: string[];
  services: ServiceItemData[];
  subGroups?: CategoryGroup[];
}

const categories: CategoryData[] = [
  {
    number: "01",
    title: "Threading",
    category: "Face",
    columns: ["Regular", "Member"],
    services: [
      { name: "Eyebrows", prices: ["₹49", "₹41"] },
      { name: "Upper Lip", prices: ["₹49", "₹41"] },
      { name: "Forehead", prices: ["₹49", "₹41"] },
      { name: "Chin", prices: ["₹49", "₹41"] },
      { name: "Side Cheeks", prices: ["₹99", "₹84"] },
      { name: "Full Face", prices: ["₹299", "₹254"] },
    ],
  },
  {
    number: "02",
    title: "Waxing",
    category: "Body",
    columns: ["Chocolate", "Rica", "Lipo"],
    services: [
      { name: "Upper Lip", prices: ["₹89", "₹119", "₹99"] },
      { name: "Forehead", prices: ["₹99", "₹129", "₹99"] },
      { name: "Under Arms", prices: ["₹199", "₹349", "₹299"] },
      { name: "Half Arms", prices: ["₹249", "₹549", "₹499"] },
      { name: "Full Arms", prices: ["₹299", "₹649", "₹549"] },
      { name: "Half Legs", prices: ["₹399", "₹599", "₹499"] },
      { name: "Full Legs", prices: ["₹499", "₹999", "₹699"] },
      { name: "Full Body", prices: ["₹1,999", "₹4,499", "₹2,999"] },
    ],
  },
  {
    number: "03",
    title: "D-Tan",
    category: "Skin Care",
    columns: ["Regular", "Member"],
    services: [
      { name: "Basic D-Tan Face", prices: ["₹299", "₹254"] },
      { name: "Basic Neck", prices: ["₹199", "₹169"] },
      { name: "Face & Neck", prices: ["₹399", "₹339"] },
      { name: "O3 D-Tan", prices: ["₹499", "₹424"] },
      { name: "Raaga D-Tan", prices: ["₹349", "₹296"] },
      { name: "Hands D-Tan", prices: ["₹449", "₹381"] },
      { name: "Legs D-Tan", prices: ["₹549", "₹466"] },
      { name: "Full Body D-Tan", prices: ["₹2,499", "₹2,124"] },
    ],
  },
  {
    number: "04",
    title: "Manicure",
    category: "Nail Care",
    columns: ["Regular", "Member"],
    services: [
      { name: "Basic", prices: ["₹399", "₹339"] },
      { name: "Spa", prices: ["₹499", "₹424"] },
      { name: "Raaga", prices: ["₹799", "₹679"] },
      { name: "Crystal", prices: ["₹799", "₹679"] },
      { name: "D-Tan", prices: ["₹999", "₹849"] },
      { name: "Wine", prices: ["₹999", "₹849"] },
      { name: "Bombini", prices: ["₹1,499", "₹1,274"] },
      { name: "Bubblegum", prices: ["₹1,999", "₹1,699"] },
      { name: "Nails Cut + File + Polish", prices: ["₹199", "₹169"] },
    ],
  },
  {
    number: "05",
    title: "Pedicure",
    category: "Nail Care",
    columns: ["Regular", "Member"],
    services: [
      { name: "Basic", prices: ["₹499", "₹424"] },
      { name: "Spa", prices: ["₹599", "₹509"] },
      { name: "Raaga", prices: ["₹999", "₹849"] },
      { name: "Crystal", prices: ["₹999", "₹849"] },
      { name: "D-Tan", prices: ["₹1,799", "₹1,529"] },
      { name: "Wine", prices: ["₹1,799", "₹1,529"] },
      { name: "Bombini", prices: ["₹2,499", "₹2,124"] },
      { name: "Bubblegum", prices: ["₹2,999", "₹2,549"] },
      { name: "Nails Cut + File + Polish", prices: ["₹199", "₹169"] },
    ],
  },
  {
    number: "06",
    title: "Pedicure + Manicure",
    category: "Combo",
    columns: ["Regular", "Member"],
    services: [
      { name: "Basic", prices: ["₹799", "₹769"] },
      { name: "Spa", prices: ["₹899", "₹764"] },
      { name: "Raaga", prices: ["₹1,499", "₹1,274"] },
      { name: "Crystal", prices: ["₹1,499", "₹1,222"] },
      { name: "D-Tan", prices: ["₹2,399", "₹2,039"] },
      { name: "Wine", prices: ["₹2,299", "₹1,954"] },
      { name: "Bombini", prices: ["₹2,499", "₹1,954"] },
      { name: "Bubblegum O3+", prices: ["₹3,999", "₹3,399"] },
    ],
  },
  {
    number: "07",
    title: "Hair Cut & Styling",
    category: "Hair",
    columns: ["Regular", "Member"],
    services: [
      { name: "Basic", prices: ["₹399", "₹339"] },
      { name: "Advanced Level", prices: ["₹799", "₹680"] },
      { name: "Blow Dry Setting", prices: ["₹249", "₹211"] },
      { name: "Hair Wash + Blow Dry", prices: ["₹349", "₹296"] },
      { name: "Hair Wash + Ironing", prices: ["₹699", "₹594"] },
      { name: "Split Ends Treatment", prices: ["₹799", "₹679"] },
      { name: "Hair Wash Curls", prices: ["₹999", "₹849"] },
    ],
  },
  {
    number: "08",
    title: "Hair Spa",
    category: "Hair",
    columns: ["Regular", "Member"],
    services: [
      { name: "Basic Spa", prices: ["₹999", "₹849"] },
      { name: "Hair Smoothening", prices: ["₹1,599", "₹1,359"], tag: "Popular" },
      { name: "Anti Hairfall", prices: ["₹1,799", "₹1,529"] },
      { name: "Anti Dandruff", prices: ["₹1,999", "₹1,699"] },
    ],
    subGroups: [
      {
        label: "Head Massage",
        services: [
          { name: "Coconut Oil", prices: ["₹599", "₹509"] },
          { name: "Navaratna Oil", prices: ["₹599", "₹509"] },
          { name: "Almond Oil", prices: ["₹799", "₹679"] },
        ],
      },
    ],
  },
  {
    number: "09",
    title: "Hair Treatment & Color",
    category: "Hair",
    columns: ["Starting At"],
    services: [
      { name: "Smoothening", prices: ["₹4,999+"] },
      { name: "Straightening", prices: ["₹4,999+"] },
      { name: "Keratin", prices: ["₹5,999+"] },
      { name: "Botox", prices: ["₹6,999+"] },
      { name: "Nano Plastia", prices: ["₹4,999+"] },
      { name: "Lice Treatment", prices: ["₹1,999+"] },
    ],
    subGroups: [
      {
        label: "Hair Color",
        services: [
          { name: "Root Touch-Up (Gel)", prices: ["₹799+"] },
          { name: "Global Root Touch-Up", prices: ["₹1,299+"] },
          { name: "Natural Gel (Full)", prices: ["₹1,999+"] },
          { name: "Global Color (Full)", prices: ["₹4,999+"] },
          { name: "Highlights / Streak", prices: ["₹349+"] },
        ],
      },
    ],
  },
  {
    number: "10",
    title: "Facials",
    category: "Skin",
    columns: ["Regular", "Member"],
    services: [
      { name: "Cleanup", prices: ["₹499", "₹424"] },
      { name: "Papaya Facial", prices: ["₹999", "₹899"] },
      { name: "Pearl Facial", prices: ["₹1,699", "₹1,444"] },
      { name: "Wine Facial", prices: ["₹1,699", "₹1,444"] },
      { name: "Skin Glow", prices: ["₹1,999", "₹1,699"] },
      { name: "Diamond Facial", prices: ["₹2,299", "₹1,954"], tag: "Popular" },
      { name: "Gold Facial", prices: ["₹2,499", "₹2,124"] },
      { name: "Lotus Bridal Glow", prices: ["₹3,499", "₹2,974"], tag: "Bridal Fave" },
      { name: "O3+ Bridal Glowing", prices: ["₹3,999", "₹3,299"] },
      { name: "Glass Glow Lotus Mirai", prices: ["₹4,999", "₹4,249"] },
    ],
  },
];

export default function MenuBookModal({ isOpen, onClose }: MenuBookModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const [visible, setVisible] = useState(true);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Total pages: Cover (0), Why AM Salon (1), Categories (2..11), Closing (12)
  const totalPages = 2 + categories.length + 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(currentPage + 1);
      if (e.key === "ArrowLeft") goTo(currentPage - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPage, animating]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const goTo = (target: number) => {
    if (animating || target < 0 || target >= totalPages || target === currentPage) return;
    const dir = target > currentPage ? "left" : "right";
    setSlideDir(dir);
    setAnimating(true);
    setVisible(false);

    setTimeout(() => {
      setCurrentPage(target);
      setVisible(true);
      setTimeout(() => setAnimating(false), 220);
    }, 200);
  };

  const getPageTitle = (idx: number) => {
    if (idx === 0) return "Cover";
    if (idx === 1) return "Why AM Salon";
    if (idx >= 2 && idx < 2 + categories.length) {
      return categories[idx - 2].title;
    }
    return "Visit & Book";
  };

  const renderRow = (svc: ServiceItemData, colCount: number) => {
    return (
      <div key={svc.name} className="flex items-baseline gap-2 py-1.5 border-b border-cream/5 text-xs">
        <div className="flex items-center gap-1.5 shrink-0 max-w-[58%]">
          <span className="text-cream text-xs sm:text-[13px] font-light truncate">{svc.name}</span>
          {svc.tag && (
            <span className="text-[7px] tracking-wider uppercase text-amber-500 bg-amber-400/10 border border-amber-400/40 px-1 py-0.5 rounded-sm whitespace-nowrap">
              {svc.tag}
            </span>
          )}
        </div>
        <div className="flex-1 border-b border-dotted border-cream/20 mb-1 min-w-[8px]" />
        <div className="flex gap-2 sm:gap-3.5 shrink-0">
          {svc.prices.map((p, i) => (
            <span
              key={i}
              className={`min-w-[36px] sm:min-w-[42px] text-right ${
                i === 0 ? "text-amber-400 font-semibold text-xs sm:text-[13px]" : "text-cream-dim text-[10px] sm:text-[11px] font-light"
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderPageContent = (idx: number) => {
    // 0: Cover
    if (idx === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 select-none">
          <p className="text-[9.5px] tracking-[0.4em] uppercase text-cream-dim mb-5">
            Unisex &middot; Unlimited &middot; Unstoppable
          </p>
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-amber-400/50 p-1 mb-5 shadow-2xl">
            <img src={akshaiLogo} alt="AM Unisex Salon logo" className="w-full h-full rounded-full object-cover" />
          </div>
          <h1 className="font-serif text-4xl text-amber-400 tracking-wider mb-1">AM</h1>
          <h2 className="font-serif text-2xl tracking-[0.3em] text-cream mb-3">SALON</h2>
          <div className="w-14 h-[1px] bg-amber-400/40 my-3" />
          <p className="font-serif italic text-base text-cream-dim mb-6">The Service Edit</p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-cream-dim">
            Pragathi Nagar, Hyderabad &middot; Est. 2018
          </p>
          <button
            onClick={() => goTo(1)}
            className="mt-8 px-4 py-2 border border-amber-400/40 rounded-full text-[10px] tracking-[0.3em] uppercase text-amber-400 hover:bg-amber-400/10 transition-colors"
          >
            Open Menu &rarr;
          </button>
        </div>
      );
    }

    // 1: Highlights
    if (idx === 1) {
      return (
        <div className="h-full flex flex-col p-4 select-none">
          <div className="flex items-start gap-3 mb-4">
            <span className="font-serif text-3xl font-light text-amber-400/30">&bull;</span>
            <div>
              <p className="text-[9.5px] tracking-[0.3em] uppercase text-amber-400">Why AM Salon</p>
              <h2 className="font-serif text-2xl font-bold text-cream">The Difference</h2>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-xs">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400 text-xs">
                ★
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-cream">Skilled, Trained Stylists</h4>
                <p className="text-[11px] text-cream-dim leading-relaxed">
                  Every service is performed by experienced professionals trained in modern techniques and trending aesthetic cuts.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400 text-xs">
                ✓
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-cream">Hygiene First</h4>
                <p className="text-[11px] text-cream-dim leading-relaxed">
                  Scissors, trimmers, and tools are meticulously sanitised before each client with single-use consumables.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400 text-xs">
                ✦
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-cream">Unisex, For Everyone</h4>
                <p className="text-[11px] text-cream-dim leading-relaxed">
                  A comfortable, relaxed, welcoming ambiance designed for families, men, women, and children alike.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400 text-xs">
                ♥
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-cream">Transparent Pricing</h4>
                <p className="text-[11px] text-cream-dim leading-relaxed">
                  Fixed pricing directly displayed in this ledger with no surprise fees or add-ons at billing.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-cream/10 flex justify-between text-center">
            <div className="flex-1">
              <div className="font-serif text-lg font-bold text-amber-400">2018</div>
              <div className="text-[8px] uppercase tracking-wider text-cream-dim">Est.</div>
            </div>
            <div className="flex-1 border-x border-cream/10">
              <div className="font-serif text-lg font-bold text-amber-400">10</div>
              <div className="text-[8px] uppercase tracking-wider text-cream-dim">Service Lines</div>
            </div>
            <div className="flex-1">
              <div className="font-serif text-lg font-bold text-amber-400">15%</div>
              <div className="text-[8px] uppercase tracking-wider text-cream-dim">Member Savings</div>
            </div>
          </div>
        </div>
      );
    }

    // 2..11: Categories
    if (idx >= 2 && idx < 2 + categories.length) {
      const cat = categories[idx - 2];
      return (
        <div className="h-full flex flex-col p-4 select-none overflow-y-auto scrollbar-none">
          <div className="flex items-start gap-3 mb-2 shrink-0">
            <span className="font-serif text-3xl font-light text-amber-400/25">{cat.number}</span>
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-amber-400">{cat.category}</p>
              <h2 className="font-serif text-xl font-bold text-cream">{cat.title}</h2>
            </div>
          </div>

          <div className="flex items-baseline gap-2.5 mb-1.5 shrink-0">
            <div className="flex-1" />
            <div className="flex gap-3.5 shrink-0">
              {cat.columns.map((col, cIdx) => (
                <span
                  key={cIdx}
                  className="min-w-[42px] text-right text-[8.5px] uppercase tracking-widest text-cream-dim"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent mb-2 shrink-0" />

          <div className="space-y-0.5">
            {cat.services.map((svc) => renderRow(svc, cat.columns.length))}
            {cat.subGroups?.map((group) => (
              <div key={group.label} className="mt-3 pt-2">
                <div className="flex items-center gap-2 my-2">
                  <div className="flex-1 h-[1px] bg-cream/10" />
                  <span className="text-[8.5px] uppercase tracking-[0.2em] text-cream-dim whitespace-nowrap">
                    {group.label}
                  </span>
                  <div className="flex-1 h-[1px] bg-cream/10" />
                </div>
                {group.services.map((svc) => renderRow(svc, cat.columns.length))}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 12: Closing page
    return (
      <div className="h-full flex flex-col p-4 select-none overflow-y-auto scrollbar-none">
        <p className="text-[9.5px] tracking-[0.3em] uppercase text-amber-400 mb-2">Membership</p>
        <div className="border border-amber-400/30 p-3.5 rounded-sm mb-4 bg-amber-400/5">
          <h3 className="font-serif text-base font-semibold text-cream mb-1">Save 15% on every visit</h3>
          <p className="text-xs text-cream-dim leading-relaxed mb-3">
            Ask our reception desk to enroll in the AM VIP membership and enjoy discounted rates all year round.
          </p>
          <a
            href="tel:+917569979965"
            className="inline-block text-[9.5px] tracking-widest uppercase text-amber-400 border border-amber-400/50 px-3.5 py-1.5 rounded-full hover:bg-amber-400 hover:text-black transition-all"
          >
            Enquire Now
          </a>
        </div>

        <div className="mb-4 text-xs">
          <p className="text-[9px] tracking-widest uppercase text-cream-dim mb-1">Find Us</p>
          <p className="text-cream font-medium">AM Unisex Salon</p>
          <p className="text-cream-dim text-[11px] leading-relaxed">
            Near Shiva Medicals, 3rd Layout, Pragathi Nagar, Hyderabad, Telangana 500090
          </p>
          <a
            href="https://maps.google.com/?q=Akshai+Unisex+Salon+Near+Shiva+Medicals+3rd+Layout+Pragathi+Nagar+Hyderabad+Telangana+500090"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 text-[11px] text-amber-400 underline decoration-dotted"
          >
            Open in Google Maps &rarr;
          </a>
        </div>

        <div className="text-center my-2 p-3 bg-white/5 rounded-sm border border-white/5">
          <p className="text-[9px] uppercase tracking-widest text-amber-400 mb-2">Connect With Us</p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 text-xs font-semibold">
            <a
              href="tel:+917569979965"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full border border-amber-400/40 text-cream hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Us Directly</span>
            </a>
            <a
              href="https://wa.me/917569979965?text=Hello%20AM%20Unisex%20Salon!%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full border border-[#25D366]/40 text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-cream/10 text-[8.5px] uppercase tracking-wider text-cream-dim/60 text-center leading-relaxed">
          AM Unisex Salon &middot; Est. 2018<br />
          Open All 7 Days &middot; 9:00 AM - 9:00 PM
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Container Card — responsive height & width */}
      <div
        className="relative w-full max-w-[480px] h-[90vh] sm:h-[620px] max-h-[720px] bg-[#121012] border border-amber-400/25 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Top bar */}
        <div className="w-full flex items-center justify-between px-4 py-3 border-b border-cream/10 bg-[#161316] shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-xs uppercase font-serif tracking-[0.2em] text-cream font-medium truncate max-w-[200px]">
              Menu Card &middot; {getPageTitle(currentPage)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-cream-dim hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close Menu Card"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Flipbook Body — flex-1 so it fills remaining space */}
        <div
          className="relative w-full flex-1 overflow-hidden"
          style={{ minHeight: 0 }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            const dy = e.changedTouches[0].clientY - touchStartY.current;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 35) {
              dx < 0 ? goTo(currentPage + 1) : goTo(currentPage - 1);
            }
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-amber-400/40 pointer-events-none z-10" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-amber-400/40 pointer-events-none z-10" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-amber-400/40 pointer-events-none z-10" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-amber-400/40 pointer-events-none z-10" />

          {/* Single page — slides out then new page slides in */}
          <div
            className="absolute inset-0 bg-[#121012] overflow-y-auto scrollbar-none"
            style={{
              transition: "opacity 200ms ease, transform 200ms ease",
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateX(0)"
                : slideDir === "left"
                ? "translateX(-18px)"
                : "translateX(18px)",
            }}
          >
            {renderPageContent(currentPage)}
          </div>
        </div>

        {/* Footer controls: Previous, Page indicator, Next */}
        <div className="w-full flex items-center justify-between px-5 py-3 border-t border-cream/10 bg-[#161316]">
          <button
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 0 || animating}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-amber-400/30 text-xs text-amber-400 disabled:opacity-20 hover:bg-amber-400/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Prev</span>
          </button>

          <div className="text-center">
            <div className="font-serif text-xs text-cream tracking-wide">{getPageTitle(currentPage)}</div>
            <div className="text-[10px] tracking-widest text-cream-dim">
              {String(currentPage + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
            </div>
          </div>

          <button
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages - 1 || animating}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-amber-400/30 text-xs text-amber-400 disabled:opacity-20 hover:bg-amber-400/10 transition-colors"
          >
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Page progress dots */}
        <div className="flex gap-1.5 py-2.5 px-4 overflow-x-auto max-w-full justify-center">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === currentPage ? "w-4 bg-amber-400" : "w-1.5 bg-cream/20 hover:bg-cream/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

