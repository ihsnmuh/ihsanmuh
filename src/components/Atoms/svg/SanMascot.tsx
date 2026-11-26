import { motion, useReducedMotion } from 'motion/react';
import React from 'react';

import {
  resolveSanParts,
  SAN_GROUND_TOKEN,
  SAN_MOOD_META,
  SAN_SKIN_MARKUP,
  SAN_VIEW_BOX,
  TSanHairstyle,
  TSanMood,
} from '@/lib/san';
import { cn } from '@/lib/utils';

import { SPRING_SNAPPY } from '@/components/Atoms/Motion';

type TSanMascotProps = {
  mood?: TSanMood;
  hairstyle?: TSanHairstyle;
  showFacialHair?: boolean;
  eyesMood?: TSanMood;
  mouthMood?: TSanMood;
  extraMood?: TSanMood;
  size?: number;
  ground?: string | null;
  shape?: 'circle' | 'rounded' | 'none';
  showMarks?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * San: illustrated portrait mascot component for ihsanmuh.
 * Supports 12 moods, 4 haircuts, custom mixed parts, and a theme-aware accent background.
 */
const SanMascot = ({
  mood = 'grin',
  hairstyle = 'textured-crop',
  showFacialHair = true,
  eyesMood,
  mouthMood,
  extraMood,
  size = 180,
  ground = SAN_GROUND_TOKEN,
  shape = 'circle',
  showMarks = true,
  interactive = false,
  className,
  onClick,
  ariaLabel,
}: TSanMascotProps) => {
  const prefersReducedMotion = useReducedMotion();
  const resolved = resolveSanParts({
    mood,
    hairstyle,
    showFacialHair,
    eyesMood,
    mouthMood,
    extraMood,
    showMarks,
  });
  const [turn, drop] = resolved.pose;
  const label =
    ariaLabel ?? `San mascot showing ${SAN_MOOD_META[mood].label} mood`;

  const isClickable = Boolean(onClick || interactive);

  const shapeClass =
    shape === 'circle'
      ? 'rounded-full overflow-hidden'
      : shape === 'rounded'
        ? 'rounded-2xl overflow-hidden'
        : '';

  return (
    <motion.div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={label}
      onClick={onClick}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      whileTap={
        isClickable && !prefersReducedMotion ? { scale: 0.96 } : undefined
      }
      style={{ width: size, height: size }}
      className={cn(
        'relative inline-flex items-center justify-center select-none shrink-0',
        shapeClass,
        isClickable &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        className,
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={SAN_VIEW_BOX}
        width={size}
        height={size}
        className='block w-full h-full'
      >
        {ground && (
          <rect
            x='0'
            y='0'
            width='1240'
            height='1240'
            fill={ground}
            className='transition-colors duration-300'
          />
        )}

        <motion.g
          initial={false}
          animate={{ y: drop, rotate: turn }}
          transition={prefersReducedMotion ? { duration: 0 } : SPRING_SNAPPY}
          style={{ originX: '620px', originY: '620px' }}
        >
          <g dangerouslySetInnerHTML={{ __html: SAN_SKIN_MARKUP }} />
          {resolved.blushMarkup && (
            <g dangerouslySetInnerHTML={{ __html: resolved.blushMarkup }} />
          )}
          <g dangerouslySetInnerHTML={{ __html: resolved.hairMarkup }} />
          <g dangerouslySetInnerHTML={{ __html: resolved.browsMarkup }} />
          {resolved.glassesMarkup && (
            <g dangerouslySetInnerHTML={{ __html: resolved.glassesMarkup }} />
          )}
          <g dangerouslySetInnerHTML={{ __html: resolved.eyesMarkup }} />
          {resolved.extraMarkup && (
            <g dangerouslySetInnerHTML={{ __html: resolved.extraMarkup }} />
          )}
          {resolved.facialHairMarkup && (
            <g
              dangerouslySetInnerHTML={{ __html: resolved.facialHairMarkup }}
            />
          )}
          <g dangerouslySetInnerHTML={{ __html: resolved.mouthMarkup }} />
          {resolved.marksMarkup && (
            <g dangerouslySetInnerHTML={{ __html: resolved.marksMarkup }} />
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
};

export default SanMascot;
