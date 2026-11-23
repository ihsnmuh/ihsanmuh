import { ReactNode, useRef } from 'react';

import { cn } from '@/lib/utils';

interface IWrapperCard {
  children: ReactNode;
  className?: string;
  [propName: string]: unknown;
}

const WrapperCard = ({ children, className = '', ...others }: IWrapperCard) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative transition-colors duration-150',
        'w-full font-ui cursor-pointer shadow-none',
        'rounded-sm border border-hairline overflow-hidden',
        'bg-paper-white hover:bg-cream-paper',
        className,
      )}
      {...others}
    >
      {children}
    </div>
  );
};

export default WrapperCard;
