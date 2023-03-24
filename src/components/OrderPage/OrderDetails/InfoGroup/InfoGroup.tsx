import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { isString } from 'lodash';
import React from 'react';

import { translate } from '../../../../utils/helpers';
import styles from './InfoGroup.module.scss';

interface ComponentProps {
  title: string;
  data: any;
}

const InfoGroup: React.FC<ComponentProps> = ({ title, data }) => {
  const readyTime = data.createdAt && dayjs(data.createdAt).add(30, 'minute').locale('uk').format('D MMMM YYYY, HH:MM');
  const formattedAddress =
    title === 'address' && data.orderType
      ? data.orderType.id === 0
        ? `Київ${data.details.street && `, вул.${data.details.street} ${data.details.house && `${data.details.house}`}`}${
            data.details.floor && `, поверх ${data.details.floor}`
          }${data.details.room && `, кв. ${data.details.room}`}`
        : `Київ ${data.details.restaurant && `,${data.details.restaurant.title}`}`
      : undefined;

  return (
    <div className={styles.infoGroup}>
      <h4 className={styles.infoGroup__title}>{translate(title)}</h4>
      <div className={styles.infoGroup__content}>
        {title === 'contacts' &&
          Object.keys(data).map((item) => (
            <div className={styles.infoGroup__row}>
              <span className={styles.infoGroup__field}>{translate(item)}:</span>
              <span className={styles.infoGroup__value}>{data[item]}</span>
            </div>
          ))}

        {title === 'address' && (
          <>
            <div className={styles.infoGroup__row}>
              <span className={styles.infoGroup__field}>Отримання:</span>
              <span className={styles.infoGroup__value}>{data.orderType.title}</span>
            </div>

            <div className={styles.infoGroup__row}>
              <span className={styles.infoGroup__field}>Адрес:</span>
              <span className={styles.infoGroup__value}>{formattedAddress}</span>
            </div>

            <div className={styles.infoGroup__row}>
              <span className={styles.infoGroup__field}>Час готовності:</span>
              <span className={styles.infoGroup__value}>{readyTime ? readyTime : 'Уточнюйте на піццерії'}</span>
            </div>
          </>
        )}

        {title === 'payment' && (
          <div className={classNames(styles.infoGroup__row, styles.infoGroup__singleCol)}>
            <span className={styles.infoGroup__value}>{data.title}</span>
          </div>
        )}

        {title === 'comments' && isString(data) && data.length > 0 && (
          <div className={classNames(styles.infoGroup__row, styles.infoGroup__singleCol)}>
            <span className={styles.infoGroup__value}>{data}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoGroup;
