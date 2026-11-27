import { useEffect, useRef, useState } from 'react';

import { TSanMood } from '@/lib/san';
import { ISanReaction, SAN_REACT_EVENT } from '@/lib/sanReact';

import SanMascotLazy from '@/components/Atoms/svg/SanMascotLazy';

type TReaction = {
  id: number;
  mood: TSanMood;
  leaving: boolean;
  backdrop: boolean;
};

/**
 * Listens for `san:react` events and pops a large San up in the middle of the screen for a moment,
 * optionally blurring the page behind her.
 * The mascot bundle is only requested after the first reaction.
 */
const SanReactor = () => {
  const [reaction, setReaction] = useState<TReaction | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    const onReact = (event: Event) => {
      const {
        mood,
        holdMs = 900,
        backdrop = false,
      } = (event as CustomEvent<ISanReaction>).detail;
      clearTimers();
      setReaction((prev) => ({
        id: (prev?.id ?? 0) + 1,
        mood,
        leaving: false,
        backdrop,
      }));
      timers.current.push(
        setTimeout(
          () =>
            setReaction((prev) => (prev ? { ...prev, leaving: true } : prev)),
          holdMs,
        ),
        setTimeout(() => setReaction(null), holdMs + 300),
      );
    };

    window.addEventListener(SAN_REACT_EVENT, onReact);
    return () => {
      window.removeEventListener(SAN_REACT_EVENT, onReact);
      clearTimers();
    };
  }, []);

  if (!reaction) return null;

  return (
    <div
      key={reaction.id}
      aria-hidden='true'
      data-leaving={reaction.leaving}
      className='san-layer pointer-events-none fixed inset-0 z-[70]'
    >
      {reaction.backdrop && (
        <div className='san-backdrop absolute inset-0 backdrop-blur-[10px] motion-reduce:backdrop-blur-[6px]' />
      )}
      <div className='san-reaction-center absolute inset-0 flex items-center justify-center'>
        <SanMascotLazy immediate mood={reaction.mood} size={176} animated />
      </div>
    </div>
  );
};

export default SanReactor;
