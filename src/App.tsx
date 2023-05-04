import { useAppSelector } from '@/hooks/useAppSelector';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/Header/Header';

import LocalStorageService from '@/utils/services/LocalStorageService';

import '@/assets/base.scss';

import UserActions from '@/redux/actions/UserActions';
import { useActionCreators } from '@/redux/store';

import GlobalLoader from './components/UI/GlobalLoader/GlobalLoader';
import lazyLoad from './components/common/LazyLoad/LazyLoad';
import Cabinet from './components/pages/Cabinet/Cabinet';
import { useAuth } from './hooks/useAuth';
import { useScrollToTop } from './hooks/useScrollToTop';

const HomePage = lazyLoad(() => import('./components/pages/Home/HomePage'));
const ProductPage = lazyLoad(() => import('./components/pages/ProductPage/ProductPage'));
const CartPage = lazyLoad(() => import('./components/pages/Cart/CartPage'));
const OrderPage = lazyLoad(() => import('./components/pages/Order/OrderPage'));

function App() {
  const appRef = React.useRef<HTMLDivElement>(null);

  useScrollToTop();
  const {
    cart,
    view: {
      loaders: { globalLoader },
      modals: { auth },
    },
  } = useAppSelector((state) => state);

  const { refreshTokenProcess } = useActionCreators(UserActions);

  const location = useLocation();
  const [authorized] = useAuth();

  React.useLayoutEffect(() => {
    refreshTokenProcess().then((result: boolean) => {
      setInterval(() => {
        refreshTokenProcess();
      }, 600000);
    });
  }, []);

  useEffect(() => {
    LocalStorageService.saveCart(cart);
  }, [cart]);

  return (
    <div
      className='App'
      ref={appRef}
      style={globalLoader || auth.visible ? { height: '100vh', overflow: 'hidden' } : { minHeight: '100vh' }}>
      <Header />

      <AnimatePresence>
        {globalLoader && <GlobalLoader />}
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<HomePage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/order/:id' element={<OrderPage />} />
          {authorized && <Route path='/cabinet' element={<Cabinet />} />}

          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
