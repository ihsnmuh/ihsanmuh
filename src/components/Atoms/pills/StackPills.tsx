import React from 'react';

import { cn } from '@/lib/utils';

import StackIcon from '../Stacks';

interface StackPillsProps {
  name: string;
}

const StackPills = (props: StackPillsProps) => {
  const { name } = props;

  return (
    <div
      className={cn(
        'flex items-center gap-1 py-1 px-2 border rounded-full shadow-sm',
        'border-slate-300 dark:border-zinc-700/40 dark:bg-slate-600/50',
      )}
      key={name}
    >
      <StackIcon size={10} type={name} />
      <p className='font-primary text-sm'>{name}</p>
    </div>
  );
};

export default StackPills;
