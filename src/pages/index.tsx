import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { getAllPosts } from '@/lib/blog';
import { getPersonSchema, getWebsiteSchema } from '@/lib/structuredData';

import Seo from '@/components/Molecules/seo';
import HomeContainer from '@/containers/home';

import { queryProjectList } from '@/queries/projectList';

import { IPost } from '@/types/interfaces/posts';

interface IHomeProps {
  allPosts: IPost[];
}

export default function Home(props: IHomeProps) {
  const { allPosts } = props;

  const filteredPost = allPosts.filter((data) => data.isShow);
  const personSchema = getPersonSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <Seo />
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </Head>
      <HomeContainer posts={filteredPost} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
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
