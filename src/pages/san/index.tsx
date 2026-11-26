import Seo from '@/components/Molecules/seo';
import SanContainer from '@/containers/san';

const SanPage = () => {
  return (
    <>
      <Seo
        templateTitle='San'
        description='San is my illustrated mascot for this site. One SVG file holds 16 moods, 4 haircuts, and a custom face mixer.'
        tags={['san', 'mascot', 'branding']}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'San', path: '/san' },
        ]}
      />
      <SanContainer />
    </>
  );
};

export default SanPage;
