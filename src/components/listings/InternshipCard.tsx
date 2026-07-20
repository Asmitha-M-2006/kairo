'use client';

import React, { useMemo } from 'react';
import AppImage from '@/components/ui/AppImage';
import {
  MapPin,
  Clock,
  IndianRupee,
  Calendar,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Monitor,
  Server,
  Layers,
  Code,
  Brain,
  PenTool,
  Briefcase,
} from 'lucide-react';
import type { Internship } from '@/lib/internshipData';
import { parseDeadlineDate } from '@/lib/internshipListings';

interface InternshipCardProps {
  internship: Internship;
  isBookmarked?: boolean;
  onToggleBookmark?: (internshipId: string) => void;
  staggerIndex?: number;
}

function getRoleIcon(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (
    normalizedTitle.includes('frontend') ||
    normalizedTitle.includes('front end') ||
    normalizedTitle.includes('html') ||
    normalizedTitle.includes('css') ||
    normalizedTitle.includes('web')
  ) {
    return Monitor;
  }

  if (normalizedTitle.includes('backend') || normalizedTitle.includes('server')) {
    return Server;
  }

  if (normalizedTitle.includes('full stack')) {
    return Layers;
  }

  if (normalizedTitle.includes('python')) {
    return Code;
  }

  if (
    normalizedTitle.includes('ai') ||
    normalizedTitle.includes('ml') ||
    normalizedTitle.includes('machine learning')
  ) {
    return Brain;
  }

  if (
    normalizedTitle.includes('design') ||
    normalizedTitle.includes('ui') ||
    normalizedTitle.includes('ux')
  ) {
    return PenTool;
  }

  return Briefcase;
}

function getDaysUntilDeadline(deadline: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlineDate = parseDeadlineDate(deadline);
  if (!deadlineDate) return Number.POSITIVE_INFINITY;

  deadlineDate.setHours(0, 0, 0, 0);
  const diff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

function getTimeAgo(dateStr: string): string {
  if (!dateStr) return 'Recently';

  const posted = new Date(dateStr);
  const now = new Date();

  const diffMs = now.getTime() - posted.getTime();
  if (diffMs < 0) return 'Recently';

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays}d ago`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 'N/A';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function InternshipCard({
  internship,
  isBookmarked = false,
  onToggleBookmark,
  staggerIndex,
}: InternshipCardProps) {
  const RoleIcon = getRoleIcon(internship.title);
  const daysLeft = useMemo(() => getDaysUntilDeadline(internship.deadline), [internship.deadline]);
  const isUrgent = daysLeft <= 10 && daysLeft > 0;
  const isExpired = daysLeft <= 0;
  const displaySkills = internship.skills.slice(0, 3);
  const hasLogo = Boolean(internship.companyLogo && internship.companyLogo.trim());

  return (
    <article
      className={`group bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-newton-blue-100/20 hover:-translate-y-1 flex flex-col relative overflow-hidden animate-fade-in-up ${staggerIndex != null ? `stagger-${Math.min(staggerIndex + 1, 12)}` : ''} ${
        isUrgent
          ? 'border-red-100'
          : isExpired
            ? 'border-border opacity-75'
            : 'border-border hover:border-newton-blue-200'
      }`}
    >
      {/* Brand Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-newton-blue-500 via-newton-orange-500 to-newton-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 flex-1 flex flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 min-w-0">
            {/* Company logo with role icon fallback */}
            <div className="w-14 h-14 rounded-2xl border border-border bg-white p-2 flex-shrink-0 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:border-newton-blue-100 overflow-hidden">
              {hasLogo ? (
                <AppImage
                  src={internship.companyLogo}
                  alt={internship.companyLogoAlt}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                  fallbackSrc="/assets/images/no_image.png"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-newton-blue-50 text-newton-blue-600 flex items-center justify-center">
                  <RoleIcon size={24} strokeWidth={2} />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-foreground truncate leading-tight group-hover:text-newton-blue-600 transition-colors">
                {internship.title}
              </h3>
              <p className="text-sm font-semibold text-newton-blue-500 mt-1">
                {internship.company}
              </p>
              {internship.isNew && (
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-newton-orange-500 text-white text-[9px] font-black uppercase tracking-widest animate-pulse-badge">
                  NEW
                </span>
              )}
            </div>
          </div>

          {/* Bookmark button (only rendered when handler provided) */}
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(internship.id)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              className={`p-2 rounded-xl transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none ${
                isBookmarked
                  ? 'bg-newton-orange-50 text-newton-orange-500 shadow-inner'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <span className={isBookmarked ? 'animate-pop inline-block' : 'inline-block'}>
                {isBookmarked ? (
                  <BookmarkCheck size={18} fill="currentColor" />
                ) : (
                  <Bookmark size={18} />
                )}
              </span>
            </button>
          )}
        </div>

        {/* Skills */}
        {displaySkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {displaySkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg bg-newton-blue-50 text-newton-blue-600 text-[10px] font-bold uppercase tracking-wider border border-newton-blue-100 transition-all duration-200 hover:bg-newton-blue-100 hover:scale-105 cursor-default"
              >
                {skill}
              </span>
            ))}
            {internship.skills.length > 3 && (
              <span className="px-2 py-1 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                +{internship.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 mb-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-7 h-7 rounded-lg bg-newton-blue-50/50 flex items-center justify-center flex-shrink-0">
              <MapPin size={14} className="text-newton-blue-500" />
            </div>
            <span className="text-xs font-medium truncate">
              {internship.location.toLowerCase() === 'remote'
                ? 'Work From Home'
                : internship.location}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-7 h-7 rounded-lg bg-newton-orange-50/50 flex items-center justify-center flex-shrink-0">
              <IndianRupee size={14} className="text-newton-orange-500" />
            </div>
            <span className="text-xs font-medium truncate">{internship.stipend}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Clock size={14} className="text-muted-foreground" />
            </div>
            <span className="text-xs font-medium truncate">
              {internship.duration || 'Flexible'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Calendar size={14} className="text-muted-foreground" />
            </div>
            <span className="text-xs font-medium truncate">{formatDate(internship.deadline)}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {getTimeAgo(internship.postedDate)}
            </span>
            {internship.openings > 0 && (
              <>
                <span className="text-muted-foreground/30">·</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {internship.openings} {internship.openings === 1 ? 'Opening' : 'Openings'}
                </span>
              </>
            )}
          </div>

          <a
            href={internship.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-newton-blue-500 hover:bg-newton-blue-600 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-lg shadow-newton-blue-100 hover:shadow-newton-blue-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none group/btn"
          >
            Apply
            <ExternalLink
              size={12}
              className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>
      </div>
    </article>
  );
}
