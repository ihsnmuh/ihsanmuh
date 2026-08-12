import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import ActivityHeatmapCard from '@/components/Molecules/card/ActivityHeatmapCard';

import { IStravaActivity } from '@/types/interfaces/hobbies';

describe('ActivityHeatmapCard', () => {
  const mockActivities: IStravaActivity[] = [
    {
      id: 101,
      name: 'Morning Workout',
      distance: 8.5,
      movingTime: 2700,
      formattedTime: '45m 00s',
      elapsedTime: 2800,
      totalElevationGain: 40,
      type: 'Run',
      sportType: 'Run',
      startDate: new Date().toISOString(),
      startDateLocal: new Date().toISOString(),
      averageSpeed: 3.14,
      maxSpeed: 4.0,
      pace: '5:18 /km',
      stravaUrl: 'https://strava.com',
    },
  ];

  it('renders title and loading skeleton when isLoading is true', () => {
    render(<ActivityHeatmapCard isLoading={true} />);

    expect(screen.getByText('Daily Activity Matrix')).toBeInTheDocument();
  });

  it('renders activity summary and heatmap legend when data is loaded', () => {
    render(
      <ActivityHeatmapCard activities={mockActivities} isLoading={false} />,
    );

    expect(screen.getByText(/1 activities/i)).toBeInTheDocument();
    expect(screen.getByText(/8.5 km/i)).toBeInTheDocument();
    expect(screen.getByText('Less')).toBeInTheDocument();
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  it('renders customizable custom title', () => {
    render(
      <ActivityHeatmapCard
        activities={mockActivities}
        isLoading={false}
        title='Custom Strava Matrix'
      />,
    );

    expect(screen.getByText('Custom Strava Matrix')).toBeInTheDocument();
  });
});
