import { ArrowUp, TableOfContents, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { EDITORIAL_EASE } from '@/components/Atoms/Motion';

import useHeadingsData from '@/helpers/useHeadingData';
import useIntersectionObserver from '@/helpers/useIntersectionObserver';

import { Headings, IHeadingList } from './TabelOfContent';

interface IDrawerMobile extends IHeadingList {
  onClose: () => void;
}

const Drawer = ({ headings, activeId, onClose }: IDrawerMobile) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const handleBackToTop = () => {
    onClose();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 lg:hidden'
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      role='presentation'
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='absolute inset-0 bg-ink/40 backdrop-blur-xs'
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
        className={cn(
          'absolute inset-x-0 bottom-0',
          'w-full bg-surface border-t border-hairline',
          'rounded-t-2xl shadow-xl',
          'max-h-[78vh] flex flex-col',
          'pb-[calc(env(safe-area-inset-bottom)+14px)]',
        )}
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-label='Table of contents'
      >
        <div className='px-5 pt-3'>
          <div className='bg-hairline-strong w-10 rounded-full h-1 mx-auto' />
          <div className='mt-3 flex items-center justify-between gap-2 border-b border-hairline pb-3'>
            <div>
              <p className='font-mono text-[10px] uppercase tracking-wider text-accent font-medium'>
                On this page
              </p>
              <p className='text-sm font-semibold font-primary text-ink mt-0.5'>
                Table of contents
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type='button'
              aria-label='Close table of contents'
              onClick={onClose}
              className='w-9 h-9 flex items-center justify-center rounded-md text-muted hover:text-ink hover:bg-subtle transition-colors'
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className='mt-2 px-4 overflow-y-auto flex-1'>
          <Headings
            headings={headings}
            activeId={activeId}
            onNavigate={onClose}
            variant='mobile'
            className='pb-3'
          />
        </nav>

        <div className='px-5 pt-3 border-t border-hairline'>
          <button
            type='button'
            onClick={handleBackToTop}
            className='inline-flex items-center gap-2 text-xs font-medium text-muted hover:text-accent transition-colors py-1'
          >
            <ArrowUp size={14} />
            <span>Back to top</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const TOCMobile = () => {
  const { asPath } = useRouter();
  const cleanPath = asPath.split(/[?#]/)[0] || '/';
  const { nestedHeadings } = useHeadingsData(cleanPath);

  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useIntersectionObserver(setActiveId, cleanPath);

  useEffect(() => {
    setIsOpen(false);
  }, [cleanPath]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const memoizedHeadings = useMemo(() => nestedHeadings, [nestedHeadings]);

  if (memoizedHeadings.length === 0) {
    return null;
  }

  return (
    <>
      <div className='fixed bottom-5 right-5 block lg:hidden z-40'>
        <button
          type='button'
          onClick={() => setIsOpen(true)}
          aria-label='Open Table of Contents'
          aria-expanded={isOpen}
          className={cn(
            'inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-full',
            'bg-cta text-cta-fg text-xs font-primary font-semibold',
            'shadow-subtle-2 hover:bg-cta-hover active:scale-[0.97]',
            'transition-all duration-150 select-none',
          )}
        >
          <TableOfContents size={16} />
          <span>Contents</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Drawer
            headings={memoizedHeadings}
            activeId={activeId}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TOCMobile;
