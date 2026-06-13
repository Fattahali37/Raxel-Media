'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Deconstruct',
    description:
      'We dissect your brand, audience, and market objections down to the emotional core. No guessing — pure psychological mapping.',
  },
  {
    number: '02',
    title: 'Engineer',
    description:
      'Every script is built with a 3-second hook, benefit-driven body, and frictionless CTA. Designed to stop the scroll and start the sale.',
  },
  {
    number: '03',
    title: 'Produce',
    description:
      'Cinematic, premium production using cutting-edge AI and UGC talent — delivered fast, tested constantly, scaled relentlessly.',
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

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

      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.process-card');

        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        ScrollTrigger.create({
          trigger: cardsContainerRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          onUpdate: (self) => {
            const p = self.progress;
            if (p <= 0.1) {
              setActiveStep(null);
            } else if (p > 0.1 && p <= 0.45) {
              setActiveStep(0);
            } else if (p > 0.45 && p <= 0.8) {
              setActiveStep(1);
            } else if (p > 0.8) {
              setActiveStep(2);
            }
          },
          onLeave: () => setActiveStep(null),
          onLeaveBack: () => setActiveStep(null)
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/30 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(15, 191, 106, 0.04) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headlineRef} className="mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold font-mono">
            THE RAXEL METHOD™
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground leading-[1.15] tracking-tight max-w-4xl">
            A Creative System Built On Data, Psychology, and Relentless Iteration.
          </h2>
        </div>

        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {PROCESS_STEPS.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <div
                key={step.number}
                className={cn(
                  "process-card relative p-8 rounded-2xl border transition-all duration-500 backdrop-blur-md flex flex-col justify-between min-h-[320px]",
                  isActive
                    ? "bg-surface/40 border-primary/40 shadow-[0_0_50px_rgba(15,191,106,0.08)] scale-[1.02]"
                    : "bg-surface/20 border-white/5 shadow-xl hover:border-white/10"
                )}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-3xl font-bold font-space-grotesk tracking-tight transition-colors duration-500",
                      isActive ? "text-primary" : "text-primary/60"
                    )}>
                      {step.number}
                    </span>
                    <span className={cn(
                      "text-sm font-mono tracking-wider transition-opacity duration-500",
                      isActive ? "text-primary opacity-100" : "text-muted opacity-0"
                    )}>
                      // ACTIVE_PHASE
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className={cn(
                      "text-2xl font-bold font-space-grotesk transition-colors duration-500",
                      isActive ? "text-primary" : "text-foreground/90"
                    )}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <div className={cn(
                    "w-full h-[1px] transition-all duration-700 origin-left",
                    isActive ? "bg-primary scale-x-100 shadow-[0_0_8px_#0fbf6a]" : "bg-white/5 scale-x-50"
                  )} />
                </div>
              </div>
            );
          })}
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