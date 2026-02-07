import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
      />
      <main className='min-h-[calc(100vh-200px)] flex items-center justify-center px-4'>
        <div className='text-center'>
          <h1 className='text-9xl font-bold text-primary-500 dark:text-primary-400'>
            404
          </h1>
          <div className='mt-8 space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-900 dark:text-gray-100'>
              Page Not Found
            </h2>
            <p className='text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>

          <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link
              href='/'
              className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'
            >
              Go Home
            </Link>
            <Link
              href='/blog'
              className='inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'
            >
              Read Blog
            </Link>
          </div>

          <p className='mt-8 text-sm text-gray-500 dark:text-gray-500'>
            Redirecting to home in {countdown} seconds...
          </p>
        </div>
      </main>
    </>
  );
}
