import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/Atoms/links/UnderlineLink';
import Title from '@/components/Atoms/title';

const Summary = () => {
  return (
    <section id='summary' className={cn('background text-balance ', 'mt-16')}>
      <div className='layout h-fit gap-4'>
        <Title title='Short Story' />
        <p className='p mt-4 md:mt-6 font-primary md:text-lg'>
          <span className='font-semibold'>Muhammad Ihsan</span> is a Frontend
          Developer with 4+ years of experience building and maintaining
          scalable web applications within the modern JavaScript ecosystem. He
          spent 4 years at{' '}
          <UnderlineLink href='https://femaledaily.com/'>
            Female Daily Network
          </UnderlineLink>
          , Indonesia&apos;s largest beauty ecosystem platform, delivering
          production-ready features across multiple engineering tribes. His
          expertise spans{' '}
          <span className='font-semibold'>
            React, Next.js, TypeScript, Tailwind, and monorepo architectures
          </span>
          , with a strong focus on performance optimization, maintainable
          frontend architecture, and system-level improvements. Driven by
          curiosity and a continuous desire to learn, he views growth as a
          crucial element in every aspect of life.
        </p>
      </div>
    </section>
  );
};

export default Summary;
