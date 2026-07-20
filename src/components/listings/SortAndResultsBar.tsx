'use client';

import React from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export type SortOption = 'newest' | 'deadline';

interface SortAndResultsBarProps {
  totalResults: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onMobileFilterOpen?: () => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'deadline', label: 'Closing Soon' },
];

export default function SortAndResultsBar({
  totalResults,
  sortBy,
  onSortChange,
  onMobileFilterOpen,
}: SortAndResultsBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-white/80 backdrop-blur-md px-4 sm:px-5 py-3.5 rounded-2xl border border-border/40 shadow-sm sticky top-[64px] sm:top-[80px] z-20">
      <div className="flex items-center gap-3">
        {onMobileFilterOpen && (
          <button
            onClick={onMobileFilterOpen}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border/50 bg-white text-[11px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
          >
            <SlidersHorizontal size={14} className="text-primary" />
            Filters
          </button>
        )}
        <span className="text-sm font-medium text-muted-foreground">
          <span className="text-foreground font-semibold">{totalResults}</span>
          {' '}result{totalResults !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:block">
            Sort by
          </span>
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none bg-muted/30 border border-border/40 rounded-xl pl-3.5 pr-9 py-2 text-sm font-medium text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 cursor-pointer transition-all hover:bg-muted/50"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 pointer-events-none group-hover:text-primary transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
