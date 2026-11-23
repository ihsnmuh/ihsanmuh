import Seo from '@/components/Molecules/seo';
import AboutContainer from '@/containers/about';

const About = () => {
  return (
    <>
      <Seo
        templateTitle='About'
        description='Background, work experience, education, and tech stack of Muhammad Ihsan, a software engineer in Jakarta.'
        tags={['about']}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />
      <AboutContainer />
    </>
  );
};

export default About;
