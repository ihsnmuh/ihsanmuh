import { Layout, Server, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

import { cn } from '@/lib/utils';

import StackIcon from '@/components/Atoms/Stacks';

const CATEGORIES = [
  {
    title: 'Frontend Craft',
    icon: Layout,
    iconColor:
      'text-sky-500 dark:text-sky-400 bg-sky-500/10 dark:bg-sky-500/20',
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
    iconColor:
      'text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20',
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
    iconColor:
      'text-amber-500 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/20',
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
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    currentTarget.style.setProperty('--mouse-x', `${x}px`);
    currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 mb-8'>
        <h3 className='font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-zinc-500'>
          Tech Stack & Expertise
        </h3>
        <h2 className='font-secondary text-2xl font-bold text-slate-800 dark:text-zinc-100'>
          My Toolbox
        </h2>
        <p className='font-primary text-sm text-slate-500 dark:text-zinc-400 max-w-xl'>
          These are the languages, frameworks, databases, and tools that I use
          to bring ideas to life. I focus on choosing the right tool for the
          job.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {CATEGORIES.map((cat, idx) => {
          const CategoryIcon = cat.icon;

          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseMove={handleMouseMove}
              className={cn(
                'rounded-2xl border p-5 md:p-6 transition-all duration-300 relative group overflow-hidden',
                'background-card border-slate-200 dark:border-zinc-700/40 hover:border-slate-300 dark:hover:border-zinc-600/60 shadow-sm card-spotlight',
              )}
            >
              {/* Heading */}
              <div className='flex items-center gap-3.5 mb-5 relative z-10'>
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-none',
                    cat.iconColor,
                  )}
                >
                  <CategoryIcon size={20} />
                </div>
                <h3 className='font-secondary text-base font-bold text-slate-800 dark:text-zinc-100'>
                  {cat.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className='grid grid-cols-2 gap-3.5 relative z-10'>
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded-lg border',
                      'bg-slate-50/50 dark:bg-zinc-800/30 border-slate-100 dark:border-zinc-800/50',
                      'hover:bg-slate-100/80 dark:hover:bg-zinc-800/80 hover:border-slate-200 dark:hover:border-zinc-700/50',
                      'transition-colors duration-150 group/item cursor-default',
                    )}
                  >
                    <div className='flex-none opacity-80 group-hover/item:opacity-100 transition-opacity'>
                      <StackIcon type={skill} size={16} />
                    </div>
                    <span className='font-mono text-xs font-semibold text-slate-600 dark:text-zinc-400 group-hover/item:text-slate-800 dark:group-hover/item:text-zinc-200 transition-colors truncate'>
                      {skill === 'ReactQuery'
                        ? 'TanStack Query'
                        : skill === 'UI/UX'
                          ? 'UI/UX Design'
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
