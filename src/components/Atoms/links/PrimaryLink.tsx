import * as React from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

const PrimaryLinkVariant = ['primary', 'basic', 'blue'] as const;
type PrimaryLinkProps = {
  variant?: (typeof PrimaryLinkVariant)[number];
} & UnstyledLinkProps;

const PrimaryLink = React.forwardRef<HTMLAnchorElement, PrimaryLinkProps>(
  ({ className, children, variant = 'primary', ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'inline-flex items-center font-ui font-medium',
          'focus-visible:ring-amber-glow focus:outline-none focus-visible:ring-2 focus-visible:rounded-xs',
          'transition-colors duration-150',
          //#region  //*=========== Variant ===========
          variant === 'primary' && [
            'text-burnished-gold hover:text-dark-amber active:text-deep-moss',
            'disabled:text-ash-green',
          ],
          variant === 'blue' && [
            'text-signal-blue hover:underline active:text-blue-700',
            'disabled:text-ash-green',
          ],
          variant === 'basic' && [
            'text-deep-moss hover:text-olive-char active:text-sage-gray',
            'disabled:text-ash-green',
          ],
          //#endregion  //*======== Variant ===========
          className,
        )}
      >
        {children}
      </UnstyledLink>
    );
  },
);

export default PrimaryLink;
