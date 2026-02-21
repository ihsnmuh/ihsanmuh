import { BookOpen, Rocket, Scissors } from 'lucide-react';

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
  conciseness: <Scissors size={18} />,
  learning: <BookOpen size={18} />,
  ship: <Rocket size={18} />,
};

const PrincipleCard = ({
  id,
  title,
  decription,
  className,
  icon = 'conciseness',
  iconClass = 'text-primary-500 dark:text-primary-400',
  iconBg = 'bg-primary-50 dark:bg-primary-900/20',
  gradientBar = 'from-primary-500 to-primary-400',
  hoverBorder = 'hover:border-primary-300 dark:hover:border-primary-700/50',
  hoverTitle = 'group-hover:text-primary-500 dark:group-hover:text-primary-400',
}: PrincipleCardProps) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col p-5 rounded-xl overflow-hidden',
        'border border-slate-200 dark:border-zinc-700/40',
        'bg-white dark:bg-slate-800/50 shadow-sm',
        'transition-all duration-300 ease-in-out',
        'hover:-translate-y-1 hover:shadow-md',
        hoverBorder,
        className,
      )}
    >
      {/* Gradient top bar — always visible, intensifies on hover */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-[3px]',
          'bg-gradient-to-r opacity-30 group-hover:opacity-100 transition-opacity duration-300',
          gradientBar,
        )}
      />

      {/* Number + Icon row */}
      <div className='flex items-start justify-between mb-4'>
        <div
          className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
            iconBg,
            iconClass,
          )}
        >
          {icons[icon]}
        </div>
        <span className='font-secondary font-bold text-3xl leading-none text-slate-100 dark:text-slate-700 select-none'>
          0{id}
        </span>
      </div>

      {/* Content */}
      <h3
        className={cn(
          'font-secondary font-semibold text-base mb-2',
          'text-slate-900 dark:text-slate-100',
          'transition-colors duration-300',
          hoverTitle,
        )}
      >
        {title}
      </h3>
      <p className='font-primary text-sm leading-relaxed text-slate-500 dark:text-slate-400'>
        {decription}
      </p>
    </div>
  );
};

export default PrincipleCard;
