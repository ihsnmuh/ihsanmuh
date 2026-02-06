import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

type ResponseData = {
  count?: number;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Invalid slug parameter' });
  }

  try {
    if (req.method === 'GET') {
      const post = await prisma.postViews.findUnique({
        where: { slug },
      });

      return res.status(200).json({ count: post?.count ?? 0 });
    }

    if (req.method === 'POST') {
      const post = await prisma.postViews.upsert({
        where: { slug },
        update: {
          count: {
            increment: 1,
          },
        },
        create: {
          slug,
          count: 1,
        },
      });

      return res.status(200).json({ count: post.count });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling view count:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
