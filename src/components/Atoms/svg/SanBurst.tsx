import { RefObject, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { TSanMood } from '@/lib/san';
import { cn } from '@/lib/utils';

import SanMascotLazy from '@/components/Atoms/svg/SanMascotLazy';

import { TSanBurst } from '@/helpers/useSanBurst';

type TSanBurstProps = {
  burst: TSanBurst | null;
  mood: TSanMood;
  size?: number;
  /** Positions the burst relative to the nearest positioned parent. Ignored when `anchorRef` is set. */
  className?: string;
  /**
   * Renders San in a portal centered above this element, so parents with `overflow: hidden`
   * cannot clip it.
   */
  anchorRef?: RefObject<HTMLElement>;
};

/**
 * San popping up just above the element that triggered it. Decorative and non-interactive.
 */
const SanBurst = ({
  burst,
  mood,
  size = 44,
  className,
  anchorRef,
}: TSanBurstProps) => {
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
  const burstId = burst?.id;

  useLayoutEffect(() => {
    if (!burstId || !anchorRef?.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setAnchor({ x: rect.left + rect.width / 2, y: rect.top });
  }, [burstId, anchorRef]);

  if (!burst) return null;

  const mascot = (
    <span className='san-reaction block' data-leaving={burst.leaving}>
      <SanMascotLazy immediate mood={mood} size={size} animated />
    </span>
  );

  if (anchorRef) {
    if (!anchor) return null;
    const portalContent = (
      <span
        key={burst.id}
        aria-hidden='true'
        style={{ left: anchor.x, top: anchor.y }}
        className='pointer-events-none fixed z-[70] -translate-x-1/2 -translate-y-full pb-1.5'
      >
        {mascot}
      </span>
    );
    return createPortal(
      portalContent as Parameters<typeof createPortal>[0],
      document.body,
    );
  }

  return (
    <span
      key={burst.id}
      aria-hidden='true'
      className={cn('pointer-events-none absolute z-20', className)}
    >
      {mascot}
    </span>
  );
};

export default SanBurst;
