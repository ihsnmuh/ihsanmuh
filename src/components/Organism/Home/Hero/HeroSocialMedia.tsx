import { FileText, Github, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const HeroSocialMedia = () => {
  return (
    <>
      <Link href='https://github.com/ihsnmuh'>
        <Github
          size={24}
          className='text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white'
        />
      </Link>
      <Link href='https://www.linkedin.com/in/ihsanmuhammad19/'>
        <Linkedin
          size={24}
          className='text-slate-500 dark:text-slate-400 hover:text-[#0077b5] dark:hover:text-[#0077b5]'
        />
      </Link>
      <Link href='https://instagram.com/chernodev'>
        <Instagram
          size={24}
          className='text-slate-500 dark:text-slate-400  hover:text-pink-500 dark:hover:text-pink-500'
        />
      </Link>
      <div className='border-r-2 border-slate-600' />
      <Link href={process.env.NEXT_PUBLIC_CV_LINK || ''}>
        <div
          className={cn(
            'flex gap-2 items-center text-primary-500 hover:text-primary-400',
          )}
        >
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-primary-500'></span>
          </span>
          <FileText size={24} />
          <p className='font-primary'>CV</p>
        </div>
      </Link>
    </>
  );
};

export default HeroSocialMedia;
