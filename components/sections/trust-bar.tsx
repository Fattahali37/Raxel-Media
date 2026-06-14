'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Marquee data
const MARQUEE_ITEMS = [
  '200+ Ads Produced',
  '50+ Brands Scaled',
  '3.4x Avg ROAS Lift',
  '12 Industries Served',
];

const DIVIDER = '✦';

/**
 * Animated Stat Counter Component
 * Counts up from 0 to target value when scrolled into view
 */
interface StatCounterProps {
  value: number | string;
  label: string;
  suffix?: string;
  isDecimal?: boolean;
}

function StatCounter({ value, label, suffix = '', isDecimal = false }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  // Extract numeric value for animation
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;
    const targetValue = numericValue;
    const duration = 2; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOut
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = targetValue * easeProgress;

      // Format the display value
      const formatted = isDecimal
        ? currentValue.toFixed(1)
        : Math.round(currentValue).toString();

      setDisplayValue(formatted);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericValue, isDecimal]);

  return (
    <div ref={ref} className="text-center space-y-2 sm:space-y-3">
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-space-grotesk text-primary tracking-tight">
        {displayValue}
        {suffix}
      </div>
      <p className="text-[10px] sm:text-xs md:text-sm text-muted uppercase tracking-widest font-semibold font-mono px-2 leading-snug">
        {label}
      </p>
    </div>
  );
}

/**
 * Marquee Component with seamless infinite scroll and fade edges
 */
function Marquee() {
  // Concat arrays to guarantee infinite looping background visual text stream coverage across ultra-wides
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative w-full overflow-hidden py-4 sm:py-6 select-none">
      {/* Fade left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--background, rgb(10, 10, 10)), transparent)',
        }}
      />

      {/* Fade right edge */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to left, var(--background, rgb(10, 10, 10)), transparent)',
        }}
      />

      {/* Outer track wrapper */}
      <div className="flex w-max overflow-hidden">
        {/* Animated track slider line frame */}
        <motion.div
          className="flex gap-12 sm:gap-16 pr-12 sm:pr-16 whitespace-nowrap motion-reduce:transform-none"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm uppercase tracking-widest text-muted font-medium font-space-grotesk flex-shrink-0"
            >
              <span>{item}</span>
              <span className="text-primary text-[10px] sm:text-xs">{DIVIDER}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Stats Grid Component with animated counters
 */
function StatsGrid() {
  const stats = [
    { value: 200, label: 'Ads Produced', suffix: '+' },
    { value: 50, label: 'Brands Scaled', suffix: '+' },
    { value: 3.4, label: 'Avg ROAS Lift', suffix: 'x', isDecimal: true },
    { value: 12, label: 'Industries Served', suffix: '' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
      {stats.map((stat, index) => (
        <StatCounter
          key={index}
          value={stat.value}
          label={stat.label}
          suffix={stat.suffix}
          isDecimal={stat.isDecimal}
        />
      ))}
    </div>
  );
}

/**
 * Trust Bar Section Component
 * Displays marquee of trust signals and animated stat counters
 */
export function TrustBar() {
  return (
    <section className="relative w-full max-w-full bg-background border-y border-white/5 overflow-hidden">
      {/* Main Trust Bar */}
      <div className="py-6 sm:py-8 overflow-hidden">
        {/* Label */}
        <div className="px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 text-center">
          <p className="text-[10px] sm:text-xs sm:text-sm uppercase tracking-widest text-muted font-bold font-mono">
            Trusted by DTC brands scaling past 7-figures
          </p>
        </div>

        {/* Marquee */}
        <Marquee />
      </div>

      {/* Stats Grid Section */}
      <div className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 text-center space-y-2 sm:space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space-grotesk tracking-tight text-foreground">
              Proven Results
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted max-w-xs mx-auto leading-relaxed font-sans">
              Our track record speaks for itself
            </p>
          </div>
          <StatsGrid />
        </div>
      </div>
    </section>
  );
}