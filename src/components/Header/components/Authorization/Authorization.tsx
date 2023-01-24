import { FC } from 'react';

import { useAppSelector } from '../../../../hooks/useAppSelector';
import AuthButton from './components/AuthButton/AuthButton';
import UserNavigation from './components/UserNavigation/UserNavigation';

export const Authorization: FC = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <div className='header__auth'>{user ? <UserNavigation /> : <AuthButton />}</div>
    </>
  );
};
