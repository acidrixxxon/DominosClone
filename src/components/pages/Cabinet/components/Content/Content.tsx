import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { ICabinetTabs } from '@/utils/types/CommontTypes';

import styles from './Content.module.scss';

import OrdersHistory from './components/OrdersHistory/OrdersHistory';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';
import UserDashboard from './components/UserDashboard/UserDashboard';

interface ComponentProps {
  activeTab: ICabinetTabs;
}

const Content: React.FC<ComponentProps> = ({ activeTab }) => {
  return (
    <AnimatePresence>
      <div className={styles.content}>
        {activeTab === ICabinetTabs.USER_DASHBOARD && <UserDashboard />}
        {activeTab === ICabinetTabs.PROFILE && <ProfileDetails />}
        {activeTab === ICabinetTabs.ORDERS && <OrdersHistory />}
      </div>
    </AnimatePresence>
  );
};

export default Content;
