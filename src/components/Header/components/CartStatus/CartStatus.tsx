import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useRef, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import './CartStatus.scss';
import CartStatusDetails from './components/CartStatusDetails/CartStatusDetails';

const CartStatus: FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { totalCost, totalCount, items } = useAppSelector((state) => state.cart);

  const refEl = useRef<HTMLDivElement>(null);

  useOutsideClick(refEl, () => setShowDropdown(false));

  const productCount = totalCount === 0 ? '00' : totalCount < 10 ? `0${totalCount}` : totalCount;
  const totalPrice = totalCost === 0 ? '0.00' : `${totalCost}.00`;

  return (
    <div
      data-testid='cartStatus-button'
      ref={refEl}
      className={classNames('cartStatus', { cartStatus__active: showDropdown })}
      onClick={() => setShowDropdown((state) => !state)}>
      <div className='cartStatus__container'>
        <span className='cartStatus__count'>
          {productCount}
          <AiOutlineShoppingCart />
        </span>

        <span className='cartStatus__price'>{totalPrice} грн</span>

        <button className='cartStatus__order'>
          <AnimatePresence>
            {showDropdown ? (
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

      <CartStatusDetails visible={showDropdown} />
    </div>
  );
};

export default CartStatus;
