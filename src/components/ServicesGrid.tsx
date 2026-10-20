'use client';

import React from 'react';
import { Laptop, Smartphone, Monitor, Printer } from 'lucide-react';
import { BUSINESS } from '@/data/business';

export default function ServicesGrid() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800 stroke-[1.6]" />;
      case 'Smartphone':
        return <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800 stroke-[1.6]" />;
      case 'Monitor':
        return <Monitor className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800 stroke-[1.6]" />;
      case 'Printer':
        return <Printer className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800 stroke-[1.6]" />;
      default:
        return <Laptop className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800 stroke-[1.6]" />;
    }
  };

  return (
    <section id="what-we-accept" className="py-12 sm:py-16 px-4 sm:px-6 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 mb-1.5">
            SERVICES GRID
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What We Accept
          </h2>
        </div>

        {/* 4-Card Minimalist Icon Grid matching mockup */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {BUSINESS.acceptedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[170px] sm:min-h-[200px]"
            >
              <div className="mb-4 sm:mb-5 text-slate-800 flex items-center justify-center">
                {getIcon(item.iconName)}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
