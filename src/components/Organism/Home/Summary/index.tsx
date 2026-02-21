import { Briefcase, Footprints, Layers, Rocket } from 'lucide-react';

import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/Atoms/links/UnderlineLink';
import Title from '@/components/Atoms/title';

const stats = [
  {
    icon: Briefcase,
    value: '4+',
    label: 'Years Experience',
  },
  {
    icon: Layers,
    value: '2',
    label: 'Companies',
  },
  {
    icon: Rocket,
    value: '10+',
    label: 'Projects Shipped',
  },
  {
    icon: Footprints,
    value: '1000+',
    label: 'km Running',
  },
];

const Summary = () => {
  return (
    <section id='summary' className={cn('background', 'mt-16 mb-16')}>
      <div className='layout'>
        <Title title='Short Story' />

        <div className='mt-8 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start'>
          {/* Bio — left col */}
          <div className='lg:col-span-3 space-y-4'>
            <p className='font-primary text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300'>
              Hi, I&apos;m{' '}
              <span className='font-bold text-slate-900 dark:text-slate-100'>
                Muhammad Ihsan
              </span>
              , a Software Engineer with a strong frontend foundation, slowly
              making my way into the full stack. I spent 4 years at{' '}
              <UnderlineLink href='https://femaledaily.com/'>
                Female Daily Network
              </UnderlineLink>
              , Indonesia&apos;s largest beauty platform, working across
              multiple product teams.
            </p>

            <p className='font-primary text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300'>
              I mostly work with{' '}
              <span className='font-semibold text-slate-900 dark:text-slate-100'>
                React, Next.js, TypeScript, and Node.js
              </span>
              . I care a lot about performance and writing code that&apos;s easy
              to maintain. Outside of work, I&apos;m usually out running or
              breaking things on side projects.
            </p>

            {/* Open to work badge */}
            <div className='pt-2'>
              <span
                className={cn(
                  'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
                  'border border-emerald-200 dark:border-emerald-800/60',
                  'bg-emerald-50 dark:bg-emerald-900/20',
                  'text-emerald-700 dark:text-emerald-400',
                )}
              >
                <span className='relative flex h-2 w-2'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
                  <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500' />
                </span>
                Open to new opportunities
              </span>
            </div>
          </div>

          {/* Stats — right col */}
          <div className='lg:col-span-2 grid grid-cols-2 gap-4'>
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className={cn(
                  'group relative flex flex-col gap-2 p-4 rounded-xl overflow-hidden',
                  'border border-slate-200 dark:border-zinc-700/40',
                  'bg-white dark:bg-slate-800/50',
                  'shadow-sm cursor-default',
                  'transition-all duration-300 ease-in-out',
                  'hover:-translate-y-1 hover:shadow-md',
                  'hover:border-primary-300 dark:hover:border-primary-700',
                )}
              >
                {/* Background glow on hover */}
                <div className='absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                <Icon
                  size={18}
                  className='relative text-slate-400 dark:text-slate-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300'
                />
                <p className='relative font-secondary font-bold text-2xl text-slate-900 dark:text-slate-100 leading-none'>
                  {value}
                </p>
                <p className='relative font-primary text-xs text-slate-500 dark:text-slate-400'>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
