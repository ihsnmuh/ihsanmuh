import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink from '@/components/Atoms/links/UnstyledLink';
import KufiLogo from '@/components/Atoms/svg/KufiLogo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Writing' },
  { href: '/project', label: 'Projects' },
  { href: '/about', label: 'About' },
];

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { asPath } = useRouter();
  const pathSplit = asPath.split('/')[1]?.toLowerCase() || '';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [asPath]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (link: { href: string; label: string }) => {
    if (!mounted) return false;
    const target = link.href.replace('/', '');
    return pathSplit === target;
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header className='fixed top-0 left-0 right-0 z-50 bg-canvas/85 backdrop-blur-md border-b border-hairline/70 transition-colors duration-200'>
        <div className='max-w-4xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between'>
          <Link
            href='/'
            className='flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md'
            aria-label='Home'
          >
            <div className='w-8 h-8 rounded-md bg-surface border border-hairline flex items-center justify-center p-1.5 group-hover:border-accent/40 transition-colors'>
              <KufiLogo className='w-full h-full text-accent fill-current' />
            </div>
            <span className='font-primary text-base font-bold tracking-tight text-ink group-hover:text-accent transition-colors'>
              ihsanmuh
            </span>
          </Link>

          <nav
            aria-label='Primary navigation'
            className='hidden md:flex items-center gap-1'
          >
            {links.map((link) => {
              const active = isActive(link);
              return (
                <UnstyledLink
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-1.5 text-sm font-medium transition-colors duration-150 rounded-md select-none',
                    active
                      ? 'text-accent bg-accent-soft/70'
                      : 'text-muted hover:text-ink hover:bg-subtle/60',
                  )}
                >
                  {link.label}
                </UnstyledLink>
              );
            })}
          </nav>

          <div className='hidden md:flex items-center gap-2'>
            <button
              onClick={() => window.dispatchEvent(new Event('open-search'))}
              type='button'
              aria-label='Open search'
              className='flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-hairline bg-surface/70 text-muted text-xs font-medium hover:text-ink hover:border-hairline-strong transition-colors duration-150'
            >
              <Search size={13} />
              <span>Search</span>
              <kbd className='text-[10px] font-mono bg-subtle px-1.5 py-0.5 rounded border border-hairline/80 text-muted'>
                ⌘K
              </kbd>
            </button>

            <button
              type='button'
              onClick={toggleTheme}
              aria-label='Toggle color theme'
              className='w-8 h-8 flex items-center justify-center rounded-md border border-hairline bg-surface/70 text-muted hover:text-ink hover:border-hairline-strong transition-colors duration-150'
            >
              {mounted ? (
                resolvedTheme === 'dark' ? (
                  <Sun size={15} />
                ) : (
                  <Moon size={15} />
                )
              ) : (
                <span className='w-3.5 h-3.5' />
              )}
            </button>
          </div>

          <div className='flex items-center gap-1.5 md:hidden'>
            <button
              onClick={() => window.dispatchEvent(new Event('open-search'))}
              type='button'
              aria-label='Search'
              className='p-2 rounded-md border border-hairline bg-surface text-muted hover:text-ink transition-colors'
            >
              <Search size={16} />
            </button>
            <button
              type='button'
              onClick={toggleTheme}
              aria-label='Toggle color theme'
              className='p-2 rounded-md border border-hairline bg-surface text-muted hover:text-ink transition-colors'
            >
              {mounted ? (
                resolvedTheme === 'dark' ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )
              ) : (
                <span className='block w-4 h-4' />
              )}
            </button>
            <button
              type='button'
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className='p-2 rounded-md border border-hairline bg-surface text-ink hover:bg-subtle transition-colors'
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-[45] md:hidden',
          'bg-canvas/98 backdrop-blur-md text-ink',
          'flex flex-col justify-center px-6 pt-16',
          'transition-all duration-200 ease-out',
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        <nav
          aria-label='Mobile navigation'
          className='w-full max-w-sm mx-auto flex flex-col divide-y divide-hairline'
        >
          {links.map((link, i) => {
            const active = isActive(link);
            return (
              <UnstyledLink
                key={`fullscreen-${link.href}${i}`}
                href={link.href}
                className={cn(
                  'flex items-center justify-between py-4 transition-colors duration-150',
                  active ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                <span className='font-primary text-xl font-semibold tracking-tight'>
                  {link.label}
                </span>
                {active && (
                  <span className='w-1.5 h-1.5 rounded-full bg-accent' />
                )}
              </UnstyledLink>
            );
          })}

          <div className='pt-6'>
            <Link
              href='mailto:me@ihsanmuh.com'
              className='w-full flex justify-center items-center py-3 rounded-md bg-cta text-cta-fg text-sm font-medium hover:bg-cta-hover active:scale-[0.99] transition-all'
            >
              Email me
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
