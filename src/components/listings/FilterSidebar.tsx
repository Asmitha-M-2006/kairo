'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X, Loader2, MapPin, Briefcase, Clock, Calendar, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { DURATIONS } from '@/lib/internshipData';
import type { InternshipCategory, InternshipType } from '@/lib/internshipData';

export type PostedFilter = 'all' | '24h' | '7d' | '30d';

export interface FilterState {
  keyword: string;
  location: string;
  stipendMin: number | null;
  stipendMax: number | null;
  skills: string[];
  category: InternshipCategory | 'all';
  type: InternshipType | 'all';
  duration: string;
  posted: PostedFilter;
  titleCategory: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
  availableLocations: string[];
  availableSkills: string[];
}

const LOCATION_OPTIONS = [
  'All',
  'Remote',
  'Bangalore',
  'Hyderabad',
  'Delhi',
  'Mumbai',
  'Pune',
] as const;

const POSTED_OPTIONS: { label: string; value: PostedFilter }[] = [
  { label: 'ALL TIME', value: 'all' },
  { label: 'LAST 24H', value: '24h' },
  { label: 'LAST 7 DAYS', value: '7d' },
  { label: 'LAST 30 DAYS', value: '30d' },
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  availableLocations: _availableLocations,
  availableSkills: _availableSkills,
}: FilterSidebarProps) {
  const toggleLocation = (loc: string) => {
    const nextLocation = loc === 'All' ? 'All Locations' : loc;

    if (filters.location === nextLocation) {
      onFilterChange({ ...filters, location: 'All Locations' });
    } else {
      onFilterChange({ ...filters, location: nextLocation });
    }
  };

  const activeFilterCount = [
    filters.keyword !== '',
    filters.location !== 'All Locations',
    filters.duration !== 'all',
    filters.posted !== 'all',
    filters.titleCategory !== '',
  ].filter(Boolean).length;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const handleSearchChange = useCallback(
    (value: string) => {
      onFilterChange({ ...filters, keyword: value });

      if (value) {
        setIsSearching(true);
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => setIsSearching(false), 300);
      } else {
        setIsSearching(false);
      }
    },
    [filters, onFilterChange]
  );

  return (
    <div className="w-full mt-2 box-border">
      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="md:hidden w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl border border-border/60 bg-white shadow-sm text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted/50 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
        aria-expanded={isExpanded}
        aria-controls="filter-panel"
      >
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal size={16} className="text-newton-blue-500" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-newton-blue-500 px-2 py-0.5 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Desktop: always visible. Mobile: collapsible. */}
      <div
        id="filter-panel"
        role="region"
        aria-label="Filter internships"
        className={`relative w-full box-border rounded-2xl border border-border/60 bg-white shadow-sm md:block md:p-8 ${
          isExpanded ? 'block p-6 mt-3' : 'hidden'
        }`}
      >
        <div className="absolute right-6 top-6 flex items-center gap-2 md:flex">
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-newton-blue-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
              {activeFilterCount} active
            </span>
          )}
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            Updated Daily
          </span>
        </div>

        <div className="flex flex-col space-y-6 pt-8 sm:pt-0">
          <div className="flex w-full items-center gap-3 rounded-xl border border-border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 px-4 py-3">
            <div className="text-muted-foreground flex-shrink-0">
              {isSearching ? (
                <Loader2 size={16} className="animate-spin text-newton-blue-500" />
              ) : (
                <Search size={16} />
              )}
            </div>
            <input
              type="text"
              aria-label="Search internships"
              placeholder="Search by role, company, or skill..."
              value={filters.keyword}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-full min-h-[2rem] w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            {filters.keyword && (
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, keyword: '' })}
                aria-label="Clear search"
                className="shrink-0 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
              >
                <X size={14} />
              </button>
            )}
            {(filters.keyword ||
              filters.location !== 'All Locations' ||
              filters.duration !== 'all' ||
              filters.posted !== 'all' ||
              filters.titleCategory !== '') && (
              <button
                onClick={() =>
                  onFilterChange({
                    keyword: '',
                    location: 'All Locations',
                    stipendMin: null,
                    stipendMax: null,
                    skills: [],
                    category: 'all',
                    type: 'all',
                    duration: 'all',
                    posted: 'all',
                    titleCategory: '',
                  })
                }
                className="shrink-0 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:text-newton-blue-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Location Filter */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
            <div className="flex w-32 min-w-[120px] items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              <MapPin size={16} className="text-newton-blue-500" />
              <span>Location</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {LOCATION_OPTIONS.map((loc) => {
                const isSelected =
                  loc === 'All' ? filters.location === 'All Locations' : filters.location === loc;

                return (
                  <button
                    key={loc}
                    onClick={() => toggleLocation(loc)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none ${
                      isSelected
                        ? 'border-transparent bg-blue-600 text-white shadow-sm'
                        : 'border-border bg-white text-foreground hover:bg-muted'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Category Filter */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
            <div className="flex w-32 min-w-[120px] items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              <Briefcase size={16} className="text-newton-orange-500" />
              <span>Job Titles</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onFilterChange({ ...filters, titleCategory: '' })}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none ${
                  filters.titleCategory === ''
                    ? 'border-transparent bg-blue-600 text-white shadow-sm'
                    : 'border-border bg-white text-foreground hover:bg-muted'
                }`}
              >
                ALL
              </button>
              {[
                'Development',
                'AI',
                'Backend',
                'Frontend',
                'Web',
                'Full Stack',
                'Software',
                'MERN',
              ].map((title) => (
                <button
                  key={title}
                  onClick={() => onFilterChange({ ...filters, titleCategory: title })}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none ${
                    filters.titleCategory === title
                      ? 'border-transparent bg-blue-600 text-white shadow-sm'
                      : 'border-border bg-white text-foreground hover:bg-muted'
                  }`}
                >
                  {title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
            <div className="flex w-32 min-w-[120px] items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              <Clock size={16} className="text-newton-yellow-500" />
              <span>Duration</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {DURATIONS.map((d) => {
                const isSelected = filters.duration === d.value;
                return (
                  <button
                    key={d.value}
                    onClick={() => onFilterChange({ ...filters, duration: d.value })}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none ${
                      isSelected
                        ? 'border-transparent bg-blue-600 text-white shadow-sm'
                        : 'border-border bg-white text-foreground hover:bg-muted'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Posted Filter */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
            <div className="flex w-32 min-w-[120px] items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              <Calendar size={16} className="text-newton-blue-500" />
              <span>Posted</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {POSTED_OPTIONS.map((opt) => {
                const isSelected = filters.posted === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => onFilterChange({ ...filters, posted: opt.value })}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none ${
                      isSelected
                        ? 'border-transparent bg-blue-600 text-white shadow-sm'
                        : 'border-border bg-white text-foreground hover:bg-muted'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
