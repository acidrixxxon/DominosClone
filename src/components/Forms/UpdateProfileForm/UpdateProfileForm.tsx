import { useAppSelector } from '@/hooks/useAppSelector';
import classNames from 'classnames';
import React, { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Oval, ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import HoverHint from '@/components/UI/HoverHint/HoverHint';

import { isEmptyString } from '@/utils/helpers';

import UserActions from '@/redux/actions/UserActions';
import { useActionCreators } from '@/redux/store';

import styles from './UpdateProfileForm.module.scss';

enum ProccessStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  WAITING = 'waiting',
  PENDING = 'pending',
}

interface IProccessStatus {
  status: ProccessStatus;
  loading: boolean;
}

const UpdateProfileForm = () => {
  const [proccessStatus, setProccessStatus] = useState<IProccessStatus>({
    status: ProccessStatus.WAITING,
    loading: false,
  });
  const { user } = useAppSelector((state) => state.user);

  const { updateUserProfileProcess } = useActionCreators(UserActions);

  if (!user) return null;

  const [userData, setUserData] = useState({
    firstName: !isEmptyString(user.firstName) ? user.firstName : '',
    secondName: !isEmptyString(user.secondName) ? user.secondName : '',
    email: !isEmptyString(user.email) ? user.email : '',
    phone: !isEmptyString(user.phone) ? user.phone : '',
  });

  const buttonActive =
    proccessStatus.loading ||
    (userData.firstName !== user.firstName && userData.firstName.trim() !== '' && userData.firstName.trim().length > 3) ||
    (userData.secondName !== user.secondName && userData.secondName.trim() !== '' && userData.secondName.trim().length > 3) ||
    (userData.email !== user.email && userData.email.trim() !== '') ||
    (userData.phone !== user.phone && userData.phone.trim() !== '');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (proccessStatus.loading) return;
    if (proccessStatus.status !== ProccessStatus.WAITING) setProccessStatus((state) => ({ ...state, status: ProccessStatus.WAITING }));
    setUserData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProccessStatus((state) => ({ ...state, status: ProccessStatus.PENDING, loading: true }));

    const result = await updateUserProfileProcess(userData);

    if (result.success) {
      setProccessStatus((state) => ({ status: ProccessStatus.SUCCESS, loading: false }));
    } else if (!result.success) {
      toast.error(result.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: 'dark',
        autoClose: 3500,
        className: 'dark__toast',
      });
      setProccessStatus((state) => ({ status: ProccessStatus.FAILED, loading: false }));
    }
  };

  return (
    <form className={styles.updateProfileForm} onSubmit={formSubmitHandler}>
      <div className={classNames(styles.updateProfileForm__fieldGroup, styles.fieldGroupDouble)}>
        <div className={styles.updateProfileForm__field}>
          <label htmlFor='firstName' className={styles.updateProfileForm__label}>
            Імя
          </label>
          <input
            id='firstName'
            type='text'
            name='firstName'
            value={userData.firstName}
            className={classNames(styles.updateProfileForm__input, {
              [styles.updateProfileForm__inputFilled]: !isEmptyString(userData.firstName),
            })}
            placeholder={`${isEmptyString(userData.firstName) && 'Не вказано'}`}
            onChange={onChangeHandler}
          />

          <HoverHint
            text='Ім`я дуже коротке(<4)'
            active={userData.firstName.trim().length < 4 && userData.firstName.trim().length > 0}
          />
        </div>

        <div className={styles.updateProfileForm__field}>
          <label htmlFor='secondName' className={styles.updateProfileForm__label}>
            Прізвище
          </label>
          <input
            id='secondName'
            name='secondName'
            className={classNames(styles.updateProfileForm__input, {
              [styles.updateProfileForm__inputFilled]: !isEmptyString(userData.secondName),
            })}
            type='text'
            value={userData.secondName}
            placeholder={`${isEmptyString(user.secondName) && 'Не вказано'}`}
            onChange={onChangeHandler}
          />

          <HoverHint
            text='Прізвище має бути більше 3х символів'
            active={userData.secondName.trim().length < 4 && userData.secondName.trim().length > 0}
          />
        </div>
      </div>

      <div className={classNames(styles.updateProfileForm__fieldGroup, styles.fieldGroupSingle)}>
        <div className={styles.updateProfileForm__field}>
          <label htmlFor='email' className={styles.updateProfileForm__label}>
            Email
          </label>
          <input
            id='email'
            name='email'
            className={classNames(styles.updateProfileForm__input, {
              [styles.updateProfileForm__inputFilled]: !isEmptyString(userData.email),
            })}
            type='email'
            placeholder={`${isEmptyString(user.email) && 'Не вказано'}`}
            value={userData.email}
            onChange={onChangeHandler}
          />
        </div>
      </div>

      <div className={classNames(styles.updateProfileForm__fieldGroup, styles.fieldGroupSingle)}>
        <div className={styles.updateProfileForm__field}>
          <label htmlFor='phone' className={styles.updateProfileForm__label}>
            Номер телефону
          </label>
          <input
            id='phone'
            name='phone'
            className={classNames(styles.updateProfileForm__input, {
              [styles.updateProfileForm__inputFilled]: !isEmptyString(userData.phone),
            })}
            type='text'
            placeholder={`${isEmptyString(user.phone) && 'Не вказано'}`}
            value={userData.phone}
            onChange={onChangeHandler}
          />
        </div>
      </div>

      <button
        type='submit'
        className={classNames(
          styles.updateProfileForm__submitBtn,
          { [styles.submitBtn__loading]: proccessStatus.loading },
          { [styles.submitBtn__disabled]: !buttonActive },
          { [styles.submitBtn__success]: proccessStatus.status === ProccessStatus.SUCCESS },
        )}>
        {proccessStatus.loading ? (
          <>
            <Oval
              height={20}
              width={20}
              color='#fff'
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor='#e0e0e0'
              strokeWidth={3}
              strokeWidthSecondary={3}
            />{' '}
            Завантаження
          </>
        ) : proccessStatus.status === ProccessStatus.SUCCESS ? (
          <span>
            <AiOutlineCheckCircle /> Змінено
          </span>
        ) : ProccessStatus.WAITING ? (
          'Оновити'
        ) : (
          'Помилка'
        )}
      </button>
    </form>
  );
};

export default UpdateProfileForm;
