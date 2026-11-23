import * as React from 'react';

import { cn } from '@/lib/utils';

const TextButtonVariant = ['primary', 'basic'] as const;

type TextButtonProps = {
  variant?: (typeof TextButtonVariant)[number];
  className?: string;
  disabled?: boolean;
} & React.ComponentPropsWithRef<'button'>;

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      disabled: buttonDisabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type='button'
        disabled={buttonDisabled}
        className={cn(
          'inline-flex items-center justify-center font-ui font-medium text-xs sm:text-sm',
          'focus-visible:ring-amber-glow focus:outline-none focus-visible:ring-2 rounded-xs',
          'transition-colors duration-150',
          //#region  //*=========== Variant ===========
          variant === 'primary' && [
            'text-burnished-gold hover:text-dark-amber active:text-deep-moss',
            'disabled:text-ash-green',
          ],
          variant === 'basic' && [
            'text-deep-moss hover:text-olive-char active:text-sage-gray',
            'disabled:text-ash-green',
          ],
          //#endregion  //*======== Variant ===========
          'disabled:cursor-not-allowed',
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default TextButton;
