import { GetServerSideProps } from 'next';
import React from 'react';

import { getCaseStudyBySlug, TCaseStudyContents } from '@/lib/caseStudy';
import prisma from '@/lib/prisma';

import { components } from '@/components/Atoms/MDXComponent';
import Seo from '@/components/Molecules/seo';
import ProjectDetail from '@/containers/project/detail';

import { CASE_STUDY_LOCALES, TCaseStudyLocale } from '@/constant/caseStudies';

type TProjectDetailProps = {
  contents: TCaseStudyContents;
  initialLocale: TCaseStudyLocale;
  project: {
    title: string;
    slug: string;
    image: string;
    category: string;
    description: string;
    stacks: string[];
    github: string | null;
    website: string | null;
  };
};

const ProjectDetailPage = ({
  contents,
  initialLocale,
  project,
}: TProjectDetailProps) => {
  const frontMatter = contents.en.frontMatter;
  return (
    <>
      <Seo
        templateTitle={`${project.title} Case Study`}
        description={frontMatter.summary || project.description}
        image={`${process.env.NEXT_PUBLIC_ROOT}/images/project/${project.image}.png`}
        tags={['projects', 'case study', ...project.stacks]}
        robots={frontMatter.isShow ? 'follow, index' : 'noindex, nofollow'}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/project' },
          { name: project.title, path: `/project/${project.slug}` },
        ]}
      />
      <ProjectDetail
        contents={contents}
        initialLocale={initialLocale}
        components={components}
        project={project}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  res,
}) => {
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return { notFound: true };

  const requested = typeof query.lang === 'string' ? query.lang : '';
  const initialLocale =
    CASE_STUDY_LOCALES.find(
      (locale) => locale === requested && caseStudy[locale],
    ) ?? 'en';

  const project = await prisma.projects.findUnique({ where: { slug } });
  if (!project) return { notFound: true };

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=300',
  );

  return {
    props: {
      contents: caseStudy,
      initialLocale,
      project: {
        title: project.title,
        slug: project.slug,
        image: project.image,
        category: project.category,
        description: project.description,
        stacks: project.stacks,
        github: project.github || null,
        website: project.website || null,
      },
    },
  };
};

export default ProjectDetailPage;
