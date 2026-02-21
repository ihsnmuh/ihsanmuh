import { cn } from '@/lib/utils';

import {
  FigmaIcon,
  NextJsIcon,
  ReactIcon,
  TailwindCssIcon,
  TypeScriptIcon,
  VSCodeIcon,
} from '@/components/Atoms/Icon';

const HeroTech = () => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='font-mono text-xs uppercase tracking-widest text-slate-400'>
        Built with
      </p>
      <div className='flex items-center gap-3 flex-wrap'>
        <div
          className={cn(
            'flex items-center gap-1.5 cursor-default',
            'text-slate-500 dark:text-slate-400 hover:text-[#3178C6] transition-colors duration-200',
          )}
          title='TypeScript'
        >
          <TypeScriptIcon className='h-5 w-5' />
          <span className='text-xs font-mono'>TypeScript</span>
        </div>

        <div
          className={cn(
            'flex items-center gap-1.5 cursor-default',
            'text-slate-500 dark:text-slate-400 hover:text-[#61DAFB] transition-colors duration-200',
          )}
          title='React'
        >
          <ReactIcon className='h-5 w-5' />
          <span className='text-xs font-mono'>React</span>
        </div>

        <div
          className={cn(
            'flex items-center gap-1.5 cursor-default',
            'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors duration-200',
          )}
          title='Next.js'
        >
          <NextJsIcon className='h-5 w-5' />
          <span className='text-xs font-mono'>Next.js</span>
        </div>

        <div
          className={cn(
            'flex items-center gap-1.5 cursor-default',
            'text-slate-500 dark:text-slate-400 hover:text-[#06B6D4] transition-colors duration-200',
          )}
          title='Tailwind CSS'
        >
          <TailwindCssIcon className='h-5 w-5' />
          <span className='text-xs font-mono'>Tailwind</span>
        </div>

      </div>
    </div>
  );
};

export default HeroTech;
