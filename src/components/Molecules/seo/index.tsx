import Head from 'next/head';
import { useRouter } from 'next/router';

const siteUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : 'https://ihsanmuh.com';

const defaultMeta = {
  title: 'Muhammad Ihsan | Software Engineer',
  siteName: 'Muhammad Ihsan',
  description:
    'Software engineer in Jakarta with 4+ years of experience building full-stack web applications across the React and TypeScript ecosystem.',
  url: siteUrl,
  image: `${siteUrl}/favicon/android-chrome-512x512.png`,
  type: 'website',
  robots: 'follow, index',
};

export interface IBreadcrumbItem {
  name: string;
  path: string;
}

type SeoProps = {
  date?: string;
  templateTitle?: string;
  isBlog?: boolean;
  banner?: string;
  canonical?: string;
  tags?: string | string[];
  modifiedDate?: string;
  breadcrumbs?: IBreadcrumbItem[];
} & Partial<typeof defaultMeta>;

const normalizePath = (asPath: string): string => {
  const withoutQueryAndHash = asPath.split(/[?#]/)[0] || '/';
  if (withoutQueryAndHash.length > 1 && withoutQueryAndHash.endsWith('/')) {
    return withoutQueryAndHash.slice(0, -1);
  }
  return withoutQueryAndHash;
};

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

  const cleanPath = normalizePath(router.asPath);
  const canonicalUrl = meta.canonical
    ? meta.canonical
    : `${meta.url}${cleanPath === '/' ? '' : cleanPath}`;

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

  const breadcrumbSchema =
    props.breadcrumbs && props.breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: props.breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${meta.url}${crumb.path === '/' ? '' : crumb.path}`,
          })),
        }
      : null;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={canonicalUrl} />
      <link rel='canonical' href={canonicalUrl} />

      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta property='og:image' content={meta.image} />
      <meta property='og:image:type' content='image/png' />
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
          key='blog-posting-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': canonicalUrl,
              },
              url: canonicalUrl,
              headline: meta.title,
              description: meta.description,
              image: meta.image,
              datePublished: meta.date,
              dateModified: meta.modifiedDate || meta.date,
              keywords: tagList.length > 0 ? tagList : undefined,
              author: {
                '@type': 'Person',
                name: 'Muhammad Ihsan',
                url: meta.url,
              },
              publisher: {
                '@type': 'Person',
                name: 'Muhammad Ihsan',
                url: meta.url,
              },
            }),
          }}
        />
      )}

      {breadcrumbSchema && (
        <script
          key='breadcrumb-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
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
      <meta name='msapplication-TileColor' content='#FAF9F6' />
      <meta
        name='msapplication-TileImage'
        content='/favicon/android-chrome-192x192.png'
      />
      <meta
        name='theme-color'
        content='#FAF9F6'
        media='(prefers-color-scheme: light)'
      />
      <meta
        name='theme-color'
        content='#0E0E10'
        media='(prefers-color-scheme: dark)'
      />
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
