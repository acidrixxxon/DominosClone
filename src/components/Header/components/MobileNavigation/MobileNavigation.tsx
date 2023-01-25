import classNames from 'classnames';
import React, { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../../hooks/useAppSelector';
import DrinkIcon from '../../../UI/Icons/DrinkIcon';
import PizzaIcon from '../../../UI/Icons/PizzaIcon';
import SideIcon from '../../../UI/Icons/SideIcon';
import Logotype from '../../../UI/Logotype/Logotype';
import './MobileNavigation.scss';

const MobileNavigation: FC = () => {
  const navigationItems = [
    { id: 0, title: 'Піци', icon: <PizzaIcon /> },
    { id: 1, title: 'Сайди', icon: <SideIcon /> },
    { id: 2, title: 'Напої', icon: <DrinkIcon /> },
  ];

  const [mobileMenu, setMobileMenu] = React.useState<boolean>(false);

  const { user } = useAppSelector((state) => state.user);

  return (
    <div className='mobileNav'>
      <FiMenu className='mobileNav__hamburger' onClick={() => setMobileMenu(true)} />

      <div className={classNames('mobileNav__navigation', { 'mobileNav__navigation-visible': mobileMenu })}>
        <div className='mobileNav__header'>
          <div className='mobileNav__container'>
            <Logotype />

            <AiOutlineClose className='mobileNav__closeIcon' onClick={() => setMobileMenu(false)} />
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
                <button className='mobileNav__authButton'>Увійти</button>
              )}
            </div>

            <div className='mobileNav__navigation'>
              <ul className='mobileNav__navigation-list'>
                {navigationItems.map((item) => (
                  <li className='mobileNav__navigation-item' key={item.id}>
                    {item.icon} {item.title}
                  </li>
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
