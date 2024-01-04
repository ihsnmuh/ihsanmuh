import Hero from '@/components/organism/home/hero';
import Portofolio from '@/components/organism/home/portofolio';
import Principles from '@/components/organism/home/principles';
import Summary from '@/components/organism/home/summary';

const HomeContainer = () => {
  return (
    <>
      <Hero />
      <Summary />
      <Principles />
      <Portofolio />
    </>
  );
};

export default HomeContainer;
