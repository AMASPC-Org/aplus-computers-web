import React from 'react';
import Link from 'next/link';
import { PRIVACY_POLICY } from '@/data/legal';
import { BUSINESS } from '@/data/business';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-green-700 hover:text-green-800 mb-6">
          &larr; Back to {BUSINESS.name}
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{PRIVACY_POLICY.title}</h1>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-8">
          Effective Date: {PRIVACY_POLICY.effectiveDate}
        </p>
        <div className="space-y-6">
          {PRIVACY_POLICY.sections.map((s, i) => (
            <section key={i} className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">{s.heading}</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
