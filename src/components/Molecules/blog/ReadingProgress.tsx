import { useEffect, useState } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      className='fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50'
      role='progressbar'
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label='Reading progress'
    >
      <div
        className='h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 transition-all duration-150 ease-out'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
