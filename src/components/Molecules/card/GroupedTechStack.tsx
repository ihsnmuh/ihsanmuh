import { Layout, Server, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

import { cn } from '@/lib/utils';

import StackIcon from '@/components/Atoms/Stacks';

const CATEGORIES = [
  {
    title: 'Frontend',
    icon: Layout,
    iconColor: 'text-signal-blue bg-signal-blue/15 border-signal-blue/30',
    skills: [
      'TypeScript',
      'JavaScript',
      'Next.js',
      'React.js',
      'TailwindCSS',
      'ReactQuery',
      'Redux',
      'PWA',
    ],
  },
  {
    title: 'Backend & DB',
    icon: Server,
    iconColor: 'text-moss-green bg-moss-green/15 border-moss-green/30',
    skills: [
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'MongoDB',
      'GraphQL',
      'JWT',
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: Wrench,
    iconColor: 'text-amber-glow bg-amber-glow/15 border-dark-amber/30',
    skills: [
      'Docker',
      'Figma',
      'Nginx',
      'Jest',
      'Storybook',
      'Webpack',
      'Vite',
      'UI/UX',
    ],
  },
];

const GroupedTechStack = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 mb-6'>
        <h3 className='font-mono text-xs uppercase tracking-widest text-accent font-medium'>
          Tools &amp; Stack
        </h3>
        <h2 className='font-primary text-xl sm:text-2xl font-bold text-ink tracking-tight'>
          What I use day to day
        </h2>
        <p className='font-primary text-sm text-body max-w-xl leading-relaxed'>
          Languages, frameworks, and tools I work with regularly.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {CATEGORIES.map((cat, idx) => {
          const CategoryIcon = cat.icon;

          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={cn(
                'rounded-sm border border-hairline p-4 sm:p-5 relative transition-colors duration-150',
                'bg-paper-white hover:bg-cream-paper shadow-none',
              )}
            >
              {/* Heading */}
              <div className='flex items-center gap-2.5 mb-4'>
                <div
                  className={cn(
                    'w-8 h-8 rounded-sm flex items-center justify-center flex-none border',
                    cat.iconColor,
                  )}
                >
                  <CategoryIcon size={16} />
                </div>
                <h3 className='font-primary text-base font-bold text-deep-moss'>
                  {cat.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className='grid grid-cols-2 gap-2'>
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className={cn(
                      'flex items-center gap-2 p-1.5 rounded-xs border border-hairline',
                      'bg-soft-linen hover:bg-pale-stone text-deep-moss',
                      'transition-colors duration-150 select-none',
                    )}
                  >
                    <div className='flex-none opacity-80'>
                      <StackIcon type={skill} size={14} />
                    </div>
                    <span className='font-mono text-xs font-medium truncate'>
                      {skill === 'ReactQuery'
                        ? 'TanStack Query'
                        : skill === 'UI/UX'
                          ? 'UI/UX'
                          : skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupedTechStack;
