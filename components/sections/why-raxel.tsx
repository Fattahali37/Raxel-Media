'use client';

import { Zap, Brain, Target, BarChart3, LucideIcon } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '@/components/scroll-stack';

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  tabColor: string;
}

const FEATURES: Feature[] = [
  {
    number: '01',
    title: 'Speed',
    description: 'Production timelines that outpace traditional agencies by 3-5x.',
    icon: Zap,
    bgColor: 'bg-[#ec268f]', // Hot Pink from Screenshot 2026-06-14 at 4.42.04 AM.png
    tabColor: 'bg-[#984cee]', // Purple tab from Screenshot 2026-06-14 at 4.42.04 AM.png
  },
  {
    number: '02',
    title: 'Psychology-First',
    description: 'Every script is rooted in conversion psychology, not creative ego.',
    icon: Brain,
    bgColor: 'bg-[#00b0ff]', // Electric Cyan
    tabColor: 'bg-[#0070f3]', // Deep Blue
  },
  {
    number: '03',
    title: 'Full-Funnel Thinking',
    description: 'We engineer assets that move real, measurable business metrics.',
    icon: Target,
    bgColor: 'bg-[#0fbf6a]', // Raxel Green
    tabColor: 'bg-[#067a42]', // Dark Green
  },
  {
    number: '04',
    title: 'Transparent Reporting',
    description: "You'll always know exactly what's working, what's scaling, and why.",
    icon: BarChart3,
    bgColor: 'bg-[#f5a623]', // Amber Orange
    tabColor: 'bg-[#d07c00]', // Dark Orange
  },
];

export function WhyRaxel() {
  return (
    <section className="relative w-full bg-[#030303] border-b border-white/[0.05] min-h-screen overflow-visible px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
      <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
        
        {/* Left Column: Perfect Vertical Centering Lockup */}
        <div className="w-full lg:w-[38%] flex flex-col justify-center">
          <div className="w-full lg:sticky lg:top-[50%] lg:-translate-y-1/2 space-y-4 py-8">
            <div className="text-xs uppercase tracking-[0.3em] text-[#0fbf6a] font-bold font-mono">
              WHY RAXEL
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold font-space-grotesk text-white tracking-tight leading-[1.12] max-w-sm">
              Why Brands Choose Raxel Media
            </h2>
            <p className="text-sm sm:text-base font-sans text-muted/40 max-w-xs leading-relaxed font-normal">
              Scroll down to watch our framework take action, stacking up value right on your screen.
            </p>
          </div>
        </div>

        {/* Right Column: ScrollStack Handler Wrapper */}
        <div className="w-full lg:w-[62%] relative">
          <ScrollStack 
            useWindowScroll={true} 
            itemDistance={64}          // Separation spacer distance before scroll trigger lock
            itemStackDistance={20}     // Overrides the card gap separation to exactly 20px
            stackPosition="50%"        // Intersects perfectly with the center line of the screen
            baseScale={0.94}
          >
            {FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <ScrollStackItem
                  key={feature.number}
                  bgColor={feature.bgColor}
                  tabColor={feature.tabColor}
                >
                  {/* Left Half Inside Card Content */}
                  <div className="space-y-3 text-white max-w-xs sm:max-w-sm">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-white/70">
                      // PHASE 0{feature.number}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-space-grotesk tracking-tight leading-none">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-white/90 font-normal leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Right Half Inside Card Media Box Component */}
                  <div className="w-full sm:w-[200px] aspect-[4/3] rounded-[1.75rem] border-[3px] border-white flex items-center justify-center text-white shrink-0 bg-white/5 backdrop-blur-sm self-end sm:self-center">
                    <Icon className="w-12 h-12 text-white" strokeWidth={1.25} />
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>

      </div>
    </section>
  );
}