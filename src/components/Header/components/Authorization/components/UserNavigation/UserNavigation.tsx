import { useAuth } from '@/hooks/useAuth';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { ICabinetTabs } from '@/utils/types/CommontTypes';

import UserActions from '@/redux/actions/UserActions';
import { useActionCreators } from '@/redux/store';

import styles from './UserNavigation.module.scss';

import { UserNavLinks } from './UserNavData';

const UserNavigation = () => {
  const [authorized, user] = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const { userLogoutProccess } = useActionCreators(UserActions);

  if (!authorized || !user) return null;

  const menuClickHandler = (title: ICabinetTabs) => {
    setShowMenu(false);
    if (title === ICabinetTabs.LOGOUT) userLogoutProccess();
  };
  return (
    <div className={styles.userNav}>
      <div className={styles.userNav__email} onClick={() => setShowMenu((state) => !state)}>
        {user.email} <IoIosArrowDown className={classNames(styles.userNav__arrow, { [styles.userNav__arrowRotated]: showMenu })} />
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.userNav__dropdown}>
            {UserNavLinks.map((item) => {
              if (!item.isAdmin) {
                return (
                  <Link
                    className={styles.userNav__dropdownLink}
                    state={item.state}
                    to={item.to}
                    key={item.id}
                    onClick={() => menuClickHandler(item.title)}>
                    {item.name}
                  </Link>
                );
              } else if (item.isAdmin && user.isAdmin) {
                return (
                  <Link className={styles.userNav__dropdownLink} to={item.to} key={item.id} onClick={() => menuClickHandler(item.id)}>
                    {item.name}
                  </Link>
                );
              }
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserNavigation;
