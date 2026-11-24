import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useLikeCounter } from '@/helpers/useLikeCounter';

type LikeButtonProps = {
  slug: string;
  showIcon?: boolean;
  className?: string;
  interactive?: boolean;
  /** Pre-fetched count; when provided with interactive=false, render statically without API call */
  initialLikes?: number;
};

function formatCompactCount(count: number): string {
  if (count < 1000) return count.toLocaleString();
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(count);
}

/** Display-only, no API call. Use in lists when likes are pre-fetched. */
export function LikeButtonStats({
  likes,
  showIcon = true,
  compact = false,
  className,
}: {
  likes: number;
  showIcon?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const fullLabel = `${likes.toLocaleString()} like${likes !== 1 ? 's' : ''}`;

  return (
    <span
      title={fullLabel}
      aria-label={fullLabel}
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap text-sm text-muted',
        className,
      )}
    >
      {showIcon && <Heart className='h-3.5 w-3.5 shrink-0' />}
      <span>{compact ? formatCompactCount(likes) : fullLabel}</span>
    </span>
  );
}

export function LikeButton({
  slug,
  showIcon = true,
  className,
  interactive = true,
  initialLikes,
}: LikeButtonProps) {
  const { likes, isLiked, isLoading, handleLike } = useLikeCounter(slug, {
    interactive,
    initialLikes,
  });

  if (isLoading) {
    return (
      <span
        className={cn('flex items-center gap-1 text-sm text-muted', className)}
      >
        {showIcon && <Heart className='h-3.5 w-3.5' />}
        <span>--- likes</span>
      </span>
    );
  }

  if (!interactive) {
    return (
      <LikeButtonStats
        likes={likes}
        showIcon={showIcon}
        className={className}
      />
    );
  }

  return (
    <button
      type='button'
      onClick={handleLike}
      disabled={isLiked || isLoading}
      className={cn(
        'flex items-center gap-1.5 text-sm transition-colors',
        isLiked ? 'text-danger' : 'text-muted hover:text-danger',
        (isLiked || isLoading) && 'cursor-not-allowed',
        className,
      )}
      aria-label={isLiked ? 'Already liked' : 'Like this post'}
    >
      {showIcon && (
        <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
      )}
      <span>
        {likes.toLocaleString()} like{likes !== 1 ? 's' : ''}
      </span>
    </button>
  );
}
