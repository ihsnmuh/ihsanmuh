import { hasCaseStudy } from '@/constant/caseStudies';

export interface IProjectLink {
  href: string;
  isCaseStudy: boolean;
  ctaLabel: string;
  target?: '_blank';
  rel?: string;
}

/**
 * Resolves where a project card's image, title and CTA should go: the case
 * study page when one exists, otherwise the live website or repository.
 * Returns `null` when the project has nowhere to link to.
 */
export const getProjectLink = ({
  slug,
  website,
  github,
}: {
  slug?: string;
  website?: string | null;
  github?: string | null;
}): IProjectLink | null => {
  if (hasCaseStudy(slug)) {
    return {
      href: `/project/${slug}`,
      isCaseStudy: true,
      ctaLabel: 'Read case study',
    };
  }

  const external = website || github;
  if (!external) return null;

  return {
    href: external,
    isCaseStudy: false,
    ctaLabel: website ? 'Visit website' : 'View source',
    target: '_blank',
    rel: 'noopener noreferrer',
  };
};
