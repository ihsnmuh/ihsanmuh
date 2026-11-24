import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { getProjectsFromDb } from '@/lib/projects';

import Seo from '@/components/Molecules/seo';
import ProjectContainer from '@/containers/project';

import { queryProjectList } from '@/queries/projectList';

const Project = () => {
  return (
    <>
      <Seo
        templateTitle='Projects'
        description='Web applications, internal tools, and UI experiments built and shipped by Muhammad Ihsan.'
        tags={['projects']}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/project' },
        ]}
      />
      <ProjectContainer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  // * prefetch data project list directly from DB on SSR
  const projectQuery = queryProjectList({ limit: 100, order: 'desc' });
  await queryClient.prefetchQuery({
    queryKey: projectQuery.queryKey,
    queryFn: () => getProjectsFromDb({ limit: 100, order: 'desc' }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Project;
