import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'main' | 'section';
}

/**
 * Canonical page layout container.
 *
 * Uses the same horizontal alignment as the Topbar navbar:
 *   max-w-7xl mx-auto px-6 md:px-8
 *
 * This ensures every major section (hero, filters, listings, footer)
 * aligns to the same left and right gutters as the navbar logo and actions.
 */
export default function PageContainer({
  children,
  className = '',
  as: Tag = 'div',
}: PageContainerProps) {
  return (
    <Tag className={`max-w-7xl mx-auto px-6 md:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
