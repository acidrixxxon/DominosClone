import React, { FC,memo } from 'react';
import { Link } from 'react-router-dom';

import DesktopLogo from './DesktopLogo/DesktopLogo';
import './Logotype.scss';
import MobileLogo from './MobileLogo/MobileLogo';

const Logotype: FC = () => {
  return (
    <Link to='/'>
      <MobileLogo className='mobile__logotype' />
      <DesktopLogo className='desktop__logotype' />
    </Link>
  );
};

export default memo(Logotype);
