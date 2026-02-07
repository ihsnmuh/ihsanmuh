import { IPost } from '@/types/interfaces/posts';

import PostCard from '@/components/Molecules/card/BlogCard';

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
    <section className='mt-16 border-t border-slate-300 dark:border-slate-700 pt-8'>
      {/* Use div with styling instead of h2 to avoid appearing in TOC */}
      <div className='text-2xl font-bold mb-6'>Related Posts</div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {activePosts.slice(0, 3).map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}
