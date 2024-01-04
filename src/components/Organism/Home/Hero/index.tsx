import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import HeroSocialMedia from './HeroSocialMedia';
import HeroTech from './HeroTech';

const Hero = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const setTime = setTimeout(() => {
      setShow(true);
    }, 300);

    return () => clearTimeout(setTime);
  }, []);

  return (
    <section
      className={cn(
        'min-h-screen background-img-light dark:background-img-dark flex items-center bg-cover',
        'border-b border-slate-200 dark:border-slate-800 relative',
        show && 'fade-in-start',
      )}
    >
      <div className='layout flex flex-col w-full gap-1 relative'>
        <p
          className='font-primary text-base font-semibold md:text-xl'
          data-fade='1'
        >
          Hi
          <span
            className='animate-wave px-1'
            style={{ transformOrigin: '70% 70%', display: 'inline-block' }}
          >
            👋
          </span>
          , Everyone! I&lsquo;m
        </p>
        <h1
          className={cn(
            'capitalize text-transparent font-bold font-secondary',
            'text-5xl sm:text-7xl',
            'bg-clip-text text-transparent',
            'animate-gradient bg-[length:200%_200%]',
            'bg-gradient-to-r from-primary-500 from-10% via-cyan-500 dark:via-orange-500 via-30% to-emerald-500 dark:to-red-500',
          )}
          data-fade='2'
        >
          Muhammad Ihsan
        </h1>
        <p
          className={cn(
            'font-primary text-balance',
            'text-md md:text-lg',
            'w-full max-w-2xl',
          )}
          data-fade='3'
        >
          Being a good <span className='font-semibold'>Software Engineer</span>{' '}
          is not just about writing code. It's about creating an excellent user
          experience and collaborating effectively with other team members.
        </p>
        <div className='flex gap-4 mt-4' data-fade='4'>
          <HeroSocialMedia />
        </div>

        <div className='absolute ml-1 -bottom-36' data-fade='5'>
          <HeroTech />
        </div>
      </div>
      <a
        href='#summary'
        className={cn(
          'flex flex-col items-center justify-center w-screen mx-auto',
          'absolute bottom-1',
          'animate-bounce',
        )}
      >
        <ChevronUp />
        <p className='text-xs'>scroll up</p>
      </a>
    </section>
  );
};

export default Hero;
