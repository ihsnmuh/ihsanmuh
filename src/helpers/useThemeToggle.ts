import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef } from 'react';

import { emitSanReaction } from '@/lib/sanReact';
import { getThemeTransitionMs, transitionTheme } from '@/lib/themeTransition';

/** Time the blur needs to settle before the theme actually changes behind it. */
export const THEME_SETTLE_MS = 220;

type TTheme = 'light' | 'dark';

const opposite = (theme: string | undefined): TTheme =>
  theme === 'dark' ? 'light' : 'dark';

/**
 * Theme toggle with San's blur and wave. The target is derived from the last *requested* theme,
 * not the rendered one, so quick consecutive toggles cancel out instead of repeating the same
 * switch, and only the final target is applied.
 */
export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const resolvedRef = useRef(resolvedTheme);
  const requestedRef = useRef<TTheme | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    resolvedRef.current = resolvedTheme;
    if (!timerRef.current) requestedRef.current = null;
  }, [resolvedTheme]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = opposite(requestedRef.current ?? resolvedRef.current);
    requestedRef.current = nextTheme;

    emitSanReaction(nextTheme === 'dark' ? 'tired' : 'grin', {
      holdMs: THEME_SETTLE_MS + Math.max(getThemeTransitionMs(), 600) + 300,
      backdrop: true,
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    // Let the blur settle first, then sweep the new theme in from the center.
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      if (nextTheme === resolvedRef.current) {
        requestedRef.current = null;
        return;
      }
      void transitionTheme(nextTheme, () => setTheme(nextTheme));
    }, THEME_SETTLE_MS);
  }, [setTheme]);

  return { resolvedTheme, toggleTheme };
}
