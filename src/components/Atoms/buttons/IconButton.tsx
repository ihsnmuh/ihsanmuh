import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

const IconButtonVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;

type IconButtonProps = {
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: (typeof IconButtonVariant)[number];
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
} & React.ComponentPropsWithRef<'button'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      icon: Icon,
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
          'inline-flex items-center justify-center rounded-[8px] font-medium select-none',
          'focus-visible:ring-amber-glow focus:outline-none focus-visible:ring-2',
          'transition-[background-color,border-color,color,box-shadow,transform] duration-100 ease-[var(--ease-out)]',
          'min-h-[30px] min-w-[30px] p-1.5 md:min-h-[34px] md:min-w-[34px] md:p-2',
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-amber-glow text-[#111111]',
              'border-[1.5px] border-[#a06305]',
              'shadow-[0_2.5px_0_0_#8e5502]',
              'hover:bg-[#e2931d]',
              'active:translate-y-[1.5px] active:shadow-[0_1px_0_0_#8e5502]',
              'disabled:bg-pale-stone disabled:text-ash-green disabled:border-hairline disabled:shadow-none disabled:translate-y-0',
            ],
            variant === 'outline' && [
              'bg-paper-white text-[#111111]',
              'border-[1.5px] border-[#a06305]',
              'shadow-[0_2.5px_0_0_#eb9d2a,0_2.5px_0_1.5px_#a06305]',
              'hover:bg-[#fafaf7]',
              'active:translate-y-[1.5px] active:shadow-[0_1px_0_0_#eb9d2a,0_1px_0_1.5px_#a06305]',
              'disabled:bg-transparent disabled:text-ash-green disabled:border-ash-green disabled:shadow-none disabled:translate-y-0',
            ],
            variant === 'ghost' && [
              'text-deep-moss bg-transparent shadow-none',
              'hover:bg-pale-stone active:bg-soft-linen disabled:text-ash-green',
            ],
            variant === 'light' && [
              'bg-paper-white text-deep-moss',
              'border-[1.5px] border-hairline',
              'shadow-[0_2px_0_0_#bfc1b7]',
              'hover:bg-soft-linen',
              'active:translate-y-[1px] active:shadow-[0_1px_0_0_#bfc1b7]',
              'disabled:bg-pale-stone disabled:shadow-none disabled:translate-y-0',
            ],
            variant === 'dark' && [
              'bg-deep-moss text-paper-white',
              'border-[1.5px] border-[#141510]',
              'shadow-[0_2.5px_0_0_#141510]',
              'hover:opacity-95',
              'active:translate-y-[1.5px] active:shadow-[0_1px_0_0_#141510]',
              'disabled:bg-pale-stone disabled:text-ash-green disabled:shadow-none disabled:translate-y-0',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
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
                'text-paper-white': ['dark'].includes(variant),
                'text-deep-moss': [
                  'primary',
                  'light',
                  'outline',
                  'ghost',
                ].includes(variant),
              },
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {Icon && <Icon size='1em' className={cn(classNames?.icon)} />}
      </button>
    );
  },
);

export default IconButton;
