import { GetStaticProps } from 'next';

import { getAllPosts } from '@/lib/blog';

import Seo from '@/components/molecules/seo';
import BlogContainer from '@/containers/blog';

const Blog = (props: any) => {
  const { allPosts } = props;

  return (
    <>
      <Seo isBlog title='Blog | Muhammad Ihsan' />
      <BlogContainer posts={allPosts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'publishedAt',
    'description',
    'banner',
    'tags',
    'slug',
    'content',
  ]);

  return {
    props: {
      allPosts,
    },
  };
};

export default Blog;
