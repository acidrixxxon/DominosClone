import { FC } from 'react';

import styles from './Image.module.scss';

interface ComponentProps {
  imageUrl?: string;
  alt?: string;
}

const Image: FC<ComponentProps> = ({ imageUrl, alt }) => {
  return (
    <div className={styles.productDetails__imageContainer}>
      <img src={imageUrl} alt={alt} className={styles.productDetails__image} />
    </div>
  );
};

export default Image;
