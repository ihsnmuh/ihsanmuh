import PostCard from '@/components/Molecules/card/BlogCard';

import { IPost } from '@/types/interfaces/posts';

type RelatedPostsProps = {
  posts: IPost[];
};

function isPostActive(post: IPost): boolean {
  const isShow = post.isShow;
  if (isShow === undefined || isShow === null) return true;
  if (typeof isShow === 'boolean') return isShow;
  if (typeof isShow === 'string') {
    const strValue = isShow as string;
    return strValue.toLowerCase() !== 'false' && strValue !== '0';
  }
  return true;
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  const activePosts = posts.filter(isPostActive);

  if (activePosts.length === 0) {
    return null;
  }

  return (
    <section className='mt-16 border-t border-hairline pt-10' data-toc-exclude>
      <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
        Keep Reading
      </p>
      {/* Use div instead of h2 so it is excluded from TOC heading queries */}
      <div className='font-primary text-2xl font-semibold tracking-tight text-ink mb-6'>
        Related Articles
      </div>
      <div className='grid gap-6 md:grid-cols-2'>
        {activePosts.slice(0, 2).map((post) => (
          <PostCard key={post.slug} {...post} excludeFromToC />
        ))}
      </div>
    </section>
  );
}
