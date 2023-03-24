import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/Header/Header';
import CartPage from '@/components/pages/Cart/CartPage';
import HomePage from '@/components/pages/Home/HomePage';
import OrderPage from '@/components/pages/Order/OrderPage';
import ProductPage from '@/components/pages/ProductPage/ProductPage';

import LocalStorageService from '@/utils/services/LocalStorageService';

import '@/assets/base.scss';

import { refreshTokenProcess } from '@/redux/actions/UserActions';

function App() {
  const appRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  console.log(state);

  const location = useLocation();

  React.useLayoutEffect(() => {
    setInterval(() => {
      dispatch(refreshTokenProcess());
    }, 60000);
  }, []);

  useEffect(() => {
    LocalStorageService.saveCart(state.cart);
  }, [state.cart]);

  return (
    <div className='App' ref={appRef}>
      <Header refLink={headerRef} appRef={appRef} />

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<HomePage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/order/:id' element={<OrderPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
