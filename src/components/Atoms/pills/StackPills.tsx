import React from 'react';

import StackIcon from '../Stacks';

interface StackPillsProps {
  name: string;
}

const StackPills = (props: StackPillsProps) => {
  const { name } = props;

  return (
    <div
      className='flex items-center gap-1 py-1 px-2 border rounded-full'
      key={name}
    >
      <StackIcon size={10} type={name} />
      <p className='font-primary text-sm'>{name}</p>
    </div>
  );
};

export default StackPills;
