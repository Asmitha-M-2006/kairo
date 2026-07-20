import React from 'react';
import { SearchX, RefreshCw, X } from 'lucide-react';

interface ActiveFilter {
  label: string;
  onRemove: () => void;
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  activeFilters?: ActiveFilter[];
}

export default function EmptyState({
  title = 'No internships found',
  description = 'Try adjusting your filters or search terms to find more opportunities.',
  onReset,
  activeFilters = [],
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <SearchX size={28} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {activeFilters.map((filter) => (
            <button
              key={filter.label}
              onClick={filter.onRemove}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-newton-blue-50 text-newton-blue-600 text-xs font-medium border border-newton-blue-100 hover:bg-newton-blue-100 transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
            >
              {filter.label}
              <X size={12} />
            </button>
          ))}
        </div>
      )}

      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-newton-blue-500 text-white text-sm font-medium hover:bg-newton-blue-600 transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none shadow-sm"
        >
          <RefreshCw size={14} />
          Clear all filters
        </button>
      )}
    </div>
  );
}
