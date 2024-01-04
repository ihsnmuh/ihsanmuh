import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/atoms/links/UnderlineLink';
import Title from '@/components/atoms/title';

const Summary = () => {
  return (
    <section id='summary' className={cn('background text-balance ', 'mt-8')}>
      <div className='layout h-fit gap-4'>
        <Title title='Short Story' />
        <p className='mt-4 md:mt-6 font-primary text-lg'>
          <span className='font-semibold'>Muhammad Ihsan</span> is a graduate of
          Agricultural Engineering from Bogor Agriculture University who
          transitioned into the field of web development, focusing on Frontend
          Development since 2021. His expertise lies in using technologies such
          as{' '}
          <span className='font-semibold'>
            React, NextJs, Tailwind, and Typescript
          </span>
          . Currently employed as a Frontend Developer at{' '}
          <UnderlineLink href='https://femaledaily.com/'>
            Female Daily Network
          </UnderlineLink>
          , Muhammad is driven by curiosity and a continuous desire to learn,
          viewing it as a crucial element for personal growth and improvement in
          various aspects of life.
        </p>
      </div>
    </section>
  );
};

export default Summary;
