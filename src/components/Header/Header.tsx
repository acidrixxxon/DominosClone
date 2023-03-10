import React, { FC, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Container from '../UI/Container/Container';
import Logotype from '../UI/Logotype/Logotype';
import './Header.scss';
import { Authorization } from './components/Authorization/Authorization';
import AvgDeliveryTime from './components/AvgDeliveryTime/AvgDeliveryTime';
import CartStatus from './components/CartStatus/CartStatus';
import MobileNavigation from './components/MobileNavigation/MobileNavigation';
import Search from './components/Search/Search';

interface ComponentProps {
  refLink?: React.RefObject<HTMLDivElement>;
  appRef?: React.RefObject<HTMLDivElement>;
}

const Header: FC<ComponentProps> = ({ refLink, appRef }) => {
  const { pathname } = useLocation();

  // useEffect(() => {
  //   if (refLink && appRef && pathname !== 'cart') {
  //     const onScrollHandler = (e: any) => {
  //       const scrollOffset = window.scrollY;

  //       if (refLink?.current && appRef?.current) {
  //         if (scrollOffset > refLink.current.offsetHeight) {
  //           refLink.current.classList.add('header__sticky');
  //           appRef.current.style.marginTop = `${refLink.current.offsetHeight + 80}px`;
  //         } else {
  //           refLink.current.classList.remove('header__sticky');
  //           appRef.current.style.marginTop = `0px`;
  //         }
  //       }
  //     };
  //     window.addEventListener('scroll', onScrollHandler);

  //     return () => {
  //       window.removeEventListener('scroll', onScrollHandler);
  //     };
  //   }
  // }, [pathname]);

  return (
    <div id='header' ref={refLink}>
      <div className='header__top'>
        <Container>
          <AvgDeliveryTime />

          <Authorization />
        </Container>
      </div>

      <div className='header__main'>
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
