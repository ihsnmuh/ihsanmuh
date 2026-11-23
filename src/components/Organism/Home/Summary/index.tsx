import { Code, Compass, Zap } from 'lucide-react';
import { motion } from 'motion/react';

import UnderlineLink from '@/components/Atoms/links/UnderlineLink';

import { Principles } from '@/constant/principles';

const principleIcons = {
  conciseness: Zap,
  learning: Compass,
  ship: Code,
};

const Summary = () => {
  return (
    <section id='summary' className='text-body'>
      <div className='mb-8'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-accent font-medium mb-2'>
          About &amp; Principles
        </p>
        <h2 className='font-primary font-semibold text-2xl sm:text-3xl text-ink tracking-tight'>
          Background and working principles
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className='space-y-4 max-w-2xl text-base leading-relaxed text-body'
      >
        <p>
          I spent 4 years at{' '}
          <UnderlineLink
            href='https://femaledaily.com/'
            className='text-ink font-medium underline decoration-hairline-strong hover:decoration-accent underline-offset-4 transition-colors'
          >
            Female Daily Network
          </UnderlineLink>
          , Indonesia&apos;s largest beauty platform, building event ticketing
          flows, video streaming widgets, and internal CMS dashboards.
        </p>
        <p>
          My main stack is{' '}
          <span className='font-medium text-ink'>
            React, Next.js, TypeScript, and Node.js
          </span>
          . I care about fast load times, readable code, and interfaces that
          stay out of the user&apos;s way.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-4'
      >
        {Principles.map((principle) => {
          const IconComponent = principleIcons[principle.icon] || Code;
          return (
            <div
              key={principle.id}
              className='p-5 rounded-lg border border-hairline bg-surface hover:border-hairline-strong transition-colors duration-200'
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
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Summary;
