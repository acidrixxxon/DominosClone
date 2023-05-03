import classNames from 'classnames';
import React from 'react';

import { ICabinetTabs } from '@/utils/types/CommontTypes';

import styles from './Navigation.module.scss';

import { NavItems } from './NavigationData';

interface ComponentProps {
  activeTab: string;
  setTab: (tabName: ICabinetTabs) => void;
}

const Navigation: React.FC<ComponentProps> = ({ activeTab, setTab }) => {
  return (
    <nav className={styles.cabinetNav}>
      <ul className={styles.cabinetNav__list}>
        {NavItems.map((item) => (
          <li
            onClick={() => setTab(item.title)}
            className={classNames(styles.cabinetNav__item, { [styles.cabinetNav__itemActive]: activeTab === item.title })}
            key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
