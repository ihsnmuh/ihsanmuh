import type { TSanMood } from '@/lib/san';

export const SAN_REACT_EVENT = 'san:react';

export interface ISanReaction {
  mood: TSanMood;
  /** How long San stays before fading out. Defaults to 900 ms. */
  holdMs?: number;
  /** Blurs the page behind San while she is on screen. */
  backdrop?: boolean;
}

/**
 * Asks the global SanReactor to pop San up with a mood. Safe to call anywhere on the client.
 */
export const emitSanReaction = (
  mood: TSanMood,
  options: { holdMs?: number; backdrop?: boolean } = {},
) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<ISanReaction>(SAN_REACT_EVENT, {
      detail: { mood, holdMs: options.holdMs, backdrop: options.backdrop },
    }),
  );
};
