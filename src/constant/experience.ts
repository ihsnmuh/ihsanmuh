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
          'Integrated APIs, such as Fetch API, API routes Next.js, and Redux-saga, to create API proxies and enhance website functionalities',
      },
      {
        id: 2,
        responsibility:
          'Created a video widget with Webpack 5 and React, which enabled streaming videos to be displayed on all web pages of the Female Daily website.',
      },
      {
        id: 3,
        responsibility:
          "Developed reusable components monorepo with Lerna to optimize the website's overall performance and reduce code repetition.",
      },
      {
        id: 4,
        responsibility:
          "Revamped the Female Daily Beauty Review Page by implementing Server Side Rendering (SSR), which led to significant improvements in the page's loading speed and overall user experience.",
      },
      {
        id: 5,
        responsibility:
          'Revamped the Female Daily homepage by dynamic content from the dashboard, resulting in a more personalized and engaging user experience.',
      },
      {
        id: 6,
        responsibility:
          'Created a user dashboard to manage content for several Female Daily websites, enabling users to efficiently manage and customize their preferences.',
      },
      {
        id: 7,
        responsibility:
          'Revamped the Mommies Daily website and implemented Incremental Static Regeneration (ISR) and SSR, resulting in improved website performance and faster loading times.',
      },
      {
        id: 8,
        responsibility:
          'Developed and maintained web applications in content tribes, enabling the website to provide fresh and engaging content regularly.',
      },
    ],
  },
  {
    id: 1,
    position: 'Frontend Developer',
    status: 'Full-time',
    company: {
      name: 'PT Digital Vision Publishing',
      logo: '/images/experience/dvp.jpg',
    },
    start: '2021-05-01',
    end: '2022-03-01',
    location: 'Jakarta, Indonesia 🇮🇩',
    responsibilities: [
      {
        id: 1,
        responsibility:
          'Designed and developed 2 dashboards and web views to manage news for website matamatapolitik.com and content for survei.io.',
      },
      {
        id: 2,
        responsibility:
          'Collaborated with the development team to solve website issues.',
      },
      {
        id: 3,
        responsibility:
          'Worked with the QA team to track and report every bug and error.',
      },
    ],
  },
];
