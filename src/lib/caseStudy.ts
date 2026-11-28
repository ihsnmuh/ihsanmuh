import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { join } from 'path';

import { CASE_STUDY_LOCALES, TCaseStudyLocale } from '@/constant/caseStudies';

import { getFileDatabySlug } from './mdx.server';

export const caseStudyDirectory = join(process.cwd(), 'src/contents/projects');

export interface ICaseStudyHighlight {
  label: string;
  value: string;
}

export interface ICaseStudyFrontMatter {
  role: string;
  duration: string;
  year: string;
  summary: string;
  highlights: ICaseStudyHighlight[];
  gallery: string[];
  isShow: boolean;
}

export interface ICaseStudyContent {
  source: MDXRemoteSerializeResult;
  frontMatter: ICaseStudyFrontMatter;
}

export type TCaseStudyContents = Partial<
  Record<TCaseStudyLocale, ICaseStudyContent>
> & { en: ICaseStudyContent };

const SLUG_PATTERN = /^[a-z0-9-]+$/;
const DEFAULT_LOCALE: TCaseStudyLocale = 'en';

const toFrontMatter = (
  data: Record<string, unknown>,
): ICaseStudyFrontMatter => ({
  role: String(data.role ?? ''),
  duration: String(data.duration ?? ''),
  year: String(data.year ?? ''),
  summary: String(data.summary ?? ''),
  highlights: Array.isArray(data.highlights)
    ? (data.highlights as ICaseStudyHighlight[])
    : [],
  gallery: Array.isArray(data.gallery) ? (data.gallery as string[]) : [],
  isShow: data.isShow === true || String(data.isShow).toLowerCase() === 'true',
});

const fileStem = (slug: string, locale: TCaseStudyLocale) =>
  locale === DEFAULT_LOCALE ? slug : `${slug}.${locale}`;

const filePath = (slug: string, locale: TCaseStudyLocale) =>
  join(caseStudyDirectory, `${fileStem(slug, locale)}.mdx`);

/** Lists slugs of every case study (English file), drafts included. */
export const getCaseStudySlugs = (): string[] =>
  fs.existsSync(caseStudyDirectory)
    ? fs
        .readdirSync(caseStudyDirectory)
        .filter((file) => /^[a-z0-9-]+\.mdx$/.test(file))
        .map((file) => file.replace(/\.mdx$/, ''))
    : [];

const loadLocale = async (
  slug: string,
  locale: TCaseStudyLocale,
): Promise<ICaseStudyContent | null> => {
  if (!fs.existsSync(filePath(slug, locale))) return null;

  const raw = fs.readFileSync(filePath(slug, locale), 'utf8');
  const frontMatter = toFrontMatter(matter(raw).data);
  const { source } = await getFileDatabySlug(
    fileStem(slug, locale),
    caseStudyDirectory,
  );
  return { source, frontMatter };
};

/**
 * Loads and serializes every language of a case study. English is required;
 * other languages are included when their file exists. Returns `null` when the
 * slug has no file or the case study is still a draft in production.
 */
export const getCaseStudyBySlug = async (
  slug: string,
): Promise<TCaseStudyContents | null> => {
  if (!SLUG_PATTERN.test(slug) || !getCaseStudySlugs().includes(slug)) {
    return null;
  }

  const en = await loadLocale(slug, 'en');
  if (!en) return null;
  if (!en.frontMatter.isShow && process.env.NODE_ENV === 'production') {
    return null;
  }

  const contents: TCaseStudyContents = { en };
  for (const locale of CASE_STUDY_LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    const content = await loadLocale(slug, locale);
    if (content) contents[locale] = content;
  }
  return contents;
};
