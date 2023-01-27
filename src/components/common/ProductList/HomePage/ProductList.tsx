import React, { FC } from 'react';

import { useFetchProductsQuery } from '../../../../Api/ProductApi';
import ProductService from '../../../../Services/ProductService';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { IPizza, IProductCategory } from '../../../../redux/types/ProductTypes';
import Skeleton from '../../../UI/Skeleton/Skeleton';

const ProductList: FC = () => {
  const { category, sort } = useAppSelector((state) => state.view);
  // const [data, setData] = React.useState<IProductCategory[] | IPizza[] | null>(null);
  const productString = category === 0 ? 'pizza' : category === 1 ? 'sides' : category === 2 ? 'drinks' : '';
  const { data, error, isLoading } = useFetchProductsQuery(productString);
  console.log(data, error, isLoading);

  if (isLoading) return <Skeleton />;
  return (
    <div className='productList'>
      {/* {sort.id === 0 ? (
        <>
          {data &&
            data.map((item) => {
              return (
                <div className='productList__category' key={item._id}>
                  <h4 className='productList__category-title'>{item.title}</h4>

                  <ul className='productList__category-list'>
                    {item?.products.map((item) => (
                      <li className='productList__category-item'>{item.title}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </>
      ) : (
        <ul className='productList__category-list'>
          {data && data.map((item) => <li className='productList__category-item'>{item.title}</li>)}
        </ul>
      )} */}
    </div>
  );
};

export default ProductList;
