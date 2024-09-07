import { useEffect, useState } from 'react';

export const LoaderView = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const setTime = setTimeout(() => {
      setShow(true);
    }, 300);

    return () => clearTimeout(setTime);
  }, []);

  return show;
};
