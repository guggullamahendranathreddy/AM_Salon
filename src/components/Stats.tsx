import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, Scissors, Users, Star } from "lucide-react";

export default function Stats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const statsList = [
    {
      id: 1,
      icon: <Award className="w-6 h-6 text-secondary" />,
      targetNum: 8,
      suffix: "+",
      label: "Years Excellence",
      subText: "Established since 2018",
    },
    {
      id: 2,
      icon: <Scissors className="w-6 h-6 text-accent" />,
      targetNum: 100,
      suffix: "+",
      label: "Services Offered",
      subText: "Head to toe specialist treatment",
    },
    {
      id: 3,
      icon: <Users className="w-6 h-6 text-secondary" />,
      targetNum: 1000,
      suffix: "+",
      label: "Happy Clients",
      subText: "Dedicated family customer base",
    },
    {
      id: 4,
      icon: <Star className="w-6 h-6 text-amber-500 fill-amber-500" />,
      targetNum: 4.9,
      suffix: "★",
      label: "Customer Rating",
      subText: "409+ verified reviews online",
    },
  ];

  return (
    <section ref={containerRef} className="relative py-12 md:py-16 bg-bg-charcoal border-y border-primary/10 overflow-hidden">
      {/* Background elegant pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsList.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="relative p-6 rounded-lg bg-bg-dark/90 border border-white/5 hover:border-primary/20 transition-all group hover:bg-blur-glass hover:shadow-[0_10px_30px_-5px_rgba(166,58,58,0.15)] flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div className="mb-4 h-12 w-12 rounded-full bg-bg-charcoal group-hover:bg-primary/10 flex items-center justify-center transition-colors border border-white/5 group-hover:border-primary/20 shadow-inner">
                {stat.icon}
              </div>

              {/* Number Count Display */}
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                <Counter target={stat.targetNum} suffix={stat.suffix} active={isInView} />
              </div>

              {/* Text Label */}
              <h3 className="font-body text-xs md:text-sm font-semibold text-luxury-cream uppercase tracking-wider mb-1">
                {stat.label}
              </h3>

              {/* Subtitle comment */}
              <p className="font-body text-[10px] md:text-xs text-accent italic">
                {stat.subText}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Custom Micro Counter sub-mechanism for premium performance
function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const end = target;
    const duration = 1.5; // in seconds
    const steps = 40;
    const increment = end / steps;
    const intervalTime = (duration * 1000) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [active, target]);

  // Handle floats vs integers elegantly
  const displayVal = Number.isInteger(target) ? Math.round(count) : count.toFixed(1);

  return (
    <span>
      {displayVal}
      <span className="text-secondary ml-0.5">{suffix}</span>
    </span>
  );
}
