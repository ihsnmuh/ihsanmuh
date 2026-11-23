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
        ? 'border-l border-hairline/80 ml-1 pl-3.5 space-y-2 mt-2'
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
              'block text-xs transition-colors duration-150',
              variant === 'mobile' && [
                'px-2.5 py-1.5 rounded-sm hover:bg-pale-stone',
                heading.id === activeId
                  ? 'text-deep-moss font-bold bg-amber-glow/20 border border-dark-amber/30'
                  : 'text-olive-char hover:text-deep-moss',
              ],
              variant === 'desktop' && [
                'font-ui py-0.5 leading-snug',
                heading.id === activeId
                  ? 'text-signal-blue font-bold -ml-[15px] border-l-2 border-signal-blue pl-[13px]'
                  : isHeadingActive
                    ? 'text-deep-moss font-semibold'
                    : 'text-sage-gray hover:text-deep-moss',
              ],
            )}
            href={`#${heading.id}`}
            onClick={onNavigate}
          >
            {heading.title}
          </UnstyledLink>
          {heading.items.length > 0 && (
            <ul className='pl-3 space-y-1 mt-1 border-l border-hairline/60 ml-0.5'>
              {heading.items.map((item) => (
                <li key={item.id}>
                  <UnstyledLink
                    className={cn(
                      'block text-[11px] transition-colors duration-150',
                      variant === 'mobile' && [
                        'px-2.5 py-1 rounded-sm hover:bg-pale-stone',
                        item.id === activeId
                          ? 'text-signal-blue font-semibold'
                          : 'text-sage-gray',
                      ],
                      variant === 'desktop' && [
                        'font-ui py-0.5 leading-snug',
                        item.id === activeId
                          ? 'text-signal-blue font-bold -ml-[13px] border-l-2 border-signal-blue pl-[11px]'
                          : 'text-sage-gray hover:text-deep-moss',
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
            'p-4 rounded-sm shadow-none',
            'bg-paper-white border border-hairline',
          )}
        >
          <h4
            className={cn(
              'font-mono text-xs uppercase tracking-widest text-sage-gray font-bold mb-3 flex items-center gap-1.5 pb-2 w-full',
              'border-b border-hairline/70',
            )}
          >
            <List size={14} className='text-amber-glow' />
            Table Of Contents
          </h4>
          <Headings headings={nestedHeadings} activeId={activeId} />

          <div className='border-t border-hairline/70 my-3' />

          <div className='flex items-center justify-between gap-2'>
            <span className='font-ui text-xs text-sage-gray font-medium'>
              Like this post?
            </span>
            <LikeButton
              slug={slug}
              className='px-2.5 py-1 bg-soft-linen hover:bg-pale-stone border border-hairline rounded-sm font-ui font-medium transition-colors text-xs text-deep-moss'
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default TabelOfContent;
