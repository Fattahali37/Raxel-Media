'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

// Register GSAP plugin
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

/**
 * FAQ Item Component
 */
interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItemComponent({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between group hover:text-primary transition-colors duration-300"
      >
        {/* Question */}
        <h3 className="text-lg font-semibold font-space-grotesk text-foreground text-left">
          {item.question}
        </h3>

        {/* Plus/Minus Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0 ml-4"
        >
          <Plus className="w-6 h-6 text-primary" strokeWidth={2} />
        </motion.div>
      </button>

      {/* Answer - Expandable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base text-muted leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * FAQ Section Component
 */
export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  // GSAP header animation
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
          background: `radial-gradient(circle at 80% 80%, rgba(15, 191, 106, 0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16 lg:mb-20 text-center">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            FAQ
          </div>

          <div ref={headlineRef}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground">
              Questions, Answered
            </h2>
          </div>
        </div>

        {/* FAQ List */}
        <div className="bg-surface/30 border border-border rounded-2xl p-8 lg:p-12">
          <div className="divide-y divide-border">
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
