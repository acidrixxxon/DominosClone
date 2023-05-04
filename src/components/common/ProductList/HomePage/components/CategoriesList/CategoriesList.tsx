import React from 'react';

import { IProductCategory } from '@/utils/types/ProductTypes';

import styles from './CategoriesList.module.scss';

import ProductItem from '../ProductItem/ProductItem';

const CategoriesList: React.FC<{ categories: IProductCategory[] }> = ({ categories }) => {
  return (
    <>
      {categories.map((item) => {
        if (item.products.length === 0) return;
        if (item.products.length > 0)
          return (
            <div className={styles.categoriesList__category} key={item._id}>
              <h4 className={styles.categoriesList__categoryTitle}>{item.title}</h4>

              <ul className={styles.categoriesList__categoryList}>
                {item.products.map((item, index) => (
                  <ProductItem item={item} key={item._id} index={index} />
                ))}
              </ul>
            </div>
          );
      })}
    </>
  );
};

export default CategoriesList;
