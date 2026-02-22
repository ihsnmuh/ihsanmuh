import {
  GraduationCap,
  MapPin,
  Trophy,
} from 'lucide-react';
import { motion } from 'motion/react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import ImageFallback from '@/components/Atoms/image/fallback';
import UnderlineLink from '@/components/Atoms/links/UnderlineLink';
import FullNameSVG from '@/components/Atoms/svg/FullName';
import Title from '@/components/Atoms/title';
import ExperienceCard from '@/components/Molecules/card/ExperienceCard';

import HeroTech from '@/components/Organism/Home/Hero/HeroTech';
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
          From agricultural engineering to software engineering. A story of
          reinvention, curiosity, and building things that matter on the web.
        </p>
      </div>

      {/* ── Profile + Bio ─────────────────────────────────── */}
      <div className='flex flex-col md:flex-row justify-between mt-10 md:mt-16'>
        <div className='w-full md:w-1/3 mb-8' data-fade='3'>
          <motion.figure
            whileHover={{ scale: 1.1, rotate: -5 }}
            className='relative background-card border border-black dark:border-white rounded-lg shadow-md p-6 pb-20 mx-auto w-72 h-[350px]'
          >
            <ImageFallback
              src='/images/avatar.png'
              width={200}
              height={200}
              alt='profile'
              sizes='100vw'
              style={{
                width: '100%',
                height: 'auto',
              }}
              className='float-right bg-gradient-to-r from-primary-400 to-violet-500 dark:to-orange-400'
            />
            <figcaption className='absolute bottom-6 right-8'>
              <FullNameSVG className='dark:fill-white scale-125' />
            </figcaption>
          </motion.figure>
        </div>

        <div className='flex-1 md:pl-10' data-fade='4'>
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
            &ldquo;I started with frontend because I&apos;m drawn to the visual
            and interactive side of building products. Over time, curiosity led
            me deeper into backend services, databases, DevOps, and system-level
            architecture.&rdquo;
          </blockquote>

          <div>
            <p className='font-primary text-base mb-4 text-pretty'>
              I&apos;m a Software Engineer with 4+ years of experience building
              and maintaining scalable web applications. I recently spent 4
              years at{' '}
              <UnderlineLink href='https://femaledaily.com/'>
                Female Daily Network
              </UnderlineLink>
              , Indonesia&apos;s largest beauty ecosystem platform, shipping
              production-ready features across content, editorial, commerce, and
              events.
            </p>
            <p className='font-primary text-base mb-4 text-pretty'>
              My journey into tech began as a deliberate pivot from a background
              in sales, procurement, and digital marketing. I hold a degree in{' '}
              <span className='font-semibold'>Agricultural Engineering</span>{' '}
              from{' '}
              <UnderlineLink href='https://www.ipb.ac.id/'>
                IPB University
              </UnderlineLink>
              , and completed a Fullstack JavaScript Developer program at{' '}
              <span className='font-semibold'>Hacktiv8</span>, where I was
              awarded Best Individual Project.
            </p>
            <p className='font-primary text-base mb-6 text-pretty'>
              Through this site I share what I learn in form of blog posts,
              projects, and experiments across the web stack. If you have any
              questions, don&apos;t hesitate to reach out. 🚀
            </p>
          </div>

          {/* ── Skills ──────────────────────────────────────── */}
          <HeroTech />
        </div>
      </div>

      {/* ── Section divider ───────────────────────────────── */}
      <div className='my-16 md:my-24 flex items-center gap-4' data-fade='5'>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
        <span className='font-mono text-xs uppercase tracking-widest text-slate-400'>
          Education
        </span>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
      </div>

      {/* ── Education ─────────────────────────────────────── */}
      <div className='max-w-3xl mx-auto' data-fade='5'>
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
      <div className='my-16 md:my-24 flex items-center gap-4' data-fade='6'>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
        <span className='font-mono text-xs uppercase tracking-widest text-slate-400'>
          Experience
        </span>
        <div className='flex-1 h-px bg-slate-200 dark:bg-zinc-700/40' />
      </div>

      {/* ── Experience ────────────────────────────────────── */}
      <div className='max-w-3xl mx-auto' data-fade='6'>
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
        data-fade='7'
      >
        <h2 className='h2 font-primary mb-3'>
          Let&apos;s build something together
        </h2>
        <p className='font-primary text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6'>
          Whether it&apos;s a new project, an opportunity, or just a chat about
          tech — I&apos;d love to hear from you.
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
