import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Headings } from '@/components/Molecules/blog/TabelOfContent';

const SAMPLE_HEADINGS = [
  { id: 'relative', title: 'Relative Positioning', items: [] },
  {
    id: 'absolute',
    title: 'Absolute Positioning',
    items: [{ id: 'centering', title: 'Centering Trick' }],
  },
  {
    id: 'containing',
    title: 'Containing Blocks',
    items: [
      { id: 'puzzle', title: 'Containing Puzzle' },
      { id: 'exercises', title: 'Exercises' },
    ],
  },
];

describe('Headings stepped-line TOC', () => {
  it('renders flattened H2 and H3 items and highlights active item and parent', () => {
    render(<Headings headings={SAMPLE_HEADINGS} activeId='centering' />);

    const activeLink = screen.getByRole('link', { name: 'Centering Trick' });
    const parentLink = screen.getByRole('link', {
      name: 'Absolute Positioning',
    });
    const upcomingLink = screen.getByRole('link', {
      name: 'Containing Blocks',
    });

    expect(activeLink).toHaveAttribute('href', '#centering');
    expect(activeLink.className).toContain('text-accent');
    expect(parentLink.className).toContain('text-ink');
    expect(upcomingLink.className).toContain('text-muted');
  });

  it('smoothly scrolls to target heading and invokes onSelectHeading without router remount', () => {
    const targetEl = document.createElement('h2');
    targetEl.id = 'containing';
    targetEl.scrollIntoView = vi.fn();
    document.body.appendChild(targetEl);

    const onSelectHeading = vi.fn();
    render(
      <Headings
        headings={SAMPLE_HEADINGS}
        activeId='relative'
        onSelectHeading={onSelectHeading}
      />,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Containing Blocks' }));

    expect(onSelectHeading).toHaveBeenCalledWith('containing');
    expect(targetEl.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    document.body.removeChild(targetEl);
  });
});
