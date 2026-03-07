import Head from 'next/head';
import { useRouter } from 'next/router';

const defaultMeta = {
  title: 'Personal Website',
  siteName: 'Muhammad Ihsan',
  description:
    'Software Engineer passionate about creating excellent user experiences',
  url: `https://${process.env.NEXT_PUBLIC_URL}`,
  image: `https://${process.env.NEXT_PUBLIC_URL}/favicon/android-chrome-512x512.png`,
  type: 'website',
  robots: 'follow, index',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
  isBlog?: boolean;
  banner?: string;
  canonical?: string;
  tags?: string | string[];
  modifiedDate?: string;
} & Partial<typeof defaultMeta>;

const Seo = (props: SeoProps) => {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };

  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  meta['type'] = props.isBlog ? 'article' : (props.type ?? defaultMeta.type);

  const tagList: string[] = [];
  if (typeof meta.tags === 'string' && meta.tags) tagList.push(meta.tags);
  else if (Array.isArray(meta.tags)) tagList.push(...meta.tags.filter(Boolean));
  const ogParams = new URLSearchParams({
    title: meta.title,
    description: meta.description,
    type: meta.type,
  });
  if (tagList.length > 0) ogParams.set('tags', tagList.join(','));
  if (props.image) ogParams.set('image', props.image);
  meta['image'] = `${meta.url}/api/og?${ogParams.toString()}`;

  console.log(meta.image);
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link
        rel='canonical'
        href={meta.canonical ? meta.canonical : `${meta.url}${router.asPath}`}
      />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta property='og:image' content={meta.image} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:alt' content={meta.title} />
      <meta property='og:locale' content='en_US' />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@ihsnmuh' />
      <meta name='twitter:creator' content='@ihsnmuh' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta
            name='author'
            property='article:author'
            content='Muhammad Ihsan'
          />
          {meta.modifiedDate && (
            <meta
              property='article:modified_time'
              content={meta.modifiedDate}
            />
          )}
        </>
      )}
      {meta.isBlog && meta.date && (
        <script
          key='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: meta.title,
              description: meta.description,
              author: {
                '@type': 'Person',
                name: 'Muhammad Ihsan',
              },
              image: meta.image,
              datePublished: meta.date,
              publisher: {
                '@type': 'Person',
                name: 'Muhammad Ihsan',
              },
            }),
          }}
        />
      )}

      {/* RSS Feed */}
      <link
        rel='alternate'
        type='application/rss+xml'
        title='Muhammad Ihsan - Blog RSS Feed'
        href={`${meta.url}/feed.xml`}
      />

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/favicon/android-chrome-192x192.png'
      />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
};

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: Array<Favicons> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/android-chrome-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '512x512',
    href: '/favicon/android-chrome-512x512.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
];

export default Seo;
