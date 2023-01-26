import React, { FC } from 'react';

import Category from '../components/Category/Category';
import Sort from '../components/Sort/Sort';
import Container from '../components/UI/Container/Container';
import './HomePage.scss';

const HomePage: FC = () => {
  return (
    <div className='home-page'>
      <Container>
        <div className='home-page__headline'>
          <Category />

          <Sort />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
