import Blog from '@/components/Organism/Home/Blog';
import Hero from '@/components/Organism/Home/Hero';
import Portofolio from '@/components/Organism/Home/Portofolio';
import PrinciplesSection from '@/components/Organism/Home/Principles';
import Summary from '@/components/Organism/Home/Summary';

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
      <PrinciplesSection />
      <Portofolio />
      <Blog posts={posts} />
    </>
  );
};

export default HomeContainer;
