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
      try {
        const post = await prisma.postLikes.findUnique({
          where: { slug },
        });
        return res.status(200).json({ count: post?.count ?? 0 });
      } catch (dbError) {
        return res.status(200).json({ count: 0 });
      }
    }

    if (req.method === 'POST') {
      try {
        const post = await prisma.postLikes.upsert({
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
      } catch (dbError) {
        return res.status(200).json({ count: 0 });
      }
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    return res.status(200).json({ count: 0 });
  }
}
