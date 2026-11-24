import { useEffect, useRef } from 'react';

const CAT_WALK_1 = [
  '..1....1....',
  '..111111....',
  '.11211211...',
  '.11111111...',
  '..111111111.',
  '..11111111.1',
  '..11111111..',
  '..1.1..1.1..',
  '..1....1....',
];

const CAT_WALK_2 = [
  '..1....1....',
  '..111111....',
  '.11211211...',
  '.11111111...',
  '..111111111.',
  '..111111111.',
  '..11111111..',
  '...1.1..1.1.',
  '...1....1...',
];

const CAT_SIT = [
  '..1....1....',
  '..111111....',
  '.11211211...',
  '.11111111...',
  '..111111....',
  '..1111111...',
  '..1111111.1.',
  '..11111111..',
  '..11..11....',
];

const CAT_BAT = [
  '..1....1....',
  '..111111....',
  '.11211211...',
  '111111111...',
  '1.11111111..',
  '..111111111.',
  '..11111111..',
  '..1..1..1...',
  '....1...1...',
];

const REACTIONS = ['♥', 'meow!', 'purr~'] as const;
const FIGHT_SPARKS = ['*', '!', '✦', '~'] as const;

type TCatState = 'walk' | 'sit';
type TEncounterMode = 'none' | 'nuzzle' | 'fight';

interface ICat {
  x: number;
  vx: number;
  dir: 1 | -1;
  state: TCatState;
  stateTimer: number;
  blinkTimer: number;
  jumpY: number;
  jumpVy: number;
  reactionTimer: number;
  reactionText: string;
  reactionIndex: number;
  variant: 'primary' | 'secondary';
}

interface IPalette {
  ink: string;
  muted: string;
  surface: string;
  hairline: string;
  accent: string;
  accentRgb: string;
}

const readPalette = (): IPalette => {
  const styles = getComputedStyle(document.documentElement);
  const toCommaRgb = (raw: string, fallback: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return fallback;
    return trimmed.split(/\s+/).join(', ');
  };

  const inkRgb = toCommaRgb(styles.getPropertyValue('--rgb-ink'), '24, 24, 27');
  const mutedRgb = toCommaRgb(
    styles.getPropertyValue('--rgb-muted'),
    '105, 99, 94',
  );
  const surfaceRgb = toCommaRgb(
    styles.getPropertyValue('--rgb-surface'),
    '255, 255, 255',
  );
  const hairlineRgb = toCommaRgb(
    styles.getPropertyValue('--rgb-hairline'),
    '231, 229, 224',
  );
  const accentRgb = toCommaRgb(
    styles.getPropertyValue('--rgb-accent'),
    '47, 128, 250',
  );

  return {
    ink: `rgb(${inkRgb})`,
    muted: `rgb(${mutedRgb})`,
    surface: `rgb(${surfaceRgb})`,
    hairline: `rgb(${hairlineRgb})`,
    accent: `rgb(${accentRgb})`,
    accentRgb,
  };
};

/**
 * Two interactive pixel cats strolling along the top hairline border of the Footer.
 * When they meet, they either nuzzle/groom each other or have a playful scuffle.
 * Clicking either cat triggers a jump and reaction; pauses when offscreen or hidden.
 */
const FooterPixelMascot = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let palette = readPalette();
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let time = 0;
    let frameId = 0;
    let isVisible = false;
    let isTabVisible = !document.hidden;
    let hasClickedAny = false;

    const mouse = { x: -999, y: -999, inside: false };

    const cats: [ICat, ICat] = [
      {
        x: 96,
        vx: 0.55,
        dir: 1,
        state: prefersReducedMotion ? 'sit' : 'walk',
        stateTimer: 180,
        blinkTimer: 100,
        jumpY: 0,
        jumpVy: 0,
        reactionTimer: 0,
        reactionText: '♥',
        reactionIndex: 0,
        variant: 'primary',
      },
      {
        x: 340,
        vx: 0.64,
        dir: -1,
        state: prefersReducedMotion ? 'sit' : 'walk',
        stateTimer: 150,
        blinkTimer: 70,
        jumpY: 0,
        jumpVy: 0,
        reactionTimer: 0,
        reactionText: 'meow!',
        reactionIndex: 1,
        variant: 'secondary',
      },
    ];

    const encounter = {
      mode: 'none' as TEncounterMode,
      timer: 0,
      cooldown: 120,
    };

    const drawCat = (
      cat: ICat,
      frame: string[],
      groundY: number,
      offsetX = 0,
    ) => {
      const px = 2.6;
      const spriteW = 12 * px;
      const spriteH = 9 * px;
      const centerX = cat.x + offsetX;
      const drawX = centerX - spriteW / 2;
      const drawY = groundY - spriteH + cat.jumpY;

      const blinking =
        (!prefersReducedMotion && cat.blinkTimer < 6) ||
        encounter.mode === 'nuzzle';
      const bodyColor = cat.variant === 'primary' ? palette.ink : palette.muted;

      ctx.save();
      ctx.translate(centerX, 0);
      ctx.scale(cat.dir === 1 ? -1 : 1, 1);
      ctx.translate(-centerX, 0);

      for (let r = 0; r < frame.length; r++) {
        const row = frame[r];
        if (!row) continue;
        for (let c = 0; c < row.length; c++) {
          const cell = row[c];
          if (cell === '.') continue;
          ctx.fillStyle =
            cell === '2' ? (blinking ? bodyColor : palette.accent) : bodyColor;
          ctx.fillRect(
            Math.round(drawX + c * px),
            Math.round(drawY + r * px),
            Math.ceil(px),
            Math.ceil(px),
          );
        }
      }
      ctx.restore();

      return { drawY, centerX };
    };

    const drawHintPill = (
      centerX: number,
      drawY: number,
      isHovered: boolean,
    ) => {
      const bob = prefersReducedMotion ? 0 : Math.sin(time * 3) * 1.5;
      const label = 'click me';
      ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
      const textWidth = ctx.measureText(label).width;
      const padX = 6;
      const pillW = textWidth + padX * 2;
      const pillH = 16;
      const pillX = Math.max(
        4,
        Math.min(width - pillW - 4, centerX - pillW / 2),
      );
      const pillY = drawY - pillH - 7 + bob;

      ctx.save();
      ctx.globalAlpha = isHovered ? 0.95 : 0.72;
      ctx.fillStyle = palette.surface;
      ctx.strokeStyle = isHovered ? palette.accent : palette.hairline;
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isHovered ? palette.accent : palette.muted;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, pillX + pillW / 2, pillY + pillH / 2 + 0.5);
      ctx.restore();
    };

    const updateCatPhysics = (cat: ICat) => {
      if (cat.jumpY < 0 || cat.jumpVy !== 0) {
        cat.jumpY += cat.jumpVy;
        cat.jumpVy += 0.34;
        if (cat.jumpY >= 0) {
          cat.jumpY = 0;
          cat.jumpVy = 0;
        }
      }

      cat.blinkTimer -= 1;
      if (cat.blinkTimer <= 0) {
        cat.blinkTimer = 95 + Math.random() * 90;
      }
    };

    const updateRoamingCat = (cat: ICat) => {
      cat.stateTimer -= 1;
      if (cat.stateTimer <= 0) {
        cat.state = cat.state === 'walk' ? 'sit' : 'walk';
        cat.stateTimer =
          cat.state === 'walk'
            ? 160 + Math.random() * 140
            : 80 + Math.random() * 70;
      }

      if (
        mouse.inside &&
        Math.abs(mouse.x - cat.x) > 34 &&
        Math.abs(mouse.x - cat.x) < 170
      ) {
        cat.state = 'walk';
        cat.dir = mouse.x > cat.x ? 1 : -1;
      }

      if (cat.state === 'walk') {
        cat.x += cat.vx * cat.dir;
        const minX = 28;
        const maxX = Math.max(minX + 10, width - 28);
        if (cat.x > maxX) {
          cat.x = maxX;
          cat.dir = -1;
        } else if (cat.x < minX) {
          cat.x = minX;
          cat.dir = 1;
        }
      }
    };

    const draw = () => {
      if (width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);
      const groundY = height;
      const [catA, catB] = cats;

      if (!prefersReducedMotion) {
        updateCatPhysics(catA);
        updateCatPhysics(catB);

        if (encounter.mode === 'none') {
          updateRoamingCat(catA);
          updateRoamingCat(catB);

          if (encounter.cooldown > 0) {
            encounter.cooldown -= 1;
          } else if (Math.abs(catA.x - catB.x) < 34) {
            const leftCat = catA.x <= catB.x ? catA : catB;
            const rightCat = catA.x <= catB.x ? catB : catA;
            const mid = (leftCat.x + rightCat.x) / 2;

            leftCat.dir = 1;
            rightCat.dir = -1;
            leftCat.x = Math.max(28, mid - 16);
            rightCat.x = Math.min(width - 28, mid + 16);

            encounter.mode = Math.random() < 0.58 ? 'nuzzle' : 'fight';
            encounter.timer = encounter.mode === 'nuzzle' ? 135 : 115;
          }
        } else {
          encounter.timer -= 1;

          if (encounter.mode === 'fight') {
            if (encounter.timer % 26 === 0 && catA.jumpY === 0) {
              catA.jumpVy = -3.4;
            }
            if ((encounter.timer + 13) % 26 === 0 && catB.jumpY === 0) {
              catB.jumpVy = -3.4;
            }
          }

          if (encounter.timer <= 0) {
            const leftCat = catA.x <= catB.x ? catA : catB;
            const rightCat = catA.x <= catB.x ? catB : catA;
            leftCat.dir = -1;
            rightCat.dir = 1;
            leftCat.state = 'walk';
            rightCat.state = 'walk';
            leftCat.stateTimer = 150;
            rightCat.stateTimer = 150;

            if (encounter.mode === 'fight') {
              leftCat.jumpVy = -2.8;
              rightCat.jumpVy = -2.8;
            }

            encounter.mode = 'none';
            encounter.cooldown = 260 + Math.floor(Math.random() * 140);
          }
        }
      }

      const positions = cats.map((cat, idx) => {
        let frame: string[];
        let offsetX = 0;

        if (encounter.mode === 'nuzzle') {
          frame = CAT_SIT;
          const lean = Math.sin(time * 7 + idx * Math.PI) * 2.2;
          offsetX = cat.dir * Math.abs(lean);
        } else if (encounter.mode === 'fight') {
          frame = Math.floor(time * 12 + idx) % 2 === 0 ? CAT_BAT : CAT_WALK_1;
          offsetX = Math.sin(time * 18 + idx * Math.PI) * 3;
        } else {
          frame =
            cat.state === 'sit'
              ? CAT_SIT
              : Math.floor(time * 7 + idx) % 2 === 0
                ? CAT_WALK_1
                : CAT_WALK_2;
        }

        return drawCat(cat, frame, groundY, offsetX);
      });

      const midX = (catA.x + catB.x) / 2;

      if (encounter.mode === 'nuzzle') {
        const phase = (135 - encounter.timer) / 135;
        const floatY = groundY - 34 - Math.sin(phase * Math.PI) * 14;
        ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(${palette.accentRgb}, ${0.5 + 0.5 * Math.sin(time * 6)})`;
        ctx.fillText('♥', midX - 6, floatY);
        ctx.fillText('♥', midX + 8, floatY - 7);
        ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillStyle = palette.muted;
        ctx.fillText('purr~', midX, floatY - 17);
      } else if (encounter.mode === 'fight') {
        ctx.font = '700 11px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 0; i < 3; i++) {
          const angle = time * 10 + i * 2.1;
          const sx = midX + Math.cos(angle) * 13;
          const sy = groundY - 26 + Math.sin(angle * 1.3) * 9;
          const spark =
            FIGHT_SPARKS[(Math.floor(time * 8) + i) % FIGHT_SPARKS.length] ??
            '*';
          ctx.fillStyle = i === 0 ? palette.accent : palette.ink;
          ctx.fillText(spark, sx, sy);
        }
      }

      let hoveredIdx = -1;
      if (mouse.inside) {
        const distA = Math.abs(mouse.x - catA.x);
        const distB = Math.abs(mouse.x - catB.x);
        if (distA <= 36 || distB <= 36) {
          hoveredIdx = distA <= distB ? 0 : 1;
        }
      }

      cats.forEach((cat, idx) => {
        const pos = positions[idx];
        if (!pos) return;

        if (cat.reactionTimer > 0) {
          cat.reactionTimer -= 1;
          ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
          ctx.fillStyle = `rgba(${palette.accentRgb}, ${cat.reactionTimer / 45})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            cat.reactionText,
            pos.centerX,
            pos.drawY - 8 - (45 - cat.reactionTimer) * 0.3,
          );
        } else if (
          encounter.mode === 'none' &&
          (hoveredIdx === idx || (!hasClickedAny && idx === 0))
        ) {
          drawHintPill(pos.centerX, pos.drawY, hoveredIdx === idx);
        }
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (width > 0) {
        cats[0].x = Math.min(Math.max(cats[0].x, 28), Math.max(28, width - 28));
        cats[1].x = Math.min(
          Math.max(width > 200 ? width - 96 : width - 40, 28),
          Math.max(28, width - 28),
        );
      }
      draw();
    };

    const tick = () => {
      if (!isVisible || !isTabVisible || prefersReducedMotion) {
        frameId = 0;
        return;
      }
      time += 0.016;
      draw();
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
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside = true;
      const nearAny = cats.some((cat) => Math.abs(mouse.x - cat.x) <= 36);
      canvas.style.cursor = nearAny ? 'pointer' : 'default';
    };

    const handleMouseLeave = () => {
      mouse.inside = false;
      canvas.style.cursor = 'default';
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      const distA = Math.abs(clickX - cats[0].x);
      const distB = Math.abs(clickX - cats[1].x);
      const target =
        distA <= 42 || distB <= 42
          ? distA <= distB
            ? cats[0]
            : cats[1]
          : null;

      if (!target) return;

      hasClickedAny = true;

      if (encounter.mode === 'fight') {
        cats.forEach((cat) => {
          if (cat.jumpY === 0) cat.jumpVy = -4.6;
          cat.reactionText = '!';
          cat.reactionTimer = 40;
        });
        encounter.mode = 'none';
        encounter.cooldown = 220;
      } else if (target.jumpY === 0) {
        target.jumpVy = -4.6;
        target.reactionText =
          REACTIONS[target.reactionIndex % REACTIONS.length] ?? '♥';
        target.reactionIndex = (target.reactionIndex + 1) % REACTIONS.length;
        target.reactionTimer = 45;
      }

      if (prefersReducedMotion) draw();
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) startLoop();
      else stopLoop();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

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
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resize();
    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      title='Click the cats'
      className='block w-full h-[80px] select-none'
    />
  );
};

export default FooterPixelMascot;
