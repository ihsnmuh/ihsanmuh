import { GraduationCap, MapPin, Trophy } from 'lucide-react';
import Image from 'next/image';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import UnderlineLink from '@/components/Atoms/links/UnderlineLink';
import Title from '@/components/Atoms/title';
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
    <section className={cn('layout py-20', show && 'fade-in-start')}>
      {/* ── Intro ─────────────────────────────────────────── */}
      <div
        className={cn('flex flex-col h-fit rounded-2xl mt-10', 'max-w-2xl')}
        data-fade='1'
      >
        <Title title='About' />
        <p className='mt-2 font-primary text-sm md:text-base'>
          Agronomist turned engineer. I build for the web, and I&apos;m always
          pulling the thread to understand how things work underneath.
        </p>
      </div>

      {/* ── Profile + Bio ─────────────────────────────────── */}
      <div className='flex flex-col md:flex-row justify-between mt-10 md:mt-16 gap-8 md:gap-0'>
        <div
          className='w-full md:w-1/3 mb-8 flex flex-col items-center md:items-start gap-8 group/avatar'
          data-fade='3'
        >
          <div className='relative p-4 pb-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-zinc-700/40 rounded-2xl shadow-xl transition-all duration-500 group-hover/avatar:-rotate-2 group-hover/avatar:scale-105 mx-auto'>
            <div className='relative overflow-hidden rounded-xl w-60 h-60 lg:w-68 lg:h-68 bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900'>
              <Image
                src='/images/avatar.png'
                alt='Muhammad Ihsan'
                width={300}
                height={300}
                className='object-cover w-full h-full grayscale group-hover/avatar:grayscale-0 transition-all duration-500 scale-105 group-hover/avatar:scale-100'
                priority
              />
            </div>
            <div className='mt-4 text-center'>
              <span className='font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-zinc-500 group-hover/avatar:text-primary-500 dark:group-hover/avatar:text-primary-400 transition-colors duration-300'>
                @chernodev
              </span>
            </div>
          </div>
        </div>

        <div className='flex-1' data-fade='4'>
          <h2 className='h2 font-primary mb-1'>Muhammad Ihsan</h2>
          <p className='font-primary text-base mb-5'>
            <span className='font-semibold'>Software Engineer</span> with a
            strong frontend foundation
          </p>

          {/* Highlight callout */}
          <blockquote
            className={cn(
              'border-l-4 border-primary-500 pl-4 mb-5',
              'font-primary text-sm md:text-base italic text-slate-600 dark:text-slate-300',
            )}
          >
            &ldquo;Curiosity is what drives me. I started on the frontend and
            kept pulling the thread until I understood the full picture, from UI
            to infrastructure.&rdquo;
          </blockquote>

          <div className='prose dark:prose-invert max-w-none'>
            <p className='font-primary text-base mb-4 text-pretty text-slate-600 dark:text-zinc-300'>
              I&apos;m a Software Engineer with 4+ years of experience building
              scalable web applications, with a strong foundation on the
              frontend. Most of that time was spent at{' '}
              <UnderlineLink href='https://femaledaily.com/'>
                Female Daily Network
              </UnderlineLink>
              , Indonesia&apos;s largest beauty platform, where I built
              everything from event ticketing systems and video streaming
              widgets to CMS dashboards and a dynamic product recommendation
              engine, collaborating across multiple engineering tribes in a
              fast-paced Agile environment.
            </p>
            <p className='font-primary text-base mb-4 text-pretty text-slate-600 dark:text-zinc-300'>
              My path into tech wasn&apos;t a straight line. I pivoted in 2021
              after years in sales, procurement, and digital marketing. Before
              that, I studied{' '}
              <span className='font-semibold text-slate-800 dark:text-zinc-100'>
                Agricultural Engineering
              </span>{' '}
              at{' '}
              <UnderlineLink href='https://www.ipb.ac.id/'>
                IPB University
              </UnderlineLink>
              . I retrained through{' '}
              <span className='font-semibold text-slate-800 dark:text-zinc-100'>
                Hacktiv8
              </span>
              &apos;s Fullstack JavaScript bootcamp, where I was awarded Best
              Individual Project. That pivot taught me that with deliberate
              practice, you can get good at almost anything.
            </p>
            <p className='font-primary text-base mb-6 text-pretty text-slate-600 dark:text-zinc-300'>
              I write about what I build and learn here, mostly web development
              and engineering craft. If something resonates or you just want to
              talk tech, feel free to reach out.
            </p>
          </div>
        </div>
      </div>

      {/* ── Career Pivot Journey ──────────────────────────── */}
      <div className='my-16 md:my-24 flex items-center gap-4' data-fade='5'>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
        <span className='font-mono text-xs uppercase tracking-widest text-slate-400'>
          Evolution
        </span>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
      </div>

      <div className='max-w-3xl mx-auto' data-fade='5'>
        <CareerJourney />
      </div>

      {/* ── Tech Stack ────────────────────────────────────── */}
      <div className='my-16 md:my-24 flex items-center gap-4' data-fade='5'>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
        <span className='font-mono text-xs uppercase tracking-widest text-slate-400'>
          Skills
        </span>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
      </div>

      <div className='max-w-4xl mx-auto' data-fade='5'>
        <GroupedTechStack />
      </div>

      {/* ── Section divider ───────────────────────────────── */}
      <div className='my-16 md:my-24 flex items-center gap-4' data-fade='6'>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
        <span className='font-mono text-xs uppercase tracking-widest text-slate-400'>
          Education
        </span>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
      </div>

      {/* ── Education ─────────────────────────────────────── */}
      <div className='max-w-3xl mx-auto' data-fade='6'>
        <div className='flex flex-col gap-4'>
          {EDUCATION.map((edu) => (
            <div
              key={edu.institution}
              className={cn(
                'flex items-start gap-4 p-4 md:p-5 rounded-lg border',
                'background-card border-slate-200 dark:border-zinc-700/40',
              )}
            >
              <div
                className={cn(
                  'flex-none w-12 h-12 rounded-full',
                  'border border-slate-200 dark:border-zinc-700/40',
                  'bg-white dark:bg-slate-800',
                  'flex items-center justify-center overflow-hidden',
                )}
              >
                <GraduationCap
                  size={22}
                  className='text-primary-500 dark:text-primary-400'
                />
              </div>
              <div className='flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1'>
                <div>
                  <h3 className='font-primary text-base font-semibold'>
                    {edu.institution}
                  </h3>
                  <p className='font-primary text-sm text-slate-600 dark:text-slate-400'>
                    {edu.degree}
                  </p>
                  {edu.note && (
                    <p className='flex items-center gap-1.5 font-primary text-xs text-primary-500 dark:text-primary-400 mt-1'>
                      <Trophy size={12} />
                      {edu.note}
                    </p>
                  )}
                </div>
                <div className='flex-none sm:text-right'>
                  <p className='font-primary text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400'>
                    {edu.period}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section divider ───────────────────────────────── */}
      <div className='my-16 md:my-24 flex items-center gap-4' data-fade='7'>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
        <span className='font-mono text-xs uppercase tracking-widest text-slate-400'>
          Experience
        </span>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
      </div>

      {/* ── Experience ────────────────────────────────────── */}
      <div className='max-w-3xl mx-auto' data-fade='7'>
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

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <div
        className={cn(
          'mt-16 md:mt-24 rounded-2xl border px-6 py-10 text-center',
          'background-card border-slate-200 dark:border-zinc-700/40',
        )}
        data-fade='8'
      >
        <h2 className='h2 font-primary mb-3'>
          Let&apos;s build something together
        </h2>
        <p className='font-primary text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6'>
          Whether it&apos;s a new project, an opportunity, or just a chat about
          tech, I&apos;d love to hear from you.
        </p>
        <div className='flex items-center justify-center gap-4 flex-wrap'>
          <a
            href='mailto:me@ihsanmuh.com'
            className={cn(
              'font-primary text-sm font-medium px-5 py-2.5 rounded-lg',
              'bg-primary-500 hover:bg-primary-600 text-white',
              'transition-colors duration-200',
            )}
          >
            Send an email
          </a>
          <a
            href='https://www.linkedin.com/in/ihsanmuhammad19/'
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'font-primary text-sm font-medium px-5 py-2.5 rounded-lg',
              'border border-slate-300 dark:border-zinc-600',
              'hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400',
              'transition-colors duration-200',
            )}
          >
            View LinkedIn
          </a>
        </div>

        <p className='flex items-center justify-center gap-1.5 font-primary text-xs text-slate-400 mt-6'>
          <MapPin size={12} />
          Jakarta, Indonesia
        </p>
      </div>
    </section>
  );
};

export default AboutContainer;
