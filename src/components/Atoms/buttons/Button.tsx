import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

const ButtonVariant = ['primary', 'outline', 'ghost', 'light', 'dark'] as const;
const ButtonSize = ['sm', 'base'] as const;

type ButtonProps = {
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType | LucideIcon;
  rightIcon?: IconType | LucideIcon;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-primary font-medium select-none',
          'focus-visible:ring-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          'transition-all duration-150 active:scale-[0.98]',
          [
            size === 'base' && ['px-4 py-2', 'h-10 text-sm'],
            size === 'sm' && ['px-3 py-1.5', 'h-8 text-xs'],
          ],
          [
            variant === 'primary' && [
              'bg-cta text-cta-fg border border-transparent',
              'hover:bg-cta-hover',
              'disabled:bg-subtle disabled:text-disabled',
            ],
            variant === 'outline' && [
              'bg-transparent text-ink border border-hairline-strong',
              'hover:bg-subtle hover:border-ink/30',
              'disabled:text-disabled disabled:border-hairline',
            ],
            variant === 'ghost' && [
              'text-body bg-transparent',
              'hover:text-ink hover:bg-subtle disabled:text-disabled',
            ],
            variant === 'light' && [
              'bg-surface text-ink border border-hairline',
              'hover:bg-subtle hover:border-hairline-strong',
              'disabled:bg-subtle disabled:text-disabled',
            ],
            variant === 'dark' && [
              'bg-cta text-cta-fg border border-transparent',
              'hover:bg-cta-hover',
              'disabled:bg-subtle disabled:text-disabled',
            ],
          ],
          'disabled:cursor-not-allowed disabled:active:scale-100',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-cta-fg': ['primary', 'dark'].includes(variant),
                'text-ink': ['light', 'outline', 'ghost'].includes(variant),
              },
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
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
      </button>
    );
  },
);

export default Button;
