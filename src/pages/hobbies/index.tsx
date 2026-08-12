import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { getStravaData } from '@/lib/strava';

import Seo from '@/components/Molecules/seo';
import HobbiesContainer from '@/containers/hobbies';

import { STRAVA_ACTIVITIES } from '@/constant/queryKeys/strava';

const HobbiesPage = () => {
  return (
    <>
      <Seo
        title='Hobbies & Life | Muhammad Ihsan'
        description='A glimpse into my life beyond code: live Strava running metrics, bookshelf reviews, and photography moments.'
        tags={['hobbies', 'running', 'strava', 'books', 'photography']}
      />
      <HobbiesContainer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  try {
    // Prefetch Strava activities directly on the server without HTTP loopback
    await queryClient.prefetchQuery({
      queryKey: STRAVA_ACTIVITIES,
      queryFn: async () => getStravaData(),
    });
  } catch (error) {
    console.error('Error prefetching Strava query:', error);
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default HobbiesPage;
