import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getAllPosts } from '@/lib/blog';
import { getPersonSchema, getWebsiteSchema } from '@/lib/structuredData';
import { getViewsAndLikesForSlugs } from '@/lib/viewsLikes';

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

export const getStaticProps: GetStaticProps = async () => {
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

  // * prefetch data project list
  await queryClient.prefetchQuery({
    ...queryProjectList({ limit: 3, order: 'desc' }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      allPosts: allPostsWithStats,
    },
    revalidate: 3600,
  };
};
