import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MDXRemote } from 'next-mdx-remote';
import React, { useState } from 'react';

import type { TCaseStudyContents } from '@/lib/caseStudy';
import { cn } from '@/lib/utils';

import NextImage from '@/components/Atoms/NextImage';
import StackPills from '@/components/Atoms/pills/StackPills';

import { CASE_STUDY_LOCALES, TCaseStudyLocale } from '@/constant/caseStudies';

interface IProjectDetailProps {
  contents: TCaseStudyContents;
  initialLocale: TCaseStudyLocale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: any;
  project: {
    title: string;
    image: string;
    category: string;
    description: string;
    stacks: string[];
    github: string | null;
    website: string | null;
  };
}

const UI_COPY: Record<TCaseStudyLocale, Record<string, string>> = {
  en: {
    back: 'Back to projects',
    caseStudy: 'Case Study',
    visit: 'Visit website',
    source: 'Source code',
    role: 'Role',
    duration: 'Duration',
    year: 'Year',
    stack: 'Stack',
    gallery: 'Gallery',
    language: 'Language',
  },
  id: {
    back: 'Kembali ke project',
    caseStudy: 'Studi kasus',
    visit: 'Buka website',
    source: 'Kode sumber',
    role: 'Peran',
    duration: 'Durasi',
    year: 'Tahun',
    stack: 'Stack',
    gallery: 'Galeri',
    language: 'Bahasa',
  },
};

const META_LINK_CLASS =
  'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-hairline bg-surface hover:bg-subtle text-sm font-medium text-ink transition-colors';

const ProjectDetail = ({
  contents,
  initialLocale,
  components,
  project,
}: IProjectDetailProps) => {
  const router = useRouter();
  const [locale, setLocale] = useState<TCaseStudyLocale>(initialLocale);
  const availableLocales = CASE_STUDY_LOCALES.filter((code) => contents[code]);
  const content = contents[locale] ?? contents.en;
  const copy = UI_COPY[locale];

  const { source, frontMatter } = content;
  const { role, duration, year, summary, highlights, gallery } = frontMatter;
  const { title, image, category, description, stacks, github, website } =
    project;

  const meta = [
    { label: copy.role, value: role },
    { label: copy.duration, value: duration },
    { label: copy.year, value: year },
  ].filter((item) => item.value);

  const handleLocaleChange = (next: TCaseStudyLocale) => {
    setLocale(next);
    router.replace(
      { pathname: router.pathname, query: { ...router.query, lang: next } },
      undefined,
      { shallow: true, scroll: false },
    );
  };

  return (
    <div className='pt-2 sm:pt-4' lang={locale}>
      <div className='mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3'>
        <Link
          href='/project'
          className='inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors group'
        >
          <ArrowLeft
            size={15}
            className='group-hover:-translate-x-0.5 transition-transform'
          />
          <span>{copy.back}</span>
        </Link>

        {availableLocales.length > 1 && (
          <div
            role='group'
            aria-label={copy.language}
            className='inline-flex rounded-md border border-hairline bg-surface p-0.5 font-mono text-xs'
          >
            {availableLocales.map((code) => (
              <button
                key={code}
                type='button'
                lang={code}
                aria-pressed={locale === code}
                onClick={() => handleLocaleChange(code)}
                className={cn(
                  'px-3 py-1.5 rounded-[5px] uppercase tracking-wider transition-colors',
                  locale === code
                    ? 'bg-accent-soft text-accent font-medium'
                    : 'text-muted hover:text-ink',
                )}
              >
                {code}
              </button>
            ))}
          </div>
        )}
      </div>

      <header className='pb-8 border-b border-hairline mb-8 sm:mb-10'>
        <span className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
          {category} · {copy.caseStudy}
        </span>
        <h1 className='mt-3 font-primary text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink leading-[1.2] [text-wrap:pretty]'>
          {title}
        </h1>
        <p className='mt-3.5 text-sm sm:text-base leading-relaxed text-body max-w-3xl'>
          {summary || description}
        </p>

        <div className='mt-6 flex flex-wrap items-center gap-2.5'>
          {website && (
            <a
              href={website}
              target='_blank'
              rel='noopener noreferrer'
              className={META_LINK_CLASS}
            >
              {copy.visit} <ArrowUpRight size={14} />
            </a>
          )}
          {github && (
            <a
              href={github}
              target='_blank'
              rel='noopener noreferrer'
              className={META_LINK_CLASS}
            >
              <Github size={14} /> {copy.source}
            </a>
          )}
        </div>
      </header>

      <div className='relative w-full aspect-video max-h-[440px] rounded-xl overflow-hidden mb-10 border border-hairline bg-subtle'>
        <NextImage
          className='w-full h-full'
          src={`/images/project/${image}.png`}
          alt={title}
          sizes='100vw'
          fill
          style={{ objectFit: 'cover' }}
          useSkeleton
          priority
        />
      </div>

      <dl className='grid grid-cols-2 md:grid-cols-4 gap-px mb-12 rounded-lg overflow-hidden border border-hairline bg-hairline'>
        {meta.map(({ label, value }) => (
          <div key={label} className='bg-surface p-4'>
            <dt className='font-mono text-[11px] uppercase tracking-wider text-muted'>
              {label}
            </dt>
            <dd className='mt-1 text-sm font-medium text-ink'>{value}</dd>
          </div>
        ))}
        <div className='bg-surface p-4 col-span-2 md:col-span-1'>
          <dt className='font-mono text-[11px] uppercase tracking-wider text-muted'>
            {copy.stack}
          </dt>
          <dd className='mt-2 flex flex-wrap gap-1.5'>
            {stacks.map((stack) => (
              <StackPills key={stack} name={stack} />
            ))}
          </dd>
        </div>
      </dl>

      {highlights.length > 0 && (
        <ul className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12'>
          {highlights.map(({ label, value }) => (
            <li
              key={label}
              className='p-5 rounded-lg border border-hairline bg-surface'
            >
              <p className='font-primary text-2xl font-bold text-accent tabular-nums'>
                {value}
              </p>
              <p className='mt-1 text-sm text-body'>{label}</p>
            </li>
          ))}
        </ul>
      )}

      <article className='mdx prose max-w-none'>
        <MDXRemote {...source} components={components} />
      </article>

      {gallery.length > 0 && (
        <section className='mt-14' aria-label={copy.gallery}>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {gallery.map((file) => (
              <div
                key={file}
                className='relative aspect-video rounded-lg overflow-hidden border border-hairline bg-subtle'
              >
                <NextImage
                  className='w-full h-full'
                  src={`/images/project/${file}`}
                  alt={`${title} screenshot`}
                  sizes='(max-width: 640px) 100vw, 50vw'
                  fill
                  style={{ objectFit: 'cover' }}
                  useSkeleton
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;
