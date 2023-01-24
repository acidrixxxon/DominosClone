import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Rings } from 'react-loader-spinner';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { loginUserProcess } from '../../../redux/actions/UserActions';
import { LoginFormFieldInterface } from '../../../redux/types/CommontTypes';
import './LoginForm.scss';

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<LoginFormFieldInterface>({ email: '', password: '' });
  console.log(userData);
  const emailLabelRef = React.useRef<HTMLSpanElement>(null);
  const passwordLabelRef = React.useRef<HTMLSpanElement>(null);

  const dispatch = useAppDispatch();
  const {
    loaders: { loginLoading },
  } = useAppSelector((state) => state.user);

  const animationOptions = {
    initial: { opacity: 0, transform: 'scale(.8)' },
    animate: { opacity: 1, transform: 'scale(1)' },
    exit: { opacity: 0, transform: 'scale(.8)' },
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(loginUserProcess(userData));
  };

  const buttonDisabled = userData.email.trim() === '' || userData.password.trim() === '' ? true : false;

  return (
    <motion.form
      onSubmit={formSubmitHandler}
      variants={animationOptions}
      initial='initial'
      animate='animate'
      exit='exit'
      className='loginForm'>
      <div className='loginForm__group'>
        <span className={classNames('loginForm__label', { 'loginForm__label-top': userData.email })} ref={emailLabelRef}>
          Email
        </span>
        <input
          type='email'
          name='email'
          value={userData.email}
          className='loginForm__input'
          onChange={inputChangeHandler}
          onBlur={() => userData.email === '' && emailLabelRef.current?.classList.remove('loginForm__label-onTop')}
          onFocus={() => emailLabelRef.current?.classList.add('loginForm__label-onTop')}
        />
      </div>

      <div className='loginForm__group'>
        <span className={classNames('loginForm__label', { 'loginForm__label-top': userData.password })} ref={passwordLabelRef}>
          Пароль
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          className='loginForm__input'
          name='password'
          value={userData.password}
          onChange={inputChangeHandler}
          onBlur={() => userData.password === '' && passwordLabelRef.current?.classList.remove('loginForm__label-onTop')}
          onFocus={() => passwordLabelRef.current?.classList.add('loginForm__label-onTop')}
        />

        <span className='loginForm__showPassword'>
          {showPassword ? (
            <AiFillEyeInvisible className='loginForm__showPassword-icon' onClick={() => setShowPassword((state) => !state)} />
          ) : (
            <AiFillEye onClick={() => setShowPassword((state) => !state)} className='loginForm__showPassword-icon' />
          )}
        </span>
      </div>

      <button
        type='submit'
        className={classNames(
          'loginForm__loginButton',
          { 'loginForm__loginButton-loading': loginLoading },
          { 'loginForm__loginButton-disabled': buttonDisabled },
        )}>
        {loginLoading ? (
          <span className='loginForm__loginButton-span'>
            Входимо <Rings height={30} width={30} color='#fff' />
          </span>
        ) : (
          'Увійти'
        )}
      </button>
    </motion.form>
  );
};

export default LoginForm;
