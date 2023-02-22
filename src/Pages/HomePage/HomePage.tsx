import { motion } from 'framer-motion';
import React, { FC } from 'react';

import Category from '../../components/Category/Category';
import Sort from '../../components/Sort/Sort';
import Container from '../../components/UI/Container/Container';
import PageContainer from '../../components/UI/PageContainer/PageContainer';
import ProductList from '../../components/common/ProductList/HomePage/ProductList';
import './HomePage.scss';

const HomePage: FC = () => {
  return (
    <PageContainer className='home-page'>
      <Container>
        <div className='home-page__headline'>
          <Category />

          <Sort />
        </div>

        <div className='home-page__content'>
          <ProductList />
        </div>
      </Container>
    </PageContainer>
  );
};

export default HomePage;
