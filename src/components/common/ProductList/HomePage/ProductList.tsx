import React, { FC } from 'react';

import { useFetchProductsQuery } from '../../../../Api/ProductApi';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { IProductCategory } from '../../../../types/ProductTypes';
import Skeleton from '../../../UI/Skeleton/Skeleton';
import ProductItem from './ProductItem/ProductItem';
import './ProductList.scss';

const ProductList: FC = () => {
  const { category, sort } = useAppSelector((state) => state.view);
  const productString = category === 0 ? 'pizza' : category === 1 ? 'sides' : category === 2 ? 'drinks' : '';

  const { data, error, isLoading } = useFetchProductsQuery({ category: productString, sortId: sort.id });

  if (isLoading) return <Skeleton />;
  return (
    <div className='productList'>
      {sort.id === 0 ? (
        <>
          {data &&
            data.categories &&
            data.categories.map((item: IProductCategory) => {
              if (item.products.length === 0) return;
              return (
                <div className='productList__category' key={item._id}>
                  <h4 className='productList__category-title'>{item.title}</h4>

                  <ul className='productList__category-list'>
                    {item.products.map((item, index) => (
                      <ProductItem item={item} key={item._id} index={index} />
                    ))}
                  </ul>
                </div>
              );
            })}
        </>
      ) : (
        <ul className='productList__category-list'>
          {data && data.products && data.products.map((item, index) => <ProductItem index={index} item={item} key={item._id} />)}
        </ul>
      )}
    </div>
  );
};

export default React.memo(ProductList);
