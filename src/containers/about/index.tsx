import { GraduationCap, MapPin, Trophy } from 'lucide-react';
import Image from 'next/image';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/Atoms/links/UnderlineLink';
import { Reveal } from '@/components/Atoms/Motion';
import ExperienceCard from '@/components/Molecules/card/ExperienceCard';
import GroupedTechStack from '@/components/Molecules/card/GroupedTechStack';

import { Experiences } from '@/constant/experience';

const QUICK_FACTS = [
  { label: 'Location', value: 'Jakarta, Indonesia' },
  { label: 'Focus', value: 'Frontend & Full-stack' },
  { label: 'Experience', value: '4+ years' },
  { label: 'Status', value: 'Open to roles', highlight: true },
];

const IMPACT_HIGHLIGHTS = [
  {
    metric: '+40%',
    label: 'Event ticket sales after shipping a custom ticketing platform',
  },
  {
    metric: '50 -> 90+',
    label: 'Lighthouse scores via SSR, ISR, and image optimization',
  },
  {
    metric: '+30%',
    label: 'Frontend speed after migrating commerce state to RTK Query',
  },
];

const EDUCATION = [
  {
    institution: 'Hacktiv8',
    degree: 'Fullstack JavaScript Developer',
    period: '2021',
    note: 'Best Individual Project Award',
  },
  {
    institution: 'Bogor Agricultural University (IPB)',
    degree: 'B.Eng. Agricultural Engineering',
    period: '2016 – 2020',
    note: 'Bogor, Indonesia',
  },
];

const AboutContainer = () => {
  const show = LoaderView();

  return (
    <div className={cn('pt-2 sm:pt-4 space-y-16', show && 'fade-in-start')}>
      <header>
        <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
          About
        </p>
        <h1 className='font-primary text-3xl sm:text-4xl font-bold tracking-tight text-ink'>
          Muhammad Ihsan
        </h1>
        <p className='mt-3 text-base leading-relaxed text-body max-w-2xl'>
          Agronomist turned software engineer. I build for the web and enjoy
          understanding how systems operate under the hood.
        </p>
      </header>

      <section className='grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-10 items-start'>
        <Reveal className='space-y-4'>
          <div className='p-2 bg-surface border border-hairline rounded-xl w-fit md:w-full'>
            <div className='relative overflow-hidden rounded-lg w-48 h-48 md:w-full md:h-56 bg-subtle'>
              <Image
                src='/images/avatar.png'
                alt='Muhammad Ihsan'
                width={260}
                height={260}
                className='object-cover w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500'
                priority
              />
            </div>
          </div>

          <div className='rounded-lg border border-hairline bg-surface divide-y divide-hairline/70 px-4 py-1'>
            {QUICK_FACTS.map((fact) => (
              <div
                key={fact.label}
                className='py-2.5 flex items-center justify-between gap-3 text-xs'
              >
                <span className='font-mono text-muted'>{fact.label}</span>
                <span
                  className={cn(
                    'font-medium text-right',
                    fact.highlight
                      ? 'inline-flex items-center gap-1.5 text-accent'
                      : 'text-ink',
                  )}
                >
                  {fact.highlight && (
                    <span className='w-1.5 h-1.5 rounded-full bg-accent animate-pulse' />
                  )}
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06} className='min-w-0 space-y-6'>
          <blockquote className='border-l-2 border-accent pl-4 py-1 font-primary italic text-base sm:text-lg text-ink leading-relaxed'>
            &ldquo;I started on the frontend and kept asking how things worked
            behind it, moving from UI components into APIs and backend
            architecture.&rdquo;
          </blockquote>

          <div className='space-y-4 text-base text-body leading-relaxed'>
            <p>
              I&apos;m a software engineer with 4+ years of experience building
              web applications, with a strong foundation on the frontend. Most
              of that time was spent at{' '}
              <UnderlineLink
                href='https://femaledaily.com/'
                className='text-ink font-medium underline decoration-hairline-strong hover:decoration-accent underline-offset-4'
              >
                Female Daily Network
              </UnderlineLink>
              , Indonesia&apos;s largest beauty platform, where I built event
              ticketing systems, video streaming widgets, CMS dashboards, and
              recommendation engines.
            </p>
            <p>
              My path into tech wasn&apos;t a straight line. I switched into
              software in 2021 after working in sales, procurement, and digital
              marketing. Before that, I studied{' '}
              <span className='font-medium text-ink'>
                Agricultural Engineering
              </span>{' '}
              at{' '}
              <UnderlineLink
                href='https://www.ipb.ac.id/'
                className='text-ink font-medium underline decoration-hairline-strong hover:decoration-accent underline-offset-4'
              >
                IPB University
              </UnderlineLink>
              , then retrained through{' '}
              <span className='font-medium text-ink'>Hacktiv8</span>&apos;s
              Fullstack JavaScript bootcamp where I received the Best Individual
              Project award.
            </p>
            <p>
              I write about what I build and learn here, mostly web development
              and frontend engineering. Feel free to reach out anytime.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2'>
            {IMPACT_HIGHLIGHTS.map((item) => (
              <div
                key={item.metric}
                className='p-4 rounded-lg border border-hairline bg-surface'
              >
                <p className='font-mono text-lg font-bold text-accent tabular-nums'>
                  {item.metric}
                </p>
                <p className='text-xs text-muted leading-relaxed mt-1.5'>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className='pt-14 border-t border-hairline grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)] gap-6 md:gap-10 items-start'>
        <div className='md:sticky md:top-24 space-y-1.5'>
          <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
            Experience
          </p>
          <p className='text-xs text-muted leading-relaxed'>
            4+ years shipping production web applications.
          </p>
        </div>

        <div className='min-w-0'>
          {Experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              id={experience.id}
              position={experience.position}
              status={experience.status}
              company={experience.company}
              start={experience.start}
              end={experience.end}
              location={experience.location}
              responsibilities={experience.responsibilities}
              isLast={index === Experiences.length - 1}
            />
          ))}
        </div>
      </section>

      <section className='pt-14 border-t border-hairline grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)] gap-6 md:gap-10 items-start'>
        <div className='md:sticky md:top-24 space-y-1.5'>
          <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
            Tools &amp; Stack
          </p>
          <p className='text-xs text-muted leading-relaxed'>
            Languages, frameworks, and tools I use day to day.
          </p>
        </div>

        <div className='min-w-0'>
          <GroupedTechStack />
        </div>
      </section>

      <section className='pt-14 border-t border-hairline grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)] gap-6 md:gap-10 items-start'>
        <div className='md:sticky md:top-24 space-y-1.5'>
          <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium'>
            Education
          </p>
          <p className='text-xs text-muted leading-relaxed'>
            Engineering degree and full-stack retraining.
          </p>
        </div>

        <div className='flex flex-col gap-3 min-w-0'>
          {EDUCATION.map((edu) => (
            <div
              key={edu.institution}
              className='flex items-start gap-4 p-5 rounded-lg border border-hairline bg-surface hover:border-hairline-strong transition-colors'
            >
              <div className='flex-none w-10 h-10 rounded-md border border-accent/20 bg-accent-soft text-accent flex items-center justify-center'>
                <GraduationCap size={18} />
              </div>
              <div className='flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1'>
                <div>
                  <h3 className='font-primary text-base font-semibold text-ink'>
                    {edu.institution}
                  </h3>
                  <p className='text-sm text-body mt-0.5'>{edu.degree}</p>
                  {edu.note && (
                    <p className='flex items-center gap-1.5 font-mono text-xs text-muted mt-1.5'>
                      <Trophy size={12} className='text-accent' />
                      <span>{edu.note}</span>
                    </p>
                  )}
                </div>
                <p className='font-mono text-xs text-muted tabular-nums shrink-0'>
                  {edu.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Reveal>
        <section className='rounded-xl border border-hairline p-8 sm:p-10 text-center bg-surface'>
          <h2 className='font-primary font-semibold text-2xl sm:text-3xl tracking-tight text-ink mb-2'>
            Want to work together?
          </h2>
          <p className='text-sm sm:text-base text-body max-w-md mx-auto mb-6'>
            If you have a role, a consulting project, or a question about
            frontend work, send me a note.
          </p>
          <div className='flex items-center justify-center gap-3 flex-wrap'>
            <a
              href='mailto:me@ihsanmuh.com'
              className='px-5 py-2.5 rounded-md text-sm font-medium bg-cta text-cta-fg hover:bg-cta-hover active:scale-[0.98] transition-all select-none'
            >
              Send an email
            </a>
            <a
              href='https://www.linkedin.com/in/ihsanmuhammad19/'
              target='_blank'
              rel='noopener noreferrer'
              className='px-5 py-2.5 rounded-md text-sm font-medium bg-transparent text-ink border border-hairline-strong hover:bg-subtle active:scale-[0.98] transition-all select-none'
            >
              Connect on LinkedIn
            </a>
          </div>
          <p className='flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted mt-6'>
            <MapPin size={12} className='text-accent' />
            <span>Jakarta, Indonesia</span>
          </p>
        </section>
      </Reveal>
    </div>
  );
};

export default AboutContainer;
