import React from 'react';

/**
 * JobCardSkeleton Component
 * Provides an accessible, high-performance shimmer skeleton placeholder
 * for job listing cards while data is being loaded or filtered.
 */
export const JobCardSkeleton = ({ count = 1, variant = 'grid' }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === 'compact') {
    return (
      <>
        {items.map((key) => (
          <div
            key={key}
            className="bg-white rounded-2xl border border-slate-200/80 p-4.5 sm:p-5 flex flex-col justify-between space-y-4 animate-pulse relative overflow-hidden"
          >
            {/* Shimmer overlay gradient effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-slate-100/60 to-transparent pointer-events-none" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded-md w-4/5" />
                  <div className="h-3 bg-slate-200/70 rounded-md w-1/2" />
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 shrink-0" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="h-6 w-16 bg-slate-200/80 rounded-md" />
              <div className="h-6 w-20 bg-slate-200/80 rounded-md" />
              <div className="h-6 w-24 bg-slate-100 rounded-md" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="h-3.5 w-20 bg-slate-200/60 rounded" />
              <div className="h-8 w-28 bg-slate-200 rounded-lg" />
            </div>
          </div>
        ))}
      </>
    );
  }

  // Default Grid Skeleton matching the main Job Card in AllJobsView
  return (
    <>
      {items.map((key) => (
        <div
          key={key}
          className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between space-y-4 animate-pulse relative overflow-hidden shadow-2xs"
        >
          {/* Subtle Shimmer Gradient */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-slate-100/50 to-transparent pointer-events-none" />

          {/* Header: Logo + Title + Company + Bookmark */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start space-x-3.5 flex-1 min-w-0">
              {/* Logo box */}
              <div className="w-11 h-11 rounded-xl bg-slate-200/80 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2 pt-0.5">
                {/* Title line 1 */}
                <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                {/* Company name line */}
                <div className="h-3 bg-slate-200/70 rounded-md w-2/5" />
              </div>
            </div>

            {/* Bookmark button placeholder */}
            <div className="w-8 h-8 rounded-lg bg-slate-100 shrink-0" />
          </div>

          {/* Tags Row */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-6 w-18 bg-blue-100/60 rounded-md" />
            <div className="h-6 w-24 bg-emerald-100/60 rounded-md" />
            <div className="h-6 w-28 bg-slate-200/70 rounded-md" />
          </div>

          {/* Footer Row: Date & Action button */}
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
            <div className="h-3.5 w-20 bg-slate-200/60 rounded" />
            <div className="h-8.5 w-30 bg-blue-200/70 rounded-lg" />
          </div>
        </div>
      ))}
    </>
  );
};
