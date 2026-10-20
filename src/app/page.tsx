import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import SalesServiceSection from '@/components/SalesServiceSection';
import LocationHoursSection from '@/components/LocationHoursSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-green-100 selection:text-green-900">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* Main Single-Page Sections matching Mockup */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Services Grid: What We Accept */}
        <ServicesGrid />

        {/* 4. Sales & Service */}
        <SalesServiceSection />

        {/* 5. Location & Hours High-Contrast Dark Card */}
        <LocationHoursSection />
      </main>

      {/* 6. Dark Slate Footer & Contact Form */}
      <Footer />
    </div>
  );
}
