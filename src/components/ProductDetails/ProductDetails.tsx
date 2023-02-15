import lodash from 'lodash';
import { FC, useEffect, useState } from 'react';

import { IProduct, IProductDetails } from '../../types/ProductTypes';
import styles from './ProductDetails.module.scss';
import IngridientsList from './components/IngridientsList/IngridientsList';
import ProductOptions from './components/ProductOptions/ProductOptions';

interface ComponentProps {
  product: IProduct;
}

interface IActiveTypes {
  size: number;
  crust: number;
}

const ProductDetails: FC<ComponentProps> = ({ product }) => {
  const [productDetails, setProductDetails] = useState<IProductDetails | null>(null);

  const [activeTypes, setActiveTypes] = useState<IActiveTypes>({
    size: 0,
    crust: product.class === 0 ? 0 : -1,
  });

  useEffect(() => {
    setProductDetails({
      ...product,
      defaultObj: lodash.cloneDeep(product),
    });
  }, [product]);

  console.log(productDetails);

  const totalPrice =
    productDetails && productDetails.variants[activeTypes.size].price
      ? product.variants[activeTypes.size].price
      : product.variants[activeTypes.size].variants[activeTypes.crust].price;

  const renderIngridientsList = product.class === 0 && productDetails?.ingridients;

  return (
    <div className={styles.productDetails}>
      <div className={styles.container}>
        <div className={styles.productDetails__imageContainer}>
          <img src={productDetails?.imageUrl} alt={productDetails?.title} className={styles.productDetails__image} />
        </div>

        <div className={styles.productDetails__content}>
          <div className={styles.productDetails__titleContainer}>
            <h4 className={styles.productDetails__title}>{productDetails?.title}</h4>
          </div>

          {renderIngridientsList && <IngridientsList ingridients={productDetails.ingridients} setDetails={setProductDetails} />}

          {productDetails && (
            <ProductOptions
              data={{ class: productDetails.class, variants: productDetails && productDetails.variants, activeTypes, setActiveTypes }}
            />
          )}

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
