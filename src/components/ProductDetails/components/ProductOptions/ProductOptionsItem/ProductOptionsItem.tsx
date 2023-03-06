import classNames from 'classnames';
import { motion } from 'framer-motion';
import { FC } from 'react';

import styles from './ProductOptionsItem.module.scss';

interface ComponentProps {
  item: any;
  activeTypes: {
    size: number;
    crust: number;
  };
  active: boolean;
  setActiveTypes: () => void;
}

const ProductOptionsItem: FC<ComponentProps> = ({ item, activeTypes, active, setActiveTypes }) => {
  const type = item.variants && !item.price ? 'size' : ' crust';
  const price = type === 'size' ? item.variants[item.variants.findIndex((item) => item.price > 0)].price : item.price;

  if (item.inSell !== undefined && !item.inSell) return null;

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.95 }}
      className={classNames(styles.productDetails__optionsItem, { [styles.productDetails__optionsItemActive]: active })}
      onClick={setActiveTypes}>
      <div className={styles.productDetails__titleContainer}>
        <input type='checkbox' className={styles.productDetails__checkbox} checked={active} onChange={setActiveTypes} />
        {item.title ? item.title : item.size}
      </div>

      <div className={styles.productDetails__priceContainer}>
        від <span>{price}.00</span> грн
      </div>
    </motion.li>
  );
};

export default ProductOptionsItem;
