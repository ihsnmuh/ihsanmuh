import { ArrowUp, Check, Link2 } from 'lucide-react';
import { useRouter } from 'next/router';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
  onSelectHeading?: (id: string) => void;
  variant?: 'desktop' | 'mobile';
}

interface ITabelOfContent {
  slug: string;
}

interface IFlatHeading {
  id: string;
  title: string;
  level: 2 | 3;
  parentId?: string;
}

interface ISegment {
  key: string;
  d: string;
  index: number;
}

const X_H2 = 8;
const X_H3 = 24;
const V_GAP = 7.5;
const H_GAP = 7.5;

const getRelativeCenterY = (el: HTMLElement, ancestor: HTMLElement): number => {
  let top = el.offsetHeight / 2;
  let current: HTMLElement | null = el;
  while (current && current !== ancestor) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
};

const buildConnectorPath = (
  prevLevel: 2 | 3,
  prevY: number,
  nextLevel: 2 | 3,
  nextY: number,
): string | null => {
  if (prevLevel === 2 && nextLevel === 2) {
    const y1 = prevY + V_GAP;
    const y2 = nextY - V_GAP;
    if (y2 <= y1) return null;
    return `M ${X_H2} ${y1} L ${X_H2} ${y2}`;
  }

  if (prevLevel === 3 && nextLevel === 3) {
    const y1 = prevY + V_GAP;
    const y2 = nextY - V_GAP;
    if (y2 <= y1) return null;
    return `M ${X_H3} ${y1} L ${X_H3} ${y2}`;
  }

  if (prevLevel === 2 && nextLevel === 3) {
    const y1 = prevY + V_GAP;
    const y2 = nextY;
    const xEnd = X_H3 - H_GAP;
    if (y2 <= y1) return null;
    const r = Math.min(5, y2 - y1, xEnd - X_H2);
    return `M ${X_H2} ${y1} L ${X_H2} ${y2 - r} Q ${X_H2} ${y2} ${X_H2 + r} ${y2} L ${xEnd} ${y2}`;
  }

  const y1 = prevY + V_GAP;
  const y2 = nextY - V_GAP;
  const dy = y2 - y1;
  if (dy <= 0) return null;
  const midY = (y1 + y2) / 2;
  const r = Math.min(5.5, dy / 2, (X_H3 - X_H2) / 2);
  return `M ${X_H3} ${y1} L ${X_H3} ${midY - r} Q ${X_H3} ${midY} ${X_H3 - r} ${midY} L ${X_H2 + r} ${midY} Q ${X_H2} ${midY} ${X_H2} ${midY + r} L ${X_H2} ${y2}`;
};

export const Headings: FC<IHeadingList> = ({
  headings,
  activeId,
  className,
  onNavigate,
  onSelectHeading,
  variant = 'desktop',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const [svgHeight, setSvgHeight] = useState(0);
  const [segments, setSegments] = useState<ISegment[]>([]);

  const flatHeadings = useMemo<IFlatHeading[]>(() => {
    const list: IFlatHeading[] = [];
    headings.forEach((h2) => {
      list.push({ id: h2.id, title: h2.title, level: 2 });
      h2.items.forEach((h3) => {
        list.push({
          id: h3.id,
          title: h3.title,
          level: 3,
          parentId: h2.id,
        });
      });
    });
    return list;
  }, [headings]);

  const activeIndex = useMemo(
    () => flatHeadings.findIndex((item) => item.id === activeId),
    [flatHeadings, activeId],
  );

  const activeParentId =
    activeIndex >= 0 ? flatHeadings[activeIndex]?.parentId : undefined;

  const measureConnectors = useCallback(() => {
    const container = containerRef.current;
    if (!container || flatHeadings.length < 2) {
      setSegments([]);
      setSvgHeight(container?.offsetHeight ?? 0);
      return;
    }

    const ys = flatHeadings.map((item) => {
      const dot = dotRefs.current.get(item.id);
      return dot ? getRelativeCenterY(dot, container) : null;
    });

    const nextSegments: ISegment[] = [];
    for (let i = 0; i < flatHeadings.length - 1; i++) {
      const curr = flatHeadings[i];
      const next = flatHeadings[i + 1];
      const y1 = ys[i];
      const y2 = ys[i + 1];
      if (
        !curr ||
        !next ||
        y1 === null ||
        y2 === null ||
        y1 === undefined ||
        y2 === undefined
      ) {
        continue;
      }

      const d = buildConnectorPath(curr.level, y1, next.level, y2);
      if (d) {
        nextSegments.push({
          key: `${curr.id}->${next.id}`,
          d,
          index: i,
        });
      }
    }

    const nextHeight = container.offsetHeight;
    setSvgHeight((prev) => (prev === nextHeight ? prev : nextHeight));
    setSegments((prev) => {
      if (
        prev.length === nextSegments.length &&
        prev.every(
          (seg, idx) =>
            seg.key === nextSegments[idx]?.key &&
            seg.d === nextSegments[idx]?.d,
        )
      ) {
        return prev;
      }
      return nextSegments;
    });
  }, [flatHeadings]);

  useEffect(() => {
    measureConnectors();

    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      measureConnectors();
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [measureConnectors]);

  const setDotRef = (id: string) => (el: HTMLSpanElement | null) => {
    if (el) {
      dotRefs.current.set(id, el);
    } else {
      dotRefs.current.delete(id);
    }
  };

  const handleHeadingClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (typeof document !== 'undefined') {
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        onSelectHeading?.(id);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${id}`);
      }
    }
    onNavigate?.();
  };

  return (
    <div ref={containerRef} className={cn('relative mt-3', className)}>
      {segments.length > 0 && svgHeight > 0 && (
        <svg
          aria-hidden='true'
          width={36}
          height={svgHeight}
          viewBox={`0 0 36 ${svgHeight}`}
          fill='none'
          className='pointer-events-none absolute left-0 top-0 select-none'
        >
          {segments.map((seg) => (
            <path
              key={seg.key}
              d={seg.d}
              stroke='currentColor'
              strokeWidth={1.5}
              strokeLinecap='round'
              strokeLinejoin='round'
              className={cn(
                'transition-colors duration-200',
                activeIndex > seg.index ? 'text-accent/60' : 'text-muted/50',
              )}
            />
          ))}
        </svg>
      )}

      <ul className='relative'>
        {flatHeadings.map((item, index) => {
          const prev = index > 0 ? flatHeadings[index - 1] : undefined;
          const isActive = item.id === activeId;
          const isParentOfActive = item.id === activeParentId;
          const isPassed = activeIndex > index;

          const spacingClass =
            index === 0
              ? 'mt-0'
              : prev?.level === 3 && item.level === 2
                ? 'mt-4'
                : item.level === 3 && prev?.level === 3
                  ? 'mt-2'
                  : 'mt-3';

          return (
            <li key={item.id} className={cn('relative', spacingClass)}>
              <UnstyledLink
                data-toc-id={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleHeadingClick(e, item.id)}
                className={cn(
                  'group/toc relative block font-primary transition-colors duration-150',
                  variant === 'mobile'
                    ? 'py-1.5 text-[13px] leading-[1.45]'
                    : 'py-0.5 text-xs leading-[1.45]',
                  item.level === 2 ? 'pl-[24px]' : 'pl-[40px]',
                  isActive
                    ? 'font-medium text-accent'
                    : isParentOfActive
                      ? 'font-medium text-ink'
                      : 'text-muted hover:text-ink',
                )}
              >
                <span
                  ref={setDotRef(item.id)}
                  aria-hidden='true'
                  className={cn(
                    'absolute h-[7px] w-[7px] rounded-full transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]',
                    variant === 'mobile' ? 'top-[12px]' : 'top-[7px]',
                    item.level === 2 ? 'left-[4.5px]' : 'left-[20.5px]',
                    isActive
                      ? 'scale-110 bg-accent ring-[3px] ring-accent/20'
                      : isParentOfActive || isPassed
                        ? 'bg-accent/70 group-hover/toc:bg-accent'
                        : 'bg-muted/60 group-hover/toc:bg-ink',
                  )}
                />
                {item.title}
              </UnstyledLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const TabelOfContent: FC<ITabelOfContent> = () => {
  const { asPath } = useRouter();
  const cleanPath = asPath.split(/[?#]/)[0] || '/';
  const [activeId, setActiveId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const cleanupScrollLockRef = useRef<(() => void) | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isManualScrollRef = useRef(false);

  const handleObserverActiveId = useCallback((id: string) => {
    if (isManualScrollRef.current) return;
    setActiveId(id);
  }, []);

  const handleSelectHeading = useCallback((id: string) => {
    cleanupScrollLockRef.current?.();

    isManualScrollRef.current = true;
    setActiveId(id);

    let timerId: ReturnType<typeof setTimeout> | null = null;

    const releaseLock = () => {
      isManualScrollRef.current = false;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      window.removeEventListener('scrollend', releaseLock);
      window.removeEventListener('wheel', releaseLock);
      window.removeEventListener('touchmove', releaseLock);
      if (cleanupScrollLockRef.current === releaseLock) {
        cleanupScrollLockRef.current = null;
      }
    };

    cleanupScrollLockRef.current = releaseLock;

    window.addEventListener('scrollend', releaseLock, {
      once: true,
      passive: true,
    });
    window.addEventListener('wheel', releaseLock, {
      once: true,
      passive: true,
    });
    window.addEventListener('touchmove', releaseLock, {
      once: true,
      passive: true,
    });

    timerId = setTimeout(releaseLock, 900);
  }, []);

  useEffect(() => {
    return () => {
      cleanupScrollLockRef.current?.();
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  useIntersectionObserver(handleObserverActiveId, cleanPath);

  const { nestedHeadings } = useHeadingsData(cleanPath);

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
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 1800);
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
            className='mt-3 flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain pr-2 py-0.5'
          >
            <Headings
              headings={nestedHeadings}
              activeId={activeId}
              onSelectHeading={handleSelectHeading}
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
