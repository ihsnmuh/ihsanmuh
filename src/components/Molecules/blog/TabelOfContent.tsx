import { ArrowUp, Check, Link2 } from 'lucide-react';
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
        ? 'border-l border-hairline pl-3.5 space-y-2 mt-3'
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
                'px-2.5 py-2 rounded-md hover:bg-subtle',
                heading.id === activeId
                  ? 'text-accent font-semibold bg-accent-soft/70'
                  : 'text-body hover:text-ink',
              ],
              variant === 'desktop' && [
                'font-primary py-0.5 leading-snug',
                heading.id === activeId
                  ? 'text-accent font-semibold -ml-[15px] border-l-2 border-accent pl-[13px]'
                  : isHeadingActive
                    ? 'text-ink font-medium'
                    : 'text-muted hover:text-ink',
              ],
            )}
            href={`#${heading.id}`}
            onClick={onNavigate}
          >
            {heading.title}
          </UnstyledLink>
          {heading.items.length > 0 && (
            <ul className='pl-3 space-y-1.5 mt-1.5 border-l border-hairline/70 ml-0.5'>
              {heading.items.map((item) => (
                <li key={item.id}>
                  <UnstyledLink
                    className={cn(
                      'block text-[11px] transition-colors duration-150',
                      variant === 'mobile' && [
                        'px-2.5 py-1.5 rounded-md hover:bg-subtle',
                        item.id === activeId
                          ? 'text-accent font-semibold'
                          : 'text-muted',
                      ],
                      variant === 'desktop' && [
                        'font-primary py-0.5 leading-snug',
                        item.id === activeId
                          ? 'text-accent font-semibold -ml-[13px] border-l-2 border-accent pl-[11px]'
                          : 'text-muted hover:text-ink',
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

const TabelOfContent: FC<ITabelOfContent> = () => {
  const { asPath } = useRouter();
  const [activeId, setActiveId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useIntersectionObserver(setActiveId, asPath);

  const { nestedHeadings } = useHeadingsData(asPath);

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className='hidden lg:block'>
      {nestedHeadings.length > 0 && (
        <div>
          <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
            On this page
          </p>
          <Headings headings={nestedHeadings} activeId={activeId} />
        </div>
      )}

      <div
        className={cn(
          'flex flex-col gap-2 pt-5 text-xs text-muted',
          nestedHeadings.length > 0 && 'mt-6 border-t border-hairline',
        )}
      >
        <button
          type='button'
          onClick={handleCopyLink}
          className='inline-flex items-center gap-2 hover:text-accent transition-colors w-fit'
        >
          {copied ? (
            <Check size={13} className='text-accent' />
          ) : (
            <Link2 size={13} />
          )}
          <span>{copied ? 'Link copied' : 'Copy link'}</span>
        </button>

        <button
          type='button'
          onClick={scrollToTop}
          className='inline-flex items-center gap-2 hover:text-accent transition-colors w-fit'
        >
          <ArrowUp size={13} />
          <span>Back to top</span>
        </button>
      </div>
    </aside>
  );
};

export default TabelOfContent;
