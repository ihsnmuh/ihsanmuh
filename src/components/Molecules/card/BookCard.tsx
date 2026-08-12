import { CheckCircle, Clock, Quote, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

import { IBookItem } from '@/types/interfaces/hobbies';

interface BookCardProps {
  book: IBookItem;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const isReading = book.status === 'reading';

  return (
    <div
      className={cn(
        'group relative flex flex-col md:flex-row gap-5 p-5 rounded-2xl transition-all duration-300',
        'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md',
        'border border-slate-200/80 dark:border-slate-800/80',
        'hover:border-blue-500/40 dark:hover:border-blue-500/40',
        'hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-950/20',
      )}
    >
      {/* Book Cover */}
      <div className='relative w-full md:w-32 h-44 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm'>
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-500'
          sizes='(max-width: 768px) 100vw, 128px'
        />
      </div>

      {/* Book Info */}
      <div className='flex flex-col justify-between flex-1 min-w-0'>
        <div>
          {/* Status & Rating */}
          <div className='flex items-center justify-between gap-2 mb-2'>
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold',
                isReading
                  ? 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                  : 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
              )}
            >
              {isReading ? (
                <>
                  <Clock className='w-3 h-3 animate-spin' /> Reading Now
                </>
              ) : (
                <>
                  <CheckCircle className='w-3 h-3' /> Completed
                </>
              )}
            </span>

            {/* Stars */}
            <div className='flex items-center gap-0.5'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-3.5 h-3.5',
                    i < book.rating
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-300 dark:text-slate-700',
                  )}
                />
              ))}
            </div>
          </div>

          {/* Title & Author */}
          <h3 className='text-lg font-bold font-secondary text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2'>
            {book.title}
          </h3>
          <p className='text-sm text-slate-500 dark:text-slate-400 mt-0.5'>
            by{' '}
            <span className='font-medium text-slate-700 dark:text-slate-300'>
              {book.author}
            </span>
          </p>

          {/* Genres */}
          <div className='flex flex-wrap gap-1.5 mt-3'>
            {book.genre.map((g, idx) => (
              <span
                key={idx}
                className='text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50'
              >
                {g}
              </span>
            ))}
          </div>

          {/* Review / Note */}
          {book.review && (
            <p className='mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2'>
              {book.review}
            </p>
          )}
        </div>

        {/* Favorite Quote */}
        {book.quote && (
          <div className='mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-start gap-2 text-xs italic text-slate-500 dark:text-slate-400'>
            <Quote className='w-3.5 h-3.5 flex-shrink-0 text-blue-500 dark:text-blue-400 mt-0.5' />
            <p className='line-clamp-1'>&ldquo;{book.quote}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
