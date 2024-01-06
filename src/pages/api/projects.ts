// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

export default async function projects(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await prisma.projects.findMany({
      orderBy: {
        create_at: 'desc',
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}
