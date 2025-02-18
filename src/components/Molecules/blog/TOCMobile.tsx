import { TableOfContents } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import IconButton from '@/components/Atoms/buttons/IconButton';

import useHeadingsData from '@/helpers/useHeadingData';
import useIntersectionObserver from '@/helpers/useIntersectionObserver';

import { Headings, IHeadingList } from './TabelOfContent';

interface IDrawerMobile extends IHeadingList {
  OnClick: () => void;
}

const Drawer = (props: IDrawerMobile) => (
  <div
    className='fixed inset-0 bg-black bg-opacity-50 z-10'
    onClick={() => props.OnClick()}
  >
    <div
      className='fixed bottom-0 right-0 w-full bg-slate-100 dark:bg-slate-800 rounded-t-xl max-h-[80vh] flex flex-col'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex flex-col p-4'>
        <div className='bg-slate-400 w-1/4 rounded-full h-1 mx-auto mb-2' />
        <p
          className={cn(
            'w-full text-xl font-primary text-primary-500 font-semibold py-4',
            'border-b border-slate-400 dark:border-slate-500',
          )}
        >
          Table of Contents
        </p>
        <div className='w-full mb-6 overflow-y-auto max-h-[calc(80vh-120px)]'>
          <Headings headings={props.headings} activeId={props.activeId} />
        </div>
      </div>
    </div>
  </div>
);

const TOCMobile = () => {
  const { asPath } = useRouter();
  const { nestedHeadings } = useHeadingsData();

  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useIntersectionObserver(setActiveId);

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
      <div className='fixed bottom-4 right-4 block lg:hidden'>
        <IconButton
          className='w-9 h-9'
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
