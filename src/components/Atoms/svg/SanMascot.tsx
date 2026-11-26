import { useReducedMotion } from 'motion/react';
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
  animated?: boolean;
  interactive?: boolean;
  disableTapScale?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * San: illustrated portrait mascot component for ihsanmuh.
 * Uses GPU-composited CSS transforms for interruptible mood poses and per-mood CSS motion.
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
  animated = false,
  interactive = false,
  disableTapScale = false,
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
  const faceKey = `${eyesMood ?? mood}-${mouthMood ?? mood}-${extraMood ?? mood}`;

  const shapeClass =
    shape === 'circle'
      ? 'rounded-full overflow-hidden'
      : shape === 'rounded'
        ? 'rounded-2xl overflow-hidden'
        : '';

  return (
    <div
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
      style={{ width: size, height: size }}
      className={cn(
        'relative inline-flex items-center justify-center select-none shrink-0',
        shapeClass,
        isClickable &&
          'cursor-pointer transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        isClickable &&
          !disableTapScale &&
          !prefersReducedMotion &&
          'active:scale-[0.97]',
        className,
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={SAN_VIEW_BOX}
        width={size}
        height={size}
        data-mood={mood}
        data-animated={animated ? 'true' : undefined}
        className='san-svg block w-full h-full'
      >
        {ground && (
          <rect
            x='0'
            y='0'
            width='1240'
            height='1240'
            fill={ground}
            className='san-ground'
          />
        )}

        <g
          style={{
            transform: `translateY(${drop}px) rotate(${turn}deg)`,
            transformBox: 'view-box',
            transformOrigin: '50% 50%',
            transition: prefersReducedMotion
              ? 'none'
              : 'transform 240ms cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          <g className='san-intro-wrap'>
            <g className='san-head'>
              <g dangerouslySetInnerHTML={{ __html: SAN_SKIN_MARKUP }} />
              {resolved.blushMarkup && (
                <g
                  className='san-blush'
                  dangerouslySetInnerHTML={{ __html: resolved.blushMarkup }}
                />
              )}
              <g dangerouslySetInnerHTML={{ __html: resolved.hairMarkup }} />

              <g key={faceKey} className='san-face-swap'>
                <g
                  className='san-brows'
                  dangerouslySetInnerHTML={{ __html: resolved.browsMarkup }}
                />
                {resolved.glassesMarkup && (
                  <g
                    className='san-glasses'
                    dangerouslySetInnerHTML={{ __html: resolved.glassesMarkup }}
                  />
                )}
                <g
                  className='san-eyes'
                  dangerouslySetInnerHTML={{ __html: resolved.eyesMarkup }}
                />
                {resolved.extraMarkup && (
                  <g
                    className='san-extra'
                    dangerouslySetInnerHTML={{ __html: resolved.extraMarkup }}
                  />
                )}
                {resolved.facialHairMarkup && (
                  <g
                    dangerouslySetInnerHTML={{
                      __html: resolved.facialHairMarkup,
                    }}
                  />
                )}
                <g
                  className='san-mouth'
                  dangerouslySetInnerHTML={{ __html: resolved.mouthMarkup }}
                />
                {resolved.marksMarkup && (
                  <g
                    className='san-marks'
                    dangerouslySetInnerHTML={{ __html: resolved.marksMarkup }}
                  />
                )}
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default SanMascot;
