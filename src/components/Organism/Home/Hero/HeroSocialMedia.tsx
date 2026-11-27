import { FileText, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const HeroSocialMedia = () => {
  return (
    <div className='flex flex-wrap items-center gap-3'>
      <Link
        href={process.env.NEXT_PUBLIC_CV_LINK || ''}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2.5 rounded-md',
          'bg-cta text-cta-fg text-sm font-medium',
          'hover:bg-cta-hover active:scale-[0.98]',
          'transition-[background-color,transform] duration-150 ease-[var(--ease-out)] select-none',
        )}
      >
        <FileText size={15} />
        <span>Download CV</span>
      </Link>

      <Link
        href='mailto:me@ihsanmuh.com'
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2.5 rounded-md',
          'bg-surface text-ink text-sm font-medium border border-hairline-strong',
          'hover:bg-subtle active:scale-[0.98]',
          'transition-[background-color,transform] duration-150 ease-[var(--ease-out)] select-none',
        )}
      >
        <Mail size={15} />
        <span>Email me</span>
      </Link>

      <div className='h-5 w-px hidden sm:block bg-hairline mx-1' />

      <div className='flex items-center gap-1 text-muted'>
        <Link
          href='https://github.com/ihsnmuh'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub'
          className='hover:text-accent hover:bg-accent-soft/60 transition-colors duration-150 p-2 rounded-md'
        >
          <Github size={17} />
        </Link>
        <Link
          href='https://www.linkedin.com/in/ihsnmuh/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='LinkedIn'
          className='hover:text-accent hover:bg-accent-soft/60 transition-colors duration-150 p-2 rounded-md'
        >
          <Linkedin size={17} />
        </Link>
        <Link
          href='https://instagram.com/dailyjuniordev'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'
          className='hover:text-accent hover:bg-accent-soft/60 transition-colors duration-150 p-2 rounded-md'
        >
          <Instagram size={17} />
        </Link>
      </div>
    </div>
  );
};

export default HeroSocialMedia;
