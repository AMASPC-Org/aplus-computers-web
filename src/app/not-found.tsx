import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS } from '@/data/business';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 text-slate-900 font-sans">
      <div className="mb-6">
        <Image
          src="/assets/aistudio/A__Computers_Logo_1200x198_png_01b4d9e2.png"
          alt="A+ Computers Olympia"
          width={240}
          height={40}
          className="h-10 w-auto object-contain mx-auto"
        />
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
        Page Not Found
      </h1>
      <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm sm:text-base">
        The page you are looking for does not exist or may have moved. Please return to the homepage for Olympia e-waste recycling and repair services.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#109848] hover:bg-[#0e803d] text-white font-bold text-sm shadow-md transition"
      >
        Return to Home
      </Link>
    </div>
  );
}
