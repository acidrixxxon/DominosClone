import { FC } from 'react';
import { FiMenu } from 'react-icons/fi';

import './MobileNavigation.scss';

const MobileNavigation: FC = () => {
  return (
    <div className='mobileNav'>
      <FiMenu className='mobileNav__hamburger' />
    </div>
  );
};

export default MobileNavigation;
