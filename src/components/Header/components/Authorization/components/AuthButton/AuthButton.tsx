import { AnimatePresence } from 'framer-motion';
import React, { FC, useCallback, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';

import './AuthButton.scss';

import { useAppDispatch } from '../../../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import { viewActions as actions } from '../../../../../../redux/slices/viewSlice';
import { useActionCreators } from '../../../../../../redux/store';
import LoginForm from '../../../../../Forms/LoginForm/LoginForm';
import RegisterForm from '../../../../../Forms/RegisterForm/RegisterForm';
import Modal from '../../../../../UI/Modal/Modal';

const AuthButton: FC = () => {
  const [authType, setAuthType] = React.useState<number>(0);

  const { search } = useLocation();

  const {
    user: {
      loaders: { refreshLoading },
    },
    view: {
      modals: {
        auth: { visible },
      },
    },
  } = useAppSelector((state) => state);

  const viewActions = useActionCreators(actions);

  useEffect(() => {
    const searchStringArr = search.substring(1).split('=');
    if (search.length > 0 && searchStringArr.length > 0 && searchStringArr[1] === 'active') {
      if (!visible) {
        viewActions.showAuthModal();
      }
    }
  }, [search]);

  if (refreshLoading)
    return (
      <span className='auth__loading'>
        <ThreeDots height='20' width='20' />
      </span>
    );

  return (
    <>
      <button className='auth__button' onClick={() => viewActions.showAuthModal()}>
        <FiLogIn className='auth__button-icon' />
        Увійти
      </button>

      <Modal className='authModal__overlay' renderCondition={visible} onClose={() => viewActions.hideAuthModal()}>
        <span className='modal__closeIcon' onClick={() => viewActions.hideAuthModal()}>
          <AiOutlineClose className='modal__closeIcon-btn' />
        </span>
        <div className='modal__header'>
          <ul className='modal__authVariants'>
            <li
              onClick={() => setAuthType(0)}
              className={authType === 0 ? 'modal__authVariants-item active' : 'modal__authVariants-item'}>
              Вхід
            </li>
            <li
              onClick={() => setAuthType(1)}
              className={authType === 1 ? 'modal__authVariants-item active' : 'modal__authVariants-item'}>
              Реєстрація
            </li>
          </ul>
        </div>

        <AnimatePresence>
          <div className='modal__body'>{authType === 0 ? <LoginForm /> : <RegisterForm />}</div>
        </AnimatePresence>
      </Modal>
    </>
  );
};

export default AuthButton;
