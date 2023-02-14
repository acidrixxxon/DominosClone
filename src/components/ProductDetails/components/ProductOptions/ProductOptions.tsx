import classNames from 'classnames';
import { FC, useState } from 'react';

import styles from './ProductOptions.module.scss';
import ProductOptionsItem from './ProductOptionsItem/ProductOptionsItem';

interface ComponentProps {
  data: {
    class: number;
    variants: any;
    activeTypes: { size: number; crust: number };
    setActiveTypes: React.Dispatch<React.SetStateAction<{ size: number; crust: number }>>;
  };
}

const ProductOptions: FC<ComponentProps> = ({ data }) => {
  const renderCrustOptions = data.class === 0 && data.variants.length > 0;

  return (
    <div
      className={classNames(styles.productDetails__options, {
        [styles.productDetails__optionsSingle]: !renderCrustOptions,
      })}>
      <div className={classNames(styles.productDetails__optionsContainer, styles.productDetails__sizeOptions)}>
        <span className={styles.productDetails__listTitle}>Розміри:</span>

        <ul className={styles.productDetails__optionsList}>
          {data.variants.map((item, index: number) => (
            <ProductOptionsItem
              item={item}
              activeTypes={data.activeTypes}
              key={index}
              active={data.activeTypes.size === index}
              setActiveTypes={() => data.setActiveTypes((state) => ({ size: index, crust: 0 }))}
            />
          ))}
        </ul>
      </div>

      {renderCrustOptions && (
        <div className={classNames(styles.productDetails__optionsContainer, styles.productDetails__crustOptions)}>
          <span className={styles.productDetails__listTitle}>Тісто:</span>

          <ul className={styles.productDetails__optionsList}>
            {data.variants[data.activeTypes.size].variants.map((item, index: number) => (
              <ProductOptionsItem
                item={item}
                activeTypes={data.activeTypes}
                key={index}
                active={data.activeTypes.crust === index}
                setActiveTypes={() => data.setActiveTypes((state) => ({ ...state, crust: index }))}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductOptions;
