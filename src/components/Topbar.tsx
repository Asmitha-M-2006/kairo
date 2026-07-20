'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'SELF APPLY', href: '/internship-listings', isHighlight: true },
  { label: 'QUESTIONS', href: '#' },
  { label: 'FLASHCARDS', href: '#' },
  { label: 'ASSIGNMENTS', href: '#' },
  { label: 'EXPERIENCES', href: '#' },
  { label: 'RESOURCES', href: '#' },
];

export default function Topbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="min-h-[72px] sm:min-h-[80px] lg:min-h-[88px] flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex min-w-0 items-center">
            <Image
              src="/assets/images/logo.png"
              alt="Kairo logo"
              width={64}
              height={64}
              priority
              className="h-12 w-12 sm:h-[52px] sm:w-[52px] lg:h-16 lg:w-16 object-contain flex-shrink-0 self-center"
            />
            <div className="min-w-0 flex flex-col justify-center leading-none">
              <span className="text-[20px] sm:text-[22px] lg:text-[25px] font-extrabold tracking-[-0.02em] text-foreground whitespace-nowrap antialiased">
                KAIRO
              </span>
              <span className="mt-1 text-[8px] sm:text-[9px] lg:text-[10px] font-medium tracking-[0.1em] text-muted-foreground opacity-70 whitespace-nowrap">
                POWERED BY NST SVYASA
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[11px] font-black tracking-[0.14em] transition-all duration-200 hover:text-newton-blue-500 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none rounded-lg ${
                  link.isHighlight
                    ? 'px-5 py-2.5 rounded-full bg-newton-blue-50 text-newton-blue-500 hover:bg-newton-blue-100 active:scale-[0.98]'
                    : pathname === link.href
                      ? 'text-newton-blue-500'
                      : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/internship-listings"
              className="px-4 sm:px-8 py-2.5 sm:py-3 rounded-full bg-newton-blue-500 text-white text-[10px] sm:text-[11px] font-black tracking-[0.15em] hover:bg-newton-blue-600 transition-all duration-200 shadow-[0_8px_20px_-6px_rgba(0,102,255,0.4)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
            >
              SIGN IN
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="lg:hidden inline-flex items-center justify-center rounded-full p-2.5 text-muted-foreground hover:bg-muted transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none flex-shrink-0"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
              <div className="flex flex-col p-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-[11px] font-black tracking-[0.14em] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none ${
                      link.isHighlight
                        ? 'bg-newton-blue-50 text-newton-blue-500 active:scale-[0.98]'
                        : pathname === link.href
                          ? 'bg-newton-blue-50 text-newton-blue-500'
                          : 'text-muted-foreground hover:bg-muted active:scale-[0.98]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href="/internship-listings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-3 px-4 py-3 rounded-xl bg-newton-blue-500 text-white text-[11px] font-black tracking-[0.15em] hover:bg-newton-blue-600 transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none text-center"
                >
                  SIGN IN
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
