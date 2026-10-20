'use client';

import React from 'react';
import { ExternalLink, Phone, Navigation } from 'lucide-react';
import { BUSINESS } from '@/data/business';

export default function LocationHoursSection() {
  return (
    <section id="location-hours" className="py-12 sm:py-16 px-4 sm:px-6 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        {/* High-contrast dark charcoal card matching mockup */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0f172a] text-white p-6 sm:p-10 md:p-12 shadow-2xl border border-slate-800">
          {/* Subtle Street Map Grid overlay matching mockup */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.18]"
            aria-hidden="true"
            style={{
              backgroundImage: `
                radial-gradient(circle at 75% 40%, rgba(16, 152, 72, 0.15) 0%, transparent 60%),
                linear-gradient(to right, #334155 1px, transparent 1px),
                linear-gradient(to bottom, #334155 1px, transparent 1px)
              `,
              backgroundSize: '100% 100%, 36px 36px, 36px 36px',
            }}
          />

          {/* Curved road decorative SVG vector lines */}
          <svg
            className="absolute -right-10 -bottom-10 w-96 h-96 pointer-events-none opacity-20 text-slate-700 stroke-current"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <path d="M 0,30 Q 50,20 70,80 T 100,100" strokeWidth="3" />
            <path d="M 20,0 Q 40,50 90,60" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 0,70 Q 30,80 100,50" strokeWidth="2" />
          </svg>

          {/* Content inside dark card */}
          <div className="relative z-10 flex flex-col space-y-5 sm:space-y-6">
            {/* Row 1: LOCATION + Map It ↗ */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 text-base sm:text-xl font-bold">
                <span className="text-[#109848] font-black tracking-wide shrink-0">
                  LOCATION:
                </span>
                <span className="text-white font-bold">
                  {BUSINESS.shortAddress}
                </span>
              </div>

              <a
                href={BUSINESS.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white border border-slate-700 text-xs sm:text-sm font-medium transition active:scale-95 shadow-sm"
              >
                <span>Map It</span>
                <span className="text-xs">↗</span>
              </a>
            </div>

            {/* Row 2: NEW HOURS */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 text-base sm:text-xl font-bold">
              <span className="text-[#109848] font-black tracking-wide shrink-0">
                NEW HOURS:
              </span>
              <span className="text-white font-bold">
                {BUSINESS.hoursDisplay}
              </span>
            </div>

            {/* Centered green pill badge matching mockup */}
            <div className="pt-2 sm:pt-4 flex justify-center">
              <a
                href={BUSINESS.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#109848] hover:bg-[#0e803d] text-white font-bold text-xs sm:text-sm px-6 py-2 rounded-full shadow-md transition active:scale-95 cursor-pointer"
              >
                {BUSINESS.dropOffBadgeLower}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
