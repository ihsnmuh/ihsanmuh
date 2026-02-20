import { Eye } from 'lucide-react';

import { useViewCounter } from '@/helpers/useViewCounter';

type ViewCounterProps = {
  slug: string;
  showIcon?: boolean;
  increment?: boolean;
};

export function ViewCounter({
  slug,
  showIcon = true,
  increment = true,
}: ViewCounterProps) {
  const { views, isLoading } = useViewCounter(slug, { increment });

  if (isLoading) {
    return (
      <span className='flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400'>
        {showIcon && <Eye className='h-4 w-4' />}
        <span>--- views</span>
      </span>
    );
  }

  return (
    <span className='flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400'>
      {showIcon && <Eye className='h-4 w-4' />}
      <span>
        {views.toLocaleString()} view{views !== 1 ? 's' : ''}
      </span>
    </span>
  );
}
