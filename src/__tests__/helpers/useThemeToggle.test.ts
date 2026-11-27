import { act, renderHook } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { THEME_SETTLE_MS, useThemeToggle } from '@/helpers/useThemeToggle';

vi.mock('next-themes', () => ({ useTheme: vi.fn() }));
vi.mock('@/lib/sanReact', () => ({ emitSanReaction: vi.fn() }));
vi.mock('@/lib/themeTransition', () => ({
  getThemeTransitionMs: () => 0,
  transitionTheme: vi.fn(async (_theme: string, commit: () => void) => {
    commit();
  }),
}));

describe('useThemeToggle', () => {
  let currentTheme: 'light' | 'dark';
  const setTheme = vi.fn((theme: 'light' | 'dark') => {
    currentTheme = theme;
  });

  const mountHook = () => {
    vi.mocked(useTheme).mockImplementation(
      () =>
        ({ resolvedTheme: currentTheme, setTheme }) as unknown as ReturnType<
          typeof useTheme
        >,
    );
    return renderHook(() => useThemeToggle());
  };

  beforeEach(() => {
    vi.useFakeTimers();
    currentTheme = 'dark';
    setTheme.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('switches to the opposite theme after the blur settles', () => {
    const { result } = mountHook();

    act(() => result.current.toggleTheme());
    expect(setTheme).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(THEME_SETTLE_MS);
    });
    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith('light');
  });

  it('cancels out two quick toggles and keeps the original theme', () => {
    const { result } = mountHook();

    act(() => result.current.toggleTheme());
    act(() => {
      vi.advanceTimersByTime(50);
    });
    act(() => result.current.toggleTheme());
    act(() => {
      vi.advanceTimersByTime(THEME_SETTLE_MS * 4);
    });

    expect(setTheme).not.toHaveBeenCalled();
    expect(currentTheme).toBe('dark');
  });

  it('applies only the final target after an odd number of quick toggles', () => {
    const { result } = mountHook();

    act(() => result.current.toggleTheme());
    act(() => result.current.toggleTheme());
    act(() => result.current.toggleTheme());
    act(() => {
      vi.advanceTimersByTime(THEME_SETTLE_MS * 4);
    });

    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith('light');
  });

  it('toggles back normally once the previous switch has finished', () => {
    const { result, rerender } = mountHook();

    act(() => result.current.toggleTheme());
    act(() => {
      vi.advanceTimersByTime(THEME_SETTLE_MS);
    });
    rerender();
    expect(currentTheme).toBe('light');

    act(() => result.current.toggleTheme());
    act(() => {
      vi.advanceTimersByTime(THEME_SETTLE_MS);
    });

    expect(setTheme).toHaveBeenNthCalledWith(1, 'light');
    expect(setTheme).toHaveBeenNthCalledWith(2, 'dark');
  });
});
