import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';

import Seo from '@/components/molecules/seo';
import HomeContainer from '@/containers/home';

import { queryProjectList } from '@/queries/projectList';

export default function Home() {
  return (
    <>
      <Seo />
      <HomeContainer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  // * prefach data project list
  await queryClient.prefetchQuery({
    ...queryProjectList({ limit: 3, order: 'desc' }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
