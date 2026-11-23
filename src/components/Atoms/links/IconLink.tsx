import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

const IconLinkVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;

type IconLinkProps = {
  variant?: (typeof IconLinkVariant)[number];
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
} & Omit<UnstyledLinkProps, 'children'>;

const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    { className, icon: Icon, variant = 'outline', classNames, ...rest },
    ref,
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        type='button'
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-medium',
          'focus-visible:ring-amber-glow focus:outline-none focus-visible:ring-2',
          'shadow-none transition-colors duration-150',
          'min-h-[28px] min-w-[28px] p-1.5 md:min-h-[32px] md:min-w-[32px] md:p-2',
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-amber-glow text-deep-moss',
              'border-dark-amber border',
              'hover:bg-dark-amber hover:text-deep-moss',
              'active:bg-burnished-gold',
              'disabled:bg-pale-stone disabled:text-ash-green',
            ],
            variant === 'outline' && [
              'text-burnished-gold bg-transparent',
              'border-burnished-gold border',
              'hover:bg-pale-stone active:bg-soft-linen disabled:bg-transparent disabled:text-ash-green',
            ],
            variant === 'ghost' && [
              'text-deep-moss',
              'shadow-none',
              'hover:bg-pale-stone active:bg-soft-linen disabled:text-ash-green',
            ],
            variant === 'light' && [
              'bg-paper-white text-deep-moss',
              'border border-hairline',
              'hover:bg-pale-stone',
              'active:bg-soft-linen disabled:bg-pale-stone',
            ],
            variant === 'dark' && [
              'bg-deep-moss text-paper-white',
              'border border-deep-moss',
              'hover:opacity-90 active:opacity-100 disabled:bg-pale-stone disabled:text-ash-green',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          className,
        )}
        {...rest}
      >
        {Icon && <Icon size='1em' className={cn(classNames?.icon)} />}
      </UnstyledLink>
    );
  },
);

export default IconLink;
