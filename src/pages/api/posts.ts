import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllPosts } from '@/lib/blog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const allPosts = getAllPosts([
      'title',
      'publishedAt',
      'description',
      'tags',
      'slug',
      'timeReading',
      'isShow',
    ]);

    // Filter only showing posts (strictly isShow === true)
    const filteredPosts = allPosts.filter((post) => {
      const isShow = post.isShow;
      if (typeof isShow === 'boolean') return isShow === true;
      if (typeof isShow === 'string') {
        return isShow.toLowerCase() === 'true' || isShow === '1';
      }
      return false;
    });

    // Set Cache-Control header for performance (cache for 1 hour, revalidate on background)
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=59',
    );

    res.status(200).json(filteredPosts);
  } catch (error) {
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to retrieve blog posts',
    });
  }
}
