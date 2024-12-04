import { motion } from 'motion/react';
import React from 'react';

import { LoaderView } from '@/lib/loader';
import { cn } from '@/lib/utils';

import ImageFallback from '@/components/atoms/image/fallback';
import UnderlineLink from '@/components/atoms/links/UnderlineLink';
import FullNameSVG from '@/components/atoms/svg/FullName';
import Title from '@/components/atoms/title';
import ExperienceCard from '@/components/molecules/card/ExperienceCard';
import HeroTech from '@/components/organism/home/hero/HeroTech';

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
        {/* <p className='mt-4 font-primary text-sm md:text-base'>All thing about me</p> */}
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
            Frontend developer at{' '}
            <UnderlineLink href='https://femaledaily.com/'>
              Female Daily Network
            </UnderlineLink>
          </p>
          <div>
            <p className='font-primary text-base mb-4 text-pretty'>
              Hello! I'm Ihsan, graduate of Agricultural Engineering, Bogor
              Agriculture University. I became a web developer especially
              Frontend Developer starting in June 2021. I started writing my
              first line code in February 2021. At that time I decided to change
              carreers from various job role starting from sales officer,
              procurement staff, and lastly as a digital marketer in Bogor for 2
              years to be a web developer. The pandemic forced me to survive
              more, that's why I decided to learn to be a web developer through
              bootcamps and various udemy courses.
            </p>
            <p className='font-primary text-base mb-4 text-pretty'>
              I chose Frontend development because I like something visual like
              UI design, engineering design and everything related to design.
              Many technologies can be learn from frontend development and that
              makes me want to learn as much as possible. Learning and keep
              practicing are two things that make me grow and improve.
            </p>
            <p className='font-primary text-base mb-4 text-pretty'>
              In this website, I dedicate my knowledge in web development and
              UI/UX that I know through blogs and projects I've made before. I
              believe, sharing information and knowledge that I have make myself
              grow and improve more.
            </p>
            <p className='font-primary text-base mb-6'>
              Thank you for visiting my website, if you have any questions don't
              hesitate to contact me on social media. 😊
            </p>
            <HeroTech />
          </div>
        </div>
      </div>

      <div className='mt-16 md:mt-32' data-fade='4'>
        <h2 className='h2 text-center mb-10 md:mb-16'>Experiences</h2>
        <div className={cn('flex flex-col items-center gap-20')}>
          {Experiences.map((experience) => (
            <ExperienceCard
              id={experience.id}
              key={experience.id}
              position={experience.position}
              status={experience.status}
              company={experience.company}
              start={experience.start}
              end={experience.end}
              location={experience.location}
              responsibilities={experience.responsibilities}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutContainer;
