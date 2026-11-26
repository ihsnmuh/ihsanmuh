import { useEffect, useRef } from 'react';

const GLYPHS = ['·', ':', '+', '/', '{', '}', '*', '<', '>'];

interface IPalette {
  accentRgb: string;
  mutedRgb: string;
}

const readPalette = (): IPalette => {
  const styles = getComputedStyle(document.documentElement);
  const toCommaRgb = (raw: string, fallback: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return fallback;
    return trimmed.split(/\s+/).join(', ');
  };

  return {
    accentRgb: toCommaRgb(
      styles.getPropertyValue('--rgb-accent'),
      '47, 128, 250',
    ),
    mutedRgb: toCommaRgb(styles.getPropertyValue('--rgb-muted'), '105, 99, 94'),
  };
};

/**
 * Subtle decorative monospace glyph field rendered on HTML5 canvas for the Hero section.
 * Reacts gently to cursor movement, syncs with light/dark CSS tokens, and pauses offscreen.
 */
const HeroGlyphCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    let canHover = hoverMedia.matches;

    let palette = readPalette();
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let time = 0;
    let frameId = 0;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    const mouse = { x: -999, y: -999, inside: false };

    const CELL = 24;
    const ALPHA_STEPS = 200;
    let cols = 0;
    let rows = 0;
    let yMasks = new Float32Array(0);
    let readabilityMasks = new Float32Array(0);
    const fillStyleCache = new Map<string, string>();

    /** Static per-cell masks depend only on canvas size, so compute them once per resize. */
    const buildMasks = () => {
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      yMasks = new Float32Array(cols * rows);
      readabilityMasks = new Float32Array(cols * rows);

      for (let r = 0; r < rows; r++) {
        const yNorm = (r * CELL + CELL * 0.5) / height;
        const yMask = Math.pow(Math.sin(yNorm * Math.PI), 0.6);
        for (let c = 0; c < cols; c++) {
          const xNorm = (c * CELL + CELL * 0.5) / width;
          // Keep glyphs very quiet directly behind the center headline & bio copy
          const textDist = Math.hypot(
            (xNorm - 0.44) * 1.5,
            (yNorm - 0.46) * 1.4,
          );
          yMasks[r * cols + c] = yMask;
          readabilityMasks[r * cols + c] =
            0.22 + 0.78 * Math.min(1, textDist / 0.52);
        }
      }
    };

    /** Quantizes alpha so fillStyle strings are reused instead of rebuilt per glyph. */
    const getFillStyle = (rgb: string, alpha: number) => {
      const step = Math.round(alpha * ALPHA_STEPS);
      const key = `${rgb}|${step}`;
      let style = fillStyleCache.get(key);
      if (!style) {
        style = `rgba(${rgb}, ${step / ALPHA_STEPS})`;
        fillStyleCache.set(key, style);
      }
      return style;
    };

    const draw = () => {
      if (width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);
      const cell = CELL;

      const baseFont =
        '400 11px ui-monospace, SFMono-Regular, Menlo, monospace';
      const hoverFont =
        '700 13px ui-monospace, SFMono-Regular, Menlo, monospace';

      let currentFont = baseFont;
      ctx.font = baseFont;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cell + cell * 0.5;
          const y = r * cell + cell * 0.5;

          const yMask = yMasks[r * cols + c] ?? 0;
          if (yMask <= 0.02) continue;
          const readabilityMask = readabilityMasks[r * cols + c] ?? 1;
          const mask = yMask * readabilityMask;

          const wave =
            Math.sin(c * 0.26 + time * 1.1) * Math.cos(r * 0.26 - time * 0.75);

          let hover = 0;
          if (canHover && mouse.inside && !prefersReducedMotion) {
            const dist = Math.hypot(x - mouse.x, y - mouse.y);
            hover = Math.max(0, 1 - dist / 160);
          }

          const rawIdx = Math.floor(
            ((wave + 1) * 0.5 + hover * 0.6) * (GLYPHS.length - 1),
          );
          const glyph = GLYPHS[Math.max(0, rawIdx) % GLYPHS.length] ?? '·';

          if (hover > 0.1) {
            const nextFont = hover > 0.35 ? hoverFont : baseFont;
            if (currentFont !== nextFont) {
              ctx.font = nextFont;
              currentFont = nextFont;
            }
            const hoverReadability = 0.45 + 0.55 * readabilityMask;
            const alpha = Math.min(
              0.78,
              (0.24 + hover * 0.54) * yMask * hoverReadability,
            );
            ctx.fillStyle = getFillStyle(palette.accentRgb, alpha);
          } else {
            if (currentFont !== baseFont) {
              ctx.font = baseFont;
              currentFont = baseFont;
            }
            const alpha = (0.055 + (wave + 1) * 0.045) * mask;
            if (alpha < 1 / ALPHA_STEPS) continue;
            ctx.fillStyle = getFillStyle(palette.mutedRgb, alpha);
          }

          ctx.fillText(glyph, x, y);
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildMasks();
      draw();
    };

    let lastDrawTime = 0;

    const tick = (now: number) => {
      if (!isVisible || !isTabVisible || prefersReducedMotion) {
        frameId = 0;
        return;
      }
      // Run at ~24 FPS when idle to minimize mobile CPU/TBT, full 60 FPS on hover
      const minInterval = mouse.inside ? 16 : 42;
      if (now - lastDrawTime >= minInterval) {
        const dt = lastDrawTime
          ? Math.min(0.05, (now - lastDrawTime) / 1000)
          : 0.016;
        lastDrawTime = now;
        time += dt * 0.9;
        draw();
      }
      frameId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!frameId && isVisible && isTabVisible && !prefersReducedMotion) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canHover || !isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.x = x;
        mouse.y = y;
        mouse.inside = true;
      } else {
        mouse.inside = false;
      }
    };

    const handleHoverCapabilityChange = (e: MediaQueryListEvent) => {
      canHover = e.matches;
      if (!canHover) {
        mouse.inside = false;
      }
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) startLoop();
      else stopLoop();
    };

    const resizeObserver = new ResizeObserver(resize);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible) startLoop();
        else stopLoop();
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      fillStyleCache.clear();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    hoverMedia.addEventListener('change', handleHoverCapabilityChange);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Defer initial canvas setup until main thread is idle so LCP & hydration stay unaffected
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const init = () => {
      resizeObserver.observe(canvas);
      resize();
      startLoop();
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(init, { timeout: 600 });
    } else {
      timeoutId = setTimeout(init, 200);
    }

    return () => {
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      hoverMedia.removeEventListener('change', handleHoverCapabilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 w-full h-full select-none'
    />
  );
};

export default HeroGlyphCanvas;
