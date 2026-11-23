import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import RSS from 'rss';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = process.env.NEXT_PUBLIC_ROOT || 'https://ihsanmuh.com';
const postsDirectory = path.join(__dirname, '../src/contents/blogs');

function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt,
        isShow: data.isShow,
      };
    })
    .filter((post) => post.isShow)
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));

  return posts;
}

async function generateRssFeed() {
  const feed = new RSS({
    title: 'Muhammad Ihsan - Blog',
    description:
      'Articles about technology, software development, and personal experiences',
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    language: 'en',
    pubDate: new Date().toUTCString(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Muhammad Ihsan`,
  });

  const posts = getAllPosts();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description || '',
      url: `${siteUrl}/blog/${post.slug}`,
      date: post.publishedAt,
      guid: `${siteUrl}/blog/${post.slug}`,
    });
  });

  const rss = feed.xml({ indent: true });
  const publicPath = path.join(__dirname, '../public/feed.xml');

  fs.writeFileSync(publicPath, rss, 'utf8');
  console.log('✅ RSS feed generated at public/feed.xml');
}

generateRssFeed().catch((error) => {
  console.error('❌ Failed to generate RSS feed:', error);
  process.exit(1);
});
