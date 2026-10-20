'use client';

import React from 'react';

export default function Hero() {
  const scrollToLocationHours = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('location-hours');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-6 pb-12 sm:pt-12 sm:pb-20 px-4 sm:px-6 text-center bg-slate-50">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Postcard Welcome Pill / Subheadline */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-900 text-xs sm:text-sm font-bold tracking-wide mb-4 shadow-2xs">
          Received our postcard? Drop off your e-waste &amp; electronics with us today!
        </div>

        {/* Main H1 Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mb-6">
          Free Local E-Recycling in Olympia
        </h1>

        {/* Two Trust Bullet Points */}
        <ul className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-6 mb-8 text-sm sm:text-lg font-bold text-slate-800 list-none p-0 m-0">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-600 inline-block shrink-0" />
            <span className="text-slate-900 underline decoration-green-600/50 decoration-2 underline-offset-4">
              Washington State E-Cycle Partner
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-600 inline-block shrink-0" />
            <span className="text-slate-900">
              100% Data Destruction Guaranteed
            </span>
          </li>
        </ul>

        {/* Single Centered Eco-Green CTA Button (Full width on small phones, auto on desktop) */}
        <div className="flex flex-col items-center justify-center w-full sm:w-auto">
          <a
            href="#location-hours"
            onClick={scrollToLocationHours}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-10 sm:py-4 rounded-xl bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
          >
            <span>Get Directions &amp; Hours</span>
            <span className="text-xl font-bold leading-none">&darr;</span>
          </a>

          <p className="mt-3.5 text-sm sm:text-base font-bold text-slate-800 tracking-wide">
            Easy Drop-Off &bull; Pull Up &amp; Unload
          </p>
        </div>
      </div>
    </section>
  );
}
