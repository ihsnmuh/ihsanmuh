import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';

import { getAllPosts } from '@/lib/blog';

import Seo from '@/components/molecules/seo';
import HomeContainer from '@/containers/home';

import { queryProjectList } from '@/queries/projectList';

export default function Home(props: any) {
  const { allPosts } = props;

  return (
    <>
      <Seo />
      <HomeContainer posts={allPosts} />
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
