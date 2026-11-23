import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

type HealthResponse = {
  status: string;
  timestamp: string;
  uptime: number;
  database?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>,
) {
  const response: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    response.database = 'connected';
  } catch (_error) {
    response.database = 'disconnected';
    response.status = 'degraded';
  }

  const statusCode = response.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(response);
}
