import { cn } from '@/lib/utils';

import Title from '@/components/Atoms/title';
import PrincipleCard from '@/components/Molecules/card/PrincipalCard';

import { Principles } from '@/constant/principles';

const PrinciplesSection = () => {
  return (
    <section className='background mb-16'>
      <div className='layout'>
        <Title title='How I Work' />
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6',
          )}
        >
          {Principles.map((principle) => (
            <PrincipleCard
              key={`principle-${principle.id}`}
              id={principle.id}
              title={principle.title}
              decription={principle.description}
              icon={principle.icon}
              iconClass={principle.iconClass}
              iconBg={principle.iconBg}
              gradientBar={principle.gradientBar}
              hoverBorder={principle.hoverBorder}
              hoverTitle={principle.hoverTitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
