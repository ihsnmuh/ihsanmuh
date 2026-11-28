import { describe, expect, it } from 'vitest';

import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/caseStudy';

import { CASE_STUDY_SLUGS, hasCaseStudy } from '@/constant/caseStudies';

describe('case study', () => {
  it('lists the cafe-website draft once, ignoring translation files', () => {
    const slugs = getCaseStudySlugs();
    expect(slugs).toContain('cafe-website');
    expect(slugs).not.toContain('cafe-website.id');
  });

  it('only publishes slugs that have an MDX file', () => {
    const files = getCaseStudySlugs();
    CASE_STUDY_SLUGS.forEach((slug) => expect(files).toContain(slug));
  });

  it('only publishes case studies that are not drafts', async () => {
    for (const slug of CASE_STUDY_SLUGS) {
      const contents = await getCaseStudyBySlug(slug);
      expect(contents?.en.frontMatter.isShow).toBe(true);
    }
  });

  it('hasCaseStudy accepts published slugs', () => {
    CASE_STUDY_SLUGS.forEach((slug) => expect(hasCaseStudy(slug)).toBe(true));
  });

  it('hasCaseStudy rejects unknown and empty slugs', () => {
    expect(hasCaseStudy(undefined)).toBe(false);
    expect(hasCaseStudy('does-not-exist')).toBe(false);
  });

  it('rejects path traversal and unknown slugs', async () => {
    await expect(
      getCaseStudyBySlug('../blogs/save-your-dotfiles'),
    ).resolves.toBeNull();
    await expect(getCaseStudyBySlug('nope')).resolves.toBeNull();
  });

  it('loads both languages with their own front matter', async () => {
    const contents = await getCaseStudyBySlug('cafe-website');
    expect(contents?.en.frontMatter.summary).toMatch(/aviation-themed/);
    expect(contents?.id?.frontMatter.summary).toMatch(/bertema aviasi/);
    expect(contents?.id?.frontMatter.highlights).toHaveLength(
      contents?.en.frontMatter.highlights.length ?? -1,
    );
  });
});
