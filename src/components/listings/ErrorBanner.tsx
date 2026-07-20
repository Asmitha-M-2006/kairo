'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBannerProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorBanner({
  message = 'Failed to load internship listings. Check your connection and try again.',
  onRetry,
}: ErrorBannerProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 flex items-start gap-4 animate-fade-in">
      <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <AlertTriangle size={17} className="text-red-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-red-800 mb-1">Unable to load internships</p>
        <p className="text-sm text-red-700">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:outline-none"
        >
          <RefreshCw size={13} />
          Retry
        </button>
      )}
    </div>
  );
}
