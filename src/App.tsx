import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header/Header';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { refreshTokenProcess } from './redux/actions/UserActions';
import './styles/base.scss';

function App() {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  console.log(state);

  React.useLayoutEffect(() => {
    setInterval(() => {
      dispatch(refreshTokenProcess());
    }, 60000);
  }, []);
  return (
    <div className='App'>
      <Header />
    </div>
  );
}

export default App;
