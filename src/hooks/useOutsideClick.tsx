import { RefObject, useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: () => void): void => {
  const listener = (e: any) => {
    const el = ref?.current;

    if (el) {
      if (el.contains(e.target as Node)) {
        return;
      } else {
        handler();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);
};
