'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
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

interface MethodCardProps {
  step: (typeof STEPS)[0];
  index: number;
  isActive: boolean;
}

function MethodCard({ step, isActive }: MethodCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((centerX - x) / centerX) * 5;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="method-card relative h-full"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={tilt}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={cn(
          "relative h-full border rounded-2xl p-8 overflow-hidden transition-all duration-500 cursor-pointer shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[320px]",
          isActive
            ? "bg-surface/40 border-primary/40 shadow-[0_0_50px_rgba(15,191,106,0.08)] scale-[1.02]"
            : "bg-surface/20 border-white/5 hover:border-white/10"
        )}
      >
        <div
          className={cn(
            "absolute -top-10 -right-10 font-bold font-space-grotesk pointer-events-none select-none transition-opacity duration-500",
            isActive ? "opacity-[0.08]" : "opacity-[0.03]"
          )}
          style={{
            fontSize: '240px',
            lineHeight: '1',
            color: 'var(--color-primary)',
            transform: 'translateZ(0)',
          }}
        >
          {step.number}
        </div>

        <div className="relative z-10 space-y-6 flex-grow flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-4">
                <span className={cn(
                  "text-4xl font-bold font-space-grotesk transition-colors duration-500",
                  isActive ? "text-primary" : "text-primary/60"
                )}>
                  {step.number}
                </span>
                <h3 className={cn(
                  "text-2xl font-bold font-space-grotesk transition-colors duration-500",
                  isActive ? "text-primary" : "text-foreground/90"
                )}>
                  {step.title}
                </h3>
              </div>
              <span className={cn(
                "text-[10px] font-mono tracking-wider transition-opacity duration-500",
                isActive ? "text-primary opacity-100" : "text-muted opacity-0"
              )}>
                // ACTIVE_PHASE
              </span>
            </div>

            <p className="text-sm text-muted leading-relaxed font-normal">
              {step.description}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <div className={cn(
              "h-[1px] transition-all duration-700 origin-left flex-grow mr-4",
              isActive ? "bg-primary scale-x-100 shadow-[0_0_8px_#0fbf6a]" : "bg-white/5 scale-x-50"
            )} />
            <svg
              className={cn(
                "w-5 h-5 transform transition-all duration-500",
                isActive ? "text-primary translate-x-1 opacity-100" : "text-muted opacity-30"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);
  const lineGlowRef = useRef<SVGPathElement>(null);
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

      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll('.method-card');

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
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 65%',
          end: 'bottom 35%',
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.05 || p > 0.95) {
              setActiveStep(null);
            } else if (p >= 0.05 && p <= 0.35) {
              setActiveStep(0);
            } else if (p > 0.35 && p <= 0.70) {
              setActiveStep(1);
            } else if (p > 0.70 && p <= 0.95) {
              setActiveStep(2);
            }
          },
          onLeave: () => setActiveStep(null),
          onLeaveBack: () => setActiveStep(null),
        });
      }

      if (linePathRef.current && lineGlowRef.current && containerRef.current) {
        const length = linePathRef.current.getTotalLength();

        gsap.set([linePathRef.current, lineGlowRef.current], {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to([linePathRef.current, lineGlowRef.current], {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    const handleScrollClear = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      if (rect.top > viewHeight * 0.65 || rect.bottom < viewHeight * 0.35) {
        setActiveStep(null);
      }
    };

    window.addEventListener('scroll', handleScrollClear, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScrollClear);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/30 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 15% 70%, rgba(15, 191, 106, 0.04) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headlineRef} className="mb-16 lg:mb-24 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold font-mono">
            THE RAXEL METHOD™
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground leading-[1.15] tracking-tight max-w-4xl">
            A Creative System Built On Data, Psychology, and Relentless Iteration.
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 w-full pointer-events-none z-0 px-12">
            <svg className="w-full h-[4px]" fill="none" preserveAspectRatio="none" viewBox="0 0 100 4">
              <path d="M 0 2 L 100 2" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
              <path
                ref={linePathRef}
                d="M 0 2 L 100 2"
                stroke="url(#methodLineGradient)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                ref={lineGlowRef}
                d="M 0 2 L 100 2"
                stroke="var(--color-primary)"
                strokeWidth="2"
                opacity="0.5"
                vectorEffect="non-scaling-stroke"
                style={{ filter: 'drop-shadow(0px 0px 4px #0fbf6a)' }}
              />
              <defs>
                <linearGradient id="methodLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(15, 191, 106, 0.2)" />
                  <stop offset="50%" stopColor="rgba(15, 191, 106, 1)" />
                  <stop offset="100%" stopColor="rgba(15, 191, 106, 0.4)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10 items-stretch">
            {STEPS.map((step, index) => (
              <MethodCard
                key={step.number}
                step={step}
                index={index}
                isActive={activeStep === index}
              />
            ))}
          </div>
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