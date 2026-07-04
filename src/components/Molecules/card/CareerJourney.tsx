import { ArrowRight, Briefcase, Code, Sprout, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

import { cn } from '@/lib/utils';

const MILESTONES = [
  {
    id: 'agri',
    period: '2016 – 2020',
    title: 'Agricultural Engineering',
    institution: 'Bogor Agricultural University (IPB)',
    icon: Sprout,
    iconColor:
      'text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20',
    borderColor: 'border-emerald-500/30 dark:border-emerald-400/20',
    description:
      'Studied engineering principles applied to agricultural systems. This agronomy foundation taught me analytical problem-solving, thermodynamics, and system structures. It gave me the curiosity to peek under the hood of complex systems.',
    badge: 'Origin',
  },
  {
    id: 'bootcamp',
    period: '2021',
    title: 'Fullstack JavaScript Developer',
    institution: 'Hacktiv8 Bootcamp',
    icon: Code,
    iconColor:
      'text-primary-500 dark:text-primary-400 bg-primary-500/10 dark:bg-primary-500/20',
    borderColor: 'border-primary-500/30 dark:border-primary-400/20',
    description:
      'Pivoted to software development with a rigorous 12-hour/day coding bootcamp. Mastered JS/TS ecosystem, React, Node.js, and databases. Awarded the Best Individual Project for build quality and architectural decisions.',
    badge: 'The Pivot',
    badgeIcon: Trophy,
  },
  {
    id: 'engineer',
    period: '2021 – 2025',
    title: 'Software Engineer (Frontend)',
    institution: 'Female Daily Network',
    icon: Briefcase,
    iconColor:
      'text-violet-500 dark:text-violet-400 bg-violet-500/10 dark:bg-violet-500/20',
    borderColor: 'border-violet-500/30 dark:border-violet-400/20',
    description:
      "Developed high-performance web applications at Indonesia's largest beauty platform. Crafted end-to-end ticketing flows, video streaming widgets, and CMS architectures. Evolved reusable UI libraries in a monorepo, optimized app speed, and mentored junior developers.",
    badge: 'Professional Craft',
  },
];

const CareerJourney = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 mb-8'>
        <h3 className='font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-zinc-500'>
          My Career Evolution
        </h3>
        <h2 className='font-secondary text-2xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2'>
          Connecting the Dots
        </h2>
        <p className='font-primary text-sm text-slate-500 dark:text-zinc-400 max-w-xl'>
          Steve Jobs famously said you can only connect the dots looking
          backward. Here is how my background in hardware engineering and
          agronomy feeds my passion for software engineering today.
        </p>
      </div>

      <div className='relative pl-6 md:pl-10 border-l border-slate-200 dark:border-zinc-800/80 space-y-12 max-w-3xl mx-auto'>
        {MILESTONES.map((milestone, idx) => {
          const Icon = milestone.icon;
          const BadgeIcon = milestone.badgeIcon;

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className='relative group'
            >
              {/* Timeline Dot Indicator */}
              <div className='absolute -left-[35px] md:-left-[51px] top-1 z-20 flex items-center justify-center'>
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className={cn(
                    'w-[18px] h-[18px] md:w-6 md:h-6 rounded-full border bg-white dark:bg-zinc-950 flex items-center justify-center shadow-sm z-30 transition-colors',
                    milestone.id === 'agri' &&
                      'border-emerald-500 dark:border-emerald-400',
                    milestone.id === 'bootcamp' &&
                      'border-primary-500 dark:border-primary-400',
                    milestone.id === 'engineer' &&
                      'border-violet-500 dark:border-violet-400',
                  )}
                >
                  <div
                    className={cn(
                      'w-2 h-2 md:w-3 md:h-3 rounded-full',
                      milestone.id === 'agri' &&
                        'bg-emerald-500 dark:bg-emerald-400',
                      milestone.id === 'bootcamp' &&
                        'bg-primary-500 dark:bg-primary-400',
                      milestone.id === 'engineer' &&
                        'bg-violet-500 dark:bg-violet-400',
                    )}
                  />
                </motion.div>
              </div>

              {/* Card Container */}
              <div
                className={cn(
                  'rounded-2xl border p-5 md:p-6 transition-all duration-300',
                  'background-card border-slate-200 dark:border-zinc-700/40 hover:border-slate-300 dark:hover:border-zinc-600/60 shadow-sm relative group overflow-hidden',
                )}
              >
                {/* Spotlight Background */}
                <div className='absolute inset-0 bg-gradient-to-tr from-primary-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

                <div className='flex flex-col sm:flex-row sm:items-start gap-4'>
                  {/* Icon Column */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center flex-none shadow-sm',
                      milestone.iconColor,
                    )}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Content Column */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-wrap items-center gap-2 mb-1.5'>
                      <span className='font-mono text-xs font-semibold text-primary-500 dark:text-primary-400 bg-primary-500/5 dark:bg-primary-400/5 px-2 py-0.5 rounded'>
                        {milestone.period}
                      </span>
                      <span className='font-primary text-xs font-semibold flex items-center gap-1 text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded'>
                        {BadgeIcon && (
                          <BadgeIcon size={12} className='text-amber-500' />
                        )}
                        {milestone.badge}
                      </span>
                    </div>

                    <h4 className='font-secondary text-lg font-bold text-slate-800 dark:text-zinc-100 mb-0.5 leading-snug'>
                      {milestone.title}
                    </h4>
                    <p className='font-primary text-xs md:text-sm text-slate-400 dark:text-zinc-500 mb-3.5 font-medium'>
                      {milestone.institution}
                    </p>

                    <p className='font-primary text-sm text-slate-600 dark:text-zinc-300 leading-relaxed text-pretty'>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector Arrow (Desktop only) */}
              {idx < MILESTONES.length - 1 && (
                <div className='hidden md:flex absolute -bottom-9 left-1/2 -translate-x-1/2 text-slate-300 dark:text-zinc-800 z-10 animate-bounce'>
                  <ArrowRight size={16} className='rotate-90' />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CareerJourney;
