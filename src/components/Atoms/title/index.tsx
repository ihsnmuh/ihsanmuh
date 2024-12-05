import { cn } from '@/lib/utils';

interface TitleProps {
  title: string;
}

const Title = (props: TitleProps) => {
  return (
    <div className='flex gap-4 items-center'>
      {/* <DotColor /> */}
      <h1
        className={cn(
          'h0 leading-normal font-secondary',
          'bg-clip-text text-transparent',
          'bg-gradient-to-r from-primary-400 to-violet-500 dark:to-orange-400',
        )}
      >
        {props.title}
      </h1>
    </div>
  );
};

export default Title;
