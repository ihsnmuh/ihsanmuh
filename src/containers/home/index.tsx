import Blog from '@/components/organism/home/blog';
import Hero from '@/components/organism/home/hero';
import Portofolio from '@/components/organism/home/portofolio';
import Principles from '@/components/organism/home/principles';
import Summary from '@/components/organism/home/summary';

import { TPosts } from '@/types/interfaces/posts';

interface IHomeContainer {
  posts: TPosts;
}

const HomeContainer = (props: IHomeContainer) => {
  const { posts } = props;

  return (
    <>
      <Hero />
      <Summary />
      <Principles />
      <Portofolio />
      <Blog posts={posts} />
    </>
  );
};

export default HomeContainer;
