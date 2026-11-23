import { TableOfContents, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import IconButton from '@/components/Atoms/buttons/IconButton';

import useHeadingsData from '@/helpers/useHeadingData';
import useIntersectionObserver from '@/helpers/useIntersectionObserver';

import { Headings, IHeadingList } from './TabelOfContent';

interface IDrawerMobile extends IHeadingList {
  OnClick: () => void;
}

const Drawer = (props: IDrawerMobile) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div
      className='fixed inset-0 z-50'
      onClick={() => props.OnClick()}
      onKeyDown={(e) => {
        if (e.key === 'Escape') props.OnClick();
      }}
      role='presentation'
    >
      <div className='absolute inset-0 bg-deep-moss/40 backdrop-blur-xs' />
      <div
        className={cn(
          'absolute inset-x-0 bottom-0',
          'w-full bg-paper-white border-t border-hairline',
          'rounded-t-md shadow-xl',
          'max-h-[80vh] flex flex-col',
          'pb-[calc(env(safe-area-inset-bottom)+12px)]',
        )}
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-label='Table of contents'
      >
        <div className='px-4 pt-3'>
          <div className='bg-hairline w-10 rounded-full h-1 mx-auto' />
          <div className='mt-2.5 flex items-center justify-between gap-2 border-b border-hairline/60 pb-2'>
            <p className='text-sm font-bold font-primary text-deep-moss'>
              Table of contents
            </p>
            <IconButton
              ref={closeButtonRef}
              variant='ghost'
              icon={X}
              aria-label='Close table of contents'
              onClick={props.OnClick}
              className='shadow-none'
              classNames={{ icon: 'text-base' }}
            />
          </div>
        </div>

        <nav className='mt-2 px-3 overflow-y-auto'>
          <Headings
            headings={props.headings}
            activeId={props.activeId}
            onNavigate={props.OnClick}
            variant='mobile'
            className='pb-4'
          />
        </nav>
      </div>
    </div>
  );
};

const TOCMobile = () => {
  const { asPath } = useRouter();
  const { nestedHeadings } = useHeadingsData(asPath);

  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useIntersectionObserver(setActiveId, asPath);

  useEffect(() => {
    setIsOpen(false);
  }, [asPath]);

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

  return (
    <>
      <div className='fixed bottom-4 right-4 block lg:hidden z-40'>
        <IconButton
          className='h-9 w-9 rounded-sm shadow-md bg-amber-glow text-deep-moss border border-dark-amber'
          icon={TableOfContents}
          onClick={() => setIsOpen(true)}
          aria-label='Open Table of Contents'
        />
      </div>
      {isOpen && (
        <Drawer
          headings={memoizedHeadings}
          activeId={activeId}
          OnClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default TOCMobile;
