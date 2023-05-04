import { useAppSelector } from '@/hooks/useAppSelector';
import React, { FC } from 'react';

import Skeleton from '@/components/UI/Skeleton/Skeleton';

import { useFetchProductsQuery } from '@/redux/api/ProductApi';

import styles from './ProductList.module.scss';

import CategoriesList from './components/CategoriesList/CategoriesList';
import SortedList from './components/SortedList/SortedList';

const ProductList: FC = () => {
  const { category, sort } = useAppSelector((state) => state.view);
  const productString = category === 0 ? 'pizza' : category === 1 ? 'sides' : category === 2 ? 'drinks' : '';

  const { data, error, isLoading } = useFetchProductsQuery({ category: productString, sortId: sort.id });

  if (isLoading) return <Skeleton />;
  if (!data || error) return <span>Не вдалось отримати товари!</span>;

  return (
    <div className={styles.productList}>
      {sort.id === 0
        ? data.categories && <CategoriesList categories={data.categories} />
        : data.products && <SortedList products={data.products} />}
    </div>
  );
};

export default React.memo(ProductList);
