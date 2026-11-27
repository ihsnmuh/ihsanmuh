import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import SanMascot from '@/components/Atoms/svg/SanMascot';
import Seo from '@/components/Molecules/seo';

export default function Custom404() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <Seo
        templateTitle='404 - Page Not Found'
        description='The page you are looking for does not exist.'
        robots='noindex, nofollow'
      />
      <div className='py-20 sm:py-28 text-center'>
        <SanMascot
          mood='404'
          size={132}
          animated
          className='mx-auto mb-6'
          ariaLabel='San looking confused'
        />
        <p className='font-mono text-xs uppercase tracking-widest text-muted mb-3'>
          Error 404
        </p>
        <h1 className='font-primary text-4xl sm:text-5xl font-bold text-ink tracking-tight'>
          Page not found
        </h1>
        <p className='mt-4 text-base text-body max-w-md mx-auto leading-relaxed'>
          The page you are looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <div className='mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center'>
          <Link
            href='/'
            className='inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium bg-cta text-cta-fg hover:bg-cta-hover active:scale-[0.98] transition-[background-color,transform] duration-150 ease-[var(--ease-out)] select-none'
          >
            Back to Home
          </Link>
          <Link
            href='/blog'
            className='inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium bg-surface text-ink border border-hairline-strong hover:bg-subtle active:scale-[0.98] transition-[background-color,transform] duration-150 ease-[var(--ease-out)] select-none'
          >
            Browse Writing
          </Link>
        </div>

        <p className='mt-8 text-xs font-mono text-muted tabular-nums'>
          Redirecting home in {countdown} seconds...
        </p>
      </div>
    </>
  );
}
