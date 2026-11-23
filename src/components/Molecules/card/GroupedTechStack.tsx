import { Layout, Server, Wrench } from 'lucide-react';
import React from 'react';

import StackIcon from '@/components/Atoms/Stacks';

const CATEGORIES = [
  {
    title: 'Frontend',
    icon: Layout,
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
    <div className='space-y-6'>
      {CATEGORIES.map((cat) => {
        const CategoryIcon = cat.icon;

        return (
          <div
            key={cat.title}
            className='p-5 rounded-lg border border-hairline bg-surface'
          >
            <div className='flex items-center gap-2.5 mb-3.5'>
              <div className='w-7 h-7 rounded-md bg-accent-soft border border-accent/20 text-accent flex items-center justify-center flex-none'>
                <CategoryIcon size={14} />
              </div>
              <h3 className='font-primary text-sm font-semibold text-ink'>
                {cat.title}
              </h3>
            </div>

            <div className='flex flex-wrap gap-2'>
              {cat.skills.map((skill) => (
                <div
                  key={skill}
                  className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-hairline bg-subtle/60 hover:border-hairline-strong text-ink transition-colors duration-150 select-none'
                >
                  <StackIcon type={skill} size={13} />
                  <span className='font-mono text-xs'>
                    {skill === 'ReactQuery' ? 'TanStack Query' : skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupedTechStack;
