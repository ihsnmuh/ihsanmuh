import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { timeReading } from '@/helpers/readingTime';

import { postsDirectory, themeDirectory } from './blog';

export const getFileDatabySlug = async (slug: string) => {
  // * For blog
  const postFilePath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath, 'utf8');

  // * For Themes
  const themeFilePath = path.join(themeDirectory, 'mosaic-color-theme.json');
  const themeSource = JSON.parse(fs.readFileSync(themeFilePath, 'utf8'));

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require('remark-code-titles'), remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypePrettyCode,
          {
            theme: themeSource,
            // keepBackground: false,
          },
        ],
      ],
    },
    scope: data,
  });

  return {
    source: mdxSource,
    frontMatter: {
      ...data,
      timeReading: timeReading(source),
    },
  };
};
