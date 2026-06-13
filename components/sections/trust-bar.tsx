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
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState('0');

  // Extract numeric value for animation
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;
    let currentValue = 0;
    const targetValue = numericValue;
    const duration = 2; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOut
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      currentValue = targetValue * easeProgress;

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
    <div ref={ref} className="text-center space-y-2">
      <div className="text-5xl sm:text-6xl font-bold font-space-grotesk text-primary">
        {displayValue}
        {suffix}
      </div>
      <p className="text-sm text-muted uppercase tracking-wide font-medium">
        {label}
      </p>
    </div>
  );
}

/**
 * Marquee Component with infinite scroll and fade edges
 */
/**
 * Marquee Component with seamless infinite scroll and fade edges
 */
function Marquee() {
  // Triple the items or ensure they easily exceed 100vw total width
  const marqueeContent = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Fade left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(10, 10, 10), rgba(10, 10, 10, 0))',
        }}
      />

      {/* Fade right edge */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to left, rgb(10, 10, 10), rgba(10, 10, 10, 0))',
        }}
      />

      {/* Inner container establishing a non-restrictive layout */}
      <div className="flex w-max">
        {/* Animated track moving exactly by half its overall width */}
        <motion.div
          className="flex gap-16 pr-16 whitespace-nowrap motion-reduce:transform-none"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25, // Slightly faster for a cleaner glide
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {marqueeContent.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 text-xs sm:text-sm uppercase tracking-widest text-muted font-medium font-space-grotesk flex-shrink-0"
            >
              <span>{item}</span>
              <span className="text-primary text-xs">{DIVIDER}</span>
            </div>
          ))}
        </motion.div>

        {/* Duplicate track to seamlessly append right behind the first one */}
        <motion.div
          className="flex gap-16 pr-16 whitespace-nowrap motion-reduce:transform-none"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {marqueeContent.map((item, index) => (
            <div
              key={`dup-${index}`}
              className="flex items-center gap-4 text-xs sm:text-sm uppercase tracking-widest text-muted font-medium font-space-grotesk flex-shrink-0"
            >
              <span>{item}</span>
              <span className="text-primary text-xs">{DIVIDER}</span>
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
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
    <section className="relative bg-background border-y border-border">
      {/* Main Trust Bar */}
      <div className="py-8 overflow-hidden">
        {/* Label */}
        <div className="px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-muted font-medium">
            Trusted by DTC brands scaling past 7-figures
          </p>
        </div>

        {/* Marquee */}
        <Marquee />
      </div>

      {/* Stats Grid Section */}
      <div className="border-t border-border px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-foreground mb-2">
              Proven Results
            </h2>
            <p className="text-muted text-base sm:text-lg">
              Our track record speaks for itself
            </p>
          </div>
          <StatsGrid />
        </div>
      </div>
    </section>
  );
}