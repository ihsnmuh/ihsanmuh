import Link, { LinkProps } from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

export type BaseLinkProps = {
  href: string;
  children: React.ReactNode;
  isOpenNewTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & React.ComponentPropsWithRef<'a'>;

const UnderlineLink2 = ({
  href,
  children,
  isOpenNewTab,
  className,
  nextLinkProps,
  ...rest
}: BaseLinkProps) => {
  return (
    <Link
      className={cn(
        'animated-underline',
        'font-primary font-medium hover:text-primary-500 hover:dark:text-primary-500',
        'text-slate-600 dark:text-white',
        isOpenNewTab ? 'newtab' : '',
        className,
      )}
      href={href}
      target={isOpenNewTab ? '_blank' : ''}
      {...rest}
      {...nextLinkProps}
    >
      <span>{children}</span>
    </Link>
  );
};

export default UnderlineLink2;
