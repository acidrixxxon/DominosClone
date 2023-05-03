import { useAuth } from '@/hooks/useAuth';
import React, { FC, memo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import './Header.scss';

import Container from '../UI/Container/Container';
import Logotype from '../UI/Logotype/Logotype';
import { Authorization } from './components/Authorization/Authorization';
import AvgDeliveryTime from './components/AvgDeliveryTime/AvgDeliveryTime';
import CartStatus from './components/CartStatus/CartStatus';
import MobileNavigation from './components/MobileNavigation/MobileNavigation';
import Search from './components/Search/Search';

interface ComponentProps {
  refLink?: React.RefObject<HTMLDivElement>;
  appRef?: React.RefObject<HTMLDivElement>;
}

const Header: FC<ComponentProps> = () => {
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);

  const isSticky = (e: any) => {
    const offsetY = window.scrollY;
    if (headerRef.current) {
      offsetY >= 200 ? headerRef.current.classList.add('header__sticky') : headerRef.current.classList.remove('header__sticky');
    }
  };

  useEffect(() => {
    if (location.pathname !== 'cart' && location.pathname.split('/')[1] !== 'product') {
      window.addEventListener('scroll', isSticky);

      return () => {
        window.removeEventListener('scroll', isSticky);
      };
    }
  });

  return (
    <div id='header'>
      <div className='header__top'>
        <Container>
          <AvgDeliveryTime />

          <Authorization />
        </Container>
      </div>

      <div className='header__main' ref={headerRef}>
        <Container>
          <Logotype />

          <Search />

          <CartStatus />

          <MobileNavigation />
        </Container>
      </div>
    </div>
  );
};

export default Header;
