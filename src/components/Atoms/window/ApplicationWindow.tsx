import React from 'react';

import { cn } from '@/lib/utils';

interface ApplicationWindowProps {
  filename?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  headerRight?: React.ReactNode;
  icon?: string;
}

/**
 * Clean editorial page wrapper preserving the ApplicationWindow prop API
 * for seamless backward compatibility across routes.
 */
export const ApplicationWindow: React.FC<ApplicationWindowProps> = ({
  children,
  className,
  bodyClassName,
}) => {
  return (
    <div className={cn('w-full mx-auto', className)}>
      <div className={cn('w-full', bodyClassName)}>{children}</div>
    </div>
  );
};

export default ApplicationWindow;
