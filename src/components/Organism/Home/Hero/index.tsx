import { motion } from 'motion/react';

import { LoaderView } from '@/lib/loader';

import HeroSocialMedia from './HeroSocialMedia';
import HeroTech from './HeroTech';

const Hero = () => {
  const show = LoaderView();

  return (
    <section
      className='relative text-body pt-6 sm:pt-12'
      data-fade-in={show ? 'true' : 'false'}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className='flex flex-col gap-6 max-w-3xl'
      >
        <div className='inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-accent-soft/80 border border-accent/25 text-xs font-mono text-accent font-medium select-none'>
          <span className='w-1.5 h-1.5 rounded-full bg-accent animate-pulse' />
          <span>Available for full-time &amp; consulting</span>
        </div>

        <h1 className='font-primary font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-tight text-ink'>
          Frontend engineer building fast,{' '}
          <span className='text-accent'>maintainable web apps</span>.
        </h1>

        <p className='text-body text-base sm:text-lg leading-relaxed max-w-2xl'>
          I&apos;m{' '}
          <span className='font-semibold text-ink'>Muhammad Ihsan</span>, a
          software engineer in Jakarta with{' '}
          <span className='font-medium text-ink'>4+ years</span> of experience.
          I build React, Next.js, and TypeScript applications, and I&apos;m
          expanding into full-stack work.
        </p>

        <div className='pt-2'>
          <HeroSocialMedia />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className='mt-14 pt-8 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-6'
      >
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
              2
            </span>
            <span className='font-mono text-[11px] uppercase tracking-wider text-muted mt-1.5'>
              Companies
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
