'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Video,
  Sparkles,
  Target,
  Zap,
  PenTool,
  RefreshCw,
  LucideIcon,
} from 'lucide-react';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
  colSpan: string; // Tailwind grid span class
}

const SERVICES: Service[] = [
  {
    id: 'ugc',
    title: 'UGC Ad Creative',
    description:
      'Authentic, high-converting user-generated content scripted and produced to feel native — not like an ad.',
    icon: Video,
    featured: true,
    colSpan: 'lg:col-span-7',
  },
  {
    id: 'performance-video',
    title: 'Performance Video Production',
    description:
      'Cinematic, scroll-stopping video ads built for Meta, TikTok, and YouTube — optimized for retention and conversion.',
    icon: Sparkles,
    colSpan: 'lg:col-span-5',
  },
  {
    id: 'creative-strategy',
    title: 'Creative Strategy & Hooks',
    description:
      'Data-backed creative direction. We don&apos;t guess what works — we engineer it.',
    icon: Target,
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'ai-production',
    title: 'AI-Powered Rapid Production',
    description:
      'Leveraging next-gen AI video tools to produce premium creative at a speed traditional agencies can&apos;t match.',
    icon: Zap,
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'copywriting',
    title: 'Conversion Copywriting',
    description:
      'Direct-response scripts and ad copy built to trigger action — not just attention.',
    icon: PenTool,
    colSpan: 'lg:col-span-6',
  },
  {
    id: 'testing',
    title: 'Creative Testing & Iteration',
    description:
      'Continuous A/B testing of hooks, angles, and formats to keep your CAC low and ROAS high.',
    icon: RefreshCw,
    colSpan: 'lg:col-span-6',
  },
];

/**
 * Service Card Component
 */
interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
      }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        scale: 1.01,
        y: -4,
      }}
      className={`group relative bg-surface/20 border border-white/5 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-surface/30 hover:shadow-xl hover:shadow-primary/5 backdrop-blur-md flex flex-col justify-between h-full ${
        service.featured ? 'lg:p-12' : ''
      }`}
    >
      {/* Featured card gradient background accent */}
      {service.featured && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 20% 20%, rgba(15, 191, 106, 0.15) 0%, transparent 60%)`,
          }}
        />
      )}

      <div>
        {/* Icon Badge */}
        <div className="relative z-10 mb-8">
          <div
            className={`inline-flex items-center justify-center rounded-xl bg-primary/5 border border-primary/20 transition-all duration-500 group-hover:bg-primary/10 group-hover:border-primary/40 ${
              service.featured ? 'w-14 h-14' : 'w-11 h-11'
            }`}
          >
            <Icon
              className={`text-primary transition-transform duration-500 group-hover:scale-110 ${
                service.featured ? 'w-7 h-7' : 'w-5 h-5'
              }`}
              strokeWidth={1.75}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-3">
          {/* Title */}
          <h3
            className={`font-bold font-space-grotesk text-foreground/90 transition-colors duration-500 group-hover:text-primary ${
              service.featured ? 'text-3xl tracking-tight' : 'text-xl'
            }`}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            className={`text-muted leading-relaxed transition-colors duration-500 ${
              service.featured ? 'text-base' : 'text-sm'
            }`}
          >
            {service.description}
          </p>
        </div>
      </div>

      {/* Corner accent for featured card */}
      {service.featured && (
        <div
          className="absolute top-0 right-0 w-36 h-36 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, rgba(15, 191, 106, 0.4), transparent 70%)`,
          }}
        />
      )}

      {/* Subtle gloss effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 50%, rgba(15, 191, 106, 0.03) 100%)',
        }}
      />
    </motion.div>
  );
}

/**
 * Services Section Component
 */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate headline
      if (headlineRef.current) {
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
      }

      // Stagger cards in view (handled by Framer Motion whileInView)
      // but we can add a timeline effect if needed
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
          background: `radial-gradient(circle at 80% 20%, rgba(15, 191, 106, 0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            WHAT WE DO
          </div>

          <div ref={headlineRef}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground leading-tight">
              Services Engineered For Conversion
            </h2>
          </div>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-max"
        >
          {/* First row: featured (7 cols) + performance video (5 cols) */}
          <div className="md:col-span-2 lg:col-span-7">
            <ServiceCard service={SERVICES[0]} index={0} />
          </div>
          <div className="md:col-span-2 lg:col-span-5">
            <ServiceCard service={SERVICES[1]} index={1} />
          </div>

          {/* Second row: creative strategy (4 cols) + ai production (4 cols) + copywriting (4 cols) */}
          <div className="md:col-span-1 lg:col-span-4">
            <ServiceCard service={SERVICES[2]} index={2} />
          </div>
          <div className="md:col-span-1 lg:col-span-4">
            <ServiceCard service={SERVICES[3]} index={3} />
          </div>
          <div className="md:col-span-2 lg:col-span-4">
            <ServiceCard service={SERVICES[4]} index={4} />
          </div>

          {/* Third row: testing (6 cols) + copywriting continuation */}
          <div className="md:col-span-2 lg:col-span-6">
            <ServiceCard service={SERVICES[5]} index={5} />
          </div>
          <div className="md:col-span-2 lg:col-span-6" />
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
