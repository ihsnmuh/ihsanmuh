import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface IWrapperCard {
  children: ReactNode;
  className?: string;
  [propName: string]: unknown;
}

const WrapperCard = ({ children, className = '', ...others }: IWrapperCard) => {
  return (
    <div
      className={cn(
        'transition-all ease-in-out duration-300 hover:scale-105',
        'w-full font-primary shadow-sm cursor-pointer',
        'rounded-2xl border overflow-hidden',
        'hover:bg-zinc-50 hover:dark:bg-slate-800 border-slate-200 dark:border-slate-600',
        className,
      )}
      {...others}
    >
      {children}
    </div>
  );
};

export default WrapperCard;