import React from 'react';

import { cn } from '@/lib/utils';

type HedgehogPose = 'lab-coat' | 'terminal' | 'lounge' | 'reading' | 'simple';

interface HedgehogMascotProps {
  pose?: HedgehogPose;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const HedgehogMascot: React.FC<HedgehogMascotProps> = ({
  pose = 'simple',
  className,
  width = '100%',
  height = 'auto',
}) => {
  // Common paths and styling for hand-drawn look
  const strokeColor = 'currentColor';

  switch (pose) {
    case 'lab-coat':
      return (
        <svg
          viewBox='0 0 120 120'
          width={width}
          height={height}
          className={cn('text-ink fill-none select-none', className)}
          aria-hidden='true'
        >
          {/* Spikes */}
          <path
            d='M30,55 L15,45 M35,40 L18,25 M48,30 L35,12 M65,28 L60,8 M82,34 L85,15 M95,46 L108,32 M100,62 L116,58 M98,75 L114,80'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinecap='round'
          />
          {/* Secondary Spikes */}
          <path
            d='M40,48 L25,35 M55,38 L48,20 M72,36 L72,18 M88,44 L95,28'
            stroke={strokeColor}
            strokeWidth='2.5'
            strokeLinecap='round'
          />
          {/* Main Body */}
          <path
            d='M35,75 C30,55 45,35 65,35 C85,35 95,52 95,75 C95,90 85,98 65,98 C45,98 35,90 35,75 Z'
            fill='#ffffff'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinejoin='round'
          />
          {/* Lab Coat Details */}
          <path
            d='M42,75 L55,96 M88,75 L75,96 M55,75 L65,85 L75,75'
            stroke={strokeColor}
            strokeWidth='3'
            strokeLinecap='round'
          />
          {/* Pocket */}
          <path
            d='M78,82 L84,82 L84,88 L78,88 Z'
            stroke={strokeColor}
            strokeWidth='2'
          />
          {/* Pens in pocket */}
          <path
            d='M80,82 L80,78 M82,82 L82,77'
            stroke={strokeColor}
            strokeWidth='1.5'
          />
          {/* Goggles/Glasses */}
          <circle
            cx='53'
            cy='58'
            r='10'
            stroke={strokeColor}
            strokeWidth='3'
            fill='rgba(247, 165, 1, 0.2)'
          />
          <circle
            cx='77'
            cy='58'
            r='10'
            stroke={strokeColor}
            strokeWidth='3'
            fill='rgba(247, 165, 1, 0.2)'
          />
          <path
            d='M63,58 L67,58 M43,58 L40,58 M87,58 L90,58'
            stroke={strokeColor}
            strokeWidth='3'
          />
          {/* Eyes inside goggles */}
          <circle cx='53' cy='58' r='2' fill={strokeColor} />
          <circle cx='77' cy='58' r='2' fill={strokeColor} />
          {/* Nose */}
          <polygon
            points='63,68 67,68 65,71'
            fill={strokeColor}
            stroke={strokeColor}
            strokeWidth='1'
          />
          {/* Cheeks */}
          <path
            d='M45,66 C47,67 49,66 50,65'
            stroke={strokeColor}
            strokeWidth='1.5'
          />
          <path
            d='M85,66 C83,67 81,66 80,65'
            stroke={strokeColor}
            strokeWidth='1.5'
          />
          {/* Cute Smile */}
          <path
            d='M61,77 C63,79 67,79 69,77'
            stroke={strokeColor}
            strokeWidth='2.5'
            strokeLinecap='round'
          />
          {/* Test Tube in Hand */}
          <path
            d='M25,82 L35,82'
            stroke={strokeColor}
            strokeWidth='3'
            strokeLinecap='round'
          />
          <path
            d='M27,82 L27,70 C27,68 33,68 33,70 L33,82'
            stroke={strokeColor}
            strokeWidth='2.5'
            strokeLinejoin='round'
          />
          {/* Liquid in tube */}
          <path d='M28,78 L32,78 L32,81 L28,81 Z' fill='#f7a501' />
        </svg>
      );

    case 'terminal':
      return (
        <svg
          viewBox='0 0 120 120'
          width={width}
          height={height}
          className={cn('text-ink fill-none select-none', className)}
          aria-hidden='true'
        >
          {/* Spikes */}
          <path
            d='M25,50 L10,38 M28,34 L12,18 M40,24 L30,5 M58,22 L55,3 M78,25 L82,6 M92,36 L105,22 M96,54 L112,48 M94,70 L110,72'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinecap='round'
          />
          {/* Main Body */}
          <path
            d='M30,70 C25,50 40,30 60,30 C80,30 90,48 90,70 C90,85 80,92 60,92 C40,92 30,85 30,70 Z'
            fill='#ffffff'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinejoin='round'
          />
          {/* Eyes (focused, slightly squinting) */}
          <path
            d='M46,52 L54,54 M74,52 L66,54'
            stroke={strokeColor}
            strokeWidth='3'
            strokeLinecap='round'
          />
          {/* Nose */}
          <polygon
            points='58,62 62,62 60,65'
            fill={strokeColor}
            stroke={strokeColor}
            strokeWidth='1'
          />
          {/* Concentrating mouth */}
          <path
            d='M57,72 L63,72'
            stroke={strokeColor}
            strokeWidth='2.5'
            strokeLinecap='round'
          />
          {/* Hands Typing */}
          <circle
            cx='32'
            cy='85'
            r='5'
            stroke={strokeColor}
            strokeWidth='3'
            fill='#ffffff'
          />
          <circle
            cx='88'
            cy='85'
            r='5'
            stroke={strokeColor}
            strokeWidth='3'
            fill='#ffffff'
          />
          {/* Keyboard & Terminal in front */}
          <path
            d='M20,95 L100,95 L105,108 L15,108 Z'
            fill='rgba(35, 37, 29, 0.05)'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinejoin='round'
          />
          {/* Keys */}
          <path
            d='M28,100 L92,100 M24,104 L96,104'
            stroke={strokeColor}
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeDasharray='4 3'
          />
        </svg>
      );

    case 'lounge':
      return (
        <svg
          viewBox='0 0 120 120'
          width={width}
          height={height}
          className={cn('text-ink fill-none select-none', className)}
          aria-hidden='true'
        >
          {/* Hammock / Lounge chair background */}
          <path
            d='M10,85 C30,95 90,95 110,85 M20,65 L15,102 M100,65 L105,102'
            stroke={strokeColor}
            strokeWidth='3'
            strokeLinecap='round'
          />
          {/* Spikes */}
          <path
            d='M28,68 L14,64 M26,52 L12,44 M35,38 L22,25 M50,28 L42,10 M68,28 L72,10 M84,38 L95,24 M91,52 L106,44'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinecap='round'
          />
          {/* Main Body lying back */}
          <path
            d='M32,68 C32,48 48,32 68,34 C88,36 94,54 90,74 C86,88 74,94 56,92 C38,90 32,82 32,68 Z'
            fill='#ffffff'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinejoin='round'
          />
          {/* Sunglasses */}
          <polygon
            points='42,54 58,54 54,66 44,66'
            fill={strokeColor}
            stroke={strokeColor}
            strokeWidth='2'
          />
          <polygon
            points='66,54 82,54 78,66 68,66'
            fill={strokeColor}
            stroke={strokeColor}
            strokeWidth='2'
          />
          <path d='M58,57 L66,57' stroke={strokeColor} strokeWidth='3' />
          {/* Nose */}
          <polygon
            points='60,70 64,70 62,73'
            fill={strokeColor}
            stroke={strokeColor}
            strokeWidth='1'
          />
          {/* Smile */}
          <path
            d='M57,78 C60,81 65,81 68,78'
            stroke={strokeColor}
            strokeWidth='2.5'
            strokeLinecap='round'
          />
          {/* Drink with straw in hand */}
          <path
            d='M95,80 L102,80 L102,92 L95,92 Z'
            stroke={strokeColor}
            strokeWidth='2'
            fill='#ffffff'
          />
          <path
            d='M98,80 L92,68'
            stroke='#f7a501'
            strokeWidth='2.5'
            strokeLinecap='round'
          />
        </svg>
      );

    case 'reading':
      return (
        <svg
          viewBox='0 0 120 120'
          width={width}
          height={height}
          className={cn('text-ink fill-none select-none', className)}
          aria-hidden='true'
        >
          {/* Spikes */}
          <path
            d='M25,58 L10,50 M28,42 L13,28 M40,28 L30,10 M58,24 L56,4 M78,28 L82,10 M92,42 L105,28 M95,58 L110,50 M96,72 L112,70'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinecap='round'
          />
          {/* Main Body */}
          <path
            d='M30,75 C25,55 40,35 60,35 C80,35 90,52 90,75 C90,88 80,94 60,94 C40,94 30,88 30,75 Z'
            fill='#ffffff'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinejoin='round'
          />
          {/* Reading glasses */}
          <rect
            x='42'
            y='52'
            width='14'
            height='10'
            rx='2'
            stroke={strokeColor}
            strokeWidth='2.5'
            fill='rgba(247, 165, 1, 0.1)'
          />
          <rect
            x='64'
            y='52'
            width='14'
            height='10'
            rx='2'
            stroke={strokeColor}
            strokeWidth='2.5'
            fill='rgba(247, 165, 1, 0.1)'
          />
          <path d='M56,57 L64,57' stroke={strokeColor} strokeWidth='2.5' />
          {/* Eyes looking down */}
          <path
            d='M47,56 C49,58 51,58 53,56 M69,56 C71,58 73,58 75,56'
            stroke={strokeColor}
            strokeWidth='2'
            fill='none'
          />
          {/* Nose */}
          <polygon points='58,66 62,66 60,69' fill={strokeColor} />
          {/* Smile */}
          <path
            d='M58,74 C59,75 61,75 62,74'
            stroke={strokeColor}
            strokeWidth='2'
            strokeLinecap='round'
          />
          {/* Open Book */}
          <path
            d='M35,90 L58,84 L60,84 L83,90 L80,102 L60,96 L58,96 L38,102 Z'
            fill='#ffffff'
            stroke={strokeColor}
            strokeWidth='3'
            strokeLinejoin='round'
          />
          <path d='M59,84 L59,96' stroke={strokeColor} strokeWidth='2' />
          {/* Book lines */}
          <path
            d='M40,88 H53 M40,92 H51 M42,96 H53 M67,88 H78 M69,92 H78 M67,96 H76'
            stroke={strokeColor}
            strokeWidth='1.5'
            strokeLinecap='round'
          />
        </svg>
      );

    case 'simple':
    default:
      return (
        <svg
          viewBox='0 0 100 100'
          width={width}
          height={height}
          className={cn('text-ink fill-none select-none', className)}
          aria-hidden='true'
        >
          {/* Spikes */}
          <path
            d='M20,50 L8,42 M22,34 L10,20 M35,22 L25,6 M52,18 L50,2 M70,22 L78,6 M82,34 L94,20 M85,50 L98,42 M84,65 L96,62'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinecap='round'
          />
          {/* Body */}
          <path
            d='M25,65 C20,48 35,30 52,30 C69,30 78,45 78,65 C78,76 69,82 52,82 C35,82 25,76 25,65 Z'
            fill='#ffffff'
            stroke={strokeColor}
            strokeWidth='3.5'
            strokeLinejoin='round'
          />
          {/* Eyes */}
          <circle cx='42' cy='48' r='3.5' fill={strokeColor} />
          <circle cx='62' cy='48' r='3.5' fill={strokeColor} />
          {/* Nose */}
          <polygon points='50,56 54,56 52,59' fill={strokeColor} />
          {/* Simple smile */}
          <path
            d='M47,65 C49,67 55,67 57,65'
            stroke={strokeColor}
            strokeWidth='2.5'
            strokeLinecap='round'
          />
        </svg>
      );
  }
};
