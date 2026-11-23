import React from 'react';

import { cn } from '@/lib/utils';

interface TagPillProps {
  name: string;
  variant?: 'default' | 'orange' | 'green' | 'blue' | 'amber';
  className?: string;
}

const TagPill = ({ name, variant = 'default', className }: TagPillProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 py-0.5 px-2.5 rounded-full border text-[11px] font-mono select-none transition-colors',
        variant === 'default' && 'bg-subtle text-body border-hairline',
        variant === 'orange' && 'bg-danger-soft text-danger border-danger/20',
        variant === 'green' &&
          'bg-positive-soft text-positive border-positive/20',
        variant === 'blue' && 'bg-accent-soft text-accent border-accent/20',
        variant === 'amber' && 'bg-warning-soft text-warning border-warning/20',
        className,
      )}
    >
      <span>{name}</span>
    </span>
  );
};

export default TagPill;
