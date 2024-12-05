import PrincipleCard from '@/components/Molecules/card/PrincipalCard';

import { Principles } from '@/constant/principles';

const PrinciplesSection = () => {
  return (
    <section className='background mb-16'>
      <div className='layout'>
        <div
          // className={cn('flex flex-col md:flex-row lg:flex-wrap my-8 gap-6')}
          className='grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-10'
        >
          {Principles.map((principle) => (
            <PrincipleCard
              id={principle.id}
              title={principle.title}
              key={`principle-${principle.id}`}
              decription={principle.description}
              color={principle.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
