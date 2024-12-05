// components/MdxImage.tsx
import Image from 'next/image';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface IMdxImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  useSkeleton?: boolean;
}

const MdxImage: React.FC<IMdxImageProps> = ({
  src,
  alt = '',
  width,
  height,
  useSkeleton,
  ...rest
}) => {
  const [status, setStatus] = useState(useSkeleton ? 'loading' : 'complete');

  return (
    <figure
      className={cn(
        [`w-full h-auto relative mx-auto my-4`],
        ['overflow-hidden duration-700 ease-in-out'],
        [
          status === 'loading'
            ? 'scale-[1.02] blur-xl grayscale'
            : 'scale-100 blur-0 grayscale-0',
        ],
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className='object-contain shadow border rounded-md mx-auto'
        loading='lazy'
        onLoad={() => setStatus('complete')}
        {...rest}
      />
    </figure>
  );
};

export default MdxImage;
