import { ReactNode, useRef } from 'react';

import { cn } from '@/lib/utils';

import { useMouseMoveSpotlight } from '@/helpers/useMouseMoveSpotlight';

interface IWrapperCard {
  children: ReactNode;
  className?: string;
  [propName: string]: unknown;
}

const WrapperCard = ({ children, className = '', ...others }: IWrapperCard) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useMouseMoveSpotlight(cardRef);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative transition-all ease-in-out duration-300 hover:scale-105',
        'w-full font-primary shadow-sm cursor-pointer',
        'rounded-lg border overflow-hidden',
        'background-card',
        'hover:bg-zinc-50 hover:dark:bg-slate-800 border-slate-300 dark:border-zinc-700/40',
        className,
      )}
      {...others}
    >
      {/* Spotlight overlay effect */}
      <div className='pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 card-spotlight' />
      {children}
    </div>
  );
};

export default WrapperCard;
