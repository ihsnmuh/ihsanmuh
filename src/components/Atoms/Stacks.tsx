import { BsFillBootstrapFill, BsRobot } from 'react-icons/bs';
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

export type stacksProps = {
  [key: string]: JSX.Element;
};

const iconSize = 16;

const Stacks: stacksProps = {
  PHP: <SiPhp size={iconSize} className='text-blue-500' />,
  JavaScript: <SiJavascript size={iconSize} className='text-yellow-400' />,
  TypeScript: <SiTypescript size={iconSize} className='text-blue-400' />,
  'Next.js': <SiNextdotjs size={iconSize} />,
  'React.js': <SiReact size={iconSize} className='text-sky-500' />,
  ReactNative: <SiReact size={iconSize} className='text-sky-500' />,
  TailwindCSS: <SiTailwindcss size={iconSize} className='text-cyan-300' />,
  Bootstrap: (
    <BsFillBootstrapFill size={iconSize} className='text-purple-500' />
  ),
  GraphQL: <SiGraphql size={iconSize} className='text-pink-600' />,
  Apollo: <SiApollographql size={iconSize} />,
  WordPress: <SiWordpress size={iconSize} />,
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
  Socket: <SiSocketdotio size={iconSize} />,
  Remix: <SiRemix size={iconSize} />,
  Express: <SiExpress size={iconSize} />,
  Jquery: <SiJquery size={iconSize} />,
  Figma: <SiFigma size={iconSize} className='text-[#F24E1E]' />,
  Medium: <SiMedium size={iconSize} />,
  Expo: <SiExpo size={iconSize} />,
  PostgreSQL: <SiPostgresql size={iconSize} className='text-[#336791]' />,
  Sequelize: <SiSequelize size={iconSize} />,
  Heroku: <SiHeroku size={iconSize} className='text-[#430098]' />,
  GoogleAuth: <SiGoogle size={iconSize} />,
  JQuery: <SiJquery size={iconSize} />,
  MongoDB: <SiMongodb size={iconSize} className='text-[#3FA037]' />,
  Redis: <SiRedis size={iconSize} className='text-[#D82C20]' />,
  AWS: <SiAmazonaws size={iconSize} className='text-[#FF9900]' />,
};

interface StackIconProps {
  type: string;
  size: number;
}

const StackIcon = (props: StackIconProps) => {
  const { type } = props;

  const Stack = Stacks[type];

  return Stack;
};

export default StackIcon;
