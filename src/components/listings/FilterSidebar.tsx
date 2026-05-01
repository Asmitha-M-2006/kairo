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
    <div className="w-full bg-white rounded-2xl sm:rounded-[40px] border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-4 sm:p-6 lg:p-10 mb-8 sm:mb-12 lg:mb-16">
      <div className="flex items-center justify-center sm:justify-end mb-3 sm:mb-4">
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-newton-orange-50 text-newton-orange-600 text-[10px] font-black tracking-[0.18em] uppercase border border-newton-orange-100">
          Updated Daily
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6 sm:mb-12">
        <div className="relative flex-1">
          <div className="absolute left-4 sm:left-7 top-1/2 -translate-y-1/2 text-gray-300">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by role, company or keywords..."
            value={filters.keyword}
            onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
            className="w-full pl-12 sm:pl-16 pr-4 sm:pr-8 py-4 sm:py-6 bg-white border border-gray-100 rounded-2xl sm:rounded-3xl text-gray-600 placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-newton-blue-500/5 focus:border-newton-blue-500/20 transition-all text-base sm:text-xl shadow-sm"
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
              className="ml-0 sm:ml-6 w-full sm:w-auto px-4 py-3 sm:px-8 sm:py-6 text-xs sm:text-sm font-black text-gray-400 hover:text-newton-blue-500 transition-colors uppercase tracking-widest text-center"
            >
              Reset Filters
            </button>
          )}
      </div>

      <div className="space-y-6">
        {/* Location Filter */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
          <div className="flex items-center gap-2 w-auto sm:w-32 pt-0 sm:pt-2 shrink-0">
            <MapPin size={16} className="text-newton-blue-500" />
            <span className="text-[11px] font-black tracking-[0.15em] text-gray-400 uppercase">
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
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider transition-all border ${isSelected
                    ? 'bg-newton-blue-500 text-white border-newton-blue-500 shadow-lg shadow-newton-blue-200'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                    }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        </div>

        {/* Title Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
          <div className="flex items-center gap-2 w-auto sm:w-32 pt-0 sm:pt-2 shrink-0">
            <Briefcase size={16} className="text-newton-orange-500" />
            <span className="text-[11px] font-black tracking-[0.15em] text-gray-400 uppercase">
              Job Titles
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onFilterChange({ ...filters, titleCategory: '' })}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider transition-all border ${filters.titleCategory === ''
                ? 'bg-newton-blue-500 text-white border-newton-blue-500 shadow-lg shadow-newton-blue-200'
                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
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
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider transition-all border ${filters.titleCategory === title
                  ? 'bg-newton-blue-500 text-white border-newton-blue-500 shadow-lg shadow-newton-blue-200'
                  : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                  }`}
              >
                {title.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
          <div className="flex items-center gap-2 w-auto sm:w-32 pt-0 sm:pt-2 shrink-0">
            <Clock size={16} className="text-newton-yellow-500" />
            <span className="text-[11px] font-black tracking-[0.15em] text-gray-400 uppercase">
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
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider transition-all border ${isSelected
                    ? 'bg-newton-blue-500 text-white border-newton-blue-500 shadow-lg shadow-newton-blue-200'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                    }`}
                >
                  {d.label.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Posted Filter */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
          <div className="flex items-center gap-2 w-auto sm:w-32 pt-0 sm:pt-2 shrink-0">
            <Calendar size={16} className="text-newton-blue-500" />
            <span className="text-[11px] font-black tracking-[0.15em] text-gray-400 uppercase">
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
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider transition-all border ${isSelected
                    ? 'bg-newton-blue-500 text-white border-newton-blue-500 shadow-lg shadow-newton-blue-200'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
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
  );
}
