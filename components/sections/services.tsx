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
  Layers,
  FastForward,
  LucideIcon,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
  colSpan: string; // Tailwind grid span logic for responsive breakpoints
}

const SERVICES: Service[] = [
  {
    id: 'ugc',
    title: 'UGC Ad Creative',
    description:
      'Authentic, high-converting user-generated content scripted and produced to feel native — not like an ad.',
    icon: Video,
    featured: true,
    colSpan: 'md:col-span-2 lg:col-span-7',
  },
  {
    id: 'performance-video',
    title: 'Performance Video Production',
    description:
      'Cinematic, scroll-stopping video ads built for Meta, TikTok, and YouTube — optimized for retention and conversion.',
    icon: Sparkles,
    colSpan: 'md:col-span-2 lg:col-span-5',
  },
  {
    id: 'creative-strategy',
    title: 'Creative Strategy & Hooks',
    description:
      "Data-backed creative direction. We don't guess what works — we engineer it.",
    icon: Target,
    colSpan: 'md:col-span-1 lg:col-span-4',
  },
  {
    id: 'ai-production',
    title: 'AI-Powered Rapid Production',
    description:
      "Leveraging next-gen AI video tools to produce premium creative at a speed traditional agencies can't match.",
    icon: Zap,
    colSpan: 'md:col-span-1 lg:col-span-4',
  },
  {
    id: 'stop-motion',
    title: 'Stop-Motion Creative',
    description:
      'Mesmerizing, frame-by-frame product animations designed to disrupt predictable feed patterns and lock in attention.',
    icon: Layers,
    colSpan: 'md:col-span-2 lg:col-span-4',
  },
  {
    id: 'hyper-motion',
    title: 'Hyper-Motion High-Speed Ads',
    description:
      'Aggressive, rapid-fire visual scaling layouts tuned perfectly to match high-velocity TikTok and Reels consumption speeds.',
    icon: FastForward,
    colSpan: 'md:col-span-2 lg:col-span-6',
  },
  {
    id: 'copywriting',
    title: 'Conversion Copywriting',
    description:
      'Direct-response scripts and ad copy built to trigger real conversion action — not just passive vanity views.',
    icon: PenTool,
    colSpan: 'md:col-span-1 lg:col-span-3',
  },
  {
    id: 'testing',
    title: 'Creative Testing & Iteration',
    description:
      'Continuous A/B testing of hooks, angles, and formats to systematically drive down CAC and elevate ROAS.',
    icon: RefreshCw,
    colSpan: 'md:col-span-1 lg:col-span-3',
  },
];

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
        delay: index * 0.05,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{
        scale: 1.01,
        y: -4,
      }}
      className={`group relative bg-surface/20 border border-white/5 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-surface/30 hover:shadow-xl hover:shadow-primary/5 backdrop-blur-md flex flex-col justify-between h-full ${service.featured ? 'lg:p-12' : ''
        } ${service.colSpan}`}
    >
      {service.featured && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 20% 20%, rgba(15, 191, 106, 0.15) 0%, transparent 60%)`,
          }}
        />
      )}

      <div>
        <div className="relative z-10 mb-8">
          <div
            className={`inline-flex items-center justify-center rounded-xl bg-primary/5 border border-primary/20 transition-all duration-500 group-hover:bg-primary/10 group-hover:border-primary/40 ${service.featured ? 'w-14 h-14' : 'w-11 h-11'
              }`}
          >
            <Icon
              className={`text-primary transition-transform duration-500 group-hover:scale-110 ${service.featured ? 'w-7 h-7' : 'w-5 h-5'
                }`}
              strokeWidth={1.75}
            />
          </div>
        </div>

        <div className="relative z-10 space-y-3">
          <h3
            className={`font-bold font-space-grotesk text-foreground/90 transition-colors duration-500 group-hover:text-primary ${service.featured ? 'text-3xl tracking-tight' : 'text-xl'
              }`}
          >
            {service.title}
          </h3>

          <p
            className={`font-sans leading-relaxed transition-colors duration-500 ${service.featured ? 'text-base' : 'text-sm'
              }`}
            style={{ color: '#b0b0b0' }}
          >
            {service.description}
          </p>
        </div>
      </div>

      {service.featured && (
        <div
          className="absolute top-0 right-0 w-36 h-36 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, rgba(15, 191, 106, 0.4), transparent 70%)`,
          }}
        />
      )}

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

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/30 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 80% 20%, rgba(15, 191, 106, 0.06) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-24 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold font-mono">
            WHAT WE DO
          </div>

          <div ref={headlineRef}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground leading-[1.15] tracking-tight max-w-4xl">
              Services Engineered For Conversion
            </h2>
          </div>
        </div>

        {/* Unified Bento Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-fr">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}