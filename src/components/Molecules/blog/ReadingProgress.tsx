import {
  m,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { TSanMood } from '@/lib/san';

import SanMascotLazy from '@/components/Atoms/svg/SanMascotLazy';

const SAN_SIZE = 26;

const getMoodForProgress = (progress: number): TSanMood => {
  if (progress < 0.3) return 'curious';
  if (progress < 0.7) return 'focused';
  if (progress < 0.97) return 'idea';
  return 'shipped';
};

/**
 * Thin reading progress bar with San riding its leading edge; San's mood follows how far you have read
 * and she swells briefly whenever it changes.
 */
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const [mood, setMood] = useState<TSanMood>('curious');
  const sanRef = useRef<HTMLDivElement>(null);
  const isFirstMood = useRef(true);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 34,
    restDelta: 0.001,
  });
  const left = useTransform(
    scaleX,
    (value) => `calc(${value} * (100% - ${SAN_SIZE}px))`,
  );

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = getMoodForProgress(value);
    setMood((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    if (isFirstMood.current) {
      isFirstMood.current = false;
      return;
    }
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

  return (
    <div
      className='fixed top-16 left-0 right-0 z-[55] h-[2px] bg-transparent pointer-events-none'
      aria-hidden='true'
    >
      <m.div
        style={{ scaleX }}
        className='h-full w-full bg-accent origin-left'
      />
      <m.div
        style={{ left }}
        className='absolute top-1/2 -translate-y-1/2 hidden sm:block'
      >
        <div ref={sanRef}>
          <SanMascotLazy mood={mood} size={SAN_SIZE} />
        </div>
      </m.div>
    </div>
  );
};

export default ReadingProgress;
