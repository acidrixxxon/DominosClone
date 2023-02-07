import React, { useEffect, useRef, useState } from 'react';

export const useOutsideClick2 = (): [
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  ref: React.RefObject<HTMLDivElement>,
] => {
  const [state, setState] = useState<boolean>(false);
  const ref = useRef<any>(null);

  const listener = (e: any) => {
    const el = ref?.current;

    if (el) {
      if (el.contains(e.target as Node)) {
        return;
      } else {
        setState(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);

  return [state, setState, ref];
};
