import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import Skeleton from '@/components/Atoms/Skeleton';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const darkModeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Skeleton className='w-7 h-7 rounded' />
      </>
    );
  }

  return (
    <>
      <button
        id='button-theme'
        aria-label='Change theme'
        className={cn(
          'flex justify-center items-center',
          'rounded hover:bg-slate-200/40 dark:hover:bg-slate-800/40 hover:text-primary-500',
          'p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        )}
        onClick={() => darkModeHandler()}
      >
        {theme === 'light' ? (
          <Sun className='fill-current' size={20} />
        ) : (
          <MoonStar className='fill-current' size={20} />
        )}
      </button>
    </>
  );
};

export default ThemeSwitcher;
