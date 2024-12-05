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
        'rounded-lg border overflow-hidden',
        'background-card',
        'hover:bg-zinc-50 hover:dark:bg-slate-800 border-slate-300 dark:border-zinc-700/40',
        className,
      )}
      {...others}
    >
      {children}
    </div>
  );
};

export default WrapperCard;
