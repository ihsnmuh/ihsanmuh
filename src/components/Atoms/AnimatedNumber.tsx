import { animate } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * AnimatedNumber component that smoothly counts up to target numeric value at 60/120 FPS
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1.2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const prevValueRef = useRef<number>(0);

  useEffect(() => {
    if (isNaN(value)) {
      setDisplayValue(0);
      return;
    }

    const controls = animate(prevValueRef.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier easeOutExpo
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    prevValueRef.current = value;

    return () => controls.stop();
  }, [value, duration]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString();

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
