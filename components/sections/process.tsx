'use client';

import { motion } from 'framer-motion';

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

export function Process() {
  return (
    <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background Atmosphere Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(15, 191, 106, 0.04) 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Clean Header Section */}
        <div className="mb-16 lg:mb-20 text-center space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary font-mono block">
            HOW WE WORK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space-grotesk text-white leading-tight tracking-tight">
            From Brief To Breakthrough
          </h2>
        </div>

        {/* Scroll-Stacked Deck Wrapper */}
        <div className="relative flex flex-col items-center gap-12 sm:gap-16">
          {PROCESS_STEPS.map((step, index) => {
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                className="sticky w-full max-w-3xl bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_-20px_40px_rgba(0,0,0,0.7)] flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 transition-colors duration-300 hover:border-primary/20"
                style={{
                  // Automatically stacks cards over each other with custom viewport spacing offsets
                  top: `calc(100px + ${index * 24}px)`,
                  zIndex: index + 1,
                }}
              >
                {/* Step Number Circle Indicator */}
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 bg-primary/5 text-primary text-lg font-bold font-space-grotesk shadow-[0_0_15px_rgba(15,191,106,0.1)]">
                  {step.number}
                </div>

                {/* Main Step Descriptions */}
                <div className="space-y-1.5 flex-grow">
                  <h3 className="text-xl font-bold font-space-grotesk text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}