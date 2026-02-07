import Link from 'next/link';

import Seo from '@/components/Molecules/seo';

export default function Custom500() {
  return (
    <>
      <Seo
        templateTitle='500 - Server Error'
        description='Something went wrong on our end. We are working to fix it.'
      />
      <main className='min-h-[calc(100vh-200px)] flex items-center justify-center px-4'>
        <div className='text-center'>
          <h1 className='text-9xl font-bold text-red-500 dark:text-red-400'>
            500
          </h1>
          <div className='mt-8 space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-900 dark:text-gray-100'>
              Internal Server Error
            </h2>
            <p className='text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
              Oops! Something went wrong on our end. We've been notified and are
              working to fix it. Please try again later.
            </p>
          </div>

          <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link
              href='/'
              className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'
            >
              Go Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className='inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'
            >
              Try Again
            </button>
          </div>

          <p className='mt-8 text-sm text-gray-500 dark:text-gray-500'>
            Error Code: 500
          </p>
        </div>
      </main>
    </>
  );
}
