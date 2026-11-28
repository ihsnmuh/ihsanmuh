import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { IProjectLink } from './projectLink';

/** Base classes for any clickable element of a card: pointer or new-tab cursor. */
export const cardLinkClass = (link: IProjectLink | null) =>
  cn('project-card-link', link && !link.isCaseStudy && 'newtab');

const ActionIcon = ({
  link,
  size,
  className,
}: {
  link: IProjectLink;
  size: number;
  className?: string;
}) => {
  const Icon = link.isCaseStudy ? ArrowRight : ArrowUpRight;
  return <Icon size={size} className={className} aria-hidden='true' />;
};

/** Props shared by every clickable element of a project card (image, title, CTA). */
export const getCardLinkProps = (link: IProjectLink | null) => ({
  href: link?.href ?? '',
  target: link?.target,
  rel: link?.rel,
});

/** Text CTA at the bottom of a project card's body. */
export const ProjectCardCta = ({ link }: { link: IProjectLink }) => (
  <Link
    {...getCardLinkProps(link)}
    className={cn(
      cardLinkClass(link),
      'group/cta mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover hover:underline underline-offset-4',
    )}
  >
    {link.ctaLabel}
    <ActionIcon
      link={link}
      size={14}
      className='transition-transform duration-150 group-hover/cta:translate-x-0.5'
    />
  </Link>
);

/** Floating label over the image that appears when a card link is hovered. */
export const ProjectCardChip = ({ link }: { link: IProjectLink }) => (
  <span
    aria-hidden='true'
    className='absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 rounded-full border border-hairline bg-surface/90 px-2.5 py-1 font-mono text-[11px] font-medium text-ink backdrop-blur-sm opacity-0 translate-y-1 transition-[opacity,transform] duration-200 group-hover/image:opacity-100 group-hover/image:translate-y-0 group-focus-visible/image:opacity-100 group-focus-visible/image:translate-y-0'
  >
    {link.ctaLabel}
    <ActionIcon link={link} size={12} />
  </span>
);
