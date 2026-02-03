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
    end: new Date().toISOString().split('T')[0],
    location: 'Jakarta, Indonesia 🇮🇩',
    responsibilities: [
      {
        id: 1,
        responsibility:
          'Improved website performance and SEO by implementing SSR, ISR, and image optimization, increasing Lighthouse score from below 50 to 90+',
      },
      {
        id: 2,
        responsibility:
          'Built a reusable UI component library using a monorepo (Lerna), reducing code duplication and speeding up development across multiple teams.',
      },
      {
        id: 3,
        responsibility:
          'Developed personalized homepage features and a custom product-matching engine to increase user engagement at scale.',
      },
      {
        id: 4,
        responsibility:
          'Created a secure custom checkout and payment widget for high-traffic events, contributing to a 30% increase in ticket sales.',
      },
      {
        id: 5,
        responsibility:
          'Built internal tools including a video streaming widget and CMS dashboard, enabling non-technical teams to manage content independently.',
      },
      {
        id: 6,
        responsibility:
          'Maintained and scaled multiple high-traffic web platforms in an Agile environment with consistent code standards and uptime',
      },
    ],
  },
  {
    id: 1,
    position: 'Frontend Developer',
    status: 'Full-time',
    company: {
      name: 'Dealio',
      logo: '/images/experience/dealio.jpeg',
    },
    start: '2021-05-01',
    end: '2022-03-01',
    location: 'Jakarta, Indonesia 🇮🇩',
    responsibilities: [
      {
        id: 1,
        responsibility:
          'Built centralized dashboards and web views for matamatapolitik.com and survei.io to streamline content and data management.',
      },
      {
        id: 2,
        responsibility:
          'Improved product stability by working closely with QA to implement better bug tracking and error reporting processes.',
      },
      {
        id: 3,
        responsibility:
          'Collaborated with cross-functional teams to solve complex web issues, ensuring consistent uptime and smooth user experience',
      },
    ],
  },
];
