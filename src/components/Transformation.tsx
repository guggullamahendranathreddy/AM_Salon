import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkle, Sliders, Scissors, MoveLeft, MoveRight } from "lucide-react";
import { TRANSFORMATIONS } from "../data";

export default function Transformation() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const activeItem = TRANSFORMATIONS[activeIndex];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => stopDragging();
    
    // Add global event listeners to retain drag even if cursor leaves container
    window.addEventListener("mouseup", handleMouseUpGlobal);
    window.addEventListener("touchend", handleMouseUpGlobal);
    
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal);
      window.removeEventListener("touchend", handleMouseUpGlobal);
    };
  }, []);

  const handleStartDragging = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    if ("touches" in e) {
      handleMove(e.touches[0].clientX);
    } else {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-20 bg-bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Decorative ambient elements */}
        <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Descriptive copy & selection buttons */}
          <div className="lg:col-span-5">
            <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center gap-2 mb-2">
              <Sparkle className="w-3 h-3 text-secondary" /> Absolute Transformations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mt-2 mb-6">
              Visual proof of our <span className="text-gradient">Beauty Masteristry</span>
            </h2>
            <p className="text-sm text-luxury-cream/70 font-body leading-relaxed mb-8 font-light">
              Don't just take our word for it. Witness our jaw-dropping client transformations in high resolution. Drag the dynamic slider handles to compare the miraculous restoration before and after our signature treatments.
            </p>

            {/* Selection indicators */}
            <div className="flex flex-col gap-3">
              {TRANSFORMATIONS.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setSliderPosition(50); // reset slider to middle
                  }}
                  className={`w-full text-left p-4 rounded-sm border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    activeIndex === index
                      ? "bg-bg-charcoal border-primary text-white"
                      : "bg-bg-charcoal/30 border-white/5 text-luxury-cream/60 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-sm flex items-center justify-center text-xs font-semibold ${
                      activeIndex === index
                        ? "bg-gradient-to-r from-primary to-secondary text-white"
                        : "bg-bg-dark text-accent"
                    }`}>
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider font-body">{item.category}</h3>
                      <p className="text-[11px] text-accent tracking-wide mt-0.5">{item.title}</p>
                    </div>
                  </div>
                  <Sliders className={`w-4 h-4 ${activeIndex === index ? "text-secondary" : "text-accent"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: The actual draggable slider stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            <div className="text-center mb-6">
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-accent bg-bg-charcoal/60 px-3 py-1.5 rounded-sm border border-white/5 inline-flex items-center gap-1">
                <MoveLeft className="w-3.5 h-3.5 text-secondary" />
                Drag Slide Handle Left & Right
                <MoveRight className="w-3.5 h-3.5 text-secondary" />
              </span>
            </div>

            {/* Interactive container */}
            <div
              ref={containerRef}
              onMouseMove={(e) => {
                if (isDragging.current) handleMove(e.clientX);
              }}
              onTouchMove={(e) => {
                if (isDragging.current && e.touches[0]) handleMove(e.touches[0].clientX);
              }}
              onMouseDown={handleStartDragging}
              onTouchStart={handleStartDragging}
              className="relative w-full max-w-[550px] aspect-[4/3] rounded-sm overflow-hidden border border-white/10 shadow-2xl cursor-ew-resize select-none bg-neutral-900"
            >
              {/* BEFORE IMAGE (Full size static layer) */}
              <img
                src={activeItem.beforeUrl}
                alt={`${activeItem.title} Before`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-4 left-4 bg-bg-dark/70 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white rounded-sm">
                BEFORE
              </div>

              {/* AFTER IMAGE (Clipped width based on state) */}
              <div
                className="absolute inset-y-0 left-0 right-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeItem.afterUrl}
                  alt={`${activeItem.title} After`}
                  className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none pointer-events-none select-none"
                  style={{ width: containerRef.current?.getBoundingClientRect().width }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-luxury-cream rounded-sm">
                  AFTER
                </div>
              </div>

              {/* SLIDER CENTER DIVIDER LINE */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-secondary shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Visual circle handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-secondary text-white border-2 border-white flex items-center justify-center shadow-2xl pointer-events-all">
                  <span className="text-[10px] sm:text-xs">&lt;&gt;</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-luxury-cream/50 italic font-body">
                *Results vary based on individual hair density and structural hair health. Consultation is complimentary.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
