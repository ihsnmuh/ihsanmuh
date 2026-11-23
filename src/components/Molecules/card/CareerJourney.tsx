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
    iconColor: 'text-moss-green bg-moss-green/15',
    borderColor: 'border-moss-green/30',
    description:
      'Studied engineering principles applied to agricultural systems. This agronomy foundation taught me analytical problem-solving, thermodynamics, and system structures. It gave me the curiosity to peek under the hood of complex systems.',
    badge: 'Degree',
  },
  {
    id: 'bootcamp',
    period: '2021',
    title: 'Fullstack JavaScript Developer',
    institution: 'Hacktiv8 Bootcamp',
    icon: Code,
    iconColor: 'text-amber-glow bg-amber-glow/15',
    borderColor: 'border-amber-glow/30',
    description:
      'Switched into software development through a 12-hour-a-day coding bootcamp covering JavaScript, TypeScript, React, Node.js, and databases. Received the Best Individual Project award.',
    badge: 'Bootcamp',
    badgeIcon: Trophy,
  },
  {
    id: 'engineer',
    period: '2021 – 2025',
    title: 'Software Engineer (Frontend)',
    institution: 'Female Daily Network',
    icon: Briefcase,
    iconColor: 'text-signal-blue bg-signal-blue/15',
    borderColor: 'border-signal-blue/30',
    description:
      "Built web applications at Indonesia's largest beauty platform, including event ticketing flows, video streaming widgets, and internal CMS tools. Maintained shared UI libraries in a monorepo, improved page speed, and mentored junior developers.",
    badge: 'Work',
  },
];

const CareerJourney = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 mb-6'>
        <h3 className='font-mono text-xs uppercase tracking-widest text-accent font-medium'>
          Timeline
        </h3>
        <h2 className='font-primary text-xl sm:text-2xl font-bold text-ink tracking-tight'>
          How I got into software
        </h2>
        <p className='font-primary text-sm text-body max-w-xl leading-relaxed'>
          I did not start in computer science. Here is how I moved from
          agricultural engineering into building web applications.
        </p>
      </div>

      <div className='relative pl-6 md:pl-8 border-l border-hairline space-y-6 max-w-3xl mx-auto'>
        {MILESTONES.map((milestone, idx) => {
          const Icon = milestone.icon;
          const BadgeIcon = milestone.badgeIcon;

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className='relative group'
            >
              {/* Timeline Dot Indicator */}
              <div className='absolute -left-[31px] md:-left-[39px] top-1 z-20 flex items-center justify-center'>
                <div className='w-4 h-4 rounded-full border border-hairline bg-paper-white flex items-center justify-center shadow-none'>
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full',
                      milestone.id === 'agri' && 'bg-moss-green',
                      milestone.id === 'bootcamp' && 'bg-amber-glow',
                      milestone.id === 'engineer' && 'bg-signal-blue',
                    )}
                  />
                </div>
              </div>

              {/* Card Container */}
              <div
                className={cn(
                  'rounded-sm border border-hairline p-4 sm:p-5 transition-colors duration-150',
                  'bg-paper-white hover:bg-cream-paper shadow-none relative overflow-hidden',
                )}
              >
                <div className='flex flex-col sm:flex-row sm:items-start gap-3.5'>
                  {/* Icon Column */}
                  <div
                    className={cn(
                      'w-9 h-9 rounded-sm flex items-center justify-center flex-none border border-hairline',
                      milestone.iconColor,
                    )}
                  >
                    <Icon size={18} />
                  </div>

                  {/* Content Column */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-wrap items-center gap-2 mb-1'>
                      <span className='font-mono text-xs font-semibold text-deep-moss bg-soft-linen px-2 py-0.5 rounded-full border border-hairline'>
                        {milestone.period}
                      </span>
                      <span className='font-ui text-xs font-medium flex items-center gap-1 text-olive-char bg-pale-stone/70 px-2 py-0.5 rounded-full'>
                        {BadgeIcon && (
                          <BadgeIcon size={12} className='text-amber-glow' />
                        )}
                        {milestone.badge}
                      </span>
                    </div>

                    <h4 className='font-primary text-base sm:text-lg font-bold text-deep-moss mb-0.5 leading-snug'>
                      {milestone.title}
                    </h4>
                    <p className='font-mono text-xs text-sage-gray mb-2.5'>
                      {milestone.institution}
                    </p>

                    <p className='font-ui text-xs sm:text-sm text-olive-char leading-relaxed'>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector Arrow (Desktop only) */}
              {idx < MILESTONES.length - 1 && (
                <div className='hidden md:flex absolute -bottom-5 left-1/2 -translate-x-1/2 text-sage-gray z-10'>
                  <ArrowRight size={14} className='rotate-90 text-sage-gray' />
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
