'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Brain, Target, BarChart3, LucideIcon } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
}

const FEATURES: Feature[] = [
  {
    number: '01',
    title: 'Speed Execution',
    description: 'Production workflows calibrated to outpace sluggish legacy agencies by 3-5x without compromising structural premium quality.',
    icon: Zap,
    tag: 'VELOCITY_LOGIC'
  },
  {
    number: '02',
    title: 'Psychology-First Frameworks',
    description: 'Every conceptual narrative hook and visual angle is engineered explicitly around quantitative conversion psychology patterns.',
    icon: Brain,
    tag: 'PSYCH_HOOK_V1'
  },
  {
    number: '03',
    title: 'Full-Funnel Infrastructure',
    description: 'We don\'t produce isolated creative assets. We design conversion architectures targeted down to sub-demographic user actions.',
    icon: Target,
    tag: 'FUNNEL_ENG.MOV'
  },
  {
    number: '04',
    title: 'Granular Reporting Loops',
    description: 'Complete pipeline tracking loops. Pinpoint exactly what structural variants won, which underperformed, and how we intend to scale them.',
    icon: BarChart3,
    tag: 'ROI_STREAM_ANALYTICS'
  },
];

export function WhyRaxel() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const containerTriggerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollTrackRef.current || !containerTriggerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = scrollTrackRef.current!;
      const container = containerTriggerRef.current!;

      const updateTimeline = () => {
        const totalWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;

        // Exact dynamic distance to move the track completely left
        const xTranslation = -(totalWidth - windowWidth + 64);

        // SCROLL PACE MULTIPLIER: Allocates enough vertical scroll distance to let the pacing feel smooth
        const scrollPacingFactor = 1.5;
        const scrollDistance = Math.abs(xTranslation) * scrollPacingFactor;

        // Clear previous ScrollTriggers for recalculation
        ScrollTrigger.getAll().forEach(t => {
          if (t.trigger === container) t.kill();
        });

        // 1. Core Card Glide Tween
        gsap.fromTo(track,
          { x: 0 },
          {
            x: xTranslation,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              invalidateOnRefresh: true,
            },
          }
        );

        // 2. Micro Status Progress Fill Track
        gsap.fromTo(progressBarRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: container,
              scrub: 1,
              start: "top top",
              end: () => `+=${scrollDistance}`,
            },
          }
        );
      };

      // Initial run + setup resize tracking safety loops
      updateTimeline();
      ScrollTrigger.addEventListener("refreshInit", updateTimeline);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", updateTimeline);
        ScrollTrigger.getAll().forEach(t => {
          if (t.trigger === container) t.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerTriggerRef}
      className="w-full h-auto md:h-screen bg-background overflow-x-hidden md:overflow-hidden flex flex-col justify-center relative py-20 md:py-0 select-none border-b border-border/30"
    >
      {/* Background Editor Pixel Ambient Grid */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}
      />

      {/* Visual Editor Anchor Header Frame */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-primary uppercase block">
            THE RAXEL EDGE
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-space-grotesk text-white tracking-tight leading-none">
            Why Brands Scale With Us
          </h2>
        </div>
        <p className="text-xs font-mono max-w-xs md:text-right uppercase tracking-wider" style={{ color: '#3a3a3a' }}>
          {"// [SCROLL_TIMELINE] ACCELERATING CONVERSION ARCS"}
        </p>
      </div>

      {/* Horizontal Strip Container view wrapper */}
      <div className="w-full relative flex items-center overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 scrollbar-none snap-x snap-mandatory md:snap-none px-4 md:px-0">

        {/* Moving filmstrip runway track */}
        <div
          ref={scrollTrackRef}
          className="flex gap-5 md:gap-6 pl-0 md:pl-[max(2rem,calc((100vw-80rem)/2))] pr-4 md:pr-[10vw] will-change-transform"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.number}
                className="w-[calc(100vw-2rem)] sm:w-[400px] h-[350px] flex-shrink-0 border border-white/5 bg-[#080808]/50 backdrop-blur-xl rounded-2xl p-7 md:p-8 flex flex-col justify-between relative group hover:border-primary/20 transition-all duration-500 ease-out snap-center [perspective:1000px] hover:[transform:rotateX(2deg)_rotateY(-2deg)]"
              >
                {/* Film/Editor style Metadata horizontal bar */}
                <div className="flex justify-between items-center border-b border-white/[0.04] pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: '#5a5a5a' }}>
                      {feature.tag}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/15 group-hover:text-primary/40 transition-colors duration-500">
                    {`//_${feature.number}`}                  </span>
                </div>

                {/* Primary Narrative Context Copy */}
                <div className="space-y-4 my-auto">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-muted group-hover:text-primary group-hover:border-primary/20 transition-all duration-500 shadow-inner">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold font-space-grotesk text-white tracking-tight group-hover:text-primary/95 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-sans font-normal max-w-sm" style={{ color: '#b0b0b0' }}>
                    {feature.description}
                  </p>
                </div>

                {/* Fake Production Frame Data Readout */}
                <div className="text-[10px] font-mono flex justify-between pt-3 border-t border-white/[0.03]" style={{ color: '#2a2a2a' }}>
                  <span className="group-hover:opacity-40 transition-opacity" style={{ color: '#3a3a3a' }}>FR_00{feature.number}0_RAX</span>
                  <span>24_FPS_TC</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded Render Progress Status Track Bar (Only visible Desktop viewports) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 hidden md:block pointer-events-none">
        <div className="w-full h-[2px] bg-white/[0.03] rounded-full relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute left-0 top-0 bottom-0 w-full bg-gradient-to-r from-primary/30 to-primary origin-left will-change-transform shadow-[0_0_10px_#0fbf6a]"
          />
        </div>
      </div>
    </section>
  );
}