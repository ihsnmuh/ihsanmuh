import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useLikeCounter } from '@/helpers/useLikeCounter';

type LikeButtonProps = {
  slug: string;
  showIcon?: boolean;
  className?: string;
  interactive?: boolean;
};

export function LikeButton({
  slug,
  showIcon = true,
  className,
  interactive = true,
}: LikeButtonProps) {
  const { likes, isLiked, isLoading, handleLike } = useLikeCounter(slug, {
    interactive,
  });

  if (isLoading) {
    return (
      <span
        className={cn(
          'flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400',
          className,
        )}
      >
        {showIcon && <Heart className='h-4 w-4' />}
        <span>--- likes</span>
      </span>
    );
  }

  if (!interactive) {
    return (
      <span
        className={cn(
          'flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400',
          className,
        )}
      >
        {showIcon && <Heart className='h-4 w-4' />}
        <span>
          {likes.toLocaleString()} like{likes !== 1 ? 's' : ''}
        </span>
      </span>
    );
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLiked || isLoading}
      className={cn(
        'flex items-center gap-1 text-sm transition-colors',
        isLiked
          ? 'text-red-500 dark:text-red-400'
          : 'text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400',
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
