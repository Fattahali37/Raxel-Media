'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How fast can you deliver creative?',
    answer: 'Most projects are delivered within 5-10 business days, with rush options available.',
  },
  {
    id: 'faq-2',
    question: 'Do you work with our existing brand guidelines?',
    answer: 'Yes — we adapt our creative system to fit your brand voice while maximizing performance.',
  },
  {
    id: 'faq-3',
    question: 'What platforms do you create for?',
    answer: 'Meta, TikTok, YouTube Shorts, and more.',
  },
  {
    id: 'faq-4',
    question: 'Do you offer ongoing creative retainers?',
    answer: 'Yes — most clients work with us on a monthly retainer for continuous testing and iteration.',
  },
  {
    id: 'faq-5',
    question: 'What if the creative doesn\'t perform?',
    answer: 'We iterate. Our process is built on testing — if something underperforms, we pivot fast.',
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#030303]">
      <div className="max-w-3xl mx-auto">
        
        {/* Simple Semantic Header block */}
        <div className="mb-12 text-center space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-white tracking-tight">
            Questions, Answered
          </h2>
        </div>

        {/* Clean Accordion List Array */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="py-5 block">
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between text-left group py-2"
                >
                  <span className={`text-base sm:text-lg font-semibold tracking-tight font-space-grotesk transition-colors duration-200 ${
                    isOpen ? 'text-primary' : 'text-white group-hover:text-primary'
                  }`}>
                    {item.question}
                  </span>
                  
                  {/* Plus Icon turning into a Cross */}
                  <Plus 
                    className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`} 
                    strokeWidth={2}
                  />
                </button>

                {/* Smooth Max Height Content Reveal Box */}
                <div
                  className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl font-sans">
                      {item.answer}
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