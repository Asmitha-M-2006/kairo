'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import FilterSidebar from './FilterSidebar';
import SortAndResultsBar from './SortAndResultsBar';
import InternshipList from './InternshipList';
import ErrorBanner from './ErrorBanner';
import type { FilterState } from './FilterSidebar';
import type { SortOption } from './SortAndResultsBar';
import type { Internship } from '@/lib/internshipData';
import {
  buildAvailableLocations,
  buildAvailableSkills,
  fetchInternships,
  isDeadlineExpired,
  parseStipendValue,
  sortByDeadlineAsc,
  sortByPostedDateDesc,
} from '@/lib/internshipListings';

const BOOKMARK_STORAGE_KEY = 'kairo:bookmarked-internships';

function sortInternships(internships: Internship[], sortBy: SortOption): Internship[] {
  return sortBy === 'deadline' ? sortByDeadlineAsc(internships) : sortByPostedDateDesc(internships);
}

function filterInternships(internships: Internship[], filters: FilterState): Internship[] {
  return internships.filter((internship) => {
    if (isDeadlineExpired(internship.deadline)) return false;

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const matchesKeyword =
        internship.title.toLowerCase().includes(keyword) ||
        internship.company.toLowerCase().includes(keyword) ||
        internship.description.toLowerCase().includes(keyword) ||
        internship.skills.some((skill) => skill.toLowerCase().includes(keyword));

      if (!matchesKeyword) return false;
    }

    if (filters.location !== 'All Locations') {
      const locations = internship.locations ?? [internship.location];
      const matchesLocation = locations.some((location) => {
        const normalizedLocation = location.toLowerCase();
        const filterLocation = filters.location.toLowerCase();

        if (filterLocation === 'work from home') {
          return normalizedLocation === 'work from home' || normalizedLocation === 'remote';
        }

        return normalizedLocation === filterLocation;
      });

      if (!matchesLocation) return false;
    }

    if (filters.skills.length > 0) {
      const internshipSkills = internship.skills.map((skill) => skill.toLowerCase());
      const matchesAllSkills = filters.skills.every((skill) =>
        internshipSkills.includes(skill.toLowerCase())
      );

      if (!matchesAllSkills) return false;
    }

    if (filters.duration !== 'all') {
      const duration = internship.duration.toLowerCase();
      let months = 0;

      if (duration.includes('month')) {
        months = Number.parseInt(duration.replace(/[^0-9]/g, ''), 10);
      } else if (duration.includes('week')) {
        const weeks = Number.parseInt(duration.replace(/[^0-9]/g, ''), 10);
        months = Math.round(weeks / 4);
      }

      const filterMonths = Number.parseInt(filters.duration, 10);
      if (filters.duration === '6') {
        if (months < 6) return false;
      } else if (months !== filterMonths) {
        return false;
      }
    }

    if (filters.category !== 'all') {
      if (internship.category.toLowerCase() !== filters.category.toLowerCase()) return false;
    }

    if (filters.type !== 'all') {
      if (internship.type.toLowerCase() !== filters.type.toLowerCase()) return false;
    }

    if (filters.stipendMin !== null) {
      const minStipend = internship.minStipend ?? parseStipendValue(internship.stipend);
      if (minStipend < filters.stipendMin) return false;
    }

    if (filters.titleCategory) {
      if (!internship.title.toLowerCase().includes(filters.titleCategory.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

function readInitialBookmarks(): Set<string> {
  if (typeof window === 'undefined') return new Set<string>();

  try {
    const raw = window.localStorage.getItem(BOOKMARK_STORAGE_KEY);
    if (!raw) return new Set<string>();

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set<string>();

    return new Set(parsed.filter((value): value is string => typeof value === 'string'));
  } catch {
    return new Set<string>();
  }
}

export const DEFAULT_FILTERS: FilterState = {
  keyword: '',
  location: 'All Locations',
  stipendMin: null,
  stipendMax: null,
  skills: [],
  category: 'all',
  type: 'all',
  duration: 'all',
  titleCategory: '',
};

export default function ListingsPageClient() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [allInternships, setAllInternships] = useState<Internship[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setBookmarkedIds(readInitialBookmarks());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(Array.from(bookmarkedIds)));
  }, [bookmarkedIds]);

  const loadInternships = useCallback(async (showToast = false, signal?: AbortSignal) => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await fetchInternships(signal);
      setAllInternships(data);
      if (showToast) toast.success('Listings refreshed successfully');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadInternships(false, controller.signal);
    return () => controller.abort();
  }, [loadInternships]);

  const handleRetry = useCallback(() => {
    void loadInternships(true);
  }, [loadInternships]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    toast.info('All filters cleared');
  }, []);

  const handleToggleBookmark = useCallback((internshipId: string) => {
    setBookmarkedIds((current) => {
      const next = new Set(current);

      if (next.has(internshipId)) {
        next.delete(internshipId);
      } else {
        next.add(internshipId);
      }

      return next;
    });
  }, []);

  const availableLocations = useMemo(
    () => buildAvailableLocations(allInternships),
    [allInternships]
  );

  const availableSkills = useMemo(() => buildAvailableSkills(allInternships), [allInternships]);

  const filteredAndSorted = useMemo(() => {
    const filtered = filterInternships(allInternships, filters);
    return sortInternships(filtered, sortBy);
  }, [allInternships, filters, sortBy]);

  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />

      <div className="flex gap-6 xl:gap-8 items-start">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          totalResults={filteredAndSorted.length}
          isMobileOpen={mobileFilterOpen}
          onMobileClose={() => setMobileFilterOpen(false)}
          availableLocations={availableLocations}
          availableSkills={availableSkills}
        />

        <main className="flex-1 min-w-0 space-y-5">
          {hasError && (
            <ErrorBanner
              message="Failed to load internship listings from the API. Check your connection and try again."
              onRetry={handleRetry}
            />
          )}

          {!hasError && (
            <SortAndResultsBar
              totalResults={filteredAndSorted.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onMobileFilterOpen={() => setMobileFilterOpen(true)}
            />
          )}

          {!hasError && (
            <InternshipList
              internships={filteredAndSorted}
              isLoading={isLoading}
              onResetFilters={handleResetFilters}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
            />
          )}
        </main>
      </div>
    </>
  );
}
