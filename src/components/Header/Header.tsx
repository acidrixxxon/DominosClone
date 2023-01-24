import { FC, memo } from 'react';
import Container from '../UI/Container/Container';
import Logotype from '../UI/Logotype/Logotype';
import { Authorization } from './components/Authorization/Authorization';
import AvgDeliveryTime from './components/AvgDeliveryTime/AvgDeliveryTime';

import './Header.scss';

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
        </Container>
      </div>
    </div>
  );
};

export default Header;
