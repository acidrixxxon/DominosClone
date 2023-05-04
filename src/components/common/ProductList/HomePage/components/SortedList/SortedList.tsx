import React from 'react';

import { IProduct } from '@/utils/types/ProductTypes';

import styles from './SortedList.module.scss';

import ProductItem from '../ProductItem/ProductItem';

const SortedList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <ul className={styles.sortedList__list}>
      {products.map((item, index) => (
        <ProductItem index={index} item={item} key={item._id} />
      ))}
    </ul>
  );
};

export default SortedList;
