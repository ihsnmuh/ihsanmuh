import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/Atoms/links/UnderlineLink';
import KufiLogo from '@/components/Atoms/svg/KufiLogo';

const Footer = () => {
  return (
    <footer>
      <div
        className={cn(
          'layout flex justify-between',
          'w-full py-4 sm:py-8',
          'border-t border-slate-200 dark:border-slate-800',
        )}
      >
        <div className='flex flex-col gap-4'>
          <div>
            <KufiLogo
              fill='currentColor'
              className='w-10 h-10 fill-current text-primary-500'
            />
            <p
              className={cn(
                'text-md font-semibold text-slate-900 dark:text-white',
                'mt-2 underline underline-offset-2 decoration-primary-400',
              )}
            >
              Thanks for coming!
            </p>
          </div>
          <p className='text-xs text-slate-900 dark:text-slate-200'>
            © 2023,{' '}
            <UnderlineLink
              className='text-slate-600/70 dark:text-white/70'
              href='/'
            >
              Muhammad Ihsan
            </UnderlineLink>
            . All rights reserved.
          </p>
        </div>
        <div>
          <p className='text-sm font-semibold underline underline-offset-2 decoration-primary-400'>
            Reach me out
          </p>
          <div className='flex justify-end gap-1 mt-2'>
            <Link
              href='mailto:ihsanmuhaammad@gmail.com'
              className='p-2 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
              aria-label='Send email to Ihsan'
            >
              <Mail size={16} className='hover:text-primary-500' />
            </Link>
            <Link
              href='https://github.com/ihsnmuh'
              className='p-2 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
              aria-label='Go to GitHub'
            >
              <Github size={16} className='hover:text-primary-500' />
            </Link>
            <Link
              href='https://www.linkedin.com/in/ihsanmuhammad19/'
              className='p-2 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
              aria-label='Go to LinkedIn'
            >
              <Linkedin size={16} className='hover:text-primary-500' />
            </Link>
            <Link
              href='https://instagram.com/chernodev'
              className='p-2 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
              aria-label='Go to Instagram'
            >
              <Instagram size={16} className='hover:text-primary-500' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
