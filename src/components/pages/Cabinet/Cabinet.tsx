import { useAuth } from '@/hooks/useAuth';
import { useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PageWrapper from '@/components/UI/PageWrapper/PageWrapper';

import { ICabinetTabs } from '@/utils/types/CommontTypes';

import styles from './Cabinet.module.scss';

import Content from './components/Content/Content';
import Navigation from './components/Navigation/Navigation';

const Cabinet = () => {
  const [activeTab, setActiveTab] = useState<ICabinetTabs>(ICabinetTabs.USER_DASHBOARD);
  const navigate = useNavigate();

  const [authorized] = useAuth();
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.state) setActiveTab(location.state.activeTab);
  }, [location.state]);

  useLayoutEffect(() => {
    if (!authorized) {
      navigate('/');
    }
  }, [authorized]);

  return (
    <PageWrapper className={styles.userCabinet}>
      <Navigation activeTab={activeTab} setTab={setActiveTab} />

      <Content activeTab={activeTab} />
    </PageWrapper>
  );
};

export default Cabinet;
