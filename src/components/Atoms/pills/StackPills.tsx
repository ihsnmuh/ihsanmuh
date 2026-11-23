import React from 'react';

import { cn } from '@/lib/utils';

import StackIcon from '../Stacks';
import { Tooltip } from '../Tooltip';

interface StackPillsProps {
  name: string;
}

const StackPills = ({ name }: StackPillsProps) => {
  return (
    <Tooltip content={name}>
      <div
        className={cn(
          'flex items-center justify-center w-7 h-7 rounded-full',
          'border border-slate-300',
          'bg-white',
          'shadow-sm cursor-default',
          'hover:border-primary-400',
          'hover:bg-primary-50',
          'transition-colors duration-200',
        )}
      >
        <StackIcon size={14} type={name} />
      </div>
    </Tooltip>
  );
};

export default StackPills;
