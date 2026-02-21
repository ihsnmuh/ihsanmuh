import { FileText, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const HeroSocialMedia = () => {
  return (
    <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
      {/* Primary CTA — Download CV */}
      <Link
        href={process.env.NEXT_PUBLIC_CV_LINK || ''}
        className={cn(
          'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md',
          'bg-primary-500 hover:bg-primary-600 text-white',
          'font-primary text-sm font-semibold',
          'transition-colors duration-200',
        )}
      >
        <FileText size={15} />
        Download CV
      </Link>

      {/* Secondary CTA — Get in Touch */}
      <Link
        href='mailto:me@ihsanmuh.com'
        className={cn(
          'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md',
          'border border-slate-300 dark:border-slate-700',
          'hover:border-primary-500 dark:hover:border-primary-500',
          'hover:text-primary-500',
          'font-primary text-sm font-semibold',
          'transition-colors duration-200',
        )}
      >
        <Mail size={15} />
        Get in Touch
      </Link>

      {/* Divider */}
      <div className='h-6 w-px bg-slate-300 dark:bg-slate-700' />

      {/* Social icons — same row, same baseline */}
      <div className='flex items-center gap-2'>
        <Link
          href='https://github.com/ihsnmuh'
          aria-label='GitHub'
          className='text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors duration-200'
        >
          <Github size={20} />
        </Link>
        <Link
          href='https://www.linkedin.com/in/ihsanmuhammad19/'
          aria-label='LinkedIn'
          className='text-slate-500 dark:text-slate-400 hover:text-[#0077b5] dark:hover:text-[#0077b5] transition-colors duration-200'
        >
          <Linkedin size={20} />
        </Link>
        <Link
          href='https://instagram.com/chernodev'
          aria-label='Instagram'
          className='text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-200'
        >
          <Instagram size={20} />
        </Link>
      </div>
    </div>
  );
};

export default HeroSocialMedia;
