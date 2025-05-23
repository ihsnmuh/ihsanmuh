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
            aria-label='Icon Kufi Ihsan'
          />
        </Link>
        <div className='flex gap-4 items-center'>
          {links.map((link, label) => {
            const isActive =
              pathSplit === link.label.toLowerCase() ||
              (link.label === 'Home' && !pathSplit);

            return (
              <UnstyledLink
                key={`${link}${label}`}
                href={link.href}
                className='group'
              >
                <span
                  className={cn(
                    'transition-colors',
                    'hover:text-primary-500',
                    isActive
                      ? 'bg-primary-300/20 text-primary-500'
                      : 'bg-primary-300/0',
                    'group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0',
                  )}
                >
                  {link.label}
                </span>
              </UnstyledLink>
            );
          })}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
