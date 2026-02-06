import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import { timeReading } from '@/helpers/readingTime';

type PostItems = {
  [key: string]: string;
};

export const postsDirectory = join(process.cwd(), 'src/contents/blogs');
export const themeDirectory = join(process.cwd(), 'src/contents/themes');

export const postFilePaths = fs
  .readdirSync(postsDirectory)
  .filter((path) => /\.mdx?$/.test(path));

export function getPostsFiles(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostsData(slug: string, fields: string[] = []): PostItems {
  const postSlug = slug.replace(/\.mdx$/, ''); // remove the file extension
  const filePath = join(postsDirectory, `${postSlug}.mdx`);

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const items: PostItems = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = postSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'timeReading') {
      items[field] = timeReading(content);
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []): PostItems[] {
  const slugs = getPostsFiles();
  const posts = slugs
    .map((slug) => getPostsData(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => {
      const date1 = post1.publishedAt || '';
      const date2 = post2.publishedAt || '';
      return date1 > date2 ? -1 : 1;
    });

  return posts;
}
