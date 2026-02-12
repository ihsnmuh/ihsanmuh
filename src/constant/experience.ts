import { IExperience } from '@/types/interfaces/experience';

export const Experiences: IExperience[] = [
  {
    id: 1,
    position: 'Frontend Developer',
    status: 'Full-time',
    company: {
      name: 'Female Daily Network',
      logo: '/images/experience/fdn.png',
    },
    start: '2022-03-01',
    end: '2026-02-01',
    location: 'Jakarta, Indonesia 🇮🇩',
    responsibilities: [
      {
        id: 1,
        responsibility:
          'Built an end-to-end event ticketing platform that increased ticket sales by 40%, covering user-facing flows (event listing, ticket selection, checkout, and payment) and internal dashboards for event management and payment handling, using React and Next.js, with a custom payment widget and secure backend communication via Next.js API proxies.',
      },
      {
        id: 2,
        responsibility:
          'Improved web performance and SEO across multiple editorial, review and commerce platforms by implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and advanced image optimization, increasing Lighthouse scores from under 50 to more than 90.',
      },
      {
        id: 3,
        responsibility:
          'Increased frontend performance by 30% by refactoring the commerce platform state management from Redux to RTK Query, optimizing data fetching, caching strategies, and API state handling.',
      },
      {
        id: 4,
        responsibility:
          'Improved and scaled an existing frontend architecture by evolving a reusable UI component library within a monorepo (Lerna), reducing code duplication and improving development velocity across multiple engineering tribes.',
      },
      {
        id: 5,
        responsibility:
          'Increased user engagement and personalization by developing a custom Product Match engine and more than 10 dynamic homepage sections, leveraging user profiles to deliver relevant and trending content to millions of users.',
      },
      {
        id: 6,
        responsibility:
          'Enhanced multimedia capabilities and user experience by engineering a custom React video streaming widget (Webpack 5) and managing streaming data for widgets and dedicated streaming pages, ensuring smooth and reliable playback.',
      },
      {
        id: 7,
        responsibility:
          'Enabled non-technical teams to manage content independently by building a centralized CMS dashboard, eliminating the need for engineering intervention for dynamic content updates.',
      },
      {
        id: 8,
        responsibility:
          'Revamped the Beauty Review platform by introducing dashboard-driven dynamic content, photo previews in review cards, and personalized discovery sections, significantly improving content relevance and user experience.',
      },
      {
        id: 9,
        responsibility:
          'Improved homepage flexibility and scalability by developing 10 configurable dynamic sections with multiple layout styles to support evolving content strategies.',
      },
      {
        id: 10,
        responsibility:
          'Strengthened platform security by implementing a local API proxy layer, protecting backend APIs from direct exposure and external threats.',
      },
      {
        id: 11,
        responsibility:
          'Improved product discoverability and search efficiency by implementing search filter enhancements on the commerce search page, enabling users to find relevant products faster and reducing friction in the browsing experience.',
      },
      {
        id: 12,
        responsibility:
          'Improved accessibility for international users by implementing internationalization (i18n) across key event-related pages, enabling multilingual support for both local and foreign visitors.',
      },
      {
        id: 13,
        responsibility:
          'Maintained multiple high-traffic web properties across different tribes within an Agile environment, ensuring consistent uptime, unified code standards, and reliable bi-weekly sprint delivery.',
      },
      {
        id: 14,
        responsibility:
          'Supported junior frontend developers as a technical buddy by providing code reviews, guidance, and knowledge sharing, helping improve code quality and overall team productivity.',
      },
    ],
  },
  {
    id: 2,
    position: 'Frontend Developer',
    status: 'Full-time',
    company: {
      name: 'Dealio',
      logo: '/images/experience/dealio.jpeg',
    },
    start: '2021-06-01',
    end: '2022-03-31',
    location: 'Jakarta, Indonesia 🇮🇩',
    responsibilities: [
      {
        id: 1,
        responsibility:
          'Designed and engineered two centralized dashboards and web views for matamatapolitik.com and survei.io, streamlining news management and content administration for high-traffic editorial and survey platforms.',
      },
      {
        id: 2,
        responsibility:
          'Accelerated product stability and reliability by collaborating closely with the QA team to implement rigorous bug tracking and error reporting workflows, significantly reducing production issues.',
      },
      {
        id: 3,
        responsibility:
          'Enhanced cross-functional delivery by partnering with the development team to architect solutions for complex website issues, ensuring consistent uptime and a seamless user experience across multiple web properties.',
      },
    ],
  },
];
