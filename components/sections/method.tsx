'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
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

/**
 * Method Card Component with 3D tilt and hover effects
 */
interface MethodCardProps {
  step: (typeof STEPS)[0];
  index: number;
}

function MethodCard({ step, index }: MethodCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 5; // Max 5 degrees
    const rotateY = ((centerX - x) / centerX) * 5; // Max 5 degrees

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        animate={tilt}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d' as const,
        }}
        className="relative h-full bg-surface/20 border border-white/5 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-surface/30 cursor-pointer shadow-2xl backdrop-blur-md"
      >
        {/* Large faded number watermark */}
        <div
          className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
          style={{
            fontSize: '240px',
            lineHeight: '1',
            fontWeight: 'bold',
            fontFamily: 'var(--font-space-grotesk)',
            color: 'var(--color-primary)',
            userSelect: 'none',
            pointerEvents: 'none',
            transform: 'translateZ(0)',
          }}
        >
          {step.number}
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4 h-full flex flex-col">
          {/* Step number and title */}
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold font-space-grotesk text-primary">
              {step.number}
            </span>
            <h3 className="text-2xl font-bold font-space-grotesk text-foreground/90">
              {step.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed flex-grow">
            {step.description}
          </p>

          {/* Arrow indicator on hover */}
          <div className="pt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <svg
              className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow:
              'inset 0 0 20px rgba(15, 191, 106, 0.08), 0 0 30px rgba(15, 191, 106, 0.03)',
            background: 'radial-gradient(circle at 50% 50%, rgba(15, 191, 106, 0.05) 0%, transparent 80%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Connecting Line Component with animated dot/arrow
 */
function ConnectingLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!svgRef.current || !pathRef.current || !dotRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the line drawing with stroke-dashoffset
      const path = pathRef.current;
      const initialLength = path?.getTotalLength() || 0;

      gsap.fromTo(
        path,
        { strokeDashoffset: initialLength },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate the dot along the path
      gsap.to(
        dotRef.current,
        {
          attr: {
            cx: 600, // Endpoint of the line
          },
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute top-1/2 left-0 right-0 w-full h-20 pointer-events-none"
      style={{
        transform: 'translateY(-50%)',
        overflow: 'visible',
      }}
      preserveAspectRatio="none"
      viewBox="0 0 600 20"
    >
      {/* Main connecting line */}
      <path
        ref={pathRef}
        d="M 0 10 L 600 10"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="600"
        strokeDashoffset="600"
      />

      {/* Animated dot/circle */}
      <circle
        ref={dotRef}
        cx="0"
        cy="10"
        r="4"
        fill="var(--color-primary)"
        filter="url(#dotGlow)"
      />

      {/* Arrow at the end */}
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(15, 191, 106, 0)" />
          <stop offset="50%" stopColor="rgba(15, 191, 106, 0.8)" />
          <stop offset="100%" stopColor="rgba(15, 191, 106, 0.3)" />
        </linearGradient>
        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

/**
 * Raxel Method Section Component
 */
export function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate headline on scroll
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
          background: `radial-gradient(circle at 15% 70%, rgba(15, 191, 106, 0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            THE RAXEL METHOD™
          </div>

          <div ref={headlineRef} className="space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground leading-tight">
              A Creative System Built On Data, Psychology, and Relentless Iteration.
            </h2>
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Connecting line - Desktop only */}
          <div className="hidden lg:block">
            <ConnectingLine />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, index) => (
              <MethodCard key={step.number} step={step} index={index} />
            ))}
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
