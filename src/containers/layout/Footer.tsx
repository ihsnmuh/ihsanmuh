import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import KufiLogo from '@/components/Atoms/svg/KufiLogo';

const FooterPixelMascot = dynamic(
  () => import('@/components/Atoms/canvas/FooterPixelMascot'),
  { ssr: false },
);

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Writing' },
  { href: '/project', label: 'Projects' },
  { href: '/about', label: 'About' },
];

const socialLinks = [
  { href: 'mailto:me@ihsanmuh.com', label: 'Email' },
  { href: 'https://github.com/ihsnmuh', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ihsanmuhammad19/', label: 'LinkedIn' },
  { href: 'https://instagram.com/dailyjuniordev', label: 'Instagram' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='relative border-t border-hairline mt-20 py-14 text-body transition-colors duration-200'>
      <div className='absolute -top-[80px] inset-x-0 pointer-events-none'>
        <div className='max-w-4xl mx-auto px-5 sm:px-6 pointer-events-auto'>
          <FooterPixelMascot />
        </div>
      </div>
      <div className='max-w-4xl mx-auto px-5 sm:px-6'>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-12'>
          <div className='sm:col-span-6 flex flex-col gap-3'>
            <Link
              href='/'
              aria-label='Home'
              className='inline-flex items-center gap-2.5 w-fit group'
            >
              <div className='w-7 h-7 rounded-md bg-surface border border-hairline flex items-center justify-center p-1 group-hover:border-accent/40 transition-colors'>
                <KufiLogo className='w-full h-full text-accent fill-current' />
              </div>
              <span className='font-primary text-base font-bold tracking-tight text-ink group-hover:text-accent transition-colors'>
                ihsanmuh
              </span>
            </Link>
            <p className='text-sm text-muted max-w-xs leading-relaxed'>
              Software engineer in Jakarta building web applications with React,
              Next.js, and TypeScript.
            </p>
          </div>

          <div className='sm:col-span-3 flex flex-col gap-3'>
            <p className='font-mono text-[11px] uppercase tracking-wider text-muted'>
              Navigation
            </p>
            <ul className='flex flex-col gap-2'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-body hover:text-accent transition-colors duration-150'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='sm:col-span-3 flex flex-col gap-3'>
            <p className='font-mono text-[11px] uppercase tracking-wider text-muted'>
              Connect
            </p>
            <ul className='flex flex-col gap-2'>
              {socialLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1 text-sm text-body hover:text-accent transition-colors duration-150 group'
                  >
                    <span>{label}</span>
                    <ArrowUpRight
                      size={13}
                      className='text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-12 pt-6 border-t border-hairline/70 text-xs text-muted'>
          <p>© {year} Muhammad Ihsan. All rights reserved.</p>
          <p className='font-mono text-[11px]'>
            Built with Next.js &amp; TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
