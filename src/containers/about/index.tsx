import { GraduationCap, MapPin, Trophy } from 'lucide-react';
import Image from 'next/image';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/Atoms/links/UnderlineLink';
import CareerJourney from '@/components/Molecules/card/CareerJourney';
import ExperienceCard from '@/components/Molecules/card/ExperienceCard';
import GroupedTechStack from '@/components/Molecules/card/GroupedTechStack';

import { Experiences } from '@/constant/experience';

const EDUCATION = [
  {
    institution: 'Hacktiv8',
    degree: 'Fullstack JavaScript Developer',
    period: '2021',
    note: 'Best Individual Project Award',
    logo: '/images/experience/hacktiv8.png',
  },
  {
    institution: 'Bogor Agricultural University (IPB)',
    degree: 'B.Eng. Agricultural Engineering',
    period: '2016 – 2020',
    note: 'Bogor, Indonesia',
    logo: '/images/experience/ipb.png',
  },
];

const AboutContainer = () => {
  const show = LoaderView();

  return (
    <div className={cn('pt-2 sm:pt-4 space-y-16', show && 'fade-in-start')}>
      <header data-fade='1'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
          About
        </p>
        <h1 className='font-primary text-3xl sm:text-4xl font-bold tracking-tight text-ink'>
          Muhammad Ihsan
        </h1>
        <p className='mt-3 text-base leading-relaxed text-body max-w-2xl'>
          Agronomist turned software engineer. I build for the web, and I enjoy
          pulling the thread to understand how systems operate under the hood.
        </p>
      </header>

      <section className='flex flex-col md:flex-row items-start gap-10'>
        <div className='shrink-0' data-fade='3'>
          <div className='p-2 bg-surface border border-hairline rounded-xl'>
            <div className='relative overflow-hidden rounded-lg w-48 h-48 sm:w-56 sm:h-56 bg-subtle'>
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
          <p className='mt-3 font-mono text-xs text-muted flex items-center gap-1.5'>
            <MapPin size={13} />
            <span>Jakarta, Indonesia · @chernodev</span>
          </p>
        </div>

        <div className='flex-1 min-w-0 space-y-5' data-fade='4'>
          <blockquote className='border-l-2 border-accent pl-4 py-1 font-primary italic text-base sm:text-lg text-ink leading-relaxed'>
            &ldquo;I started on the frontend and kept asking how things worked
            behind it, moving from UI components into APIs and backend
            architecture.&rdquo;
          </blockquote>

          <div className='space-y-4 text-base text-body leading-relaxed'>
            <p>
              I&apos;m a Software Engineer with 4+ years of experience building
              scalable web applications, with a strong foundation on the
              frontend. Most of that time was spent at{' '}
              <UnderlineLink
                href='https://femaledaily.com/'
                className='text-ink font-medium underline decoration-hairline-strong hover:decoration-accent underline-offset-4'
              >
                Female Daily Network
              </UnderlineLink>
              , Indonesia&apos;s largest beauty platform, where I built
              everything from event ticketing systems and video streaming
              widgets to CMS dashboards and recommendation engines.
            </p>
            <p>
              My path into tech wasn&apos;t a straight line. I pivoted in 2021
              after years in sales, procurement, and digital marketing. Before
              that, I studied{' '}
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
              . I retrained through{' '}
              <span className='font-medium text-ink'>Hacktiv8</span>&apos;s
              Fullstack JavaScript bootcamp, where I was awarded Best Individual
              Project.
            </p>
            <p>
              I write about what I build and learn here, mostly web development
              and frontend engineering. Feel free to reach out anytime.
            </p>
          </div>
        </div>
      </section>

      <section className='pt-12 border-t border-hairline' data-fade='5'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-muted mb-6'>
          Career Evolution
        </p>
        <CareerJourney />
      </section>

      <section className='pt-12 border-t border-hairline' data-fade='5'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-muted mb-6'>
          Technical Stack
        </p>
        <GroupedTechStack />
      </section>

      <section className='pt-12 border-t border-hairline' data-fade='6'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-muted mb-6'>
          Education
        </p>
        <div className='flex flex-col gap-3'>
          {EDUCATION.map((edu) => (
            <div
              key={edu.institution}
              className='flex items-start gap-4 p-5 rounded-lg border border-hairline bg-surface'
            >
              <div className='flex-none w-10 h-10 rounded-md border border-hairline bg-subtle text-ink flex items-center justify-center'>
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

      <section className='pt-12 border-t border-hairline' data-fade='7'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-muted mb-6'>
          Experience
        </p>
        <div>
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

      <section
        className='rounded-lg border border-hairline p-8 sm:p-10 text-center bg-surface'
        data-fade='8'
      >
        <h2 className='font-primary font-semibold text-2xl sm:text-3xl tracking-tight text-ink mb-2'>
          Want to work together?
        </h2>
        <p className='text-sm sm:text-base text-body max-w-md mx-auto mb-6'>
          If you have a role, a consulting project, or a question about frontend
          work, send me a note.
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
      </section>
    </div>
  );
};

export default AboutContainer;
