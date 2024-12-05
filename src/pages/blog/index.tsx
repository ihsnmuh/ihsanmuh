import { GetStaticProps } from 'next';

import { getAllPosts } from '@/lib/blog';

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
      <Seo isBlog title='Blog | Muhammad Ihsan' />
      <BlogContainer posts={filteredPost} />
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
    'isShow',
  ]);

  return {
    props: {
      allPosts,
    },
  };
};

export default Blog;
