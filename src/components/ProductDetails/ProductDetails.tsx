import { FC, useState } from 'react';

import { IProduct } from '../../types/ProductTypes';
import styles from './ProductDetails.module.scss';
import IngridientsList from './components/IngridientsList/IngridientsList';
import ProductOptions from './components/ProductOptions/ProductOptions';

interface ComponentProps {
  product: IProduct;
}

const ProductDetails: FC<ComponentProps> = ({ product }) => {
  const [activeTypes, setActiveTypes] = useState<{ size: number; crust: number }>({
    size: 0,
    crust: product.class === 0 ? 0 : -1,
  });

  const totalPrice = product.variants[activeTypes.size].price
    ? product.variants[activeTypes.size].price
    : product.variants[activeTypes.size].variants[activeTypes.crust].price;
  return (
    <div className={styles.productDetails}>
      <div className={styles.container}>
        <div className={styles.productDetails__imageContainer}>
          <img src={product.imageUrl} alt={product.title} className={styles.productDetails__image} />
        </div>

        <div className={styles.productDetails__content}>
          <div className={styles.productDetails__titleContainer}>
            <h4 className={styles.productDetails__title}>{product.title}</h4>
          </div>

          {product.class === 0 && <IngridientsList ingridients={product.ingridients} />}

          <ProductOptions data={{ class: product.class, variants: product.variants, activeTypes, setActiveTypes }} />

          <div className={styles.productDetails__total}>
            <div className={styles.productDetails__price}>{totalPrice}.00 грн</div>

            <button className={styles.productDetails__toCartButton}>В кошик</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
