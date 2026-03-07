import Seo from '@/components/Molecules/seo';
import AboutContainer from '@/containers/about';

const About = () => {
  return (
    <>
      <Seo title='About | Muhammad Ihsan' tags={['about']} />
      <AboutContainer />
    </>
  );
};

export default About;
