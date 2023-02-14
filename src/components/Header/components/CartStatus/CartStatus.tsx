import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useOutsideClick2 } from '../../../../hooks/useOutsideClick2';
import animationStyles from './../../../../assets/animations.module.scss';
import styles from './CartStatus.module.scss';
import CartStatusDetails from './components/CartStatusDetails/CartStatusDetails';

const CartStatus: FC = () => {
  const [animations, setAnimations] = useState<{ countShaking: boolean; costOpacity: boolean }>({
    countShaking: false,
    costOpacity: false,
  });

  const { totalCost, totalCount, items } = useAppSelector((state) => state.cart);

  const [state, setState, ref] = useOutsideClick2();

  const { pathname } = useLocation();

  const productCount = totalCount === 0 ? '00' : totalCount < 10 ? `0${totalCount}` : totalCount;
  const totalPrice = totalCost === 0 ? '0.00' : `${totalCost}.00`;

  useEffect(() => {
    if (!animations.countShaking && !animations.costOpacity && totalCount !== 0)
      setAnimations((state) => ({ costOpacity: true, countShaking: true }));

    setTimeout(() => {
      setAnimations((state) => ({ costOpacity: false, countShaking: false }));
    }, 300);
  }, [totalCount, items.length, totalCost]);

  useEffect(() => {
    setState(false);
  }, [pathname]);

  return (
    <div
      data-testid='cartStatus-button'
      ref={ref}
      className={classNames(styles.cartStatus, { [styles.cartStatus__active]: state })}
      onClick={() => setState((state) => pathname !== '/cart' && !state)}>
      <div className={styles.cartStatus__container}>
        <span className={classNames(styles.cartStatus__count, { [animationStyles.shaking__animation]: animations.countShaking })}>
          {productCount}
          <AiOutlineShoppingCart />
        </span>

        <span className={classNames(styles.cartStatus__price, { [animationStyles.opacity__animation]: animations.costOpacity })}>
          {totalPrice} грн
        </span>

        <button className={styles.cartStatus__order}>
          <AnimatePresence>
            {state ? (
              <motion.span
                initial={{ transform: 'translateY(20px)' }}
                animate={{ transform: 'translateY(0px)' }}
                exit={{ opacity: 0, transform: 'translateX(-10px)', display: 'none' }}
                className={styles.cartStatus__arrow}>
                <MdKeyboardArrowDown className={styles.cartStatus__arrowIcon} />
              </motion.span>
            ) : (
              <>Замовити</>
            )}
          </AnimatePresence>
        </button>
      </div>

      <CartStatusDetails visible={state} />
    </div>
  );
};

export default CartStatus;
