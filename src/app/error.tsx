'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 text-slate-900 font-sans">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
        Something went wrong
      </h1>
      <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm sm:text-base">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-sm shadow hover:bg-slate-700 transition"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl bg-[#109848] text-white font-bold text-sm shadow hover:bg-[#0e803d] transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
