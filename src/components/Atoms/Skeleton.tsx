import * as React from 'react';

import { cn } from '@/lib/utils';

type SkeletonPropsCustome = {
  className?: string;
};

type SkeletonProps = React.ComponentPropsWithoutRef<'div'> &
  SkeletonPropsCustome;

export default function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-[#f6f7f8]', className)}
      style={{
        backgroundImage:
          'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
        backgroundSize: '700px 100%',
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  );
}
