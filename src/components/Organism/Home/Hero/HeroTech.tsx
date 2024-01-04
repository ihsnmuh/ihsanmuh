import React from 'react';

import { cn } from '@/lib/utils';

import {
  FigmaIcon,
  NextJsIcon,
  ReactIcon,
  TailwindCssIcon,
  TypeScriptIcon,
  VSCodeIcon,
} from '@/components/atoms/Icon';

const HeroTech = () => {
  return (
    <>
      <p className='font-primary text-sm'>Current Favorite Tech Stacks:</p>
      <div className='flex gap-4 mt-2'>
        <div
          className={cn(
            'transition cursor-pointer text-slate-500  duration-200 hover:text-[#3178C6]',
          )}
        >
          <TypeScriptIcon className={cn('h-6 w-6')} />
        </div>
        <div
          className={cn(
            'transition cursor-pointer text-slate-500  duration-200 hover:text-[#61DAFB]',
          )}
        >
          <ReactIcon className={cn('h-6 w-6')} />
        </div>
        <div
          className={cn(
            'transition cursor-pointer text-slate-500  duration-200 hover:text-[#06B6D4]',
          )}
        >
          <TailwindCssIcon className={cn('h-6 w-6')} />
        </div>
        <div
          className={cn(
            'transition cursor-pointer text-slate-500 duration-200 hover:text-[#000000] dark:hover:text-[#FFFFFF]',
          )}
        >
          <NextJsIcon className={cn('h-6 w-6')} />
        </div>
        <div className='border-r-2 border-slate-600' />
        <div
          className={cn(
            'transition cursor-pointer text-slate-500  duration-200 hover:text-[#007ACC]',
          )}
        >
          <VSCodeIcon className={cn('h-6 w-6')} />
        </div>
        <div
          className={cn(
            'transition cursor-pointer text-slate-500  duration-200 hover:text-[#F24E1E]',
          )}
        >
          <FigmaIcon className={cn('h-6 w-6')} />
        </div>
      </div>
    </>
  );
};

export default HeroTech;
