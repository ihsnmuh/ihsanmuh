import React from 'react';

import { cn } from '@/lib/utils';

import StackIcon from '../Stacks';

interface StackPillsProps {
  name: string;
}

const StackPills = ({ name }: StackPillsProps) => {
  const label = name === 'ReactQuery' ? 'TanStack Query' : name;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md',
        'border border-hairline bg-surface',
        'text-[11px] font-mono text-body leading-none',
        'select-none',
      )}
    >
      <StackIcon size={12} type={name} />
      <span>{label}</span>
    </span>
  );
};

export default StackPills;
