import { Quote } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import Title from '@/components/Atoms/title';

const testimonials = [
  {
    name: 'Pratama Handika',
    role: 'Lead Frontend Engineer at Female Daily Network',
    message:
      'Ihsan is an exceptional engineer. During our time working together on multiple product teams at Female Daily, he consistently delivered high-quality code and showed great ownership. He cares deeply about performance and clean code.',
    avatarColor: 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20',
    avatarInitials: 'PH',
  },
  {
    name: 'Siti Rahma',
    role: 'Senior Product Manager at Female Daily Network',
    message:
      "A proactive and collaborative engineer. Ihsan didn't just write code; he actively contributed to product discussions, helped refine requirements, and was quick to solve complex frontend challenges. A real asset to any product team.",
    avatarColor: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20',
    avatarInitials: 'SR',
  },
];

const TestimonialsSection = () => {
  return (
    <section className='background mb-16'>
      <div className='layout'>
        <Title title='What They Say' />
        <div className='grid grid-cols-1 md:grid-cols-2 mt-8 gap-8'>
          {testimonials.map(
            ({ name, role, message, avatarColor, avatarInitials }) => (
              <div
                key={name}
                className={cn(
                  'group relative flex flex-col p-6 rounded-xl overflow-hidden',
                  'border border-slate-200 dark:border-zinc-700/40',
                  'bg-white dark:bg-slate-800/50 shadow-sm',
                  'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md',
                )}
              >
                {/* Decorative Quote Icon */}
                <div className='absolute top-4 right-4 text-slate-100 dark:text-slate-800/40 transition-colors duration-300 group-hover:text-primary-500/10 pointer-events-none'>
                  <Quote size={56} className='stroke-[1.5]' />
                </div>

                {/* Message */}
                <p className='font-primary text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 italic mb-6 relative z-10'>
                  &ldquo;{message}&rdquo;
                </p>

                {/* Recommender Info */}
                <div className='flex items-center gap-3 mt-auto relative z-10'>
                  {/* Visual Avatar */}
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm tracking-wide font-secondary',
                      avatarColor,
                    )}
                  >
                    {avatarInitials}
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-secondary font-semibold text-sm text-slate-900 dark:text-slate-100'>
                      {name}
                    </span>
                    <span className='font-mono text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider'>
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
