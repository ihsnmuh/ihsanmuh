import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/Atoms/links/UnderlineLink';
import Title from '@/components/Atoms/title';

const Summary = () => {
  return (
    <section id='summary' className={cn('background text-balance ', 'mt-16')}>
      <div className='layout h-fit gap-4'>
        <Title title='Short Story' />
        <p className='p mt-4 md:mt-6 font-primary md:text-lg'>
          <span className='font-semibold'>Muhammad Ihsan</span> is a Software
          Engineer with 4+ years of experience, originally specialized in
          frontend development and now expanding across the full stack. He spent
          4 years at{' '}
          <UnderlineLink href='https://femaledaily.com/'>
            Female Daily Network
          </UnderlineLink>
          , Indonesia&apos;s largest beauty ecosystem platform, shipping
          production-ready features across multiple engineering tribes. His
          expertise spans{' '}
          <span className='font-semibold'>
            React, Next.js, TypeScript, Node.js, PostgreSQL, Docker, and cloud
            infrastructure
          </span>
          , with a strong focus on performance, clean architecture, and
          delivering real impact to users. Driven by curiosity and a continuous
          desire to learn, he views growth as a crucial element in every aspect
          of life.
        </p>
      </div>
    </section>
  );
};

export default Summary;
