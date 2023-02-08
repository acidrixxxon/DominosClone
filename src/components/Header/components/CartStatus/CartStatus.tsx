import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useOutsideClick2 } from '../../../../hooks/useOutsideClick2';
import './CartStatus.scss';
import CartStatusDetails from './components/CartStatusDetails/CartStatusDetails';

const CartStatus: FC = () => {
  const [animations, setAnimations] = useState<{ countShaking: boolean; costOpacity: boolean }>({
    countShaking: false,
    costOpacity: false,
  });
  const [countShaking, setCountShaking] = useState<boolean>(false);
  const { totalCost, totalCount, items } = useAppSelector((state) => state.cart);
  const [state, setState, ref] = useOutsideClick2();
  const { pathname } = useLocation();

  const productCount = totalCount === 0 ? '00' : totalCount < 10 ? `0${totalCount}` : totalCount;
  const totalPrice = totalCost === 0 ? '0.00' : `${totalCost}.00`;

  useEffect(() => {
    if (!animations.countShaking && totalCount !== 0) setAnimations((state) => ({ ...state, countShaking: true }));

    setTimeout(() => {
      setAnimations((state) => ({ ...state, countShaking: false }));
    }, 300);
  }, [totalCount, items.length]);

  useEffect(() => {
    if (!animations.costOpacity && totalCount !== 0) setAnimations((state) => ({ ...state, costOpacity: true }));

    setTimeout(() => {
      setAnimations((state) => ({ ...state, costOpacity: false }));
    }, 300);
  }, [totalCost]);

  useEffect(() => {
    setState(false);
  }, [pathname]);

  return (
    <div
      data-testid='cartStatus-button'
      ref={ref}
      className={classNames('cartStatus', { cartStatus__active: state })}
      onClick={() => setState((state) => pathname !== '/cart' && !state)}>
      <div className='cartStatus__container'>
        <span className={classNames('cartStatus__count', { shaking__animation: animations.countShaking })}>
          {productCount}
          <AiOutlineShoppingCart />
        </span>

        <span className={classNames('cartStatus__price', { opacity__animation: animations.costOpacity })}>{totalPrice} грн</span>

        <button className='cartStatus__order'>
          <AnimatePresence>
            {state ? (
              <motion.span
                initial={{ transform: 'translateY(20px)' }}
                animate={{ transform: 'translateY(0px)' }}
                exit={{ opacity: 0, transform: 'translateX(-10px)', display: 'none' }}
                className='cartStatus__arrow'>
                <MdKeyboardArrowDown className='cartStatus__arrow-icon' />
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
