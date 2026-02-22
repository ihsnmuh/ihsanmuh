import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import KufiLogo from '@/components/Atoms/svg/KufiLogo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/project', label: 'Project' },
  { href: '/about', label: 'About' },
];

const socialLinks = [
  {
    href: 'mailto:me@ihsanmuh.com',
    label: 'Email',
    icon: Mail,
    hoverClass: 'hover:text-primary-500',
  },
  {
    href: 'https://github.com/ihsnmuh',
    label: 'GitHub',
    icon: Github,
    hoverClass: 'hover:text-black dark:hover:text-white',
  },
  {
    href: 'https://www.linkedin.com/in/ihsanmuhammad19/',
    label: 'LinkedIn',
    icon: Linkedin,
    hoverClass: 'hover:text-[#0077b5]',
  },
  {
    href: 'https://instagram.com/chernodev',
    label: 'Instagram',
    icon: Instagram,
    hoverClass: 'hover:text-pink-500',
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-slate-200 dark:border-slate-800'>
      <div className={cn('layout', 'py-8 sm:py-12')}>
        {/* Main footer grid */}
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-3'>
          {/* Brand column */}
          <div className='col-span-2 sm:col-span-1 flex flex-col gap-3'>
            <Link href='/' aria-label='Home'>
              <KufiLogo
                fill='currentColor'
                className='w-9 h-9 fill-current text-primary-500'
              />
            </Link>
            <p className='text-sm text-slate-600 dark:text-slate-400 max-w-xs'>
              Software engineer building web applications that deliver value and
              meaningful user experiences.
            </p>
          </div>

          {/* Pages column */}
          <div className='flex flex-col gap-3'>
            <p className='font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500'>
              Pages
            </p>
            <ul className='flex flex-col gap-2'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm text-slate-600 dark:text-slate-400',
                      'hover:text-primary-500 dark:hover:text-primary-400',
                      'transition-colors duration-200',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div className='flex flex-col gap-3'>
            <p className='font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500'>
              Connect
            </p>
            <ul className='flex flex-col gap-2'>
              {socialLinks.map(({ href, label, icon: Icon, hoverClass }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className={cn(
                      'flex items-center gap-2 text-sm',
                      'text-slate-600 dark:text-slate-400',
                      hoverClass,
                      'transition-colors duration-200',
                    )}
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            'flex flex-col sm:flex-row sm:items-center sm:justify-between',
            'gap-2 mt-8 pt-6',
            'border-t border-slate-200 dark:border-slate-800',
          )}
        >
          <p className='text-xs text-slate-400 dark:text-slate-500'>
            © {year} Muhammad Ihsan. All rights reserved.
          </p>
          <p className='font-mono text-xs text-slate-400 dark:text-slate-500'>
            Built with Next.js &amp; TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
