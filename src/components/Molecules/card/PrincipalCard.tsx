import { FaCode, FaRobot, FaRocket } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

interface PrincipleCardProps {
  id: number;
  title: string;
  decription: string;
  className?: string;
  color?: string;
}

const icons: Record<string, JSX.Element> = {
  conciseness: <FaRocket color='#fff' />,
  'modern approach': <FaRobot color='#fff' />,
  responsiveness: <FaCode color='#fff' />,
};

const PrincipleCard = (props: PrincipleCardProps) => {
  const { title, decription, className, color } = props;

  return (
    <div
      className={cn(
        'w-full p-4 font-primary',
        'rounded-xl border border-slate-300 dark:border-slate-700',
        className,
      )}
    >
      <div
        className={cn(
          'rounded-full flex',
          'bg-slate-100 dark:bg-slate-700',
          'relative',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center',
            'w-12 h-12 absolute top-0 left-0 -mt-1',
            'rounded-full bg-red-500',
            color,
          )}
        >
          {icons[title]}
        </div>
        <p className='w-full text-lg capitalize font-semibold text-center py-1'>
          {title}
        </p>
      </div>
      <div className='mt-4'>
        <p className='text-pretty'>{decription}</p>
      </div>
    </div>
  );
};

export default PrincipleCard;
