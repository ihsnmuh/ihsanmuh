import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const siteUrl = process.env.NEXT_PUBLIC_ROOT || 'https://ihsanmuh.com';
const postsDirectory = path.join(__dirname, '../src/contents/blogs');
const projectsFile = path.join(__dirname, '../prisma/project.json');
const publicDirectory = path.join(__dirname, '../public');
const markdownDirectory = path.join(publicDirectory, 'blog');

const PAGES = [
  {
    title: 'About',
    path: '/about',
    description:
      'Background, work experience, education, and tech stack of Muhammad Ihsan, a software engineer in Jakarta.',
  },
  {
    title: 'Blog',
    path: '/blog',
    description:
      'Articles and engineering notes on software architecture, React, Next.js, TypeScript, and web performance.',
  },
  {
    title: 'Projects',
    path: '/project',
    description:
      'Web applications, internal tools, and UI experiments built and shipped by Muhammad Ihsan.',
  },
  {
    title: 'San',
    path: '/san',
    description:
      'San is the illustrated mascot of this site: 16 moods, 4 haircuts, and a custom face mixer. The idea comes from Gri by Griko Nibras (https://nibras.co/gri/).',
  },
];

/**
 * Removes MDX-only syntax (imports, exports, JSX component blocks) from an article body so the
 * result reads as plain Markdown. Fenced code blocks are left untouched.
 */
function toPlainMarkdown(body) {
  const withImages = body.replace(/<MdxImage[\s\S]*?\/>/g, (tag) => {
    const alt = /alt=(['"])(.*?)\1/.exec(tag)?.[2] ?? '';
    const src = /src=(['"])(.*?)\1/.exec(tag)?.[2];
    return src ? `![${alt}](${siteUrl}${src})` : '';
  });
  const lines = withImages.split('\n');
  const kept = [];
  let inFence = false;
  let jsxDepth = 0;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      kept.push(line);
      continue;
    }
    if (inFence) {
      kept.push(line);
      continue;
    }
    if (/^(import|export)\s/.test(line)) continue;

    const opens = /^\s*<[A-Z][A-Za-z0-9.]*/.test(line);
    if (jsxDepth > 0 || opens) {
      if (opens) jsxDepth += 1;
      if (/\/>\s*$/.test(line) || /^\s*<\/[A-Z][A-Za-z0-9.]*>\s*$/.test(line)) {
        jsxDepth = Math.max(0, jsxDepth - 1);
      }
      continue;
    }
    kept.push(line);
  }

  return kept
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function getPosts() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const { data, content } = matter(
        fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'),
      );
      return {
        slug,
        title: data.title,
        description: data.description || '',
        publishedAt: data.publishedAt,
        tags: data.tags || [],
        isShow: data.isShow,
        content,
      };
    })
    .filter((post) => post.isShow)
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
}

function getProjects() {
  return JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
}

function writePostMarkdown(posts) {
  fs.mkdirSync(markdownDirectory, { recursive: true });

  for (const file of fs.readdirSync(markdownDirectory)) {
    if (file.endsWith('.md')) fs.unlinkSync(path.join(markdownDirectory, file));
  }

  for (const post of posts) {
    const header = [
      `# ${post.title}`,
      '',
      `- Published: ${post.publishedAt}`,
      `- Author: Muhammad Ihsan`,
      post.tags.length > 0 ? `- Tags: ${post.tags.join(', ')}` : null,
      `- Canonical page: ${siteUrl}/blog/${post.slug}`,
      '',
      post.description ? `> ${post.description}` : null,
      '',
    ]
      .filter((line) => line !== null)
      .join('\n');

    fs.writeFileSync(
      path.join(markdownDirectory, `${post.slug}.md`),
      `${header}\n${toPlainMarkdown(post.content)}\n`,
      'utf8',
    );
  }
}

function buildLlmsTxt(posts, projects) {
  const lines = [
    '# Muhammad Ihsan',
    '',
    '> Personal site of Muhammad Ihsan, a software engineer in Jakarta building full-stack web applications with React and TypeScript. It holds a blog, a project list, and San, the site mascot.',
    '',
    'Articles are written mostly in Indonesian. Each article also has a plain Markdown version.',
    '',
    '## Pages',
    '',
    `- [Home](${siteUrl}/): Introduction and latest articles.`,
    ...PAGES.map(
      (page) =>
        `- [${page.title}](${siteUrl}${page.path}): ${page.description}`,
    ),
    '',
    '## Blog',
    '',
    ...posts.map(
      (post) =>
        `- [${post.title}](${siteUrl}/blog/${post.slug}.md): ${post.description}`,
    ),
    '',
    '## Projects',
    '',
    ...projects.map((project) => {
      const link = project.website || project.github;
      const label = link ? `[${project.title}](${link})` : project.title;
      return `- ${label}: ${project.description}`;
    }),
    '',
    '## Optional',
    '',
    `- [RSS feed](${siteUrl}/feed.xml): Blog updates.`,
    `- [Sitemap](${siteUrl}/sitemap.xml): Every public page.`,
    '',
  ];

  return lines.join('\n');
}

function generateLlms() {
  const posts = getPosts();
  const projects = getProjects();

  writePostMarkdown(posts);
  fs.writeFileSync(
    path.join(publicDirectory, 'llms.txt'),
    buildLlmsTxt(posts, projects),
    'utf8',
  );
  console.log(
    `llms.txt and ${posts.length} Markdown articles generated in public/`,
  );
}

try {
  generateLlms();
} catch (error) {
  console.error('Failed to generate llms.txt:', error);
  process.exit(1);
}
