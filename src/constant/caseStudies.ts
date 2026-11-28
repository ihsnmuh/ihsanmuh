export const CASE_STUDY_LOCALES = ['en', 'id'] as const;
export type TCaseStudyLocale = (typeof CASE_STUDY_LOCALES)[number];

/** Slugs of projects whose case study is published at `/project/[slug]`. */
export const CASE_STUDY_SLUGS: readonly string[] = [];

/** Case studies still in draft; linked from cards in development only. */
export const DRAFT_CASE_STUDY_SLUGS: readonly string[] = ['cafe-website'];

export const hasCaseStudy = (slug?: string): slug is string => {
  if (!slug) return false;
  if (CASE_STUDY_SLUGS.includes(slug)) return true;
  return (
    process.env.NODE_ENV !== 'production' &&
    DRAFT_CASE_STUDY_SLUGS.includes(slug)
  );
};
