import React from 'react';
import Link from 'next/link';
import { BUSINESS } from '@/data/business';

export default function QrDownloadPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-green-700 hover:text-green-800 mb-6">
          &larr; Back to {BUSINESS.name}
        </Link>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Official Print-Ready QR Codes
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mb-8">
            Target URL: <strong className="text-slate-900">https://apluscomputerrecycle.com</strong> &bull; Error Correction: <strong className="text-slate-900">Level H (30% Print Damage Resistance)</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Black Print QR */}
            <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center bg-slate-50/50">
              <img
                src="/qr/APlus-QR-Print-Black-Vector.svg"
                alt="A+ Computers Olympia Black Print QR Code"
                className="w-56 h-56 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs mb-4"
              />
              <h2 className="text-lg font-bold text-slate-900 mb-1">Classic High-Contrast Black</h2>
              <p className="text-xs text-slate-500 mb-5">Recommended for postcards, flyers, and maximum camera scan speed</p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <a
                  href="/qr/APlus-QR-Print-Black-Vector.svg"
                  download="APlus-QR-Print-Black-Vector.svg"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition"
                >
                  Download SVG (Vector)
                </a>
                <a
                  href="/qr/APlus-QR-Print-Black-2400px-300DPI.png"
                  download="APlus-QR-Print-Black-2400px-300DPI.png"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-xs sm:text-sm transition"
                >
                  Download 300-DPI PNG
                </a>
              </div>
            </div>

            {/* Eco-Green Print QR */}
            <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center bg-slate-50/50">
              <img
                src="/qr/APlus-QR-Print-EcoGreen-Vector.svg"
                alt="A+ Computers Olympia Eco-Green Print QR Code"
                className="w-56 h-56 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs mb-4"
              />
              <h2 className="text-lg font-bold text-slate-900 mb-1">A+ Eco-Green (#109848)</h2>
              <p className="text-xs text-slate-500 mb-5">Matches your website CTA buttons on white postcard backgrounds</p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <a
                  href="/qr/APlus-QR-Print-EcoGreen-Vector.svg"
                  download="APlus-QR-Print-EcoGreen-Vector.svg"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#109848] hover:bg-[#0e803d] text-white font-bold text-xs sm:text-sm transition"
                >
                  Download SVG (Vector)
                </a>
                <a
                  href="/qr/APlus-QR-Print-EcoGreen-2400px-300DPI.png"
                  download="APlus-QR-Print-EcoGreen-2400px-300DPI.png"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-xs sm:text-sm transition"
                >
                  Download 300-DPI PNG
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
