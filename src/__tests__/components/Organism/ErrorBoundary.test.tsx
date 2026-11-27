import { render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ErrorBoundary from '@/components/Organism/ErrorBoundary';

vi.mock('@/components/Atoms/svg/SanMascotLazy', () => ({
  default: ({ mood }: { mood?: string }) => (
    <span data-testid='san' data-mood={mood} />
  ),
}));

const Bomb = () => {
  throw new Error('boom');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>all good</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText('all good')).toBeInTheDocument();
  });

  it('shows a dizzy San with recovery actions when a child throws', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId('san')).toHaveAttribute('data-mood', 'dizzy');
    expect(
      screen.getByRole('heading', { name: 'Something went wrong' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Back to Home' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Try Again' }),
    ).toBeInTheDocument();
  });

  it('prefers a custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<p>custom fallback</p>}>
        <Bomb />
      </ErrorBoundary>,
    );

    expect(screen.getByText('custom fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('san')).not.toBeInTheDocument();
  });
});
