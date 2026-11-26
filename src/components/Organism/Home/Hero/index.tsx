import dynamic from 'next/dynamic';

import { Experiences } from '@/constant/experience';
import { useAfterIdle } from '@/helpers/useAfterIdle';

import HeroSocialMedia from './HeroSocialMedia';
import HeroTech from './HeroTech';

const HeroGlyphCanvas = dynamic(
  () => import('@/components/Atoms/canvas/HeroGlyphCanvas'),
  { ssr: false },
);

const Hero = () => {
  const canvasReady = useAfterIdle();

  return (
    <section className='relative text-body pt-6 sm:pt-12'>
      <div className='pointer-events-none absolute -top-24 sm:-top-28 -bottom-16 left-1/2 -translate-x-1/2 w-screen'>
        {canvasReady && <HeroGlyphCanvas />}
      </div>

      <div className='relative z-10 flex flex-col gap-6 max-w-3xl'>
        <div className='hero-rise [--hero-delay:0ms] inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-accent-soft/80 border border-accent/25 text-xs font-mono text-accent font-medium select-none'>
          <span className='w-1.5 h-1.5 rounded-full bg-accent animate-pulse' />
          <span>Open for work &amp; freelance</span>
        </div>

        <h1 className='font-primary font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-tight text-ink'>
          Software engineer building fast,{' '}
          <span className='text-accent'>maintainable web apps</span>.
        </h1>

        <p className='text-body text-base sm:text-lg leading-relaxed max-w-2xl'>
          I&apos;m{' '}
          <span className='font-semibold text-ink'>Muhammad Ihsan</span>, a
          software engineer in Jakarta with{' '}
          <span className='font-medium text-ink'>4+ years</span> of experience.
          I build full-stack web applications across the React and TypeScript
          ecosystem.
        </p>

        <div className='hero-rise [--hero-delay:80ms] pt-2'>
          <HeroSocialMedia />
        </div>
      </div>

      <div className='hero-rise [--hero-delay:160ms] relative z-10 mt-14 pt-8 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-6'>
        <HeroTech />

        <div className='flex items-center gap-8 sm:ml-auto tabular-nums'>
          <div className='flex flex-col'>
            <span className='font-primary text-2xl font-bold tracking-tight text-ink leading-none'>
              4+
            </span>
            <span className='font-mono text-[11px] uppercase tracking-wider text-muted mt-1.5'>
              Years XP
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='font-primary text-2xl font-bold tracking-tight text-ink leading-none'>
              10+
            </span>
            <span className='font-mono text-[11px] uppercase tracking-wider text-muted mt-1.5'>
              Projects
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='font-primary text-2xl font-bold tracking-tight text-ink leading-none'>
              {Experiences.length}
            </span>
            <span className='font-mono text-[11px] uppercase tracking-wider text-muted mt-1.5'>
              Companies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
