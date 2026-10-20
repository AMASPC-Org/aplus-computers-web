'use client';

import React from 'react';
import { BUSINESS } from '@/data/business';

export default function Hero() {
  const scrollToLocationHours = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('location-hours');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-8 pb-14 sm:pt-12 sm:pb-20 px-4 sm:px-6 text-center bg-slate-50">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Centered H1: High-contrast dark text */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Free Local E-Recycling in Olympia
        </h1>

        {/* Postcard Subheadline: High-contrast bold dark text */}
        <p className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mb-6">
          Received our postcard? Drop off your e-waste &amp; electronics with us today!
        </p>

        {/* Two Bullet Points: High-contrast dark text */}
        <ul className="flex flex-col items-center justify-center space-y-2 mb-8 text-base sm:text-lg font-bold text-slate-900 list-none p-0 m-0">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-900 inline-block shrink-0" />
            <span className="text-slate-900 underline decoration-slate-400 decoration-2 underline-offset-4">
              Washington State E-Cycle Partner
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-900 inline-block shrink-0" />
            <span className="text-slate-900">
              100% Data Destruction Guaranteed
            </span>
          </li>
        </ul>

        {/* Single Centered Eco-Green CTA Button (bg-green-600 text-white) */}
        <div className="flex flex-col items-center justify-center w-full">
          <a
            href="#location-hours"
            onClick={scrollToLocationHours}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:px-10 sm:py-4 rounded-xl bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
          >
            <span>Get Directions &amp; Hours</span>
            <span className="text-xl font-bold leading-none">↓</span>
          </a>

          {/* Micro-copy right below CTA: High-contrast dark text */}
          <p className="mt-3.5 text-sm sm:text-base font-bold text-slate-900 tracking-wide">
            Easy Drop-Off • Pull Up &amp; Unload
          </p>
        </div>
      </div>
    </section>
  );
}
