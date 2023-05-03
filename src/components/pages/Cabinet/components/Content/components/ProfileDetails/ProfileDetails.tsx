import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import UpdateProfileForm from '@/components/Forms/UpdateProfileForm/UpdateProfileForm';

import styles from './ProfileDetails.module.scss';

const ProfileDetails = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.profileDetails}>
      <h4 className={classNames(styles.profileDetails__title, 'headline__title')}>Загальна інформація</h4>

      <UpdateProfileForm />
    </motion.div>
  );
};

export default ProfileDetails;
