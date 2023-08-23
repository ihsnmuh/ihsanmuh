import ImageFallback from '@/components/Atoms/image/fallback'
import UnderlineLink from '@/components/Atoms/link/UnderlineLink'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

const ThemeSwitcher = dynamic(() => import('@/components/Molecules/ThemSwicher'))

const Header = () => {  

  return (
    <header
      className={cn(
        'backdrop-blur bg-white/80 dark:bg-black/80',
        'sticky top-0 z-10'
      )}
    >
      <div className={cn(
        'layout',
        'h-16 w-full',
        'flex justify-between items-center'
      )}>
        <ImageFallback
          src={"/images/icon/ihsan-kufi.svg"}
          width={40}
          height={40}
          alt='Logo Ihsan Kufi'
        />
        <div className='flex gap-4 items-center'>
          <UnderlineLink href='/'>
            Home
          </UnderlineLink>
          <UnderlineLink href='/blog'>
            Blog
          </UnderlineLink>
          <UnderlineLink isOpenNewTab href='/about'>
            About
          </UnderlineLink>
          <ThemeSwitcher/>
        </div>
      </div>
    </header>
  )
}

export default Header