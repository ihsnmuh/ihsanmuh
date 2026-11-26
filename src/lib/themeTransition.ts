type TTheme = 'light' | 'dark';

type TViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type TDocumentWithTransition = Document & {
  startViewTransition?: (callback: () => void) => TViewTransition;
};

const WAVE_MS = 1000;
const WAVE_EASE = 'cubic-bezier(0.77, 0, 0.175, 1)';

/** Length of the wave when it can play, or 0 when the theme switches instantly. */
export const getThemeTransitionMs = () => {
  if (typeof document === 'undefined') return 0;
  const canAnimate =
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return canAnimate ? WAVE_MS : 0;
};

/**
 * Applies the theme class directly so the View Transition captures the new look right away.
 * next-themes writes the same class afterwards, so both stay in sync.
 */
const applyThemeToDom = (theme: TTheme) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.style.colorScheme = theme;
};

/**
 * Switches theme with a soft-edged wave that grows from the center of the screen.
 * The new view is revealed through an expanding radial mask; the old view is left untouched.
 * Falls back to an instant switch when View Transitions or motion are unavailable.
 */
export const transitionTheme = async (
  nextTheme: TTheme,
  commit: () => void,
): Promise<void> => {
  const doc = document as TDocumentWithTransition;

  if (!doc.startViewTransition || getThemeTransitionMs() === 0) {
    applyThemeToDom(nextTheme);
    commit();
    return;
  }

  const transition = doc.startViewTransition(() => {
    applyThemeToDom(nextTheme);
    commit();
  });

  try {
    await transition.ready;
  } catch {
    return;
  }

  const size = `${Math.hypot(window.innerWidth, window.innerHeight) * 2.2}px`;

  document.documentElement.animate(
    {
      maskSize: ['0px 0px', `${size} ${size}`],
      webkitMaskSize: ['0px 0px', `${size} ${size}`],
    },
    {
      duration: WAVE_MS,
      easing: WAVE_EASE,
      fill: 'both',
      pseudoElement: '::view-transition-new(root)',
    },
  );

  await transition.finished.catch(() => undefined);
};
