import { format, formatDistanceStrict } from 'date-fns';
import React from 'react';

import { cn } from '@/lib/utils';

import ImageFallback from '@/components/Atoms/image/fallback';

import { IExperience } from '@/types/interfaces/experience';

const ExperienceCard = (props: IExperience) => {
  const { position, status, company, start, end, location, responsibilities } =
    props;

  const dateRange = formatDistanceStrict(new Date(start), new Date(end));

  const dateStart = format(start, 'MMM yyyy');
  const dateEnd =
    end === new Date().toISOString().split('T')[0]
      ? 'Present'
      : format(end, 'MMM yyyy');

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row gap-4',
        'w-4/5 py-10',
        'border-b last:border-none border-slate-400',
      )}
    >
      <div className='flex gap-6 flex-none md:w-1/2'>
        <div className='w-14 h-14 rounded bg-white flex-none flex justify-center items-center'>
          <ImageFallback
            src={company.logo}
            alt={company.name}
            width={56}
            height={56}
          />
        </div>
        <div className='flex flex-col flex-auto'>
          <h6 className='h6 font-primary font-semibold'>{position}</h6>
          <span className='font-primary text-sm'>{`${company.name}  •  ${location}`}</span>
          <span className='font-primary text-sm'>{`${dateStart} - ${dateEnd}  •  ${dateRange}  •  ${status}`}</span>
        </div>
      </div>
      <div className='flex-auto'>
        <p className='font-primary text-base font-semibold mb-2'>
          📌 Responsibilities:
        </p>
        <ul className='list-disc pl-4'>
          {responsibilities.map((responsibility) => (
            <li key={responsibility.id}>
              <p className='font-primary text-sm'>
                {responsibility.responsibility}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
