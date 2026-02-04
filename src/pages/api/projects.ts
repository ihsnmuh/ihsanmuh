// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

export default async function projects(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { limit, order } = req.query;

    // Ensure the order parameter is a string and is either 'asc' or 'desc'
    const sortOrder = Array.isArray(order) ? order[0] : order;
    const validOrder =
      sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'desc';

    const response = await prisma.projects.findMany({
      orderBy: {
        createAt: validOrder || 'desc',
      },
      take: Number(limit) || 3,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}
