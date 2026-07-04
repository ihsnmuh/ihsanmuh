import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import HeroSocialMedia from './HeroSocialMedia';
import HeroTech from './HeroTech';

const Hero = () => {
  const show = LoaderView();

  return (
    <section
      className={cn(
        'h-[100dvh] flex items-center relative overflow-hidden',
        'bg-white dark:bg-slate-900',
        'border-b border-slate-200 dark:border-slate-800',
      )}
      data-fade-in={show ? 'true' : 'false'}
    >
      {/* Subtle grid background */}
      <div className='background-grid pointer-events-none' />

      {/* Radial glow accent */}
      <div
        className={cn(
          'absolute -top-32 -left-32 h-96 w-96 rounded-full',
          'bg-primary-500/10 dark:bg-primary-500/5 blur-3xl',
          'pointer-events-none',
        )}
      />

      {/* Left accent bar — Swiss International signature */}
      <div className='absolute left-0 top-16 bottom-16 w-1 bg-primary-500 rounded-r-full' />

      <div className='layout flex flex-col md:flex-row items-center justify-between w-full gap-8 relative z-10 pl-6 sm:pl-10'>
        {/* Left column: Bio & Info */}
        <div className='flex flex-col gap-3 sm:gap-4 flex-[1.2] w-full max-w-2xl'>
          {/* Available badge */}
          <div className='flex items-center gap-2' data-fade='1'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500' />
            </span>
            <span className='font-mono text-xs uppercase tracking-widest text-green-600 dark:text-green-400'>
              Available for opportunities
            </span>
          </div>

          {/* Role label */}
          <p
            className='font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500'
            data-fade='2'
          >
            Software Engineer
          </p>

          {/* Name */}
          <h1
            className={cn(
              'font-bold font-secondary leading-tight',
              'text-[clamp(2.5rem,8vw,6.5rem)] py-0 sm:py-6',
              'bg-clip-text text-transparent',
              'animate-gradient bg-[length:200%_200%]',
              'bg-gradient-to-r from-primary-500 via-cyan-500 dark:via-orange-400 to-primary-700 dark:to-yellow-500',
            )}
            data-fade='3'
          >
            M Ihsan
          </h1>

          {/* Tagline */}
          <p
            className={cn(
              'font-primary text-slate-600 dark:text-slate-300',
              'text-sm sm:text-base md:text-lg max-w-xl',
            )}
            data-fade='4'
          >
            Specializes in building web applications that deliver business
            value, exceptional user experiences, and empower collaborative
            teams.{' '}
            <span className='font-semibold text-primary-500'>4+ years</span>{' '}
            shipping products that matter.
          </p>

          {/* CTAs + social icons */}
          <div className='mt-0 sm:mt-1' data-fade='5'>
            <HeroSocialMedia />
          </div>

          {/* Divider + tech + stats */}
          <div
            className={cn(
              'flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6',
              'mt-1 sm:mt-2 pt-4 sm:pt-5',
              'border-t border-slate-200 dark:border-slate-800',
            )}
            data-fade='6'
          >
            <HeroTech />

            {/* Stats — always visible */}
            <div className='flex gap-6 sm:ml-auto'>
              <div className='flex flex-col'>
                <span className='text-lg sm:text-xl font-bold text-primary-500'>
                  4+
                </span>
                <span className='font-mono text-xs uppercase tracking-wider text-slate-400'>
                  Years
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='text-lg sm:text-xl font-bold text-primary-500'>
                  10+
                </span>
                <span className='font-mono text-xs uppercase tracking-wider text-slate-400'>
                  Projects
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='text-lg sm:text-xl font-bold text-primary-500'>
                  2
                </span>
                <span className='font-mono text-xs uppercase tracking-wider text-slate-400'>
                  Companies
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Animated Polaroid Avatar */}
        <div
          className='flex-1 hidden md:flex items-center justify-center relative pr-6 lg:pr-12 group/avatar'
          data-fade='5'
        >
          {/* Subtle gradient glow accent */}
          <div className='absolute -inset-4 bg-gradient-to-tr from-primary-500/10 via-cyan-500/5 to-violet-500/10 rounded-full blur-3xl opacity-60 dark:opacity-40 group-hover/avatar:opacity-100 transition-opacity duration-500 pointer-events-none' />

          {/* Polaroid Frame */}
          <div className='relative p-4 pb-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-zinc-700/40 rounded-2xl shadow-xl transition-all duration-500 group-hover/avatar:-rotate-2 group-hover/avatar:scale-105'>
            <div className='relative overflow-hidden rounded-xl w-60 h-60 lg:w-68 lg:h-68 bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900'>
              <Image
                src='/images/avatar.png'
                alt='Muhammad Ihsan'
                width={300}
                height={300}
                className='object-cover w-full h-full grayscale group-hover/avatar:grayscale-0 transition-all duration-500 scale-105 group-hover/avatar:scale-100'
                priority
              />
            </div>
            {/* Polaroid Label */}
            <div className='mt-4 text-center'>
              <span className='font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover/avatar:text-primary-500 dark:group-hover/avatar:text-primary-400 transition-colors duration-300'>
                @chernodev
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href='#summary'
        className={cn(
          'absolute bottom-6 left-1/2 -translate-x-1/2',
          'text-slate-400 hover:text-primary-500 transition-colors duration-200',
        )}
      >
        <span className='flex flex-col items-center gap-1 animate-bounce'>
          <span className='font-mono text-xs uppercase tracking-widest'>
            scroll
          </span>
          <ChevronDown size={16} />
        </span>
      </a>
    </section>
  );
};

export default Hero;
