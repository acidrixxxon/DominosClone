import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import styles from './LazyImage.module.scss';

interface ComponentProps {
  src: string;
  className: string;
}

const LazyImage: React.FC<ComponentProps> = ({ src, className }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const placeholderRef = useRef(null);
  const [view, setView] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && placeholderRef.current) {
        setView(src);
        observer.unobserve(placeholderRef.current);
      }
    });

    placeholderRef.current && observer.observe(placeholderRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.lazyContainer}>
      {loading && (
        <div ref={placeholderRef}>
          <RotatingLines strokeColor='#4f4f4f' strokeWidth='3' animationDuration='1' width='96' visible={true} />
        </div>
      )}

      <img
        src={view}
        alt='product__image'
        onLoad={() => setLoading(false)}
        className={classNames(className, { ['hidden']: loading })}
      />
    </div>
  );
};

export default LazyImage;
