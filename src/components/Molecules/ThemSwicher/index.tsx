import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import Skeleton from '@/components/Atoms/Skeleton';

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const currentTheme = resolvedTheme ?? theme;

  const darkModeHandler = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonClassName = cn(
    'inline-flex items-center justify-center',
    'h-9 w-9 rounded',
    'hover:bg-slate-200/40 dark:hover:bg-slate-800/40 hover:text-primary-500',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  );

  if (!mounted) {
    return (
      <button
        id='button-theme'
        aria-label='Change theme'
        className={buttonClassName}
        disabled
        type='button'
      >
        <Skeleton className='h-5 w-5 rounded' aria-hidden='true' />
      </button>
    );
  }

  return (
    <button
      id='button-theme'
      aria-label='Change theme'
      className={buttonClassName}
      onClick={darkModeHandler}
      type='button'
    >
      {currentTheme === 'light' ? (
        <Sun className='fill-current' size={20} aria-hidden='true' />
      ) : (
        <MoonStar className='fill-current' size={20} aria-hidden='true' />
      )}
    </button>
  );
};

export default ThemeSwitcher;
