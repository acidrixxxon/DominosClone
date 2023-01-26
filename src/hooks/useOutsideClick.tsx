import React, { RefObject } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: () => void): void => {
  const el = ref.current;

  const listener = (e: any) => {
    if (el && el.contains(e.target as Node)) {
      return;
    } else {
      handler();
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);
};
