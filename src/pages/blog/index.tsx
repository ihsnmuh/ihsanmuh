import { GetServerSideProps } from 'next';

import { getAllPosts } from '@/lib/blog';
import { getViewsAndLikesForSlugs } from '@/lib/viewsLikes';

import Seo from '@/components/Molecules/seo';
import BlogContainer from '@/containers/blog';

import { IPost } from '@/types/interfaces/posts';

interface IBlogPage {
  allPosts: IPost[];
}

const Blog = (props: IBlogPage) => {
  const { allPosts } = props;

  const filteredPost = allPosts.filter((data) => data.isShow);

  return (
    <>
      <Seo
        templateTitle='Writing'
        description='Articles and engineering notes on frontend architecture, React, Next.js, TypeScript, and web performance by Muhammad Ihsan.'
        tags={['writing', 'blog']}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/blog' },
        ]}
      />
      <BlogContainer posts={filteredPost} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'publishedAt',
    'description',
    'banner',
    'tags',
    'slug',
    'timeReading',
    'isShow',
  ]);

  const slugs = allPosts
    .map((p) => p.slug)
    .filter((s): s is string => Boolean(s));
  const viewsLikes = await getViewsAndLikesForSlugs(slugs);

  const allPostsWithStats: IPost[] = allPosts.map((post) => {
    const slug = post.slug as string;
    const stats = slug ? viewsLikes[slug] : undefined;
    return {
      ...post,
      views: stats?.views ?? 0,
      likes: stats?.likes ?? 0,
    } as IPost;
  });

  return {
    props: {
      allPosts: allPostsWithStats,
    },
  };
};

export default Blog;
