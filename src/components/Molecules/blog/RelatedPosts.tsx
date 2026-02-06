import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { formatDate } from '@/helpers/formatDate';

import NextImage from '@/components/Atoms/NextImage';
import TagPill from '@/components/Atoms/pills/TagPills';

type RelatedPost = {
  slug: string;
  title: string;
  description?: string;
  banner?: string;
  publishedAt: string;
  tags?: string[];
  timeReading?: string;
};

type RelatedPostsProps = {
  posts: RelatedPost[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className='mt-16 border-t border-slate-300 dark:border-slate-700 pt-8'>
      <h2 className='text-2xl font-bold mb-6'>Related Posts</h2>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => {
          const tagsRaw = post.tags || [];
          const tags = Array.isArray(tagsRaw)
            ? tagsRaw
            : typeof tagsRaw === 'string'
              ? (tagsRaw as string).split(',').map((tag) => tag.trim())
              : [];

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='group block rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-colors'
            >
              {post.banner && (
                <div className='relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800'>
                  <NextImage
                    className='w-full h-full'
                    classNames={{
                      image:
                        'group-hover:scale-105 transition-transform duration-300',
                    }}
                    src={`/images/blog/${post.banner}`}
                    alt={post.title}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                    useSkeleton
                  />
                </div>
              )}
              <div className='p-4'>
                <h3 className='font-semibold text-lg mb-2 group-hover:text-primary-500 transition-colors line-clamp-2'>
                  {post.title}
                </h3>
                {post.description && (
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2'>
                    {post.description}
                  </p>
                )}
                <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-3'>
                  <span>{formatDate(post.publishedAt)}</span>
                  {post.timeReading && <span>{post.timeReading}</span>}
                </div>
                {tags.length > 0 && (
                  <div className='flex flex-wrap gap-2 mb-3'>
                    {tags.slice(0, 2).map((tag) => (
                      <TagPill key={tag} name={tag} />
                    ))}
                  </div>
                )}
                <div className='flex items-center text-sm text-primary-500 font-medium'>
                  Read more
                  <ArrowRight className='ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
