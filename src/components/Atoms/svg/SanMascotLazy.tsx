import dynamic from 'next/dynamic';
import { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { useAfterIdle } from '@/helpers/useAfterIdle';

const SanMascot = dynamic(() => import('@/components/Atoms/svg/SanMascot'), {
  ssr: false,
  loading: () => null,
});

type TSanMascotLazyProps = ComponentProps<typeof SanMascot> & {
  /** Rendered under the mascot while it loads. Defaults to a soft circle. */
  fallback?: ReactNode;
  /** Skip the idle gate when the mascot is mounted by a user action. */
  immediate?: boolean;
};

/**
 * Loads the San mascot (and its 30 KB of markup) only after the page is idle,
 * inside a fixed-size box so nothing shifts when it appears.
 */
const SanMascotLazy = ({
  fallback,
  immediate = false,
  ...props
}: TSanMascotLazyProps) => {
  const idle = useAfterIdle();
  const size = props.size ?? 180;

  return (
    <span
      aria-hidden={props.onClick || props.interactive ? undefined : true}
      style={{ width: size, height: size }}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center',
        fallback === undefined && 'rounded-full bg-subtle',
      )}
    >
      {fallback}
      {(immediate || idle) && (
        <span className='absolute inset-0 flex items-center justify-center'>
          <SanMascot {...props} />
        </span>
      )}
    </span>
  );
};

export default SanMascotLazy;
