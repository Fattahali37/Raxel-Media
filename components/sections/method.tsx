'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
}

function MethodCard({ step, index }: MethodCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; // Inverted for natural tilt feel
    const rotateY = ((centerX - x) / centerX) * 4;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        animate={tilt}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-full bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 overflow-hidden transition-colors duration-300 hover:border-primary/40 cursor-pointer"
      >
        {/* Large faded watermark positioned perfectly */}
        <div
          className="absolute bottom-[-20px] right-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 font-bold font-space-grotesk pointer-events-none select-none tracking-tighter text-white"
          style={{
            fontSize: '180px',
            lineHeight: '0.8',
            transform: 'translateZ(10px)',
          }}
        >
          {step.number}
        </div>

        {/* Card Content Structure */}
        <div className="relative z-10 space-y-4 h-full flex flex-col" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold font-space-grotesk text-primary">
              {step.number}
            </span>
            <h3 className="text-xl font-bold font-space-grotesk text-white">
              {step.title}
            </h3>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed flex-grow font-sans">
            {step.description}
          </p>

          <div className="pt-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-4px] group-hover:translate-x-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        {/* Interior Micro-Glow Canvas */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(15,191,106,0.06)_0%,transparent_70%)]" />
      </motion.div>
    </motion.div>
  );
}

export function Method() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Clean Framer Motion Scroll Trigger tracking across the block context
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineWidth = useTransform(scrollYProgress, [0.3, 0.55], ["0%", "100%"]);
  const dotX = useTransform(scrollYProgress, [0.3, 0.55], ["0%", "100%"]);

  return (
    <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background Atmosphere Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(15,191,106,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Block Layout */}
        <div className="mb-16 lg:mb-24 space-y-4 max-w-5xl">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary font-mono block">
            THE RAXEL METHOD™
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space-grotesk text-white leading-[1.15] tracking-tight">
            A Creative System Built On Data, Psychology, and Relentless Iteration.
          </h2>
        </div>

        {/* Interactive Processing Grid Context */}
        <div ref={containerRef} className="relative">
          
          {/* Responsive Tracking Connecting Line */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-[1px] bg-white/5 z-0">
            {/* Fluid Active Animated Line Track */}
            <motion.div 
              style={{ width: lineWidth }} 
              className="h-full bg-gradient-to-r from-transparent via-primary/80 to-primary/30 relative"
            >
              {/* Pulse Engine Particle Anchor */}
              <motion.div 
                style={{ left: dotX }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#0fbf6a]"
              />
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative z-10">
            {STEPS.map((step, index) => (
              <MethodCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}