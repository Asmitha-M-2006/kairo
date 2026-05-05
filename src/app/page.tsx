import React from 'react';
import Image from 'next/image';
import Topbar from '@/components/Topbar';
import ListingsPageClient from '@/components/listings/ListingsPageClient';

export default function RootPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Newton School Top Banner */}
      {/* <div className="bg-[#FF6B00] text-white py-2 px-4 flex items-center justify-center gap-4 text-sm font-bold">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">!</span>
          <span>Newton School students — your primary internship portal is live. Explore now!</span>
        </div>
        <button className="bg-white text-[#FF6B00] px-4 py-1 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-orange-50 transition-colors">
          View All Listings
        </button>
      </div> */}

      <Topbar />
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Hero section - Matching the provided image */}
        <div className="max-w-3xl relative">
          {/* Main Heading */}
          <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-black text-[#1A1D23] tracking-[-0.02em] leading-[1.1]">
            Land Your <span className="text-newton-blue-500">Dream Role</span>
            <br className="hidden sm:block" />
            With Trusted Listings.
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-[1rem] sm:text-[1.125rem] text-[#6B7280] font-medium max-w-2xl leading-[1.6]">
            We bridge the gap between talent and top companies. Discover curated, high-impact
            internships with verified application links and daily updates.
          </p>
        </div>

        <ListingsPageClient />
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/logo.png"
              alt="Kairo logo"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 leading-none mb-1">Kairo</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-medium max-w-xs text-center sm:text-right leading-relaxed">
            Verified application links. Listings refreshed daily.
          </p>
        </div>
      </footer>
    </div>
  );
}
