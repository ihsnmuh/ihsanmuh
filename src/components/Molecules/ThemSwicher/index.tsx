import { cn } from '@/lib/utils';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme(); 
  const [mounted, setMounted] = useState(false) 

  const darkModeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      <button className={cn(
        'flex justify-center items-center',
        'rounded hover:bg-slate-200/40 hover:text-primary-500 p-1'
        )} onClick={() => darkModeHandler()}>
        {theme === 'light' ? <Sun className='fill-current' size={20} /> : <MoonStar className='fill-current' size={20} />}
      </button>
    </div>
  )
}

export default ThemeSwitcher