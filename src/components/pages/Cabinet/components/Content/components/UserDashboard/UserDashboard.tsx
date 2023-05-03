import { motion } from 'framer-motion';

import styles from './UserDashboard.module.scss';

import ActiveOrders from './components/ActiveOrders/ActiveOrders';
import Overview from './components/Overview/Overview';

const UserDashboard: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.userDashboard}>
      <ActiveOrders />

      <Overview />
    </motion.div>
  );
};

export default UserDashboard;
