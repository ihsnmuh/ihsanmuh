import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import SanMascotLazy from '@/components/Atoms/svg/SanMascotLazy';

vi.mock('@/components/Atoms/svg/SanMascot', () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid='mascot' className={className} />
  ),
}));

vi.mock('@/helpers/useAfterIdle', () => ({
  useAfterIdle: () => true,
}));

describe('SanMascotLazy', () => {
  it('applies className to the fixed-size outer box so margins separate it from siblings', async () => {
    const { container } = render(
      <SanMascotLazy mood='awkward' size={88} className='mb-4' />,
    );
    const mascot = await screen.findByTestId('mascot');
    const box = container.firstElementChild;

    expect(box).toHaveClass('mb-4');
    expect(box).toHaveStyle({ width: '88px', height: '88px' });
    expect(mascot).not.toHaveClass('mb-4');
  });

  it('forwards mascotClassName to the mascot inside the box', async () => {
    const { container } = render(
      <SanMascotLazy
        mood='grin'
        size={40}
        className='mb-2'
        mascotClassName='pointer-events-none'
      />,
    );
    const mascot = await screen.findByTestId('mascot');

    expect(mascot).toHaveClass('pointer-events-none');
    expect(container.firstElementChild).not.toHaveClass('pointer-events-none');
    expect(container.firstElementChild).toHaveClass('mb-2');
  });

  it('keeps the default box classes when no className is given', async () => {
    const { container } = render(<SanMascotLazy mood='grin' size={32} />);
    await screen.findByTestId('mascot');

    expect(container.firstElementChild).toHaveClass(
      'relative',
      'inline-flex',
      'shrink-0',
    );
    expect(container.firstElementChild?.className).not.toContain('undefined');
  });
});
