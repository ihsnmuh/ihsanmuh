import type { NextApiRequest, NextApiResponse } from 'next';

import { getStravaData } from '@/lib/strava';

import { IStravaResponse } from '@/types/interfaces/hobbies';

type ResponseData = IStravaResponse | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = await getStravaData();

    // Cache the response for 15 minutes (900s), stale-while-revalidate for 30 minutes (1800s)
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=1800',
    );

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
