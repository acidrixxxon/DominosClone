import { useAppSelector } from '@/hooks/useAppSelector';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Oval } from 'react-loader-spinner';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useFetchUserAnalyticsQuery } from '@/redux/api/AnalyticsApi';
import { viewActions } from '@/redux/slices/viewSlice';
import { useActionCreators } from '@/redux/store';

import styles from './Overview.module.scss';

import OverviewError from './components/OverviewAbsent';

const Overview = () => {
  const { analytics } = useAppSelector((state) => state.view);
  const { data, error, isLoading } = useFetchUserAnalyticsQuery({ date: analytics });

  const { setAnalyticsMonth } = useActionCreators(viewActions);

  if (error || !data || !data.success || !data.analytics) return <OverviewError />;

  return (
    <div className={styles.overview}>
      <div className={styles.overview__headline}>
        <h4 className={classNames(styles.overview__title, 'headline__title')}>Оглядини</h4>

        <div className={styles.overview__buttonsGroup}>
          <button
            className={classNames({ [styles.active]: analytics === 'month' })}
            onClick={() => setAnalyticsMonth('month')}
            disabled={analytics === 'month'}>
            Місяць
          </button>
          <button
            className={classNames({ [styles.active]: analytics === 'year' })}
            onClick={() => setAnalyticsMonth('year')}
            disabled={analytics === 'year'}>
            Рік
          </button>
        </div>
      </div>

      <div className={styles.overview__content}>
        {isLoading ? (
          <Oval
            height={80}
            width={80}
            color='#4f4f4f'
            wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
            visible={true}
            ariaLabel='loading-indicator'
            secondaryColor='#151617'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : (
          <>
            <div className={styles.overview__chartsContainer}>
              <motion.div
                initial={{ opacity: 0, transform: 'scale(.7)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0 }}
                className={styles.overview__chart}>
                <h4>Усього замовлень:</h4>

                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {data.analytics.orderCount}
                </motion.span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, transform: 'scale(.8)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0 }}
                className={styles.overview__chart}>
                <h4>Витрати загалом:</h4>

                <span>{data?.analytics.moneySpent > 0 ? `${data.analytics.moneySpent}.00` : '00.00'}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, transform: 'scale(.7)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0 }}
                className={styles.overview__chart}>
                <h4>Замовлено доставок:</h4>

                <span>{data.analytics.deliveriesCount}</span>
              </motion.div>
            </div>

            <div className={styles.overview__orderStats}>
              <h4 className={classNames(styles.overview__title, 'headline__title')}>Статистика замовлень</h4>

              <ResponsiveContainer width='100%' height={400}>
                <AreaChart
                  width={800}
                  height={400}
                  data={data1}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Area name='К-ть замовлень' type='monotone' dataKey='qty' stroke='#333' fill='#8884d8' />
                  <Area name='Грошей витрачено' type='monotone' dataKey='total' stroke='#333' fill='#8884d8' />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;

const data1 = [
  {
    month: 'Январь',
    qty: 2,
    total: 2400,
    amt: 2400,
  },
  {
    month: 'Февраль',
    qty: 6,
    total: 1398,
    amt: 2210,
  },
  {
    month: 'Март',
    qty: 10,
    total: 9800,
    amt: 2290,
  },
  {
    month: 'Апрель',
    qty: 2,
    total: 3908,
    amt: 2000,
  },
  {
    month: 'Май',
    qty: 1,
    total: 4800,
    amt: 2181,
  },
  {
    month: 'Июнь',
    qty: 1,
    total: 3800,
    amt: 2500,
  },
  {
    month: 'Июль',
    qty: 2,
    total: 4300,
    amt: 2100,
  },
];
