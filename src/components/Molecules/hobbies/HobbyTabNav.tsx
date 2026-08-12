import { Activity, BookOpen, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

import { cn } from '@/lib/utils';

import { HOBBY_CATEGORIES } from '@/constant/hobbies';

import { THobbyCategory } from '@/types/interfaces/hobbies';

interface HobbyTabNavProps {
  activeTab: THobbyCategory;
  onTabChange: (tab: THobbyCategory) => void;
  counts?: Partial<Record<THobbyCategory, number>>;
}

const iconMap = {
  running: Activity,
  reading: BookOpen,
  photography: Camera,
};

const HobbyTabNav: React.FC<HobbyTabNavProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  return (
    <div className='flex items-center justify-center'>
      <nav
        aria-label='Hobbies Tabs'
        className={cn(
          'inline-flex p-1.5 rounded-2xl gap-1.5',
          'bg-slate-100/90 dark:bg-slate-800/80 backdrop-blur-md',
          'border border-slate-200/80 dark:border-slate-700/60',
          'shadow-inner',
        )}
      >
        {HOBBY_CATEGORIES.map((category) => {
          const isActive = activeTab === category.id;
          const Icon = iconMap[category.id] || Activity;
          const count = counts?.[category.id];

          return (
            <button
              key={category.id}
              onClick={() => onTabChange(category.id)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                isActive
                  ? 'text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200',
              )}
            >
              {isActive && (
                <motion.div
                  layoutId='activeHobbyTab'
                  className={cn(
                    'absolute inset-0 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200/60 dark:border-slate-700/60',
                  )}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className='relative z-10 flex items-center gap-2'>
                <Icon
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    isActive && 'scale-110 text-primary-500',
                  )}
                />
                <span>{category.name}</span>
                {typeof count === 'number' && (
                  <span
                    className={cn(
                      'text-xs px-1.5 py-0.5 rounded-full font-mono font-medium',
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400'
                        : 'bg-slate-200/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-400',
                    )}
                  >
                    {count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default HobbyTabNav;
