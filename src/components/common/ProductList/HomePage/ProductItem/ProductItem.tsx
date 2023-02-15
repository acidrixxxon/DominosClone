import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CartProductDto } from '../../../../../Utils/Dto';
import { useActionCreators } from '../../../../../redux/store';
import { IProduct } from '../../../../../types/ProductTypes';
import NewProductIcon from '../../../../UI/Icons/NewProductIcon';
import actions from './../../../../../redux/actions/ProductActions';
import './ProductItem.scss';

interface ComponentProps {
  item: IProduct;
}

const ProductItem: FC<ComponentProps> = ({ item }) => {
  const [activeType, setActiveType] = React.useState<{ size: number; crust: number | -1 }>({
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
  };

  return (
    <li className='productList__category-item'>
      <div className='item__image-container'>
        <Link to={`/product/${item._id}`} className='item__link'>
          <img src={item.imageUrl} alt={item.title} o className='item__image-img' />

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
    </li>
  );
};

export default React.memo(ProductItem);
