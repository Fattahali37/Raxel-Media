'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Brain, Target, BarChart3, LucideIcon } from 'lucide-react';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const FEATURES: Feature[] = [
  {
    number: '01',
    title: 'Speed',
    description: 'Production timelines that outpace traditional agencies by 3-5x',
    icon: Zap,
  },
  {
    number: '02',
    title: 'Psychology-First',
    description:
      'Every script is rooted in conversion psychology, not creative ego',
    icon: Brain,
  },
  {
    number: '03',
    title: 'Full-Funnel Thinking',
    description:
      'We don&apos;t just make ads, we engineer assets that move metrics',
    icon: Target,
  },
  {
    number: '04',
    title: 'Transparent Reporting',
    description: 'You&apos;ll always know what&apos;s working and why',
    icon: BarChart3,
  },
];

/**
 * Feature Row Component
 */
interface FeatureRowProps {
  feature: Feature;
  index: number;
}

function FeatureRow({ feature, index }: FeatureRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;
  const Icon = feature.icon;

  useEffect(() => {
    if (!rowRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current,
        {
          opacity: 0,
          x: isLeft ? -100 : 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, rowRef);

    return () => ctx.revert();
  }, [isLeft]);

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center`}
    >
      {/* Left Column - Icon and Number */}
      {isLeft ? (
        <div className="flex flex-col items-center md:items-start space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>

          {/* Large faded number */}
          <div
            className="text-8xl md:text-9xl font-bold font-space-grotesk text-primary opacity-10 leading-none"
            aria-hidden="true"
          >
            {feature.number}
          </div>
        </div>
      ) : null}

      {/* Right Column - Text Content */}
      <div
        className={`space-y-6 ${isLeft ? '' : 'md:order-first'}`}
      >
        <h3 className="text-4xl md:text-5xl font-bold font-space-grotesk text-foreground">
          {feature.title}
        </h3>
        <p className="text-lg md:text-xl text-muted leading-relaxed max-w-lg">
          {feature.description}
        </p>
      </div>

      {/* Right Column - Icon and Number (if not left) */}
      {!isLeft ? (
        <div className="flex flex-col items-center md:items-start space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>

          {/* Large faded number */}
          <div
            className="text-8xl md:text-9xl font-bold font-space-grotesk text-primary opacity-10 leading-none"
            aria-hidden="true"
          >
            {feature.number}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Why Raxel Section Component
 */
export function WhyRaxel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 80% 50%, rgba(15, 191, 106, 0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 lg:mb-32">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            WHY RAXEL
          </div>

          <div ref={headlineRef}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground leading-tight">
              Why Brands Choose Raxel Media
            </h2>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-24 lg:space-y-32">
          {FEATURES.map((feature, index) => (
            <FeatureRow key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}