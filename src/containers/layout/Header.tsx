import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/atoms/link/UnderlineLink';
import KufiLogo from '@/components/atoms/svg/KufiLogo';

const ThemeSwitcher = dynamic(
  () => import('@/components/molecules/ThemSwicher'),
);

const Header = () => {
  const [isTop, setIsTop] = useState(true);

  const handleScroll = () => {
    setIsTop(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'bg-transparent',
        'fixed top-0 z-10 w-full',
        !isTop
          ? 'shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur'
          : '',
      )}
    >
      <div
        className={cn(
          'layout',
          'h-16 w-full',
          'flex justify-between items-center',
        )}
      >
        <Link href='/'>
          <KufiLogo
            fill='currentColor'
            className='w-10 h-10 fill-current text-primary-500'
          />
        </Link>
        <div className='flex gap-4 items-center'>
          <UnderlineLink href='/'>Home</UnderlineLink>
          <UnderlineLink href='/blog'>Blog</UnderlineLink>
          <UnderlineLink isOpenNewTab href='/about'>
            About
          </UnderlineLink>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
