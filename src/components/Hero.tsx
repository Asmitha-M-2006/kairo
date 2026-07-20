import React from 'react';

interface HeroProps {
  title: string;
  highlight?: string;
  subtitle: string;
}

export default function Hero({ title, highlight, subtitle }: HeroProps) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div className="max-w-4xl relative mb-6 md:mb-10">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground tracking-tight leading-[1.1]">
        {parts[0]}
        {highlight && <span className="text-newton-blue-500">{highlight}</span>}
        {parts[1] || ''}
      </h1>

      <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium max-w-3xl leading-[1.65]">
        {subtitle}
      </p>
    </div>
  );
}
