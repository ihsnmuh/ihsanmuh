import { List } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink from '@/components/Atoms/links/UnstyledLink';

import useHeadingsData from '@/helpers/useHeadingData';
import useIntersectionObserver from '@/helpers/useIntersectionObserver';

import { LikeButton } from './LikeButton';

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

interface ITabelOfContent {
  slug: string;
}

export const Headings: FC<IHeadingList> = ({
  headings,
  activeId,
  className,
  onNavigate,
  variant = 'desktop',
}) => (
  <ul
    className={cn(
      variant === 'desktop'
        ? 'border-l border-slate-100 dark:border-zinc-800/80 ml-1 pl-4 space-y-2.5 mt-2'
        : 'mt-2 space-y-1',
      className,
    )}
  >
    {headings.map((heading) => {
      const isHeadingActive =
        heading.id === activeId ||
        heading.items.some((item) => item.id === activeId);

      return (
        <li key={heading.id} className='relative'>
          <UnstyledLink
            className={cn(
              'block text-sm transition-all duration-200',
              variant === 'mobile' && [
                'px-3 py-2 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-700/40',
                heading.id === activeId
                  ? 'text-primary-500 font-semibold bg-primary-500/5 dark:bg-primary-500/10'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200',
              ],
              variant === 'desktop' && [
                'font-primary py-0.5 leading-snug',
                heading.id === activeId
                  ? 'text-primary-500 dark:text-primary-400 font-bold -ml-[17px] border-l-2 border-primary-500 dark:border-primary-400 pl-[15px]'
                  : isHeadingActive
                    ? 'text-slate-700 dark:text-zinc-300 font-semibold'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200',
              ],
            )}
            href={`#${heading.id}`}
            onClick={onNavigate}
          >
            {heading.title}
          </UnstyledLink>
          {heading.items.length > 0 && (
            <ul className='pl-3.5 space-y-1.5 mt-1.5 border-l border-slate-100 dark:border-zinc-800/40 ml-0.5'>
              {heading.items.map((item) => (
                <li key={item.id}>
                  <UnstyledLink
                    className={cn(
                      'block text-xs transition-colors duration-200',
                      variant === 'mobile' && [
                        'px-3 py-1.5 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-700/40',
                        item.id === activeId
                          ? 'text-primary-500 font-semibold'
                          : 'text-slate-500 dark:text-zinc-400',
                      ],
                      variant === 'desktop' && [
                        'font-primary py-0.5 leading-snug',
                        item.id === activeId
                          ? 'text-primary-500 dark:text-primary-400 font-bold -ml-[15px] border-l-2 border-primary-500 dark:border-primary-400 pl-[13px]'
                          : 'text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300',
                      ],
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
      );
    })}
  </ul>
);

const TabelOfContent: FC<ITabelOfContent> = ({ slug }) => {
  const { asPath } = useRouter();
  const [activeId, setActiveId] = useState<string>('');

  useIntersectionObserver(setActiveId, asPath);

  const { nestedHeadings } = useHeadingsData(asPath);

  return (
    <>
      <aside className='hidden lg:block'>
        <div
          className={cn(
            'p-5 shadow-sm backdrop-blur',
            'background-card border-slate-200 dark:border-zinc-700/40 rounded-2xl',
          )}
        >
          <h4
            className={cn(
              'font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-zinc-500 font-bold mb-4 flex items-center gap-1.5 pb-2.5 w-full',
              'border-b border-slate-100 dark:border-zinc-800/40',
            )}
          >
            <List size={14} className='text-primary-500' />
            Table Of Contents
          </h4>
          <Headings headings={nestedHeadings} activeId={activeId} />

          <div className='border-t border-slate-100 dark:border-zinc-800/40 my-4' />

          <div className='flex items-center justify-between gap-3'>
            <span className='font-primary text-xs text-slate-500 dark:text-zinc-400 font-semibold'>
              Like this post?
            </span>
            <LikeButton
              slug={slug}
              className='px-3 py-1 bg-slate-100 hover:bg-red-50 dark:bg-zinc-800 dark:hover:bg-red-950/20 border border-slate-200 dark:border-zinc-700/60 hover:border-red-200 dark:hover:border-red-900/40 rounded-md font-medium transition-all text-xs'
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default TabelOfContent;
