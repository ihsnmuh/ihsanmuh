import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import React from 'react';

import Seo from '@/components/molecules/seo';
import ProjectContainer from '@/containers/project';

import { queryProjectList } from '@/queries/projectList';

const Project = () => {
  return (
    <>
      <Seo title='Project | Muhammad Ihsan' />
      <ProjectContainer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  // * prefach data project list
  await queryClient.prefetchQuery({
    ...queryProjectList({ limit: 100, order: 'desc' }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Project;
