import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Rings } from 'react-loader-spinner';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { registerUserProcess } from '../../../redux/actions/UserActions';
import { RegisterFormFieldInterface } from '../../../redux/types/CommontTypes';
import SuccessRegister from '../../UI/SuccessRegister/SuccessRegister';
import './RegisterForm.scss';

const RegisterForm: FC = () => {
  const [userData, setUserData] = React.useState<RegisterFormFieldInterface>({ email: '', password: '', repeatPassword: '' });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [registered, setRegistered] = React.useState<boolean>(false);

  const {
    loaders: { registerLoading },
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const emailRef = React.useRef<HTMLSpanElement>(null);
  const passwordRef = React.useRef<HTMLSpanElement>(null);
  const repeatPasswordRef = React.useRef<HTMLSpanElement>(null);

  const buttonDisabled =
    userData.password.trim() === '' || userData.password.trim() === '' || userData.repeatPassword.trim() === '' ? true : false;

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

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();

    const result = await dispatch(registerUserProcess(userData));
    if (result) setRegistered(true);
  };

  return (
    <>
      {registered ? (
        <SuccessRegister />
      ) : (
        <motion.form
          onSubmit={formSubmitHandler}
          variants={animationOptions}
          initial='initial'
          animate='animate'
          exit='exit'
          className='registerForm'>
          <div className='registerForm__group'>
            <span className={classNames('registerForm__label', { 'registerForm__label-top': userData.email })} ref={emailRef}>
              Email
            </span>
            <input
              onChange={inputChangeHandler}
              type='text'
              name='email'
              value={userData.email}
              className='registerForm__input'
              onFocus={() => emailRef.current?.classList.add('registerForm__label-top')}
              onBlur={() => userData.email === '' && emailRef.current?.classList.remove('registerForm__label-top')}
            />
          </div>

          <div className='registerForm__group'>
            <span className={classNames('registerForm__label', { 'registerForm__label-top': userData.password })} ref={passwordRef}>
              Пароль
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={userData.password}
              onChange={inputChangeHandler}
              className='registerForm__input'
              onFocus={() => passwordRef.current?.classList.add('registerForm__label-top')}
              onBlur={() => userData.password === '' && passwordRef.current?.classList.remove('registerForm__label-top')}
            />

            <span className='registerForm__showPassword'>
              {showPassword ? (
                <AiFillEyeInvisible className='loginForm__showPassword-icon' onClick={() => setShowPassword((state) => !state)} />
              ) : (
                <AiFillEye onClick={() => setShowPassword((state) => !state)} className='registerForm__showPassword-icon' />
              )}
            </span>
          </div>

          <div className='registerForm__group'>
            <span
              className={classNames('registerForm__label', { 'registerForm__label-top': userData.repeatPassword })}
              ref={repeatPasswordRef}>
              Повторіть пароль
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={inputChangeHandler}
              name='repeatPassword'
              value={userData.repeatPassword}
              className='registerForm__input'
              onFocus={() => repeatPasswordRef.current?.classList.add('registerForm__label-top')}
              onBlur={() => userData.repeatPassword === '' && repeatPasswordRef.current?.classList.remove('registerForm__label-top')}
            />
          </div>

          <button
            type='submit'
            className={classNames(
              'registerForm__registerButton',
              { 'registerForm__registerButton-loading': registerLoading },
              { 'registerForm__registerButton-disabled': buttonDisabled },
            )}>
            {registerLoading ? (
              <span className='registerForm__registerButton-span'>
                Створюємо профіль <Rings height={30} width={30} color='#fff' />
              </span>
            ) : (
              'Зареєструватись'
            )}
          </button>
        </motion.form>
      )}
    </>
  );
};

export default RegisterForm;
