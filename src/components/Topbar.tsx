'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'SELF APPLY', href: '#', isHighlight: true },
  { label: 'QUESTIONS', href: '#' },
  { label: 'FLASHCARDS', href: '#' },
  { label: 'ASSIGNMENTS', href: '#' },
  { label: 'EXPERIENCES', href: '#' },
  { label: 'RESOURCES', href: '#' },
];

export default function Topbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="min-h-[72px] sm:min-h-[80px] lg:min-h-[88px] flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <Image
              src="/assets/images/logo.png"
              alt="Kairo logo"
              width={64}
              height={64}
              priority
              className="h-12 w-12 sm:h-[52px] sm:w-[52px] lg:h-16 lg:w-16 object-contain flex-shrink-0 self-center"
            />
            <div className="min-w-0 flex flex-col justify-center leading-none">
              <span className="text-[20px] sm:text-[22px] lg:text-[25px] font-extrabold tracking-[-0.02em] text-[#000000] whitespace-nowrap antialiased">
                KAIRO
              </span>
              <span className="mt-1 text-[8px] sm:text-[9px] lg:text-[10px] font-medium tracking-[0.1em] text-gray-500 opacity-70 whitespace-nowrap">
                POWERED BY NST SVYASA
              </span>
            </div>
          </Link>

          <nav className="hidden min-[1226px]:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[11px] font-black tracking-[0.14em] transition-all duration-200 hover:text-newton-blue-500 ${
                  link.isHighlight
                    ? 'px-5 py-2.5 rounded-full bg-newton-blue-50 text-newton-blue-500 hover:bg-newton-blue-100'
                    : 'text-gray-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden min-[1226px]:flex items-center gap-4">
            <button className="px-4 sm:px-8 py-2.5 sm:py-3 rounded-full bg-newton-blue-500 text-white text-[10px] sm:text-[11px] font-black tracking-[0.15em] hover:bg-newton-blue-600 transition-all shadow-[0_8px_20px_-6px_rgba(0,102,255,0.4)] active:scale-95">
              SIGN IN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="min-[1226px]:hidden inline-flex items-center justify-center rounded-full p-2.5 text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="min-[1226px]:hidden pb-4">
            <nav className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="flex flex-col p-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-[11px] font-black tracking-[0.14em] transition-all duration-200 ${
                      link.isHighlight
                        ? 'bg-newton-blue-50 text-newton-blue-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <button
                  type="button"
                  className="mt-3 px-4 py-3 rounded-xl bg-newton-blue-500 text-white text-[11px] font-black tracking-[0.15em] hover:bg-newton-blue-600 transition-all"
                >
                  SIGN IN
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
