import Link from 'next/link';

import Seo from '@/components/Molecules/seo';

export default function Custom500() {
  return (
    <>
      <Seo
        templateTitle='500 - Server Error'
        description='Something went wrong on our end. We are working to fix it.'
        robots='noindex, nofollow'
      />
      <div className='py-20 sm:py-28 text-center'>
        <p className='font-mono text-xs uppercase tracking-widest text-danger mb-3'>
          Error 500
        </p>
        <h1 className='font-primary text-4xl sm:text-5xl font-bold text-ink tracking-tight'>
          Something went wrong
        </h1>
        <p className='mt-4 text-base text-body max-w-md mx-auto leading-relaxed'>
          An unexpected error occurred while processing your request. Please try
          reloading the page.
        </p>

        <div className='mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center'>
          <Link
            href='/'
            className='inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium bg-cta text-cta-fg hover:bg-cta-hover active:scale-[0.98] transition-[background-color,transform] duration-150 ease-[var(--ease-out)] select-none'
          >
            Back to Home
          </Link>
          <button
            type='button'
            onClick={() => window.location.reload()}
            className='inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium bg-surface text-ink border border-hairline-strong hover:bg-subtle active:scale-[0.98] transition-[background-color,transform] duration-150 ease-[var(--ease-out)] select-none'
          >
            Reload Page
          </button>
        </div>
      </div>
    </>
  );
}
