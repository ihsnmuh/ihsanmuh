import prisma from '@/lib/prisma';

export type TViewsLikesMap = Record<string, { views: number; likes: number }>;

/**
 * Batch fetch view and like counts for multiple post slugs.
 * Returns a map of slug -> { views, likes }.
 * Safe to call from getStaticProps; returns empty counts on DB error.
 */
export async function getViewsAndLikesForSlugs(
  slugs: string[],
): Promise<TViewsLikesMap> {
  const uniqueSlugs = [...new Set(slugs)].filter(Boolean);
  if (uniqueSlugs.length === 0) {
    return {};
  }

  try {
    const [viewsRows, likesRows] = await Promise.all([
      prisma.postViews.findMany({
        where: { slug: { in: uniqueSlugs } },
        select: { slug: true, count: true },
      }),
      prisma.postLikes.findMany({
        where: { slug: { in: uniqueSlugs } },
        select: { slug: true, count: true },
      }),
    ]);

    const viewsMap = Object.fromEntries(
      viewsRows.map((r) => [r.slug, r.count] as const),
    );
    const likesMap = Object.fromEntries(
      likesRows.map((r) => [r.slug, r.count] as const),
    );

    const result: TViewsLikesMap = {};
    for (const slug of uniqueSlugs) {
      result[slug] = {
        views: viewsMap[slug] ?? 0,
        likes: likesMap[slug] ?? 0,
      };
    }
    return result;
  } catch (error) {
    console.warn('Failed to fetch views/likes batch (non-critical):', error);
    return Object.fromEntries(
      uniqueSlugs.map((slug) => [slug, { views: 0, likes: 0 }]),
    );
  }
}
