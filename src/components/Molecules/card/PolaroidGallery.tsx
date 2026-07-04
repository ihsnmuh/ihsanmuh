import { motion } from 'motion/react';
import React from 'react';

import ImageFallback from '@/components/Atoms/image/fallback';

const PolaroidGallery = () => {
  return (
    <div className='relative w-full max-w-[280px] mx-auto md:mx-0 flex justify-center items-center py-2'>
      <motion.div
        className='w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-zinc-700/40 rounded-2xl p-4 pb-6 shadow-xl cursor-grab active:cursor-grabbing group'
        initial={{ rotate: -3, scale: 0.95, y: 15, opacity: 0 }}
        animate={{ rotate: -3, scale: 0.95, y: 0, opacity: 1 }}
        whileHover={{
          scale: 1.05,
          rotate: 0,
          y: -5,
          boxShadow:
            '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        drag
        dragConstraints={{ left: -15, right: 15, top: -15, bottom: 15 }}
        dragElastic={0.1}
        transition={{ duration: 0.5 }}
      >
        <div className='relative aspect-square w-full overflow-hidden bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl mb-4 pointer-events-none select-none'>
          <ImageFallback
            src='/images/avatar.png'
            alt='Muhammad Ihsan'
            fill
            sizes='(max-width: 768px) 220px, 260px'
            className='object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100'
          />
        </div>
        <div className='mt-2 text-center pointer-events-none select-none'>
          <span className='font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300'>
            @chernodev
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default PolaroidGallery;
