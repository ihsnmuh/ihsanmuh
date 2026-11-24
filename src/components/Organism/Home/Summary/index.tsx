import { Code, Compass, Zap } from 'lucide-react';
import { motion } from 'motion/react';

import UnderlineLink from '@/components/Atoms/links/UnderlineLink';
import {
  Reveal,
  staggerContainerVariants,
  staggerItemVariants,
} from '@/components/Atoms/Motion';

import { Principles } from '@/constant/principles';

const principleIcons = {
  conciseness: Zap,
  learning: Compass,
  ship: Code,
};

const Summary = () => {
  return (
    <section id='summary' className='text-body'>
      <Reveal className='mb-8'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
          About &amp; Principles
        </p>
        <h2 className='font-primary font-semibold text-2xl sm:text-3xl text-ink tracking-tight'>
          Background and working principles
        </h2>
      </Reveal>

      <Reveal
        delay={0.05}
        className='space-y-4 max-w-2xl text-base leading-relaxed text-body'
      >
        <p>
          I&apos;m currently at{' '}
          <span className='font-medium text-ink'>
            Bank Rakyat Indonesia (BRI)
          </span>
          , working on{' '}
          <UnderlineLink
            href='https://bri-ub.bri.co.id/'
            className='text-ink font-medium underline decoration-hairline-strong hover:decoration-accent underline-offset-4 transition-colors'
          >
            Universal Biller
          </UnderlineLink>{' '}
          (an internal dashboard and external website) and building its design
          system from Figma into code. Before that, I spent four years at{' '}
          <UnderlineLink
            href='https://femaledaily.com/'
            className='text-ink font-medium underline decoration-hairline-strong hover:decoration-accent underline-offset-4 transition-colors'
          >
            Female Daily Network
          </UnderlineLink>{' '}
          maintaining all of its web platforms and building new features across
          them, including event ticketing, commerce, beauty reviews, video
          streaming, and internal CMS dashboards.
        </p>
        <p>
          I work mainly across the{' '}
          <span className='font-medium text-ink'>
            React and TypeScript ecosystem
          </span>
          . I care about fast load times, readable code, and interfaces that
          stay out of the user&apos;s way.
        </p>
      </Reveal>

      <motion.div
        variants={staggerContainerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.15 }}
        className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-4'
      >
        {Principles.map((principle) => {
          const IconComponent = principleIcons[principle.icon] || Code;
          return (
            <motion.div
              key={principle.id}
              variants={staggerItemVariants}
              className='p-5 rounded-lg border border-hairline bg-surface hover:border-hairline-strong hover:-translate-y-0.5 transition-all duration-200'
            >
              <div className='w-8 h-8 rounded-md bg-accent-soft border border-accent/20 flex items-center justify-center text-accent mb-4'>
                <IconComponent size={15} />
              </div>
              <h3 className='font-primary font-semibold text-base text-ink mb-1.5'>
                {principle.title}
              </h3>
              <p className='text-sm leading-relaxed text-muted'>
                {principle.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Summary;
