import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

const ButtonLinkVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;
const ButtonLinkSize = ['sm', 'base'] as const;

type ButtonLinkProps = {
  variant?: (typeof ButtonLinkVariant)[number];
  size?: (typeof ButtonLinkSize)[number];
  leftIcon?: IconType | LucideIcon;
  rightIcon?: IconType | LucideIcon;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      ...rest
    },
    ref,
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-primary font-medium select-none',
          'focus-visible:ring-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.98]',
          [
            size === 'base' && ['px-4 py-2', 'h-10 text-sm'],
            size === 'sm' && ['px-3 py-1.5', 'h-8 text-xs'],
          ],
          [
            variant === 'primary' && [
              'bg-cta text-cta-fg border border-transparent',
              'hover:bg-cta-hover',
            ],
            variant === 'outline' && [
              'bg-transparent text-ink border border-hairline-strong',
              'hover:bg-subtle hover:border-ink/30',
            ],
            variant === 'ghost' && [
              'text-body bg-transparent',
              'hover:text-ink hover:bg-subtle',
            ],
            variant === 'light' && [
              'bg-surface text-ink border border-hairline',
              'hover:bg-subtle hover:border-hairline-strong',
            ],
            variant === 'dark' && [
              'bg-cta text-cta-fg border border-transparent',
              'hover:bg-cta-hover',
            ],
          ],
          'disabled:cursor-not-allowed',
          className,
        )}
      >
        {LeftIcon && (
          <div
            className={cn([
              size === 'base' && 'mr-2',
              size === 'sm' && 'mr-1.5',
            ])}
          >
            <LeftIcon
              size='1em'
              className={cn(
                [size === 'base' && 'text-sm', size === 'sm' && 'text-xs'],
                classNames?.leftIcon,
              )}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={cn([
              size === 'base' && 'ml-2',
              size === 'sm' && 'ml-1.5',
            ])}
          >
            <RightIcon
              size='1em'
              className={cn(
                [size === 'base' && 'text-sm', size === 'sm' && 'text-xs'],
                classNames?.rightIcon,
              )}
            />
          </div>
        )}
      </UnstyledLink>
    );
  },
);

export default ButtonLink;
