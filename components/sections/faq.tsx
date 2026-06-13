'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How fast can you deliver creative?',
    answer:
      'Most projects are delivered within 5-10 business days, with rush options available.',
  },
  {
    id: 'faq-2',
    question: 'Do you work with our existing brand guidelines?',
    answer:
      'Yes — we adapt our creative system to fit your brand voice while maximizing performance.',
  },
  {
    id: 'faq-3',
    question: 'What platforms do you create for?',
    answer: 'Meta, TikTok, YouTube Shorts, and more.',
  },
  {
    id: 'faq-4',
    question: 'Do you offer ongoing creative retainers?',
    answer:
      'Yes — most clients work with us on a monthly retainer for continuous testing and iteration.',
  },
  {
    id: 'faq-5',
    question: 'What if the creative doesn\'t perform?',
    answer:
      'We iterate. Our process is built on testing — if something underperforms, we pivot fast.',
  },
];

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItemComponent({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      className={cn(
        "border rounded-2xl mb-4 overflow-hidden transition-all duration-500 backdrop-blur-md shadow-lg",
        isOpen
          ? "bg-surface/40 border-primary/40 shadow-[0_0_50px_rgba(15,191,106,0.04)]"
          : "bg-surface/20 border-white/5 hover:border-primary/20 hover:bg-surface/25"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full px-8 py-6 flex items-center justify-between group text-left transition-colors duration-300"
      >
        <h3 className={cn(
          "text-lg font-bold font-space-grotesk transition-colors duration-300",
          isOpen ? "text-primary" : "text-foreground/90 group-hover:text-primary"
        )}>
          {item.question}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex-shrink-0 ml-4"
        >
          <Plus className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(15,191,106,0.4)]" strokeWidth={2.5} />
        </motion.div>
      </button>

      {/* Fixed: setting initial={false} lets AnimatePresence render the first item open perfectly without border glitching */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            {/* Added a protective divider element block wrapper */}
            <div className="px-8 pb-7">
              <p className="text-sm font-sans text-muted leading-relaxed font-normal max-w-2xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
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
          background: `radial-gradient(circle at 80% 80%, rgba(15, 191, 106, 0.05) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div ref={headlineRef} className="mb-16 lg:mb-24 text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold font-mono">
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground leading-[1.15] tracking-tight">
            Questions, Answered
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <FAQItemComponent
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
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