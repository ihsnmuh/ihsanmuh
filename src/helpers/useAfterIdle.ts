import { useEffect, useState } from 'react';

/**
 * Returns true once the page has loaded and the main thread is idle,
 * so decorative work can be mounted without competing with LCP or hydration.
 */
export function useAfterIdle(timeout = 1500) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const schedule = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout });
      } else {
        timeoutId = setTimeout(() => setReady(true), 200);
      }
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      window.removeEventListener('load', schedule);
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [timeout]);

  return ready;
}
