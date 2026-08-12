import { IStravaResponse } from '@/types/interfaces/hobbies';

export const fetchStravaData = async (): Promise<IStravaResponse> => {
  try {
    // If executed on the server, directly invoke the server-side helper to avoid network loopback & URL protocol issues
    if (typeof window === 'undefined') {
      const { getStravaData } = await import('@/lib/strava');
      return await getStravaData();
    }

    // Client-side relative fetch
    const res = await fetch('/api/strava', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Strava data: ${res.statusText}`);
    }

    const data: IStravaResponse = await res.json();
    return data;
  } catch (error) {
    console.error('fetchStravaData error:', error);
    throw error;
  }
};
