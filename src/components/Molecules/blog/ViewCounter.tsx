import { Eye } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useViewCounter, useViewIncrement } from '@/helpers/useViewCounter';

type ViewCounterProps = {
  slug: string;
  showIcon?: boolean;
  className?: string;
  /** Pre-fetched count; when provided, render statically without API call */
  initialViews?: number;
};

function formatCompactCount(count: number): string {
  if (count < 1000) return count.toLocaleString();
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(count);
}

/** Display-only, no API call. Use in lists when views are pre-fetched. */
export function ViewCounterStats({
  views,
  showIcon = true,
  compact = false,
  className,
}: {
  views: number;
  showIcon?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const fullLabel = `${views.toLocaleString()} view${views !== 1 ? 's' : ''}`;

  return (
    <span
      title={fullLabel}
      aria-label={fullLabel}
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap text-sm text-muted',
        className,
      )}
    >
      {showIcon && <Eye className='h-3.5 w-3.5 shrink-0' />}
      <span>{compact ? formatCompactCount(views) : fullLabel}</span>
    </span>
  );
}

/** Display view count only. GET request, never increments. */
export function ViewCounter({
  slug,
  showIcon = true,
  className,
  initialViews,
}: ViewCounterProps) {
  const { views, isLoading } = useViewCounter(slug, { initialViews });

  if (isLoading) {
    return (
      <span
        className={cn(
          'flex items-center gap-1 text-sm text-gray-600',
          className,
        )}
      >
        {showIcon && <Eye className='h-4 w-4' />}
        <span>--- views</span>
      </span>
    );
  }

  return (
    <ViewCounterStats views={views} showIcon={showIcon} className={className} />
  );
}

/** Increments view count (POST) on mount, then displays. Use on article detail page. */
export function ViewIncrement({
  slug,
  showIcon = true,
  className,
}: {
  slug: string;
  showIcon?: boolean;
  className?: string;
}) {
  const { views, isLoading } = useViewIncrement(slug);

  if (isLoading) {
    return (
      <span
        className={cn(
          'flex items-center gap-1 text-sm text-gray-600',
          className,
        )}
      >
        {showIcon && <Eye className='h-4 w-4' />}
        <span>--- views</span>
      </span>
    );
  }

  return (
    <ViewCounterStats views={views} showIcon={showIcon} className={className} />
  );
}
