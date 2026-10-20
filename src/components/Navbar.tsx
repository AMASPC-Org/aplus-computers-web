'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Phone, Clock, MapPin } from 'lucide-react';
import { BUSINESS } from '@/data/business';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-slate-50/95 backdrop-blur-md shadow-xs border-b border-slate-200/70'
          : 'bg-slate-50 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between relative">
        {/* Left Side: Subtle desktop phone link (no green button) */}
        <div className="w-1/4 hidden md:flex items-center">
          <a
            href={BUSINESS.phoneTel}
            className="group flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-green-700 transition-colors"
            title="Click to call A+ Computers Olympia"
          >
            <div className="w-7 h-7 rounded-full bg-slate-200/80 group-hover:bg-green-100 flex items-center justify-center transition-colors">
              <Phone className="w-3.5 h-3.5 text-slate-700 group-hover:text-green-700" />
            </div>
            <span>{BUSINESS.phoneDisplay}</span>
          </a>
        </div>

        {/* Center: Official Logo from mockup */}
        <div className="flex-1 md:w-2/4 flex justify-center items-center">
          <a
            href="#"
            className="flex items-center justify-center py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded"
            aria-label="A+ Computers Olympia Home"
          >
            <Image
              src="/assets/aistudio/A__Computers_Logo_1200x198_png_01b4d9e2.png"
              alt="A+ Computers Olympia"
              width={260}
              height={43}
              priority
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </a>
        </div>

        {/* Right Side: Hamburger Button */}
        <div className="w-1/4 flex justify-end items-center">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 sm:p-2.5 rounded-lg text-slate-800 hover:bg-slate-200/80 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Slide-down / Dropdown Navigation Menu */}
      {isMenuOpen && (
        <div
          className="absolute right-0 top-full w-full md:w-80 bg-white border-b md:border md:rounded-2xl border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 z-50"
        >
          <div className="p-4 sm:p-5 flex flex-col space-y-3">
            <div className="border-b border-slate-100 pb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Quick Navigation
              </p>
              <nav className="flex flex-col space-y-1">
                <a
                  href="#what-we-accept"
                  onClick={closeMenu}
                  className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-green-700 rounded-lg transition"
                >
                  What We Accept
                </a>
                <a
                  href="#sales-services"
                  onClick={closeMenu}
                  className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-green-700 rounded-lg transition"
                >
                  Sales & Services
                </a>
                <a
                  href="#location-hours"
                  onClick={closeMenu}
                  className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-green-700 rounded-lg transition"
                >
                  Location & Hours
                </a>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-green-700 rounded-lg transition"
                >
                  Get in Touch
                </a>
              </nav>
            </div>

            {/* Quick Contact & Details */}
            <div className="pt-1 flex flex-col space-y-2.5 text-xs text-slate-600">
              <a
                href={BUSINESS.phoneTel}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-green-50 text-green-800 font-bold hover:bg-green-100 transition"
              >
                <Phone className="w-4 h-4 text-green-700" />
                <span>Call Us: {BUSINESS.phoneDisplay}</span>
              </a>

              <div className="flex items-start gap-2.5 px-2 py-1">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <span className="text-slate-700">{BUSINESS.fullAddress}</span>
              </div>

              <div className="flex items-start gap-2.5 px-2 py-1">
                <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <span className="text-slate-700">{BUSINESS.hoursDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
