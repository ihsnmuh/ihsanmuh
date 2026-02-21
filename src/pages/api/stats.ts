import type { NextApiRequest, NextApiResponse } from 'next';

import { getViewsAndLikesForSlugs, TViewsLikesMap } from '@/lib/viewsLikes';

type ResponseData = TViewsLikesMap | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slugs } = req.query;

  if (!slugs || typeof slugs !== 'string') {
    return res.status(400).json({ message: 'Invalid slugs parameter' });
  }

  const slugArray = slugs
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (slugArray.length === 0) {
    return res.status(400).json({ message: 'No valid slugs provided' });
  }

  try {
    const stats = await getViewsAndLikesForSlugs(slugArray);
    return res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    const emptyStats = Object.fromEntries(
      slugArray.map((slug) => [slug, { views: 0, likes: 0 }]),
    );
    return res.status(200).json(emptyStats);
  }
}
