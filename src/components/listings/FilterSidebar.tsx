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

const LOCATION_OPTIONS = ['All', 'Remote', 'Bangalore', 'Hyderabad', 'Delhi', 'Mumbai', 'Pune'] as const;

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
    <div className="w-full max-w-[1100px] mx-auto box-border">
      <div className="flex justify-end mb-4">
        <span className="inline-flex items-center rounded-xl border border-black/[0.06] bg-[#FAF8F5] px-[14px] py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#5A544F] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          Updated Daily
        </span>
      </div>

      <div className="relative w-full box-border rounded-[24px] border border-black/[0.03] bg-white p-5 sm:p-6 lg:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="mb-[18px] flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <div className="relative flex-1">
            <div className="absolute left-[18px] top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by role, company or keywords..."
              value={filters.keyword}
              onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
              className="h-12 w-full rounded-2xl border border-[#E2DFD8] bg-white pl-[52px] pr-4 text-base text-gray-800 placeholder:text-[#9CA3AF] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all focus:border-newton-blue-500 focus:outline-none focus:ring-4 focus:ring-newton-blue-500/10 sm:pr-5"
            />
          </div>
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
                className="w-full px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-newton-blue-500 sm:ml-6 sm:w-auto sm:px-8 sm:py-6 sm:text-sm"
              >
                Reset Filters
              </button>
            )}
        </div>

        <div className="space-y-3 p-4 sm:p-0">
          {/* Location Filter */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex w-auto shrink-0 items-center gap-2 leading-[1.2] sm:w-[140px]">
              <MapPin size={16} className="text-newton-blue-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.09em] leading-[1.2] text-gray-500">
                Location
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {LOCATION_OPTIONS.map((loc) => {
                const isSelected =
                  loc === 'All' ? filters.location === 'All Locations' : filters.location === loc;

                return (
                  <button
                  key={loc}
                  onClick={() => toggleLocation(loc)}
                  className={`rounded-full border px-[14px] py-1.5 text-[10px] font-black tracking-wider transition-all sm:text-[11px] ${
                      isSelected
                        ? 'border-newton-blue-500 bg-newton-blue-500 text-white shadow-lg shadow-newton-blue-200'
                        : 'border-black/15 bg-transparent text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Category Filter */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex w-auto shrink-0 items-center gap-2 leading-[1.2] sm:w-[140px]">
              <Briefcase size={16} className="text-newton-orange-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.09em] leading-[1.2] text-gray-500">
                Job Titles
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onFilterChange({ ...filters, titleCategory: '' })}
                className={`rounded-full border px-[14px] py-1.5 text-[10px] font-black tracking-wider transition-all sm:text-[11px] ${
                  filters.titleCategory === ''
                    ? 'border-newton-blue-500 bg-newton-blue-500 text-white shadow-lg shadow-newton-blue-200'
                    : 'border-black/15 bg-transparent text-gray-700 hover:border-gray-300'
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
                  className={`rounded-full border px-[14px] py-1.5 text-[10px] font-black tracking-wider transition-all sm:text-[11px] ${
                    filters.titleCategory === title
                      ? 'border-newton-blue-500 bg-newton-blue-500 text-white shadow-lg shadow-newton-blue-200'
                      : 'border-black/15 bg-transparent text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex w-auto shrink-0 items-center gap-2 leading-[1.2] sm:w-[140px]">
              <Clock size={16} className="text-newton-yellow-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.09em] leading-[1.2] text-gray-500">
                Duration
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {DURATIONS.map((d) => {
                const isSelected = filters.duration === d.value;
                return (
                  <button
                  key={d.value}
                  onClick={() => onFilterChange({ ...filters, duration: d.value })}
                    className={`rounded-full border px-[14px] py-1.5 text-[10px] font-black tracking-wider transition-all sm:text-[11px] ${
                      isSelected
                        ? 'border-newton-blue-500 bg-newton-blue-500 text-white shadow-lg shadow-newton-blue-200'
                        : 'border-black/15 bg-transparent text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Posted Filter */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex w-auto shrink-0 items-center gap-2 leading-[1.2] sm:w-[140px]">
              <Calendar size={16} className="text-newton-blue-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.09em] leading-[1.2] text-gray-500">
                Posted
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {POSTED_OPTIONS.map((opt) => {
                const isSelected = filters.posted === opt.value;
                return (
                  <button
                  key={opt.value}
                  onClick={() => onFilterChange({ ...filters, posted: opt.value })}
                    className={`rounded-full border px-[14px] py-1.5 text-[10px] font-black tracking-wider transition-all sm:text-[11px] ${
                      isSelected
                        ? 'border-newton-blue-500 bg-newton-blue-500 text-white shadow-lg shadow-newton-blue-200'
                        : 'border-black/15 bg-transparent text-gray-700 hover:border-gray-300'
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
