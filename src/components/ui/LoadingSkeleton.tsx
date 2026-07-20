import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 animate-pulse relative overflow-hidden">
      {/* Accent bar placeholder */}
      <div className="absolute top-0 left-0 w-full h-1 bg-muted" />

      {/* Header: logo + title + bookmark */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-2xl bg-muted flex-shrink-0" />
          <div className="space-y-2.5 min-w-0">
            <div className="h-4 w-40 bg-muted rounded-lg" />
            <div className="h-3.5 w-24 bg-muted rounded-lg" />
          </div>
        </div>
        <div className="w-9 h-9 rounded-xl bg-muted flex-shrink-0" />
      </div>

      {/* Skills pills */}
      <div className="flex gap-1.5 mb-5">
        <div className="h-5 w-14 bg-muted rounded-lg" />
        <div className="h-5 w-[72px] bg-muted rounded-lg" />
        <div className="h-5 w-12 bg-muted rounded-lg" />
      </div>

      {/* 2x2 info grid with icon containers */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={`info-skel-${i}`} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-muted flex-shrink-0" />
            <div className="h-3 w-20 bg-muted rounded-lg" />
          </div>
        ))}
      </div>

      {/* Footer: timestamp + apply button */}
      <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-muted" />
          <div className="h-2.5 w-16 bg-muted rounded" />
        </div>
        <div className="h-8 w-20 bg-foreground rounded-xl" />
      </div>
    </div>
  );
}

export function FilterSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[1, 2, 3, 4]?.map((i) => (
        <div key={`filter-skel-${i}`}>
          <div className="h-4 w-24 bg-muted rounded mb-3" />
          <div className="space-y-2">
            {[1, 2, 3]?.map((j) => (
              <div key={`filter-skel-item-${i}-${j}`} className="h-8 w-full bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function KPISkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {[1, 2, 3, 4]?.map((i) => (
        <div key={`kpi-skel-${i}`} className="bg-white rounded-xl border border-border p-4">
          <div className="h-3 w-24 bg-muted rounded mb-3" />
          <div className="h-8 w-16 bg-muted rounded mb-2" />
          <div className="h-3 w-20 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}
