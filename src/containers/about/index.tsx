import { motion } from 'motion/react';
import React from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import ImageFallback from '@/components/Atoms/image/fallback';
import UnderlineLink from '@/components/Atoms/links/UnderlineLink';
import FullNameSVG from '@/components/Atoms/svg/FullName';
import Title from '@/components/Atoms/title';
import ExperienceCard from '@/components/Molecules/card/ExperienceCard';
import HeroTech from '@/components/Organism/Home/Hero/HeroTech';

import { Experiences } from '@/constant/experience';

const AboutContainer = () => {
  const show = LoaderView();

  return (
    <section className={cn('layout py-20', show && 'fade-in-start')}>
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

      <div className='flex flex-col md:flex-row justify-between mt-10 md:mt-16'>
        <div className='w-full md:w-1/3 mb-8' data-fade='2'>
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
        <div className='flex-1' data-fade='3'>
          <h2 className='h2 font-primary mb-2'>Muhammad Ihsan</h2>
          <p className='font-primary text-base mb-6'>
            <span className='font-semibold'>Software Engineer</span> with a
            strong frontend foundation
          </p>
          <div>
            <p className='font-primary text-base mb-4 text-pretty'>
              Hello! I&apos;m Ihsan, a Software Engineer with 4+ years of
              experience building and maintaining scalable web applications.
              Starting from frontend development, I&apos;ve been expanding my
              skills across the full stack — from building pixel-perfect UIs to
              designing backend APIs and managing infrastructure. Most recently,
              I spent 4 years at{' '}
              <UnderlineLink href='https://femaledaily.com/'>
                Female Daily Network
              </UnderlineLink>
              , Indonesia&apos;s largest beauty ecosystem platform, where I
              shipped production-ready features and collaborated across multiple
              engineering tribes.
            </p>
            <p className='font-primary text-base mb-4 text-pretty'>
              My journey into tech started in 2021 when I decided to pivot from
              a career spanning sales, procurement, and digital marketing. I
              graduated from{' '}
              <UnderlineLink href='https://www.ipb.ac.id/'>
                Bogor Agricultural University (IPB)
              </UnderlineLink>{' '}
              with a degree in
              <span className='font-semibold'> Agricultural Engineering</span>,
              then completed a Fullstack JavaScript Developer program at{' '}
              <span className='font-semibold'>Hacktiv8</span>, where I was
              awarded Best Individual Project.
            </p>
            <p className='font-primary text-base mb-4 text-pretty'>
              I started with frontend because I&apos;m drawn to the visual and
              interactive side of building products. Over time, my curiosity led
              me deeper — into backend services, databases, DevOps, and
              system-level architecture. I thrive on solving complex problems
              end-to-end, from the UI layer all the way to deployment. Learning
              and consistent practice are the two things that keep me growing.
            </p>
            <p className='font-primary text-base mb-4 text-pretty'>
              Through this website, I share my knowledge in web development and
              software engineering via blogs and projects. I believe sharing what
              I learn helps me grow even further.
            </p>
            <p className='font-primary text-base mb-6'>
              Thank you for visiting! If you have any questions, don&apos;t
              hesitate to reach out on social media. 🚀
            </p>
            <HeroTech />
          </div>
        </div>
      </div>

      <div className='divide-x' />

      <div className='mt-16 md:mt-32' data-fade='4'>
        <h2 className='h2 text-center mb-10 md:mb-16'>Experiences</h2>
        <div className='max-w-3xl mx-auto'>
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
      </div>
    </section>
  );
};

export default AboutContainer;
