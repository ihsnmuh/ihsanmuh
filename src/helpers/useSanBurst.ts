import { useCallback, useEffect, useRef, useState } from 'react';

export type TSanBurst = { id: number; leaving: boolean };

/**
 * Drives a short-lived San pop-up: `trigger()` shows it, then fades it out and clears it.
 */
export function useSanBurst(visibleMs = 1400, totalMs = 1700) {
  const [burst, setBurst] = useState<TSanBurst | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const trigger = useCallback(() => {
    timers.current.forEach(clearTimeout);
    setBurst((prev) => ({ id: (prev?.id ?? 0) + 1, leaving: false }));
    timers.current = [
      setTimeout(
        () => setBurst((prev) => (prev ? { ...prev, leaving: true } : prev)),
        visibleMs,
      ),
      setTimeout(() => setBurst(null), totalMs),
    ];
  }, [visibleMs, totalMs]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return { burst, trigger };
}
