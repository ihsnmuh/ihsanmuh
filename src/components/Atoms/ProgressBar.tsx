import { PagesProgressBar as Progressbar } from 'next-nprogress-bar';
import { FC } from 'react';

//* This opt from NPProgress
const options = {
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
};

const ProgressBar: FC = () => {
  return (
    <>
      <Progressbar
        height='2px'
        color='var(--color-primary-500)'
        options={options}
        shallowRouting
      />
    </>
  );
};

export default ProgressBar;
