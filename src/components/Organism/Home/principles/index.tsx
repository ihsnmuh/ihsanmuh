import React from 'react';

import { cn } from '@/lib/utils';

import PrincipleCard from '@/components/molecules/card/PrincipalCard';

import { Principles } from '@/constant/principles';

const PrinciplesSection = () => {
  return (
    <section className='background'>
      <div className='layout'>
        <div
          className={cn('flex flex-col md:flex-row lg:flex-wrap my-8 gap-6')}
        >
          {Principles.map((principle) => (
            <PrincipleCard
              id={principle.id}
              title={principle.title}
              key={`principle-${principle.id}`}
              decription={principle.description}
              className={cn('flex-1')}
              color={principle.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
