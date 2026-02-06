import type { NextApiRequest, NextApiResponse } from 'next';
import RSS from 'rss';

import { getAllPosts } from '@/lib/blog';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_ROOT || 'https://ihsanmuh.com';

    const feed = new RSS({
      title: 'Muhammad Ihsan - Blog',
      description:
        'Articles about technology, software development, and personal experiences',
      site_url: siteUrl,
      feed_url: `${siteUrl}/api/rss`,
      language: 'en',
      pubDate: new Date().toUTCString(),
      copyright: `All rights reserved ${new Date().getFullYear()}, Muhammad Ihsan`,
    });

    const allPosts = getAllPosts([
      'title',
      'publishedAt',
      'description',
      'slug',
      'isShow',
    ]);

    const publishedPosts = allPosts.filter((post) => post.isShow);

    publishedPosts.forEach((post) => {
      feed.item({
        title: post.title,
        description: post.description || '',
        url: `${siteUrl}/blog/${post.slug}`,
        date: post.publishedAt,
        guid: `${siteUrl}/blog/${post.slug}`,
      });
    });

    const rss = feed.xml({ indent: true });

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    res.status(200).send(rss);
  } catch (error) {
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to generate RSS feed',
    });
  }
}
