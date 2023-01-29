import classNames from 'classnames';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { IPizza, IProduct, ISide } from '../../../../../redux/types/ProductTypes';
import './ProductItem.scss';

interface ComponentProps {
  item: IProduct;
}

const ProductItem: FC<ComponentProps> = ({ item }) => {
  const [activeType, setActiveType] = React.useState<{ size: number; crust: number | null }>({
    size: 0,
    crust: item.class === 0 ? 0 : null,
  });

  const activeProductPrice =
    item.class === 0 && activeType.crust !== null
      ? item.variants[activeType.size].variants[activeType.crust].price
      : item.variants[activeType.size].price;

  return (
    <li className='productList__category-item'>
      <div className='item__image-container'>
        <Link to={`/product/${item._id}`} className='item__link'>
          <img src={item.imageUrl} alt={item.title} className='item__image-img' />
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
                <li className='item__ingridients-item'>
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
              onClick={() => setActiveType((state) => ({ ...state, size: index, crust: item.class === 0 ? 0 : null }))}
              className={classNames('item__sizes-item', { 'item__sizes-active': activeType.size === index })}>
              {item.variants[index].title}
            </button>
          ))}
        </ul>
      )}

      {item.class === 0 && (
        <ul className='item__crust'>
          {item.variants[activeType.size].variants.map((item, index) => (
            <button
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

        <button className='item__toCart-button'>В кошик</button>
      </div>
    </li>
  );
};

export default ProductItem;
