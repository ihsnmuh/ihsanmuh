import Head from 'next/head';

import Seo from '@/components/Molecules/seo';
import SanContainer from '@/containers/san';

const siteUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : 'https://ihsanmuh.com';

const sanSchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'San',
  description:
    'San is the illustrated mascot of ihsanmuh.com: 16 moods, 4 haircuts, and a custom face mixer, all drawn in one SVG file.',
  url: `${siteUrl}/san`,
  author: { '@type': 'Person', name: 'Muhammad Ihsan', url: siteUrl },
  isBasedOn: {
    '@type': 'CreativeWork',
    name: 'Gri, the mascot',
    url: 'https://nibras.co/gri/',
    author: { '@type': 'Person', name: 'Griko Nibras' },
  },
};

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
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sanSchema) }}
        />
      </Head>
      <SanContainer />
    </>
  );
};

export default SanPage;
