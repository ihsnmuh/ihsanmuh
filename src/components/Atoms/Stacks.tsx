import { BsFillBootstrapFill, BsRobot } from 'react-icons/bs';
import { LuKey, LuLayers, LuNetwork, LuPalette } from 'react-icons/lu';
import {
  SiAmazonaws,
  SiAngular,
  SiApollographql,
  SiCss3,
  SiExpo,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGatsby,
  SiGoogle,
  SiGraphql,
  SiHeroku,
  SiJavascript,
  SiJest,
  SiJquery,
  SiLaravel,
  SiMedium,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiNuxtdotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPwa,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiRemix,
  SiSequelize,
  SiSocketdotio,
  SiStorybook,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiWebpack,
  SiWordpress,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

export type stacksProps = {
  [key: string]: JSX.Element;
};

const iconSize = 16;

const Stacks: stacksProps = {
  PHP: <SiPhp size={iconSize} className='text-blue-500' />,
  JavaScript: <SiJavascript size={iconSize} className='text-yellow-400' />,
  TypeScript: <SiTypescript size={iconSize} className='text-blue-400' />,
  'Next.js': (
    <SiNextdotjs
      size={iconSize}
      className='text-slate-800 dark:text-slate-200'
    />
  ),
  'React.js': <SiReact size={iconSize} className='text-sky-500' />,
  ReactNative: <SiReact size={iconSize} className='text-sky-500' />,
  TailwindCSS: <SiTailwindcss size={iconSize} className='text-cyan-300' />,
  Bootstrap: (
    <BsFillBootstrapFill size={iconSize} className='text-purple-500' />
  ),
  GraphQL: <SiGraphql size={iconSize} className='text-pink-600' />,
  Apollo: (
    <SiApollographql
      size={iconSize}
      className='text-[#311C87] dark:text-[#7B61FF]'
    />
  ),
  WordPress: <SiWordpress size={iconSize} className='text-[#21759B]' />,
  Laravel: <SiLaravel size={iconSize} className='text-red-500' />,
  MaterialUI: <SiMui size={iconSize} className='text-sky-400' />,
  Vite: <SiVite size={iconSize} className='text-purple-500' />,
  Prisma: <SiPrisma size={iconSize} className='text-emerald-500' />,
  Firebase: <SiFirebase size={iconSize} className='text-yellow-500' />,
  'Artificial Intelligence': (
    <BsRobot size={iconSize} className='text-rose-500' />
  ),
  Angular: <SiAngular size={iconSize} className='text-red-500' />,
  'Vue.js': <SiVuedotjs size={iconSize} className='text-green-500' />,
  'Nuxt.js': <SiNuxtdotjs size={iconSize} className='text-green-400' />,
  'Node.js': <SiNodedotjs size={iconSize} className='text-green-600' />,
  Gatsby: <SiGatsby size={iconSize} className='text-purple-600' />,
  Redux: <SiRedux size={iconSize} className='text-purple-500' />,
  Webpack: <SiWebpack size={iconSize} className='text-blue-500' />,
  'Styled Components': (
    <SiStyledcomponents size={iconSize} className='text-pink-500' />
  ),
  PWA: <SiPwa size={iconSize} className='text-amber-600' />,
  Nginx: <SiNginx size={iconSize} className='text-green-500' />,
  Jest: <SiJest size={iconSize} className='text-red-600' />,
  Storybook: <SiStorybook size={iconSize} className='text-amber-500' />,
  CSS: <SiCss3 size={iconSize} className='text-blue-300' />,
  Socket: (
    <SiSocketdotio
      size={iconSize}
      className='text-slate-800 dark:text-slate-200'
    />
  ),
  Remix: (
    <SiRemix size={iconSize} className='text-slate-800 dark:text-slate-200' />
  ),
  ReactQuery: <SiReactquery size={iconSize} className='text-[#F73E51]' />,
  Express: (
    <SiExpress size={iconSize} className='text-slate-800 dark:text-slate-200' />
  ),
  Jquery: <SiJquery size={iconSize} className='text-[#0769AD]' />,
  Figma: <SiFigma size={iconSize} className='text-[#F24E1E]' />,
  Medium: <SiMedium size={iconSize} />,
  Expo: <SiExpo size={iconSize} />,
  PostgreSQL: <SiPostgresql size={iconSize} className='text-[#336791]' />,
  /** legacy typo alias — keep for backward compat */
  PostgresQL: <SiPostgresql size={iconSize} className='text-[#336791]' />,
  Sequelize: <SiSequelize size={iconSize} />,
  Heroku: <SiHeroku size={iconSize} className='text-[#430098]' />,
  GoogleAuth: <SiGoogle size={iconSize} />,
  JQuery: <SiJquery size={iconSize} />,
  MongoDB: <SiMongodb size={iconSize} className='text-[#3FA037]' />,
  Redis: <SiRedis size={iconSize} className='text-[#D82C20]' />,
  AWS: <SiAmazonaws size={iconSize} className='text-[#FF9900]' />,
  Ajax: <TbApi size={iconSize} className='text-orange-500' />,
  GRPC: (
    <LuNetwork size={iconSize} className='text-slate-500 dark:text-slate-400' />
  ),
  JWT: <LuKey size={iconSize} className='text-amber-500' />,
  Microservices: (
    <LuLayers size={iconSize} className='text-slate-500 dark:text-slate-400' />
  ),
  'UI/UX': <LuPalette size={iconSize} className='text-pink-500' />,
};

interface StackIconProps {
  type: string;
  size: number;
}

const StackIcon = ({ type, size }: StackIconProps) => {
  const Stack = Stacks[type];

  if (Stack) return Stack;

  return (
    <span
      style={{ fontSize: size, width: size, height: size }}
      className='flex items-center justify-center font-bold text-slate-400 dark:text-slate-500 leading-none select-none'
    >
      {type.charAt(0).toUpperCase()}
    </span>
  );
};

export default StackIcon;
