import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

import { IPost } from '@/types/interfaces/posts';

import { getRelatedPosts, postFilePaths } from '@/lib/blog';
import { getFileDatabySlug } from '@/lib/mdx.server';

import { components } from '@/components/Atoms/MDXComponent';
import Seo from '@/components/Molecules/seo';
import Detail from '@/containers/blog/detail';

type BlogPostSingleProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: IPost;
  relatedPosts: IPost[];
};

const Post = (props: BlogPostSingleProps) => {
  const { source, frontMatter, relatedPosts } = props;
  const { banner, tags, title, publishedAt, timeReading, slug } = frontMatter;

  return (
    <>
      <Seo
        isBlog
        title={`${frontMatter.title} | Muhammad Ihsan`}
        description={frontMatter.description || ''}
        image={`${process.env.NEXT_PUBLIC_ROOT}/images/blog/${frontMatter.banner || ''}`}
      />
      <Detail
        source={source}
        components={components}
        image={banner}
        title={title}
        publishedAt={publishedAt}
        timeReading={timeReading}
        tags={tags}
        slug={slug}
        relatedPosts={relatedPosts}
      />
    </>
  );
};

type Params = { [param: string]: any };

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { source, frontMatter: rawFrontMatter } = await getFileDatabySlug(
    params.slug,
  );

  const tags = Array.isArray((rawFrontMatter as any).tags)
    ? (rawFrontMatter as any).tags
    : [];

  const relatedPosts = getRelatedPosts(
    params.slug,
    tags,
    [
      'title',
      'slug',
      'description',
      'banner',
      'publishedAt',
      'tags',
      'timeReading',
    ],
    3,
  );

  // Ensure frontMatter has all required IPost fields
  const frontMatter: IPost = {
    title: (rawFrontMatter as any).title || '',
    publishedAt: (rawFrontMatter as any).publishedAt || '',
    description: (rawFrontMatter as any).description || '',
    banner: (rawFrontMatter as any).banner || '',
    tags: tags,
    slug: params.slug,
    timeReading: (rawFrontMatter as any).timeReading || '',
    isShow: (rawFrontMatter as any).isShow,
  };

  return {
    props: {
      source,
      frontMatter,
      relatedPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;
