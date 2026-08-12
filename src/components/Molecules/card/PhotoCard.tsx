import { Camera, Eye, MapPin } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { IPhotoItem } from '@/types/interfaces/hobbies';

interface PhotoCardProps {
  photo: IPhotoItem;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsZoomed(true)}
        className={cn(
          'group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300',
          'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md',
          'border border-slate-200/80 dark:border-slate-800/80',
          'hover:border-emerald-500/40 dark:hover:border-emerald-500/40',
          'hover:shadow-xl hover:shadow-emerald-500/5 dark:hover:shadow-emerald-950/20',
        )}
      >
        {/* Photo Container */}
        <div className='relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800'>
          <Image
            src={photo.image}
            alt={photo.title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-700 ease-out'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
            <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-white border border-white/20'>
              <Eye className='w-3.5 h-3.5' /> View Full Photo
            </span>
          </div>
        </div>

        {/* Details Content */}
        <div className='p-5 flex flex-col justify-between flex-1'>
          <div>
            <div className='flex items-center justify-between gap-2 mb-2 text-xs text-slate-500 dark:text-slate-400'>
              <span className='flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400'>
                <MapPin className='w-3.5 h-3.5 flex-shrink-0' />
                <span className='truncate'>{photo.location}</span>
              </span>
              <span className='flex-shrink-0'>{photo.date}</span>
            </div>

            <h3 className='text-base font-bold font-secondary text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors'>
              {photo.title}
            </h3>

            {photo.caption && (
              <p className='mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2'>
                {photo.caption}
              </p>
            )}
          </div>

          {/* Camera / EXIF Info */}
          {(photo.camera || photo.settings) && (
            <div className='mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400'>
              <div className='flex items-center gap-1.5 truncate'>
                <Camera className='w-3.5 h-3.5 flex-shrink-0 text-slate-400 dark:text-slate-500' />
                <span className='truncate'>
                  {photo.camera} {photo.lens ? `· ${photo.lens}` : ''}
                </span>
              </div>
              {photo.settings && (
                <span className='font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0'>
                  {photo.settings}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200'
          onClick={() => setIsZoomed(false)}
        >
          <div
            className='relative max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative w-full h-[60vh] sm:h-[70vh] bg-black'>
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                className='object-contain'
                sizes='100vw'
                priority
              />
            </div>
            <div className='p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-white'>
              <div>
                <h4 className='font-bold font-secondary text-lg'>
                  {photo.title}
                </h4>
                <p className='text-xs text-slate-400 mt-0.5'>
                  {photo.location} · {photo.camera}{' '}
                  {photo.lens && `· ${photo.lens}`}
                </p>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className='px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors'
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCard;
