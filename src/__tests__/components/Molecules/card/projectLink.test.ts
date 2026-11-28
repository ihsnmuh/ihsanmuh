import { describe, expect, it } from 'vitest';

import { getProjectLink } from '@/components/Molecules/card/projectLink';

describe('getProjectLink', () => {
  it('points to the case study when the project has one', () => {
    const link = getProjectLink({
      slug: 'cafe-website',
      website: 'https://flight79.ihsanmuh.com',
    });
    expect(link).toMatchObject({
      href: '/project/cafe-website',
      isCaseStudy: true,
      ctaLabel: 'Read case study',
    });
    expect(link?.target).toBeUndefined();
  });

  it('falls back to the website in a new tab', () => {
    const link = getProjectLink({ slug: 'other', website: 'https://a.com' });
    expect(link).toMatchObject({
      href: 'https://a.com',
      isCaseStudy: false,
      ctaLabel: 'Visit website',
      target: '_blank',
    });
  });

  it('falls back to github, then to null', () => {
    expect(
      getProjectLink({ slug: 'x', website: '', github: 'https://g.com' })
        ?.ctaLabel,
    ).toBe('View source');
    expect(getProjectLink({ slug: 'x', website: '', github: '' })).toBeNull();
  });
});
