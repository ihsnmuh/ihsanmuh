import { ElementType, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface IScrollRevealProps {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

/**
 * Scroll-triggered reveal driven by IntersectionObserver and CSS (transform and opacity only).
 * Plays once. Reduced-motion users see the content immediately.
 */
const ScrollReveal = ({
  as: Tag = 'div',
  children,
  className,
  delay = 0,
  threshold = 0,
}: IScrollRevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-revealed={revealed}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={cn('scroll-reveal', className)}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
