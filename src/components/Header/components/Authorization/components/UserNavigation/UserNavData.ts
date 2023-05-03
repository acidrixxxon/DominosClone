import { ICabinetTabs } from '@/utils/types/CommontTypes';

export const UserNavLinks = [
  {
    id: 4,
    to: '/cabinet',
    state: { activeTab: ICabinetTabs.USER_DASHBOARD },
    title: ICabinetTabs.USER_DASHBOARD,
    name: 'Кабінет',
    isAdmin: false,
  },
  // {
  //   id: 0,
  //   to: '/cabinet',
  //   state: { activeTab: ICabinetTabs.PROFILE },
  //   title: ICabinetTabs.PROFILE,
  //   name: 'Профіль',
  //   isAdmin: false,
  // },
  { id: 3, to: '/dashboard', name: 'Адмін панель', title: ICabinetTabs.ADMIN_DASHBOARD, isAdmin: true, state: null },
  // { id: 1, to: '/cabinet', name: 'Замовлення', isAdmin: false, state: { activeTab: ICabinetTabs.ORDERS }, title: ICabinetTabs.ORDERS },
  { id: 2, to: '/#', name: 'Вихід', isAdmin: false, state: null, title: ICabinetTabs.LOGOUT },
];
