import Blog from '@/components/Organism/Home/blog';
import Hero from '@/components/Organism/Home/Hero';
import Portofolio from '@/components/Organism/Home/portofolio';
import Summary from '@/components/Organism/Home/Summary';

import { TPosts } from '@/types/interfaces/posts';

interface IHomeContainer {
  posts: TPosts;
}

const HomeContainer = (props: IHomeContainer) => {
  const { posts } = props;

  return (
    <div className='space-y-20 sm:space-y-24'>
      <Hero />
      <Summary />
      <Portofolio />
      <Blog posts={posts} />
    </div>
  );
};

export default HomeContainer;
