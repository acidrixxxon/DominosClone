import { FC } from 'react';

import Category from '@/components/Category/Category';
import Sort from '@/components/Sort/Sort';
import PageWrapper from '@/components/UI/PageWrapper/PageWrapper';
import ProductList from '@/components/common/ProductList/HomePage/ProductList';

import styles from './HomePage.module.scss';

const HomePage: FC = () => {
  return (
    <PageWrapper id='home' className={styles.homePage}>
      <div className={styles.homePage__headline}>
        <Category />

        <Sort />
      </div>

      <ProductList />
    </PageWrapper>
  );
};

export default HomePage;
