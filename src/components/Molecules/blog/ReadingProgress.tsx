import { useEffect, useState } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      {/* Vertical progress bar on the right side - desktop only */}
      <div
        className='fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1.5'
        role='progressbar'
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label='Reading progress'
      >
        <div className='relative w-1 h-56 bg-soft-linen border border-hairline rounded-full overflow-hidden'>
          <div
            className='absolute bottom-0 left-0 right-0 bg-amber-glow'
            style={{ height: `${progress}%` }}
          />
        </div>
        <div className='flex items-center justify-center w-8 h-8 rounded-sm bg-paper-white border border-hairline shadow-none font-mono text-[10px] font-bold text-deep-moss'>
          {Math.round(progress)}%
        </div>
      </div>
    </>
  );
};

export default ReadingProgress;
