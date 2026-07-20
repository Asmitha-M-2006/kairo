import React from 'react';
import Image from 'next/image';
import PageContainer from '@/components/ui/PageContainer';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border/60 mt-12 md:mt-16">
      <PageContainer className="py-8 md:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/logo.png"
              alt="Kairo logo"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm font-bold text-foreground leading-none">Kairo</span>
          </div>

          {/* Tagline */}
          <p className="text-xs text-muted-foreground font-medium text-center sm:text-right leading-relaxed">
            Verified application links. Listings refreshed daily.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border/40 flex items-center justify-center">
          <p className="text-[11px] text-muted-foreground/60 font-medium">
            © {new Date().getFullYear()} Kairo. All rights reserved.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
