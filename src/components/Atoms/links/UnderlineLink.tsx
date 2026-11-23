import * as React from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

const UnderlineLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'inline-flex items-center font-ui font-medium text-deep-moss underline decoration-hairline hover:decoration-amber-glow underline-offset-4',
          'focus-visible:ring-amber-glow focus:outline-none focus-visible:rounded-xs focus-visible:ring-2',
          'transition-colors duration-150',
          className,
        )}
      >
        {children}
      </UnstyledLink>
    );
  },
);

export default UnderlineLink;
