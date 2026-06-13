'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
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
    title: 'Discovery Call',
    description:
      'We dig into your brand, offer, audience, and current creative performance.',
  },
  {
    number: '02',
    title: 'Strategy & Scripting',
    description:
      'Our team builds psychology-driven scripts mapped to your funnel stage.',
  },
  {
    number: '03',
    title: 'Production',
    description:
      'Cinematic shoot or AI-powered production, depending on your speed and budget needs.',
  },
  {
    number: '04',
    title: 'Delivery & Iteration',
    description:
      'You get ready-to-launch assets, plus ongoing testing recommendations.',
  },
];

/**
 * Timeline Line Component
 * Animates downward as user scrolls through the section
 */
function TimelineLine({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!svgRef.current || !lineRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const line = lineRef.current;
      if (!line) return;

      const totalLength = line.getTotalLength();

      gsap.fromTo(
        line,
        { strokeDashoffset: totalLength },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1, // Smooth scrubbing, synced to scroll
            markers: false,
          },
        }
      );
    }, svgRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <svg
      ref={svgRef}
      className="absolute left-0 top-0 w-1 h-full"
      style={{
        left: 'calc(50% - 1px)',
      }}
      preserveAspectRatio="none"
      viewBox="0 0 2 1000"
      width="2"
    >
      <line
        ref={lineRef}
        x1="1"
        y1="0"
        x2="1"
        y2="1000"
        stroke="url(#timelineGradient)"
        strokeWidth="2"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      />
      <defs>
        <linearGradient
          id="timelineGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgba(15, 191, 106, 0)" />
          <stop offset="50%" stopColor="rgba(15, 191, 106, 0.6)" />
          <stop offset="100%" stopColor="rgba(15, 191, 106, 0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Timeline Step Circle Component
 */
interface StepCircleProps {
  number: string;
  isActive: boolean;
}

function StepCircle({ number, isActive }: StepCircleProps) {
  return (
    <motion.div
      animate={isActive ? { scale: [1, 1.1, 1], borderColor: '#0FBF6A' } : {}}
      transition={{
        scale: {
          duration: 0.6,
          repeat: isActive ? 2 : 0,
          ease: 'easeInOut',
        },
        borderColor: {
          duration: 0.3,
        },
      }}
      className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center border-2 font-bold font-space-grotesk text-lg bg-surface transition-all duration-300 ${
        isActive ? 'border-primary text-primary' : 'border-border text-foreground'
      }`}
    >
      {number}
    </motion.div>
  );
}

/**
 * Timeline Step Card Component
 */
interface StepCardProps {
  step: ProcessStep;
  isLeft: boolean;
}

function StepCard({ step, isLeft }: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        x: isLeft ? -60 : 60,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [isLeft]);

  return (
    <motion.div
      ref={cardRef}
      className={`flex ${isLeft ? 'lg:flex-row-reverse' : ''} items-center gap-8 lg:gap-12`}
    >
      {/* Content Card */}
      <div
        className={`flex-1 ${
          isLeft ? 'lg:text-right' : ''
        } bg-surface border border-border rounded-2xl p-8 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10`}
      >
        <h3 className="text-2xl font-bold font-space-grotesk text-foreground mb-4">
          {step.title}
        </h3>
        <p className="text-base text-muted leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Spacer for circle positioning (visual balance) */}
      <div className="hidden lg:block w-24 flex-shrink-0" />
    </motion.div>
  );
}

/**
 * Process Section Component
 */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate headline
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

      // Animate step circles when they come into view
      if (stepsRef.current) {
        const stepElements = stepsRef.current.querySelectorAll('[data-step-index]');
        stepElements.forEach((el, idx) => {
          gsap.fromTo(
            el,
            { scale: 0.8 },
            {
              scale: 1,
              duration: 0.5,
              ease: 'back.out',
              scrollTrigger: {
                trigger: el,
                start: 'center 80%',
                once: false,
                onEnter: () => setActiveStep(idx),
                onLeave: () => setActiveStep(null),
                onEnterBack: () => setActiveStep(idx),
                onLeaveBack: () => setActiveStep(null),
              },
            }
          );
        });
      }
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
          background: `radial-gradient(circle at 20% 50%, rgba(15, 191, 106, 0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            HOW WE WORK
          </div>

          <div ref={headlineRef}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground leading-tight">
              From Brief To Breakthrough
            </h2>
          </div>
        </div>

        {/* Timeline Container */}
        <div ref={stepsRef} className="relative">
          {/* Timeline Line - Desktop only */}
          <div className="hidden lg:block">
            <TimelineLine sectionRef={sectionRef} />
          </div>

          {/* Mobile Timeline Line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0" />

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;
              const isActive = activeStep === index;

              return (
                <div
                  key={step.number}
                  data-step-index={index}
                  className="relative"
                >
                  {/* Desktop: Step Circle on timeline */}
                  <div className="hidden lg:block">
                    <StepCircle number={step.number} isActive={isActive} />
                  </div>

                  {/* Mobile: Step Circle on left */}
                  <div className="lg:hidden absolute left-0 top-0 w-16 h-16 rounded-full flex items-center justify-center border-2 border-border bg-surface font-bold font-space-grotesk text-lg text-foreground">
                    {step.number}
                  </div>

                  {/* Content with offset for mobile circle */}
                  <div className="lg:block pl-28 lg:pl-0">
                    <StepCard
                      step={step}
                      isLeft={isLeft}
                    />
                  </div>
                </div>
              );
            })}
          </div>
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
