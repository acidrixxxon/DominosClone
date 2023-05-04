import { ReactElement, Suspense, lazy } from 'react';

import GlobalLoader from '../../UI/GlobalLoader/GlobalLoader';

const lazyLoad = (
  importFunct: any,
  { fallback = <GlobalLoader /> }: any = { fallback: <GlobalLoader /> },
): ((props: any) => JSX.Element) => {
  const LazyComponent = lazy(importFunct);

  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default lazyLoad;
