import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink from '@/components/Atoms/links/UnstyledLink';
import KufiLogo from '@/components/Atoms/svg/KufiLogo';

const ThemeSwitcher = dynamic(
  () => import('@/components/Molecules/ThemSwicher'),
);

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/project', label: 'Project' },
  { href: '/about', label: 'About' },
];

const Header = () => {
  const [isTop, setIsTop] = useState(true);
  const { asPath } = useRouter();
  const pathSplit = asPath.split('/')[1].toLowerCase();

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
    <>
      <a
        href='#main-content'
        className={cn(
          'absolute -top-full left-4 z-50 px-4 py-2',
          'bg-primary-500 text-white rounded',
          'focus:top-4 transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        )}
      >
        Skip to content
      </a>
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
          <Link
            href='/'
            className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded'
            aria-label='Home'
          >
            <KufiLogo
              fill='currentColor'
              className='w-10 h-10 fill-current text-primary-500'
            />
          </Link>
          <nav className='flex gap-1 items-center min-w-0'>
            {links.map((link, label) => {
              const isActive =
                pathSplit === link.label.toLowerCase() ||
                (link.label === 'Home' && !pathSplit);

              return (
                <UnstyledLink
                  key={`${link}${label}`}
                  href={link.href}
                  className={cn(
                    'group px-3 py-2 rounded-md',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                    'transition-colors',
                    'hover:text-primary-500',
                    isActive
                      ? 'bg-primary-300/20 text-primary-500'
                      : 'bg-primary-300/0',
                    'group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0',
                  )}
                >
                  <span className='text-sm font-medium'>{link.label}</span>
                </UnstyledLink>
              );
            })}
            <ThemeSwitcher />
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
