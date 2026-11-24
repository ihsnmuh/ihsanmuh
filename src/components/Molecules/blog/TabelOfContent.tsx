import { ArrowUp, Check, Link2 } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useRef, useState } from 'react';

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
            data-toc-id={heading.id}
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
                    data-toc-id={item.id}
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
  const navRef = useRef<HTMLElement | null>(null);

  useIntersectionObserver(setActiveId, asPath);

  const { nestedHeadings } = useHeadingsData(asPath);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !activeId) return;

    const activeLink = nav.querySelector<HTMLElement>(
      `[data-toc-id="${CSS.escape(activeId)}"]`,
    );
    if (!activeLink) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const buffer = 24;

    if (
      linkRect.top < navRect.top + buffer ||
      linkRect.bottom > navRect.bottom - buffer
    ) {
      const targetScrollTop =
        nav.scrollTop +
        (linkRect.top - navRect.top) -
        nav.clientHeight / 2 +
        linkRect.height / 2;
      nav.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
    }
  }, [activeId, nestedHeadings]);

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
    <aside className='hidden lg:flex lg:flex-col lg:max-h-[calc(100vh-7rem)]'>
      {nestedHeadings.length > 0 && (
        <div className='flex flex-col min-h-0'>
          <p className='shrink-0 font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
            On this page
          </p>
          <nav
            ref={navRef}
            aria-label='Table of contents'
            className='mt-3 flex-1 min-h-0 overflow-y-auto overscroll-contain pl-0.5 pr-2'
          >
            <Headings
              headings={nestedHeadings}
              activeId={activeId}
              className='mt-0'
            />
          </nav>
        </div>
      )}

      <div
        className={cn(
          'shrink-0 flex flex-col gap-2 pt-5 text-xs text-muted',
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
