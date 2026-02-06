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
  const postSlug = slug.replace(/\.mdx$/, '');
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
    .sort((post1, post2) => {
      const date1 = post1.publishedAt || '';
      const date2 = post2.publishedAt || '';
      return date1 > date2 ? -1 : 1;
    });

  return posts;
}

function isPostActive(post: PostItems): boolean {
  const isShow = post.isShow;
  if (isShow === undefined || isShow === null) return true;
  if (typeof isShow === 'boolean') return isShow;
  if (typeof isShow === 'string') {
    return isShow.toLowerCase() !== 'false' && isShow !== '0';
  }
  return true;
}

export function getRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  fields: string[] = [],
  limit: number = 3,
): PostItems[] {
  const allPosts = getAllPosts([...fields, 'isShow']);

  const postsWithScores = allPosts
    .filter((post) => post.slug !== currentSlug && isPostActive(post))
    .map((post) => {
      const postTagsRaw = post.tags || '';
      const postTags = Array.isArray(postTagsRaw)
        ? postTagsRaw
        : typeof postTagsRaw === 'string'
          ? (postTagsRaw as string).split(',').map((tag) => tag.trim())
          : [];

      const commonTags = currentTags.filter((tag) =>
        (postTags as string[]).some(
          (postTag) => postTag.toLowerCase() === tag.toLowerCase(),
        ),
      );

      return {
        post,
        score: commonTags.length,
      };
    });

  const relatedPosts = postsWithScores
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      const dateA = a.post.publishedAt || '';
      const dateB = b.post.publishedAt || '';
      return dateA > dateB ? -1 : 1;
    })
    .slice(0, limit)
    .map((item) => item.post);

  if (relatedPosts.length < limit) {
    const recentPosts = allPosts
      .filter(
        (post) =>
          post.slug !== currentSlug &&
          isPostActive(post) &&
          !relatedPosts.find((rp) => rp.slug === post.slug),
      )
      .slice(0, limit - relatedPosts.length);

    return [...relatedPosts, ...recentPosts];
  }

  return relatedPosts;
}
