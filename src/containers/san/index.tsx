import { Check, Download, Shuffle } from 'lucide-react';
import { m, useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import {
  buildSanSvgFile,
  getSanLayers,
  SAN_HAIRSTYLE_META,
  SAN_HAIRSTYLES,
  SAN_LAYERS,
  SAN_MIX,
  SAN_MOOD_META,
  SAN_MOODS,
  SAN_PALETTE,
  SAN_POSE,
  TSanHairstyle,
  TSanLayer,
  TSanMood,
} from '@/lib/san';
import { cn } from '@/lib/utils';

import { SPRING_SNAPPY } from '@/components/Atoms/Motion';
import ScrollReveal from '@/components/Atoms/ScrollReveal';
import SanMascot from '@/components/Atoms/svg/SanMascot';

const LAYER_INFO: Record<
  TSanLayer,
  { number: string; title: string; detail: string }
> = {
  ground: {
    number: '01',
    title: 'Ground',
    detail: 'Accent circle synced to light and dark mode.',
  },
  head: {
    number: '02',
    title: 'Head',
    detail: 'Ears, jawline, and rounded nose.',
  },
  blush: {
    number: '03',
    title: 'Blush',
    detail: 'Tilted cheek ovals, hidden on serious moods.',
  },
  hair: {
    number: '04',
    title: 'Hair',
    detail: 'Swappable cut with layered sheen strands.',
  },
  brows: {
    number: '05',
    title: 'Brows',
    detail: 'Thick arched lines that carry the expression.',
  },
  face: {
    number: '06',
    title: 'Face',
    detail: 'Eyes, glasses, moustache, beard, and mouth.',
  },
  marks: {
    number: '07',
    title: 'Marks',
    detail: 'Sparkle or monospace accents around the head.',
  },
};

const PALETTE_SWATCHES = [
  { name: 'Light ground', hex: SAN_PALETTE.lightGround, role: 'Light accent' },
  { name: 'Dark ground', hex: SAN_PALETTE.darkGround, role: 'Dark accent' },
  { name: 'Ink', hex: SAN_PALETTE.ink, role: 'Outlines & hair' },
  { name: 'Paper', hex: SAN_PALETTE.paper, role: 'Skin base' },
  { name: 'Blush', hex: SAN_PALETTE.blush, role: 'Cheeks' },
  { name: 'Sheen', hex: SAN_PALETTE.hairSheenLight, role: 'Hair highlights' },
] as const;

const SanContainer = () => {
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mood, setMood] = useState<TSanMood>('grin');
  const [hairstyle, setHairstyle] = useState<TSanHairstyle>('textured-crop');
  const [showFacialHair, setShowFacialHair] = useState(true);
  const [activeLayer, setActiveLayer] = useState<TSanLayer | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const suppressNextClickRef = useRef(false);

  const [mixHair, setMixHair] = useState<TSanHairstyle>('taper-fade');
  const [mixEyes, setMixEyes] = useState<TSanMood>('idea');
  const [mixMouth, setMixMouth] = useState<TSanMood>('shipped');
  const [mixExtra, setMixExtra] = useState<TSanMood>('vibing');

  const activeMeta = SAN_MOOD_META[mood];
  const activeHairMeta = SAN_HAIRSTYLE_META[hairstyle];
  const [turn, drop] = SAN_POSE[mood];

  const handleCycleMood = useCallback(() => {
    const idx = SAN_MOODS.indexOf(mood);
    const next = SAN_MOODS[(idx + 1) % SAN_MOODS.length] ?? 'chill';
    setMood(next);
  }, [mood]);

  const handleRandomMood = useCallback(() => {
    const others = SAN_MOODS.filter((item) => item !== mood);
    const pick = others[Math.floor(Math.random() * others.length)];
    if (pick) setMood(pick);
  }, [mood]);

  const handleShuffleMix = useCallback(() => {
    const pickRandom = <T,>(list: readonly T[], fallback: T): T =>
      list[Math.floor(Math.random() * list.length)] ?? fallback;
    setMixHair(pickRandom(SAN_HAIRSTYLES, 'pompadour'));
    setMixEyes(pickRandom(SAN_MIX.eyes, 'chill'));
    setMixMouth(pickRandom(SAN_MIX.mouth, 'chill'));
    setMixExtra(pickRandom(SAN_MIX.extra, 'chill'));
  }, []);

  const triggerDownload = useCallback((svgMarkup: string, filename: string) => {
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const handleCopyHex = useCallback((hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex).catch(() => undefined);
    }
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex((prev) => (prev === hex ? null : prev));
    }, 1500);
  }, []);

  const currentGroundHex =
    resolvedTheme === 'dark' ? SAN_PALETTE.darkGround : SAN_PALETTE.lightGround;

  const handleDownloadMood = useCallback(() => {
    const svg = buildSanSvgFile({
      mood,
      hairstyle,
      showFacialHair,
      ground: currentGroundHex,
    });
    triggerDownload(svg, `san-${hairstyle}-${mood}.svg`);
  }, [mood, hairstyle, showFacialHair, currentGroundHex, triggerDownload]);

  const handleDownloadMix = useCallback(() => {
    const svg = buildSanSvgFile({
      mood: mixEyes,
      hairstyle: mixHair,
      showFacialHair,
      eyesMood: mixEyes,
      mouthMood: mixMouth,
      extraMood: mixExtra,
      ground: currentGroundHex,
    });
    triggerDownload(svg, `san-mix-${mixHair}-${mixEyes}-${mixMouth}.svg`);
  }, [
    mixHair,
    mixEyes,
    mixMouth,
    mixExtra,
    showFacialHair,
    currentGroundHex,
    triggerDownload,
  ]);

  const layers = useMemo(
    () => getSanLayers(mood, hairstyle, showFacialHair),
    [mood, hairstyle, showFacialHair],
  );

  return (
    <div className='pt-2 sm:pt-4 space-y-16'>
      {/* Header */}
      <header className='space-y-3'>
        <p
          className='san-rise font-mono text-[11px] uppercase tracking-wider text-accent font-medium'
          style={{ '--i': 0 } as React.CSSProperties}
        >
          Mascot
        </p>
        <h1 className='font-primary text-3xl sm:text-4xl font-bold tracking-tight text-ink'>
          <span
            className='san-word'
            style={{ '--i': 1 } as React.CSSProperties}
          >
            <span>San</span>
          </span>
        </h1>
        <p
          className='san-rise text-base leading-relaxed text-body max-w-2xl'
          style={{ '--i': 3 } as React.CSSProperties}
        >
          San is my illustrated stand-in across this site. Everything lives in
          one <code className='font-mono text-xs text-ink'>1240x1240</code> SVG
          file, split into separate face, hair, brow, and expression parts so I
          can swap moods or haircuts without shipping extra image files.
        </p>
      </header>

      {/* 1. Interactive Pullable Stage */}
      <div>
        <section
          aria-label='Interactive San mood stage'
          className='rounded-xl border border-hairline bg-surface overflow-hidden'
        >
          <div className='flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-hairline bg-subtle/50'>
            <div className='flex items-center gap-2 font-mono text-xs'>
              <span className='text-muted'>mood:</span>
              <span className='san-roll px-2 py-0.5 rounded bg-accent-soft text-accent font-medium'>
                <b key={mood} className='font-medium'>
                  {mood}
                </b>
              </span>
              <span className='hidden sm:inline text-muted'>
                hair: {hairstyle} · turn {turn}&deg; · drop {drop}px
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={handleRandomMood}
                className={cn(
                  'inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] px-3 py-1.5 rounded-md',
                  'border border-hairline bg-surface hover:bg-hover text-xs font-mono text-ink',
                  'transition-colors active:scale-[0.98]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                )}
              >
                <Shuffle className='w-3.5 h-3.5 text-muted' />
                random mood
              </button>
              <button
                type='button'
                onClick={handleDownloadMood}
                className={cn(
                  'inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] px-3 py-1.5 rounded-md',
                  'border border-hairline bg-surface hover:bg-hover text-xs font-mono text-ink',
                  'transition-colors active:scale-[0.98]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                )}
              >
                <Download className='w-3.5 h-3.5 text-muted' />
                download .svg
              </button>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center px-6 py-12 sm:py-16 bg-canvas/40 overflow-hidden'>
            <m.div
              initial={
                prefersReducedMotion
                  ? false
                  : { transform: 'scale(0.94)', opacity: 0 }
              }
              animate={{ transform: 'scale(1)', opacity: 1 }}
              drag={!prefersReducedMotion}
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragElastic={0.32}
              dragTransition={{ bounceStiffness: 420, bounceDamping: 26 }}
              onDragStart={() => {
                suppressNextClickRef.current = true;
              }}
              onDragEnd={(_event, info) => {
                const distance = Math.hypot(info.offset.x, info.offset.y);
                const velocity = Math.hypot(info.velocity.x, info.velocity.y);
                if (distance > 48 || velocity > 300) {
                  handleCycleMood();
                }
                requestAnimationFrame(() => {
                  suppressNextClickRef.current = false;
                });
              }}
              transition={SPRING_SNAPPY}
              className='san-stage-face rounded-full'
            >
              <SanMascot
                mood={mood}
                hairstyle={hairstyle}
                showFacialHair={showFacialHair}
                size={220}
                shape='circle'
                animated
                interactive
                disableTapScale
                onClick={() => {
                  if (suppressNextClickRef.current) return;
                  handleCycleMood();
                }}
                className='ring-1 ring-hairline'
              />
            </m.div>

            <p className='mt-6 text-sm text-ink font-medium text-center'>
              <span className='san-roll'>
                <b key={activeMeta.label}>{activeMeta.label}</b>
              </span>
              : <span className='text-body font-normal'>{activeMeta.note}</span>
            </p>
            <p className='mt-1.5 font-mono text-[11px] text-muted text-center'>
              Click or pull the portrait to switch through all 16 moods ·{' '}
              {activeHairMeta.label}
            </p>
          </div>

          {/* Haircut Switcher + Mood Switcher */}
          <div className='p-4 sm:p-5 border-t border-hairline bg-surface space-y-4'>
            <div className='flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-hairline/70'>
              <span className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                Haircut
              </span>
              <div className='flex flex-wrap items-center gap-1.5'>
                {SAN_HAIRSTYLES.map((styleId) => {
                  const isActive = hairstyle === styleId;
                  return (
                    <button
                      key={styleId}
                      type='button'
                      onClick={() => setHairstyle(styleId)}
                      aria-pressed={isActive}
                      className={cn(
                        'min-h-[44px] sm:min-h-[34px] px-3 py-1.5 rounded-md border font-mono text-xs transition-[transform,color,background-color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                        isActive
                          ? 'border-accent bg-accent-soft text-accent font-medium'
                          : 'border-hairline bg-canvas hover:bg-subtle text-ink',
                      )}
                    >
                      {SAN_HAIRSTYLE_META[styleId].label}
                    </button>
                  );
                })}
                <button
                  type='button'
                  onClick={() => setShowFacialHair((prev) => !prev)}
                  aria-pressed={showFacialHair}
                  className={cn(
                    'min-h-[44px] sm:min-h-[34px] px-3 py-1.5 rounded-md border font-mono text-xs transition-[transform,color,background-color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    showFacialHair
                      ? 'border-accent bg-accent-soft text-accent font-medium'
                      : 'border-hairline bg-canvas hover:bg-subtle text-muted',
                  )}
                >
                  {showFacialHair ? 'mustache: on' : 'mustache: off'}
                </button>
              </div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
              {SAN_MOODS.map((item) => {
                const isActive = mood === item;
                return (
                  <button
                    key={item}
                    type='button'
                    onClick={() => setMood(item)}
                    aria-pressed={isActive}
                    className={cn(
                      'min-h-[44px] sm:min-h-[38px] px-3 py-2 rounded-md border text-left text-xs font-mono transition-[transform,color,background-color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      isActive
                        ? 'border-accent bg-accent-soft text-accent font-medium'
                        : 'border-hairline bg-surface hover:bg-subtle hover:border-hairline-strong text-ink',
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* 2. Haircuts */}
      <section className='space-y-4'>
        <ScrollReveal>
          <div>
            <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-1'>
              Haircuts
            </p>
            <h2 className='font-primary text-xl font-bold tracking-tight text-ink'>
              Four haircuts
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80} className='space-y-4'>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            {SAN_HAIRSTYLES.map((styleId) => {
              const isSelected = hairstyle === styleId;
              const styleMeta = SAN_HAIRSTYLE_META[styleId];
              return (
                <button
                  key={styleId}
                  type='button'
                  onClick={() => setHairstyle(styleId)}
                  aria-pressed={isSelected}
                  className={cn(
                    'san-mood flex flex-col items-center p-4 rounded-lg border text-center',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isSelected
                      ? 'border-accent bg-accent-soft/40'
                      : 'border-hairline bg-surface hover:border-hairline-strong hover:bg-subtle/40',
                  )}
                >
                  <div className='san-mood-face'>
                    <SanMascot
                      mood={mood}
                      hairstyle={styleId}
                      showFacialHair={showFacialHair}
                      size={96}
                      shape='circle'
                      className='pointer-events-none'
                    />
                  </div>
                  <span className='mt-2.5 text-sm font-semibold text-ink'>
                    {styleMeta.label}
                  </span>
                  <span className='mt-0.5 text-[11px] text-muted leading-snug'>
                    {styleMeta.note}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Mix Parts */}
      <section className='space-y-4'>
        <ScrollReveal>
          <div className='flex flex-wrap items-end justify-between gap-3'>
            <div>
              <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-1'>
                Mix parts
              </p>
              <h2 className='font-primary text-xl font-bold tracking-tight text-ink'>
                Build a custom face
              </h2>
              <p className='mt-1 text-sm text-body'>
                Pick a haircut, eyes, mouth, and marks from different moods to
                combine them into one SVG.
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={handleShuffleMix}
                className={cn(
                  'inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] px-3 py-1.5 rounded-md',
                  'border border-hairline bg-surface hover:bg-hover text-xs font-mono text-ink',
                  'transition-colors active:scale-[0.98]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                )}
              >
                <Shuffle className='w-3.5 h-3.5 text-muted' />
                shuffle parts
              </button>
              <button
                type='button'
                onClick={handleDownloadMix}
                className={cn(
                  'inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] px-3 py-1.5 rounded-md',
                  'border border-hairline bg-surface hover:bg-hover text-xs font-mono text-ink',
                  'transition-colors active:scale-[0.98]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                )}
              >
                <Download className='w-3.5 h-3.5 text-muted' />
                download mix .svg
              </button>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80} className='space-y-4'>
          <div className='rounded-xl border border-hairline bg-surface p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6 items-center'>
            <div className='flex flex-col items-center gap-3'>
              <SanMascot
                mood={mixEyes}
                hairstyle={mixHair}
                showFacialHair={showFacialHair}
                eyesMood={mixEyes}
                mouthMood={mixMouth}
                extraMood={mixExtra}
                size={184}
                shape='rounded'
                animated
                interactive
                onClick={handleShuffleMix}
                className='ring-1 ring-hairline'
              />
              <p className='font-mono text-[11px] text-muted text-center'>
                {mixHair} · {mixEyes} + {mixMouth} + {mixExtra}
              </p>
            </div>

            <div className='space-y-4'>
              <div className='space-y-1.5'>
                <p className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                  Hair ({SAN_HAIRSTYLES.length})
                </p>
                <div className='flex flex-wrap gap-1.5'>
                  {SAN_HAIRSTYLES.map((styleId) => (
                    <button
                      key={styleId}
                      type='button'
                      onClick={() => setMixHair(styleId)}
                      className={cn(
                        'min-h-[44px] sm:min-h-[32px] px-2.5 py-1 rounded-md border font-mono text-[11px] transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                        mixHair === styleId
                          ? 'border-accent bg-accent-soft text-accent font-medium'
                          : 'border-hairline bg-canvas hover:bg-subtle text-ink',
                      )}
                    >
                      {SAN_HAIRSTYLE_META[styleId].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className='space-y-1.5'>
                <p className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                  Eyes &amp; Brows ({SAN_MIX.eyes.length})
                </p>
                <div className='flex flex-wrap gap-1.5'>
                  {SAN_MIX.eyes.map((item) => (
                    <button
                      key={item}
                      type='button'
                      onClick={() => setMixEyes(item)}
                      className={cn(
                        'min-h-[44px] sm:min-h-[32px] px-2.5 py-1 rounded-md border font-mono text-[11px] transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                        mixEyes === item
                          ? 'border-accent bg-accent-soft text-accent font-medium'
                          : 'border-hairline bg-canvas hover:bg-subtle text-ink',
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className='space-y-1.5'>
                <p className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                  Mouth ({SAN_MIX.mouth.length})
                </p>
                <div className='flex flex-wrap gap-1.5'>
                  {SAN_MIX.mouth.map((item) => (
                    <button
                      key={item}
                      type='button'
                      onClick={() => setMixMouth(item)}
                      className={cn(
                        'min-h-[44px] sm:min-h-[32px] px-2.5 py-1 rounded-md border font-mono text-[11px] transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                        mixMouth === item
                          ? 'border-accent bg-accent-soft text-accent font-medium'
                          : 'border-hairline bg-canvas hover:bg-subtle text-ink',
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className='space-y-1.5'>
                <p className='font-mono text-[11px] uppercase tracking-wider text-muted'>
                  Blush &amp; Marks ({SAN_MIX.extra.length})
                </p>
                <div className='flex flex-wrap gap-1.5'>
                  {SAN_MIX.extra.map((item) => (
                    <button
                      key={item}
                      type='button'
                      onClick={() => setMixExtra(item)}
                      className={cn(
                        'min-h-[44px] sm:min-h-[32px] px-2.5 py-1 rounded-md border font-mono text-[11px] transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                        mixExtra === item
                          ? 'border-accent bg-accent-soft text-accent font-medium'
                          : 'border-hairline bg-canvas hover:bg-subtle text-ink',
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. 3D Scroll-Driven Exploded Layers */}
      <section className='space-y-4'>
        <ScrollReveal>
          <div>
            <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-1'>
              Layers
            </p>
            <h2 className='font-primary text-xl font-bold tracking-tight text-ink'>
              How one face stacks up ({activeHairMeta.label} ·{' '}
              {activeMeta.label})
            </h2>
            <p className='mt-1 text-sm text-body max-w-2xl'>
              I stack seven SVG groups from back to front to draw each face.
              Each step adds one group on top of the last. Click a step to see
              that group on its own.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80} className='space-y-4'>
          <ol className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            {SAN_LAYERS.map((layerKey, index) => {
              const info = LAYER_INFO[layerKey];
              const isUnused = !layers[layerKey];
              const isIsolated = activeLayer === layerKey;
              return (
                <li key={layerKey}>
                  <button
                    type='button'
                    disabled={isUnused}
                    aria-pressed={isIsolated}
                    onClick={() =>
                      setActiveLayer((prev) =>
                        prev === layerKey ? null : layerKey,
                      )
                    }
                    className={cn(
                      'san-step group w-full rounded-xl border bg-surface p-3 text-left',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      isUnused && 'opacity-40 cursor-default',
                      isIsolated
                        ? 'border-accent bg-accent-soft'
                        : 'border-hairline hover:bg-hover',
                    )}
                  >
                    <span
                      className='san-step-art block aspect-square rounded-lg bg-subtle'
                      aria-hidden='true'
                    >
                      {SAN_LAYERS.slice(0, index + 1).map((key, depth) => {
                        const svg = layers[key];
                        if (!svg) return null;
                        const isCurrent = depth === index;
                        const dim = !isCurrent;
                        return (
                          <span
                            key={key}
                            className='san-step-layer'
                            style={{
                              opacity: isIsolated
                                ? isCurrent
                                  ? 1
                                  : 0
                                : dim
                                  ? 0.28
                                  : 1,
                            }}
                            dangerouslySetInnerHTML={{ __html: svg }}
                          />
                        );
                      })}
                    </span>
                    <span className='mt-3 flex items-baseline gap-2'>
                      <span className='font-mono text-xs text-muted'>
                        {info.number}
                      </span>
                      <span className='text-sm font-semibold text-ink'>
                        {info.title}
                      </span>
                      {isUnused && (
                        <span className='font-mono text-[10px] text-muted'>
                          unused
                        </span>
                      )}
                    </span>
                    <span className='mt-1 block text-xs text-muted'>
                      {info.detail}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </ScrollReveal>
      </section>

      {/* 5. All 16 Moods */}
      <section className='space-y-4'>
        <ScrollReveal>
          <div>
            <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-1'>
              Moods
            </p>
            <h2 className='font-primary text-xl font-bold tracking-tight text-ink'>
              All 16 moods
            </h2>
            <p className='mt-1 text-sm text-body'>
              Hover any card to preview its motion, or click to load it on the
              stage.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80} className='space-y-4'>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            {SAN_MOODS.map((item) => {
              const isSelected = mood === item;
              const [moodTurn] = SAN_POSE[item];
              return (
                <button
                  key={item}
                  type='button'
                  onClick={() => setMood(item)}
                  aria-pressed={isSelected}
                  className={cn(
                    'san-mood flex flex-col items-center p-4 rounded-lg border text-center',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isSelected
                      ? 'border-accent bg-accent-soft/40'
                      : 'border-hairline bg-surface hover:border-hairline-strong hover:bg-subtle/40',
                  )}
                >
                  <div className='san-mood-face'>
                    <SanMascot
                      mood={item}
                      hairstyle={hairstyle}
                      showFacialHair={showFacialHair}
                      size={96}
                      shape='circle'
                      className='pointer-events-none'
                    />
                  </div>
                  <div className='mt-2.5 w-full flex items-baseline justify-between gap-2 px-1'>
                    <span className='text-sm font-semibold text-ink'>
                      {SAN_MOOD_META[item].label}
                    </span>
                    <span className='font-mono text-[11px] text-muted'>
                      {moodTurn > 0 ? `+${moodTurn}` : moodTurn}&deg;
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* 6. Theme Colors & Palette */}
      <section className='space-y-5'>
        <ScrollReveal>
          <div>
            <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-1'>
              Theme colors
            </p>
            <h2 className='font-primary text-xl font-bold tracking-tight text-ink'>
              Light and dark backgrounds
            </h2>
            <p className='mt-1 text-sm text-body max-w-2xl'>
              The background circle uses the{' '}
              <code className='font-mono text-xs text-ink'>--rgb-accent</code>{' '}
              CSS variable, switching between{' '}
              <code className='font-mono text-xs text-ink'>#1A63D8</code> in
              light mode and{' '}
              <code className='font-mono text-xs text-ink'>#F5B942</code> in
              dark mode. Click any swatch to copy its hex code.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80} className='space-y-5'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='rounded-xl border border-hairline bg-[#FAF9F6] p-6 flex flex-col items-center gap-4'>
              <div className='w-full flex items-center justify-between font-mono text-[11px]'>
                <span className='text-[#18181B] font-medium'>Light Mode</span>
                <span className='text-[#1A63D8]'>#1A63D8</span>
              </div>
              <SanMascot
                mood={mood}
                hairstyle={hairstyle}
                showFacialHair={showFacialHair}
                size={136}
                ground={SAN_PALETTE.lightGround}
                shape='circle'
                animated
              />
            </div>

            <div className='rounded-xl border border-[#26262C] bg-[#0E0E10] p-6 flex flex-col items-center gap-4'>
              <div className='w-full flex items-center justify-between font-mono text-[11px]'>
                <span className='text-[#F4F4F0] font-medium'>Dark Mode</span>
                <span className='text-[#F5B942]'>#F5B942</span>
              </div>
              <SanMascot
                mood={mood}
                hairstyle={hairstyle}
                showFacialHair={showFacialHair}
                size={136}
                ground={SAN_PALETTE.darkGround}
                shape='circle'
                animated
              />
            </div>
          </div>

          {/* Click-to-copy palette swatches */}
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-2.5'>
            {PALETTE_SWATCHES.map((swatch) => {
              const isCopied = copiedHex === swatch.hex;
              return (
                <button
                  key={swatch.name}
                  type='button'
                  onClick={() => handleCopyHex(swatch.hex)}
                  className={cn(
                    'san-color flex items-center gap-3 min-h-[56px] p-3 rounded-lg border border-hairline bg-surface',
                    'hover:border-hairline-strong text-left transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  )}
                >
                  <span
                    className='san-color-dot w-8 h-8 rounded-full border border-hairline-strong shrink-0'
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className='min-w-0 flex-1'>
                    <span className='block text-xs font-semibold text-ink truncate'>
                      {swatch.name}
                    </span>
                    <span className='block font-mono text-[11px] text-muted'>
                      {isCopied ? (
                        <span
                          key='copied'
                          className='san-roll-text inline-flex items-center gap-1 text-accent'
                        >
                          <Check className='w-3 h-3' />
                          copied
                        </span>
                      ) : (
                        swatch.hex
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default SanContainer;
