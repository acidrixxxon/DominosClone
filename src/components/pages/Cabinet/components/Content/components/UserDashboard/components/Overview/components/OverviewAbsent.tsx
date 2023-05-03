import classNames from 'classnames';
import React from 'react';

import styles from './OverviewError.module.scss';

const OverviewError = () => {
  return (
    <div className={styles.overviewAbsent}>
      <h4 className={classNames('headline__title', styles.overviewAbsent__title)}>Cтатистика замовлень</h4>

      <div className={styles.overviewAbsent__chartsContainer}>
        <div className={styles.overviewAbsent__chartEmpty}>
          <h4>Усього замовлень:</h4>

          <span>0</span>
        </div>

        <div className={styles.overviewAbsent__chartEmpty}>
          <h4>Замовлено доставок:</h4>

          <span>0</span>
        </div>

        <div className={styles.overviewAbsent__chartEmpty}>
          <h4>Витрати загалом:</h4>

          <span>00.00</span>
        </div>
      </div>

      <h4 className={styles.overviewAbsent__primatyText}>Статистика замовлень відсутня</h4>
      <p className={styles.overviewAbsent__secondaryText}>Щоб переглянути статистику профілю, потрібно оформити замовлення</p>
    </div>
  );
};

export default OverviewError;
