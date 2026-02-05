import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink from '@/components/Atoms/links/UnstyledLink';

import useHeadingsData from '@/helpers/useHeadingData';
import useIntersectionObserver from '@/helpers/useIntersectionObserver';

interface IHeadingItem {
  id: string;
  title: string;
}

interface INestedHeading extends IHeadingItem {
  items: IHeadingItem[];
}

export interface IHeadingList {
  headings: INestedHeading[];
  activeId: string;
  className?: string;
  onNavigate?: () => void;
  variant?: 'desktop' | 'mobile';
}

interface ITabelOfContent {}

export const Headings: FC<IHeadingList> = ({
  headings,
  activeId,
  className,
  onNavigate,
  variant = 'desktop',
}) => (
  <ul className={cn('mt-2', className)}>
    {headings.map((heading) => (
      <li key={heading.id} className='mt-1'>
        <UnstyledLink
          className={cn(
            'block rounded-md',
            variant === 'mobile' && [
              'px-3 py-2',
              'hover:bg-slate-200/60 dark:hover:bg-slate-700/40',
              'transition-colors',
            ],
            variant === 'desktop' && ['text-sm font-primary px-1 py-1'],
            heading.id === activeId
              ? 'text-primary-500 font-semibold'
              : 'text-gray-600 dark:text-gray-300 font-medium hover:text-primary-500',
          )}
          href={`#${heading.id}`}
          onClick={onNavigate}
        >
          {heading.title}
        </UnstyledLink>
        {heading.items.length > 0 && (
          <ul className={cn('ml-3 border-l border-slate-200 dark:border-slate-700')}>
            {heading.items.map((item) => (
              <li key={item.id} className='mt-1'>
                <UnstyledLink
                  className={cn(
                    'block rounded-md',
                    variant === 'mobile' && [
                      'px-3 py-2',
                      'hover:bg-slate-200/60 dark:hover:bg-slate-700/40',
                      'transition-colors',
                    ],
                    variant === 'desktop' && ['text-sm font-primary px-3 py-1'],
                    item.id === activeId
                      ? 'text-primary-500 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 font-medium hover:text-primary-500',
                  )}
                  href={`#${item.id}`}
                  onClick={onNavigate}
                >
                  {item.title}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

const TabelOfContent: FC<ITabelOfContent> = () => {
  const { asPath } = useRouter();
  const [activeId, setActiveId] = useState<string>('');

  useIntersectionObserver(setActiveId, asPath);

  const { nestedHeadings } = useHeadingsData(asPath);

  return (
    <>
      <aside className='hidden lg:block'>
        <div
          className={cn(
            'p-4 shadow',
            'dark:bg-slate-800/75',
            'border border-slate-400 dark:border-slate-500 rounded-lg',
          )}
        >
          <h4
            className={cn(
              'text-xl font-primary text-primary-500 font-semibold pb-2 w-full',
              'border-b border-slate-400 dark:border-slate-500',
            )}
          >
            Table Of Contents
          </h4>
          <Headings headings={nestedHeadings} activeId={activeId} />
        </div>
      </aside>
    </>
  );
};

export default TabelOfContent;
