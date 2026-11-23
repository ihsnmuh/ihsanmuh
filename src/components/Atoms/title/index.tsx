import { cn } from '@/lib/utils';

interface TitleProps {
  title: string;
  className?: string;
}

const Title = ({ title, className }: TitleProps) => {
  return (
    <div className='flex gap-3 items-center'>
      <h1
        className={cn(
          'text-3xl sm:text-4xl font-primary font-extrabold text-deep-moss tracking-tight',
          className,
        )}
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;
