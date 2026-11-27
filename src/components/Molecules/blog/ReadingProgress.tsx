import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { RefObject, useEffect, useRef, useState } from 'react';

import { emitArticleFinished } from '@/lib/articleEvents';
import { TSanMood } from '@/lib/san';

import SanMascotLazy from '@/components/Atoms/svg/SanMascotLazy';

const SAN_SIZE_DESKTOP = 26;
const SAN_SIZE_MOBILE = 20;
const MOBILE_BREAKPOINT = 640;
/** The article counts as finished once its end reaches this share of the viewport height. */
const FINISH_LINE = 0.7;
const FINISHED_AT = 0.98;

const getMoodForProgress = (progress: number): TSanMood => {
  if (progress < 0.3) return 'curious';
  if (progress < 0.7) return 'focused';
  if (progress < 0.97) return 'idea';
  return 'shipped';
};

/** 0 at the top of the page, 1 when the article's end reaches the finish line. */
const getProgress = (scrollY: number, articleEnd: number, viewport: number) => {
  const span = Math.max(1, articleEnd - viewport * FINISH_LINE);
  return Math.min(1, Math.max(0, scrollY / span));
};

type TReadingProgressProps = {
  /** The article body. Progress ends when this element ends, not at the bottom of the page. */
  targetRef: RefObject<HTMLElement>;
};

/**
 * Thin reading progress bar with San riding its leading edge; San's mood follows how far you have read
 * and she swells briefly whenever it changes. Reaching the end of the article nudges the Like button.
 */
const ReadingProgress = ({ targetRef }: TReadingProgressProps) => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const articleEnd = useMotionValue(0);
  const viewport = useMotionValue(0);
  const travel = useMotionValue(0);

  const sanRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const sanPositionRef = useRef<HTMLDivElement>(null);
  const isReady = useRef(false);
  const hasFinished = useRef(false);

  const [mood, setMood] = useState<TSanMood>('curious');
  const [sanSize, setSanSize] = useState(SAN_SIZE_DESKTOP);
  const [mounted, setMounted] = useState(false);

  const progress = useTransform(
    [scrollY, articleEnd, viewport],
    ([y, end, vh]: number[]) => getProgress(y ?? 0, end ?? 0, vh ?? 0),
  );
  const spring = useSpring(progress, {
    stiffness: 280,
    damping: 34,
    restDelta: 0.001,
  });
  const display = reduceMotion ? progress : spring;
  const x = useTransform(
    [display, travel],
    ([p, t]: number[]) => (p ?? 0) * (t ?? 0),
  );

  // Plain elements driven straight from the motion values: the bar must keep working even
  // before the lazy motion features have loaded.
  const applyFill = (value: number) => {
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${value})`;
  };
  const applySan = (value: number) => {
    if (sanPositionRef.current) {
      sanPositionRef.current.style.transform = `translate3d(${value}px, ${-(sanSize - 2) / 2}px, 0)`;
    }
  };
  useMotionValueEvent(display, 'change', applyFill);
  useMotionValueEvent(x, 'change', applySan);

  useEffect(() => {
    if (!mounted) return;
    applyFill(display.get());
    applySan(x.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, sanSize, display, x]);

  useMotionValueEvent(progress, 'change', (value) => {
    const next = getMoodForProgress(value);
    setMood((prev) => (prev === next ? prev : next));

    if (value >= FINISHED_AT && !hasFinished.current) {
      hasFinished.current = true;
      emitArticleFinished();
    }
  });

  useEffect(() => {
    const measure = () => {
      const article = targetRef.current;
      const width = document.documentElement.clientWidth;
      const size =
        width < MOBILE_BREAKPOINT ? SAN_SIZE_MOBILE : SAN_SIZE_DESKTOP;

      if (article) {
        articleEnd.set(article.getBoundingClientRect().bottom + window.scrollY);
      }
      viewport.set(window.innerHeight);
      travel.set(width - size);
      setSanSize(size);
    };

    measure();
    // A restored scroll position fires no scroll event, so seed the bar from the real one.
    scrollY.set(window.scrollY);

    // Start from the real position so a page restored mid-article doesn't fake a mood change.
    const initial = getProgress(
      window.scrollY,
      articleEnd.get(),
      window.innerHeight,
    );
    setMood(getMoodForProgress(initial));
    hasFinished.current = initial >= FINISHED_AT;
    // Render only now: the bar is decorative, and mounting it fresh avoids a stale server style.
    setMounted(true);
    const frame = window.requestAnimationFrame(() => {
      isReady.current = true;
    });

    const observer = new ResizeObserver(measure);
    if (targetRef.current) observer.observe(targetRef.current);
    observer.observe(document.body);
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [targetRef, scrollY, articleEnd, viewport, travel]);

  useEffect(() => {
    if (!isReady.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    sanRef.current?.animate(
      [
        { transform: 'scale(1)', easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
        {
          transform: 'scale(1.75)',
          offset: 0.35,
          easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        },
        { transform: 'scale(1)' },
      ],
      { duration: 560 },
    );
  }, [mood]);

  if (!mounted) return null;

  return (
    <div
      className='fixed top-16 left-0 right-0 z-[55] h-[2px] bg-transparent pointer-events-none'
      aria-hidden='true'
    >
      <div
        ref={fillRef}
        className='h-full w-full bg-accent origin-left [transform:scaleX(0)]'
      />
      <div ref={sanPositionRef} className='absolute left-0 top-0'>
        <div ref={sanRef}>
          <SanMascotLazy mood={mood} size={sanSize} />
        </div>
      </div>
    </div>
  );
};

export default ReadingProgress;
