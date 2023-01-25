import { FC, memo } from 'react';

import Container from '../UI/Container/Container';
import Logotype from '../UI/Logotype/Logotype';
import './Header.scss';
import { Authorization } from './components/Authorization/Authorization';
import AvgDeliveryTime from './components/AvgDeliveryTime/AvgDeliveryTime';
import CartStatus from './components/CartStatus/CartStatus';
import MobileNavigation from './components/MobileNavigation/MobileNavigation';
import Search from './components/Search/Search';

const Header: FC = () => {
  return (
    <div id='header'>
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
