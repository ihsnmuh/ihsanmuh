import {
  NextJsIcon,
  ReactIcon,
  TailwindCssIcon,
  TanStackQueryIcon,
  TypeScriptIcon,
} from '@/components/Atoms/Icon';

const coreStack = [
  { name: 'TypeScript', Icon: TypeScriptIcon },
  { name: 'React', Icon: ReactIcon },
  { name: 'Next.js', Icon: NextJsIcon },
  { name: 'Tailwind', Icon: TailwindCssIcon },
  { name: 'TanStack', Icon: TanStackQueryIcon },
];

const HeroTech = () => {
  return (
    <div className='flex flex-col gap-2.5'>
      <p className='font-mono text-[11px] uppercase tracking-wider text-muted'>
        Core Stack
      </p>
      <div className='flex items-center gap-2 flex-wrap'>
        {coreStack.map(({ name, Icon }) => (
          <div
            key={name}
            className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface border border-hairline text-ink text-xs font-mono select-none'
            title={name}
          >
            <Icon className='h-3.5 w-3.5' />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroTech;
