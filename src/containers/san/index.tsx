import { Download, Shuffle } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useCallback, useMemo, useState } from 'react';

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
  TSanMood,
} from '@/lib/san';
import { cn } from '@/lib/utils';

import { Reveal } from '@/components/Atoms/Motion';
import SanMascot from '@/components/Atoms/svg/SanMascot';

const LAYER_LABELS: Record<(typeof SAN_LAYERS)[number], string> = {
  ground: '01 · Ground',
  head: '02 · Head',
  blush: '03 · Blush',
  hair: '04 · Hair',
  brows: '05 · Brows',
  face: '06 · Face',
  marks: '07 · Marks',
};

const SanContainer = () => {
  const { resolvedTheme } = useTheme();
  const [mood, setMood] = useState<TSanMood>('grin');
  const [hairstyle, setHairstyle] = useState<TSanHairstyle>('textured-crop');
  const [showFacialHair, setShowFacialHair] = useState(true);

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
        <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
          Mascot
        </p>
        <h1 className='font-primary text-3xl sm:text-4xl font-bold tracking-tight text-ink'>
          San
        </h1>
        <p className='text-base leading-relaxed text-body max-w-2xl'>
          San is my illustrated stand-in across this site. Everything lives in
          one <code className='font-mono text-xs text-ink'>1240x1240</code> SVG
          file, split into separate face, hair, brow, and expression parts so I
          can swap moods or haircuts without shipping extra image files.
        </p>
      </header>

      {/* 1. Interactive Stage */}
      <Reveal>
        <section
          aria-label='Interactive San mood stage'
          className='rounded-xl border border-hairline bg-surface overflow-hidden'
        >
          <div className='flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-hairline bg-subtle/50'>
            <div className='flex items-center gap-2 font-mono text-xs'>
              <span className='text-muted'>mood:</span>
              <span className='px-2 py-0.5 rounded bg-accent-soft text-accent font-medium'>
                {mood}
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

          <div className='flex flex-col items-center justify-center px-6 py-12 sm:py-16 bg-canvas/40'>
            <SanMascot
              mood={mood}
              hairstyle={hairstyle}
              showFacialHair={showFacialHair}
              size={220}
              shape='circle'
              interactive
              onClick={handleCycleMood}
              className='ring-1 ring-hairline'
            />
            <p className='mt-6 text-sm text-ink font-medium text-center'>
              {activeMeta.label}:{' '}
              <span className='text-body font-normal'>{activeMeta.note}</span>
            </p>
            <p className='mt-1.5 font-mono text-[11px] text-muted text-center'>
              Click the portrait to step through all 12 moods ·{' '}
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
                        'min-h-[44px] sm:min-h-[34px] px-3 py-1.5 rounded-md border font-mono text-xs transition-all active:scale-[0.98]',
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
                    'min-h-[44px] sm:min-h-[34px] px-3 py-1.5 rounded-md border font-mono text-xs transition-all active:scale-[0.98]',
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
                      'min-h-[44px] sm:min-h-[38px] px-3 py-2 rounded-md border text-left text-xs font-mono transition-all active:scale-[0.98]',
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
      </Reveal>

      {/* 2. Haircuts */}
      <Reveal delay={0.03}>
        <section className='space-y-4'>
          <div>
            <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-1'>
              Haircuts
            </p>
            <h2 className='font-primary text-xl font-bold tracking-tight text-ink'>
              Four haircuts
            </h2>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            {SAN_HAIRSTYLES.map((styleId) => {
              const isSelected = hairstyle === styleId;
              const styleMeta = SAN_HAIRSTYLE_META[styleId];
              return (
                <button
                  key={styleId}
                  type='button'
                  onClick={() => setHairstyle(styleId)}
                  className={cn(
                    'flex flex-col items-center p-4 rounded-lg border text-center transition-all active:scale-[0.98]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isSelected
                      ? 'border-accent bg-accent-soft/40'
                      : 'border-hairline bg-surface hover:border-hairline-strong hover:bg-subtle/40',
                  )}
                >
                  <SanMascot
                    mood={mood}
                    hairstyle={styleId}
                    showFacialHair={showFacialHair}
                    size={96}
                    shape='circle'
                    className='pointer-events-none'
                  />
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
        </section>
      </Reveal>

      {/* 3. Mix Parts */}
      <Reveal delay={0.04}>
        <section className='space-y-4'>
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
        </section>
      </Reveal>

      {/* 4. Layers */}
      <Reveal delay={0.05}>
        <section className='space-y-4'>
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
              Empty groups stay hidden when a mood skips blush or marks.
            </p>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5'>
            {SAN_LAYERS.map((layerKey) => {
              const svg = layers[layerKey];
              return (
                <div
                  key={layerKey}
                  className={cn(
                    'rounded-lg border border-hairline bg-surface p-3 flex flex-col items-center justify-between gap-2',
                    !svg && 'opacity-45',
                  )}
                >
                  <div className='w-20 h-20 flex items-center justify-center rounded-md bg-canvas/70 border border-hairline/60 overflow-hidden'>
                    {svg ? (
                      <div
                        className='w-full h-full'
                        dangerouslySetInnerHTML={{ __html: svg }}
                      />
                    ) : (
                      <span className='font-mono text-[10px] text-muted'>
                        unused
                      </span>
                    )}
                  </div>
                  <span className='font-mono text-[10px] text-muted text-center'>
                    {LAYER_LABELS[layerKey]}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* 5. All 12 Moods */}
      <Reveal delay={0.06}>
        <section className='space-y-4'>
          <div>
            <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-1'>
              Moods
            </p>
            <h2 className='font-primary text-xl font-bold tracking-tight text-ink'>
              All 12 moods
            </h2>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            {SAN_MOODS.map((item) => {
              const isSelected = mood === item;
              return (
                <button
                  key={item}
                  type='button'
                  onClick={() => setMood(item)}
                  className={cn(
                    'flex flex-col items-center p-4 rounded-lg border text-center transition-all active:scale-[0.98]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isSelected
                      ? 'border-accent bg-accent-soft/40'
                      : 'border-hairline bg-surface hover:border-hairline-strong hover:bg-subtle/40',
                  )}
                >
                  <SanMascot
                    mood={item}
                    hairstyle={hairstyle}
                    showFacialHair={showFacialHair}
                    size={96}
                    shape='circle'
                    className='pointer-events-none'
                  />
                  <span className='mt-2.5 text-sm font-semibold text-ink'>
                    {SAN_MOOD_META[item].label}
                  </span>
                  <span className='mt-0.5 font-mono text-[11px] text-muted'>
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* 6. Theme Colors */}
      <Reveal delay={0.08}>
        <section className='space-y-4'>
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
              dark mode.
            </p>
          </div>

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
              />
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default SanContainer;
