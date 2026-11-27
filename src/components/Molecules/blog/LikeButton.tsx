import { Heart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { ARTICLE_FINISHED_EVENT } from '@/lib/articleEvents';
import { cn } from '@/lib/utils';

import SanBurst from '@/components/Atoms/svg/SanBurst';

import { useLikeCounter } from '@/helpers/useLikeCounter';
import { useSanBurst } from '@/helpers/useSanBurst';

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

  const { burst, trigger } = useSanBurst();
  const wasLikedRef = useRef<boolean | null>(null);
  const [nudge, setNudge] = useState(false);
  const isLikedRef = useRef(false);
  const nudgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isLikedRef.current = isLiked;
  }, [isLiked]);

  // When the reader finishes the article, gently point at the Like button.
  useEffect(() => {
    if (!interactive) return;

    const onFinished = () => {
      if (isLikedRef.current) return;
      trigger();
      setNudge(true);
      if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
      nudgeTimer.current = setTimeout(() => setNudge(false), 1400);
    };

    window.addEventListener(ARTICLE_FINISHED_EVENT, onFinished);
    return () => {
      window.removeEventListener(ARTICLE_FINISHED_EVENT, onFinished);
      if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
    };
  }, [interactive, trigger]);

  useEffect(() => {
    if (isLoading) return;
    if (wasLikedRef.current === null) {
      wasLikedRef.current = isLiked;
      return;
    }
    if (isLiked && !wasLikedRef.current) trigger();
    wasLikedRef.current = isLiked;
  }, [isLiked, isLoading, trigger]);

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
        'relative flex items-center gap-1.5 text-sm transition-colors',
        isLiked ? 'text-danger' : 'text-muted hover:text-danger',
        (isLiked || isLoading) && 'cursor-not-allowed',
        className,
      )}
      aria-label={isLiked ? 'Already liked' : 'Like this post'}
    >
      {showIcon && (
        <Heart
          className={cn(
            'h-4 w-4',
            isLiked && 'fill-current',
            nudge && 'heart-nudge',
          )}
        />
      )}
      <span>
        {likes.toLocaleString()} like{likes !== 1 ? 's' : ''}
      </span>
      <SanBurst
        burst={burst}
        mood='love'
        className='bottom-full left-1/2 mb-1 -translate-x-1/2'
      />
    </button>
  );
}
