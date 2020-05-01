import { useEffect, useState } from 'react';

export const useScrollPercentage = () => {
  const [percent, setPercent] = useState(0);

  const calculateScrollDistance = () => {
    const scrollTop = window.pageYOffset; // how much the user has scrolled by
    const winHeight = window.innerHeight;
    const docHeight = getDocHeight();

    const totalDocScrollLength = docHeight - winHeight;
    // const scrollPostion = Math.floor((scrollTop / totalDocScrollLength) * 100);
    const scrollPostion = (scrollTop / totalDocScrollLength) * 100;
    setPercent(scrollPostion);
  };

  const getDocHeight = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
  };
  useEffect(() => {
    // document.addEventListener('scroll', () => {
    //   requestAnimationFrame(() => {
    //     calculateScrollDistance();
    //   });
    // });
    document.addEventListener('scroll', calculateScrollDistance);
    return () => document.removeEventListener('scroll', calculateScrollDistance);
  }, []);

  return [percent];
};
