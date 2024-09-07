import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

import { postFilePaths } from '@/lib/blog';
import { getFileDatabySlug } from '@/lib/mdx.server';

import { components } from '@/components/atoms/MDXComponent';
import Seo from '@/components/molecules/seo';
import Detail from '@/containers/blog/detail';

type Params = { [param: string]: any };

type PostType = {
  title: string;
  publishedAt: string;
  description?: string;
  banner?: string;
  tags: string[];
  slug: string;
  timeReading: string;
};

type BlogPostSingleProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
};

const Post = (props: BlogPostSingleProps) => {
  const { source, frontMatter } = props;
  const { banner, tags, title, publishedAt, timeReading } = frontMatter;

  return (
    <>
      <Seo
        isBlog
        title={`${frontMatter.title} | Muhammad Ihsan`}
        description={frontMatter.description}
        image={frontMatter.banner}
      />
      <Detail
        source={source}
        components={components}
        image={banner}
        title={title}
        publishedAt={publishedAt}
        timeReading={timeReading}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { source, frontMatter } = await getFileDatabySlug(params.slug);

  return {
    props: {
      source: source,
      frontMatter: frontMatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;
