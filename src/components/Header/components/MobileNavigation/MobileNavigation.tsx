import classNames from 'classnames';
import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../../hooks/useAppSelector';
import { viewActions as actions } from '../../../../redux/slices/viewSlice';
import { useActionCreators } from '../../../../redux/store';
import CloseIcon from '../../../UI/Icons/CloseIcon';
import DrinkIcon from '../../../UI/Icons/DrinkIcon';
import HamburgerIcon from '../../../UI/Icons/HamburgerIcon';
import PizzaIcon from '../../../UI/Icons/PizzaIcon';
import SideIcon from '../../../UI/Icons/SideIcon';
import Logotype from '../../../UI/Logotype/Logotype';
import './MobileNavigation.scss';
import MobileNavItem from './components/MobileNavItem/MobileNavItem';

const navigationItems = [
  { id: 0, title: 'Піци', icon: <PizzaIcon /> },
  { id: 1, title: 'Сайди', icon: <SideIcon /> },
  { id: 2, title: 'Напої', icon: <DrinkIcon /> },
];

const MobileNavigation: FC = () => {
  const [mobileMenu, setMobileMenu] = React.useState<boolean>(false);

  const {
    user: { user },
    view: {
      modals: {
        auth: { visible },
      },
    },
  } = useAppSelector((state) => state);
  const viewActions = useActionCreators(actions);

  const openMobileMenu = useCallback((): void => {
    setMobileMenu(true);
  }, []);

  const closeMobileMenu = useCallback((): void => {
    setMobileMenu(false);
  }, []);

  const loginButtonHandler = useCallback((): void => {
    viewActions.showAuthModal();
    setMobileMenu(false);
  }, [visible]);

  const changeCategoryHandler = useCallback((category: number): void => {
    viewActions.setCategory(category);
    setMobileMenu(false);
  }, []);

  return (
    <div className='mobileNav'>
      <HamburgerIcon onClick={openMobileMenu} />

      <div className={classNames('mobileNav__navigation', { 'mobileNav__navigation-visible': mobileMenu })}>
        <div className='mobileNav__header'>
          <div className='mobileNav__container'>
            <Logotype />

            <CloseIcon closeHandler={closeMobileMenu} />
          </div>
        </div>

        <div className='mobileNav__body'>
          <div className='mobileNav__container'>
            <div className='mobileNav__user'>
              {user ? (
                <ul className='mobileNav__user-menu'>
                  <Link to='/profile' className='mobileNav__link'>
                    <li className='mobileNav__item'>Профіль</li>
                  </Link>
                </ul>
              ) : (
                <button className='mobileNav__authButton' onClick={loginButtonHandler}>
                  Увійти
                </button>
              )}
            </div>

            <div className='mobileNav__navigation'>
              <ul className='mobileNav__navigation-list'>
                {navigationItems.map((item) => (
                  <MobileNavItem item={item} changeCategory={changeCategoryHandler} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
