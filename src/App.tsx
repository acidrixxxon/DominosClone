import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './Pages/HomePage';
import LocalStorageService from './Services/LocalStorageService';
import './assets/animations.scss';
import './assets/base.scss';
import Header from './components/Header/Header';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { refreshTokenProcess } from './redux/actions/UserActions';

function App() {
  const appRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  console.log(state);

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

      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
