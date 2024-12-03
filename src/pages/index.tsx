import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';

import { getAllPosts } from '@/lib/blog';

import Seo from '@/components/molecules/seo';
import HomeContainer from '@/containers/home';

import { queryProjectList } from '@/queries/projectList';

import { IPost } from '@/types/interfaces/posts';

interface IHomeProps {
  allPosts: IPost[];
}

export default function Home(props: IHomeProps) {
  const { allPosts } = props;

  const filteredPost = allPosts.filter((data) => data.isShow);

  return (
    <>
      <Seo />
      <HomeContainer posts={filteredPost} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
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

  // * prefach data project list
  await queryClient.prefetchQuery({
    ...queryProjectList({ limit: 3, order: 'desc' }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      allPosts,
    },
  };
};
