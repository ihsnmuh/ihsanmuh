import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink from '@/components/Atoms/links/UnstyledLink';
import Skeleton from '@/components/Atoms/Skeleton';
import KufiLogo from '@/components/Atoms/svg/KufiLogo';

const ThemeSwitcher = dynamic(
  () => import('@/components/Molecules/ThemSwicher'),
  {
    ssr: false,
    loading: () => <Skeleton className='h-9 w-9 rounded' />,
  },
);

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/project', label: 'Project' },
  { href: '/about', label: 'About' },
];

const Header = () => {
  const [isTop, setIsTop] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { asPath } = useRouter();
  const pathSplit = asPath.split('/')[1]?.toLowerCase() || '';

  const handleScroll = () => {
    setIsTop(window.scrollY === 0);
  };

  useEffect(() => {
    setMounted(true);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [asPath]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (link: { href: string; label: string }) =>
    mounted &&
    (pathSplit === link.label.toLowerCase() ||
      (link.label === 'Home' && !pathSplit));

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full',
          'border-b transition-colors duration-500',
          mounted && !isTop
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-slate-200/60 dark:border-slate-800/60'
            : 'bg-transparent border-transparent',
        )}
      >
        <div className='layout h-16 w-full flex justify-between items-center'>
          {/* Logo */}
          <Link
            href='/'
            className='relative z-[60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded'
            aria-label='Home'
          >
            <KufiLogo
              fill='currentColor'
              className={cn(
                'w-10 h-10 fill-current transition-colors duration-300',
                isMenuOpen ? 'text-white dark:text-white' : 'text-primary-500',
              )}
            />
          </Link>

          {/* Desktop nav */}
          <nav className='hidden md:flex items-center gap-1'>
            {links.map((link, i) => (
              <UnstyledLink
                key={`${link.href}${i}`}
                href={link.href}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium',
                  'transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded',
                  isActive(link)
                    ? 'text-primary-500'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100',
                )}
              >
                {link.label}
                {isActive(link) && (
                  <span className='absolute bottom-0 left-3 right-3 h-0.5 bg-primary-500 rounded-full' />
                )}
              </UnstyledLink>
            ))}
            <div className='ml-2 pl-2 border-l border-slate-200 dark:border-slate-700'>
              <ThemeSwitcher />
            </div>
          </nav>

          {/* Mobile: theme + hamburger */}
          <div className='flex items-center gap-1 md:hidden relative z-[60]'>
            <ThemeSwitcher />
            <button
              type='button'
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={cn(
                'inline-flex items-center justify-center h-9 w-9 rounded',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                isMenuOpen
                  ? 'text-white hover:bg-white/10'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
              )}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[55] md:hidden',
          'bg-slate-900 dark:bg-slate-950',
          'flex flex-col justify-center items-start',
          'transition-all duration-500 ease-in-out',
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        {/* Close button inside overlay */}
        <button
          type='button'
          aria-label='Close menu'
          onClick={() => setIsMenuOpen(false)}
          className={cn(
            'absolute top-4 right-4',
            'inline-flex items-center justify-center h-10 w-10 rounded-full',
            'border border-white/20 text-white/70',
            'hover:bg-white/10 hover:text-white hover:border-white/40',
            'transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          )}
        >
          <X size={20} />
        </button>

        {/* Background accent glow */}
        <div
          className={cn(
            'absolute top-0 right-0 w-64 h-64 rounded-full',
            'bg-primary-500/10 blur-3xl pointer-events-none',
            'transition-opacity duration-700',
            isMenuOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 left-0 w-48 h-48 rounded-full',
            'bg-primary-500/5 blur-2xl pointer-events-none',
            'transition-opacity duration-700 delay-100',
            isMenuOpen ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Nav links — staggered slide-in */}
        <nav className='layout w-full flex flex-col gap-2 px-6'>
          {links.map((link, i) => (
            <UnstyledLink
              key={`fullscreen-${link.href}${i}`}
              href={link.href}
              className={cn(
                'group flex items-center gap-4',
                'py-3 border-b border-white/10',
                'transition-all duration-500 ease-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                isMenuOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-8 opacity-0',
              )}
              style={{
                transitionDelay: isMenuOpen ? `${150 + i * 75}ms` : '0ms',
              }}
            >
              {/* Index number */}
              <span className='font-mono text-xs text-primary-500/60 w-5 shrink-0'>
                0{i + 1}
              </span>

              {/* Label */}
              <span
                className={cn(
                  'font-secondary font-bold text-4xl tracking-tight',
                  'transition-colors duration-200',
                  isActive(link)
                    ? 'text-primary-400'
                    : 'text-white/80 group-hover:text-white',
                )}
              >
                {link.label}
              </span>

              {/* Active dot */}
              {isActive(link) && (
                <span className='ml-auto w-2 h-2 rounded-full bg-primary-400 shrink-0' />
              )}
            </UnstyledLink>
          ))}
        </nav>

        {/* Bottom bar */}
        <div
          className={cn(
            'layout absolute bottom-8 left-0 right-0 px-6',
            'flex items-center justify-between',
            'transition-all duration-500 ease-out',
            isMenuOpen
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0',
          )}
          style={{ transitionDelay: isMenuOpen ? '450ms' : '0ms' }}
        >
          <p className='font-mono text-xs uppercase tracking-widest text-white/30'>
            Muhammad Ihsan
          </p>
          <p className='font-mono text-xs uppercase tracking-widest text-white/30'>
            Software Engineer
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
