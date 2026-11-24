export interface PersonSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  image?: string;
  sameAs?: string[];
  jobTitle?: string;
  worksFor?: {
    '@type': string;
    name: string;
  };
  description?: string;
}

export interface WebsiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  author: {
    '@type': string;
    name: string;
  };
  inLanguage: string;
}

export interface BlogPostingSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description?: string;
  image?: string;
  author: {
    '@type': string;
    name: string;
  };
  datePublished: string;
  dateModified?: string;
  publisher: {
    '@type': string;
    name: string;
  };
}

export interface CreativeWorkSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url?: string;
  image?: string;
  author: {
    '@type': string;
    name: string;
  };
  keywords?: string[];
}

export const getPersonSchema = (): PersonSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Ihsan',
  url: 'https://ihsanmuh.com',
  image: 'https://ihsanmuh.com/images/avatar.png',
  sameAs: [
    'https://github.com/ihsnmuh',
    'https://www.linkedin.com/in/ihsanmuhammad19/',
    'https://instagram.com/dailyjuniordev',
  ],
  jobTitle: 'Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Bank Rakyat Indonesia (BRI)',
  },
  description:
    'Software engineer in Jakarta with 4+ years of experience building full-stack web applications across the React and TypeScript ecosystem.',
});

export const getWebsiteSchema = (): WebsiteSchema => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Muhammad Ihsan',
  url: 'https://ihsanmuh.com',
  description:
    'Personal portfolio and engineering blog of Muhammad Ihsan, a software engineer in Jakarta.',
  author: {
    '@type': 'Person',
    name: 'Muhammad Ihsan',
  },
  inLanguage: 'en',
});

export const getBlogPostingSchema = (post: {
  title: string;
  description?: string;
  image?: string;
  publishedAt: string;
  slug: string;
}): BlogPostingSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  image: post.image
    ? `https://ihsanmuh.com/images/blog/${post.image}`
    : undefined,
  author: {
    '@type': 'Person',
    name: 'Muhammad Ihsan',
  },
  datePublished: post.publishedAt,
  publisher: {
    '@type': 'Person',
    name: 'Muhammad Ihsan',
  },
});

export const getCreativeWorkSchema = (project: {
  title: string;
  description: string;
  website?: string;
  image?: string;
  stacks?: string[];
}): CreativeWorkSchema => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.description,
  url: project.website,
  image: project.image,
  author: {
    '@type': 'Person',
    name: 'Muhammad Ihsan',
  },
  keywords: project.stacks,
});
