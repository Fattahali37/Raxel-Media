'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, FileText, Clapperboard, CheckSquare } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: any;
  tag: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'We dig into your brand, offer, audience, and current creative performance.',
    icon: Play,
    tag: 'HOOK_ANALYSIS.MP4'
  },
  {
    number: '02',
    title: 'Strategy & Scripting',
    description: 'Our team builds psychology-driven scripts mapped to your funnel stage.',
    icon: FileText,
    tag: 'PSYCH_SCRIPT_V1.TXT'
  },
  {
    number: '03',
    title: 'Production',
    description: 'Cinematic shoot or AI-powered production, depending on your speed and budget needs.',
    icon: Clapperboard,
    tag: 'A_ROLL_RENDER.MOV'
  },
  {
    number: '04',
    title: 'Delivery & Iteration',
    description: 'You get ready-to-launch assets, plus ongoing testing recommendations.',
    icon: CheckSquare,
    tag: 'FINAL_SCALE_V2.MP4'
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const blocks = containerRef.current.querySelectorAll('.timeline-block');

    const ctx = gsap.context(() => {
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0.2, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: block,
              start: 'top 65%',
              end: 'bottom 45%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 lg:py-36 px-4 sm:px-6 lg:px-8 bg-[#050505] overflow-hidden">
      {/* Background Editor Grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-20 lg:mb-28 text-center space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary font-mono block">
            THE PIPELINE
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-space-grotesk text-white leading-tight tracking-tight">
            From Brief To Breakthrough
          </h2>
        </div>

        {/* Timeline Track Layout */}
        <div className="relative border-l border-white/5 ml-4 sm:ml-8 pl-8 sm:pl-16 space-y-20">
          
          {/* Subtle Continuous Scanner Track Glow */}
          <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-primary/5 to-transparent pointer-events-none" />

          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number} 
                className="timeline-block relative transition-all duration-300 group"
              >
                {/* Node Track Target Alignment Indicator */}
                <div className="absolute left-[-41px] sm:left-[-73px] top-1.5 w-4 h-4 rounded-full border border-primary/40 bg-background flex items-center justify-center transition-all duration-500 group-hover:border-primary group-hover:scale-110">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>

                {/* Main Step Flex Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Metadata Side */}
                  <div className="lg:col-span-4 space-y-2">
                    <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md border border-white/5 bg-white/[0.02] text-[10px] font-mono text-primary uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-primary animate-ping" />
                      {step.tag}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-muted-foreground/50">{step.number}.</span>
                      <h3 className="text-2xl font-bold font-space-grotesk text-white group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right Content Component Description Block */}
                  <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md relative overflow-hidden flex items-start gap-5 transition-colors duration-300 group-hover:border-white/10">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-all duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed font-sans pt-1 max-w-xl">
                      {step.description}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}