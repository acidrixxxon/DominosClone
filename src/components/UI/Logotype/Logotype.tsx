import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { viewActions } from '../../../redux/slices/viewSlice';
import { useActionCreators } from '../../../redux/store';
import DesktopLogo from './DesktopLogo/DesktopLogo';
import './Logotype.scss';
import MobileLogo from './MobileLogo/MobileLogo';

const Logotype: FC = () => {
  const actions = useActionCreators(viewActions);

  const clickHandler = () => {
    actions.setCategory(0);
    actions.setSort({
      id: 0,
      title: 'популярністю',
    });
  };

  return (
    <Link to='/' onClick={clickHandler}>
      <MobileLogo className='mobile__logotype' />
      <DesktopLogo className='desktop__logotype' />
    </Link>
  );
};

export default memo(Logotype);
