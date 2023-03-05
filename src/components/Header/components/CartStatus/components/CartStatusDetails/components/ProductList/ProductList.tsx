import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../../../../../../hooks/useAppSelector';
import styles from './ProductList.module.scss';
import ProductListItem from './component/ProductListItem';

const ProductList: FC = () => {
  const { items, totalCost } = useAppSelector((state) => state.cart);

  return (
    <>
      <div className={styles.cartStatus__listContainer}>
        {items.map((item) => (
          <ProductListItem item={item} key={item.uniqueId} />
        ))}
      </div>

      <div className={styles.cartStatus__footer}>
        <Link to='/cart' className={styles.cartStatus__footerLink}>
          <span className={styles.cartStatus__footerText}>Оформити</span>
          <span className={styles.cartStatus__footerPrice}>{totalCost}грн</span>
        </Link>
      </div>
    </>
  );
};

export default ProductList;
