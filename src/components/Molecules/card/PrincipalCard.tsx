import { BookOpen, Rocket, Scissors } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface PrincipleCardProps {
  id: number;
  title: string;
  decription: string;
  className?: string;
  icon?: 'conciseness' | 'learning' | 'ship';
  iconClass?: string;
  iconBg?: string;
  gradientBar?: string;
  hoverBorder?: string;
  hoverTitle?: string;
}

const icons = {
  conciseness: <Scissors size={16} />,
  learning: <BookOpen size={16} />,
  ship: <Rocket size={16} />,
};

const PrincipleCard = ({
  id,
  title,
  decription,
  className,
  icon = 'conciseness',
}: PrincipleCardProps) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col p-4 sm:p-5 rounded-sm',
        'border border-hairline',
        'bg-paper-white shadow-none transition-colors duration-150 hover:bg-cream-paper',
        className,
      )}
    >
      {/* Number + Icon row */}
      <div className='flex items-start justify-between mb-3'>
        <div className='w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 bg-soft-linen text-deep-moss border border-hairline'>
          {icons[icon]}
        </div>
        <span className='font-mono font-bold text-2xl leading-none text-hairline select-none'>
          0{id}
        </span>
      </div>

      {/* Content */}
      <h3 className='font-primary font-bold text-base mb-1.5 text-deep-moss group-hover:text-amber-glow transition-colors duration-150'>
        {title}
      </h3>
      <p className='font-ui text-xs sm:text-sm leading-relaxed text-olive-char'>
        {decription}
      </p>
    </div>
  );
};

export default PrincipleCard;
