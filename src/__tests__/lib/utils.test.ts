import { describe, expect, it } from 'vitest';

import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toContain('text-red-500');
    expect(result).toContain('bg-blue-500');
  });

  it('should handle conditional classes', () => {
    const result = cn('base-class', false && 'hidden-class', 'visible-class');
    expect(result).toContain('base-class');
    expect(result).toContain('visible-class');
    expect(result).not.toContain('hidden-class');
  });

  it('should merge conflicting Tailwind classes correctly', () => {
    const result = cn('px-2', 'px-4');
    expect(result).toBe('px-4');
  });

  it('should handle undefined and null values', () => {
    const result = cn('valid-class', undefined, null, 'another-class');
    expect(result).toContain('valid-class');
    expect(result).toContain('another-class');
  });
});
