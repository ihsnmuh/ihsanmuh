import React from 'react';

import { cn } from '@/lib/utils';

interface TagPillProps {
  name: string;
}

const TagPill = (props: TagPillProps) => {
  const { name } = props;

  return (
    <div
      className={cn(
        'flex items-center gap-1 py-1 px-2 rounded-md',
        'dark:bg-slate-600/50 bg-slate-50/50',
      )}
    >
      <p className='font-primary text-xs'>{name}</p>
    </div>
  );
};

export default TagPill;
