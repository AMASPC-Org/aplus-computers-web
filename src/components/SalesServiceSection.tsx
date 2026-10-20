'use client';

import React from 'react';
import { Wrench, Laptop } from 'lucide-react';
import { BUSINESS } from '@/data/business';

export default function SalesServiceSection() {
  return (
    <section id="sales-services" className="py-12 sm:py-16 px-4 sm:px-6 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 mb-1.5">
            SALES &amp; SERVICE
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Sales &amp; Services
          </h2>
        </div>

        {/* 2-Card Grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {/* Card 1: Computer Repair */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 p-8 flex flex-col items-center text-center">
            <div className="mb-4 text-slate-800 flex items-center justify-center">
              <Wrench className="w-12 h-12 stroke-[1.6]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Computer Repair
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Expert diagnosis, hardware upgrades, and screen repairs
            </p>
          </div>

          {/* Card 2: Refurbished Sales */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 p-8 flex flex-col items-center text-center">
            <div className="mb-4 text-slate-800 flex items-center justify-center">
              <Laptop className="w-12 h-12 stroke-[1.6]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Refurbished Sales
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Quality, affordable, used laptops and desktop systems
            </p>
          </div>
        </div>

        {/* Bottom text matching mockup */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-sm sm:text-base font-semibold text-slate-800">
            {BUSINESS.salesNotice}
          </p>
        </div>
      </div>
    </section>
  );
}
