import React, { FC, useState } from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink from '@/components/atoms/links/UnstyledLink';

import useHeadingsData from '@/helpers/useHeadingData';
import useIntersectionObserver from '@/helpers/useIntersectionObserver';

interface IHeadingItem {
  id: string;
  title: string;
}

interface INestedHeading extends IHeadingItem {
  items: IHeadingItem[];
}

interface IHeadingList {
  headings: INestedHeading[];
  activeId: any;
}

interface ITabelOfContent {}

const Headings: FC<IHeadingList> = ({ headings, activeId }) => (
  <ul className='mt-2'>
    {headings.map((heading) => (
      <li
        key={heading.id}
        className={cn(
          heading.id === activeId
            ? 'text-primary-500 font-medium'
            : 'text-gray-500 dark:text-gray-400 font-medium',
        )}
      >
        <UnstyledLink
          className='text-sm font-primary mt-2 hover:text-primary-500'
          href={`#${heading.id}`}
        >
          {heading.title}
        </UnstyledLink>
        {heading.items.length > 0 && (
          <ul className='ml-4'>
            {heading.items.map((item) => (
              <li
                key={item.id}
                className={cn(
                  item.id === activeId
                    ? 'text-primary-500 font-medium'
                    : 'text-gray-500 dark:text-gray-400 font-medium',
                )}
              >
                <UnstyledLink
                  className='text-sm font-primary hover:text-primary-500 mt-2'
                  href={`#${item.id}`}
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
  const [activeId, setActiveId] = useState<string>('');

  useIntersectionObserver(setActiveId);

  const { nestedHeadings } = useHeadingsData();

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
