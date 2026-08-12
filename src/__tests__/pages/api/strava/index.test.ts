import type { NextApiRequest, NextApiResponse } from 'next';
import { describe, expect, it, vi } from 'vitest';

import handler from '@/pages/api/strava';

describe('GET /api/strava API route handler', () => {
  it('returns 405 Method Not Allowed for non-GET requests', async () => {
    const req = {
      method: 'POST',
    } as unknown as NextApiRequest;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      setHeader: vi.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed' });
  });

  it('returns 200 with stats and activities for GET request', async () => {
    const req = {
      method: 'GET',
    } as unknown as NextApiRequest;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      setHeader: vi.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('s-maxage='),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        stats: expect.any(Object),
        activities: expect.any(Array),
      }),
    );
  });
});
