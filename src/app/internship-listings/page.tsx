import React from 'react';
import Image from 'next/image';
import Topbar from '@/components/Topbar';
import ListingsPageClient from './components/ListingsPageClient';

export default function InternshipListingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      {/* Hero section - Matching the provided image */}
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 pt-10 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
          <div className="max-w-4xl relative">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#1A1D23] tracking-tight mb-6 sm:mb-8 leading-[1.05]">
              Explore <span className="text-[#3B82F6]">Premium</span>
              <br className="hidden sm:block" />
              Opportunities.
            </h1>

            {/* Subheading */}
            <p className="text-[#6B7280] text-base sm:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
              Skip the noise. We've curated high-growth internships with verified application links,
              <br className="hidden md:block" />
              clear deadlines, and daily updates.
            </p>
          </div>
        </div>
      </div>
      {/* Main content area */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-8 xl:py-12">
        <ListingsPageClient />
      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
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
            Verified application links. All listings are curated for quality.
          </p>
        </div>
      </footer>
    </div>
  );
}
