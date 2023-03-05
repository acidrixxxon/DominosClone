import { cloneDeep } from 'lodash';
import { FC, useEffect, useState } from 'react';

import { CartProductDto } from '../../Utils/Dto';
import { useActionCreators } from '../../redux/store';
import { IProduct, IProductDetails } from '../../types/ProductTypes';
import cartActions from './../../redux/actions/ProductActions';
import styles from './ProductDetails.module.scss';
import Image from './components/Image/Image';
import Ingridients from './components/IngridientsList/Ingridients';
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

  const { addToCartAction } = useActionCreators(cartActions);

  const [activeTypes, setActiveTypes] = useState<IActiveTypes>({
    size: 0,
    crust: product.class === 0 ? 0 : -1,
  });

  useEffect(() => {
    const defaultObj = cloneDeep(product);
    setProductDetails({
      ...product,
      defaultObj: product,
    });
  }, [product]);

  const totalPrice =
    productDetails && productDetails.class === 0
      ? productDetails.variants[activeTypes.size].variants[activeTypes.crust].price
      : productDetails && productDetails.variants[activeTypes.size].price;

  const renderIngridientsList = product.class === 0 && productDetails?.ingridients;

  const toCartHandler = () => {
    const item = Object.assign({}, productDetails);

    if (item) {
      Reflect.deleteProperty(item, 'defaultObj');

      const product = CartProductDto(item, activeTypes);
      addToCartAction(product);

      productDetails && setProductDetails({ ...productDetails.defaultObj, defaultObj: productDetails.defaultObj });
      setActiveTypes({ size: 0, crust: product.class === 0 ? 0 : -1 });
    }
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.container}>
        <Image imageUrl={productDetails?.imageUrl} alt={productDetails?.title} />

        <div className={styles.productDetails__content}>
          <div className={styles.productDetails__titleContainer}>
            <h4 className={styles.productDetails__title}>{productDetails?.title}</h4>
          </div>

          {renderIngridientsList && <Ingridients ingridients={productDetails.ingridients} setDetails={setProductDetails} />}

          {productDetails && (
            <ProductOptions
              data={{ class: productDetails.class, variants: productDetails && productDetails.variants, activeTypes, setActiveTypes }}
            />
          )}

          <div className={styles.productDetails__total}>
            <div className={styles.productDetails__price}>{totalPrice}.00 грн</div>

            <button className={styles.productDetails__toCartButton} onClick={toCartHandler}>
              В кошик
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
