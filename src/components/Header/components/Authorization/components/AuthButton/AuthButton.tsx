import { AnimatePresence } from 'framer-motion';
import React, { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';

import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import LoginForm from '../../../../../Forms/LoginForm/LoginForm';
import RegisterForm from '../../../../../Forms/RegisterForm/RegisterForm';
import Modal from '../../../../../UI/Modal/Modal';
import './AuthButton.scss';

const AuthButton: FC = () => {
  const [authModal, setAuthModal] = React.useState<boolean>(false);
  const [authType, setAuthType] = React.useState<number>(0);

  const {
    loaders: { refreshLoading },
  } = useAppSelector((state) => state.user);

  if (refreshLoading)
    return (
      <span className='auth__loading'>
        <ThreeDots height='20' width='20' />
      </span>
    );

  return (
    <>
      <button className='auth__button' onClick={() => setAuthModal(true)}>
        <FiLogIn className='auth__button-icon' />
        Увійти
      </button>

      <Modal className='authModal__overlay' renderCondition={authModal} onClose={() => setAuthModal(false)}>
        <span className='modal__closeIcon' onClick={() => setAuthModal(false)}>
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
