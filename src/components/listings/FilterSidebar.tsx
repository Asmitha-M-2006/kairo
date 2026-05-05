'use client';

import React from 'react';
import { Search, MapPin, Briefcase, Clock, Calendar } from 'lucide-react';
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

  return (
    <div className="w-full mt-10 box-border">
      <div className="relative w-full box-border rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm md:p-8">
        <span className="absolute right-6 top-6 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
          Updated Daily
        </span>

        <div className="flex flex-col space-y-6 pt-8 sm:pt-0">
          <div className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
            <div className="text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by role, company or keywords..."
              value={filters.keyword}
              onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
              className="h-12 w-full bg-transparent text-base text-gray-800 placeholder:text-[#9CA3AF] focus:outline-none"
            />
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
                className="shrink-0 px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-newton-blue-500"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Location Filter */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
            <div className="flex w-32 min-w-[120px] items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-500">
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
                    className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                      isSelected
                        ? 'border-transparent bg-blue-600 text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
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
            <div className="flex w-32 min-w-[120px] items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-500">
              <Briefcase size={16} className="text-newton-orange-500" />
              <span>Job Titles</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onFilterChange({ ...filters, titleCategory: '' })}
                className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                  filters.titleCategory === ''
                    ? 'border-transparent bg-blue-600 text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
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
                  className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                    filters.titleCategory === title
                      ? 'border-transparent bg-blue-600 text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
            <div className="flex w-32 min-w-[120px] items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-500">
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
                    className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                      isSelected
                        ? 'border-transparent bg-blue-600 text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
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
            <div className="flex w-32 min-w-[120px] items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-500">
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
                    className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                      isSelected
                        ? 'border-transparent bg-blue-600 text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
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
