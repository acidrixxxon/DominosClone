import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import NewProductIcon from '@/components/UI/Icons/NewProductIcon';
import LazyImage from '@/components/common/LazyImage/LazyImage';

import { CartProductDto } from '@/utils/Dto';
import { IProduct } from '@/utils/types/ProductTypes';

import actions from '@/redux/actions/ProductActions';
import { useActionCreators } from '@/redux/store';

import './ProductItem.scss';

interface ComponentProps {
  item: IProduct;
  index: number;
}

interface IProductDetails {
  size: number;
  crust: number | -1;
}

const ProductItem: FC<ComponentProps> = ({ item, index }) => {
  const [activeType, setActiveType] = React.useState<IProductDetails>({
    size: 0,
    crust: item.class === 0 ? 0 : -1,
  });

  const { addToCartAction } = useActionCreators(actions);

  const activeProductPrice =
    item.class === 0 && activeType.crust !== -1
      ? item.variants[activeType.size].variants[activeType.crust].price
      : item.variants[activeType.size].price;

  const addToCartHandler = (item: IProduct): void => {
    const product = CartProductDto(item, activeType);

    if (product) addToCartAction(product);
    setActiveType({ size: 0, crust: item.class === 0 ? 0 : -1 });
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: index * 0.15 } }}
      className='productList__category-item'>
      <div className='item__image-container'>
        <Link to={`/product/${item._id}`} className='item__link'>
          <LazyImage src={item.imageUrl} className='item__image-img' />

          {item.aNewOne && <NewProductIcon />}
        </Link>
      </div>

      <div className='item__details'>
        <div className='item__title-container'>
          <Link to={`/product/${item._id}`} className='item__link'>
            <h4 className='item__title'>{item.title}</h4>
          </Link>
        </div>

        {item.class === 0 && (
          <ul className='item__ingridients-list'>
            {item.ingridients.map((ingridient, index) => {
              return (
                <li className='item__ingridients-item' key={ingridient._id}>
                  {index === 0 ? ingridient.ingridientId.title : ingridient.ingridientId.title.toLocaleLowerCase()}
                  {item.ingridients.length === index + 1 ? null : ','}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {item.variants && (
        <ul className='item__sizes'>
          {item.variants.map((size, index) => (
            <button
              key={size._id}
              onClick={() => setActiveType((state) => ({ ...state, size: index, crust: item.class === 0 ? 0 : -1 }))}
              className={classNames('item__sizes-item', { 'item__sizes-active': activeType.size === index })}>
              {item.class === 0 ? size.title : size.size}
            </button>
          ))}
        </ul>
      )}

      {item.class === 0 && (
        <ul className='item__crust'>
          {item.variants[activeType.size].variants.map((item, index) => (
            <button
              key={item._id}
              disabled={!item.inSell}
              onClick={() => setActiveType((state) => ({ ...state, crust: index }))}
              className={classNames('item__crust-item', { 'item__crust-active': activeType.crust === index })}>
              {item.title}
            </button>
          ))}
        </ul>
      )}

      <div className='item__footer'>
        <span className='item__price'>
          <span>{activeProductPrice}</span> грн
        </span>

        <button className='item__toCart-button' onClick={() => addToCartHandler(item)}>
          В кошик
        </button>
      </div>
    </motion.li>
  );
};

export default React.memo(ProductItem);
