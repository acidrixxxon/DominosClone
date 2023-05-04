import { useAppSelector } from '@/hooks/useAppSelector';
import classNames from 'classnames';

import EmptyCartIcon from '@/components/UI/Icons/EmptyCartIcon';

import animationStyles from '@/assets/animations.module.scss';

import styles from './EmptyCart.module.scss';

const EmptyCart = () => {
  const { totalCount } = useAppSelector((state) => state.cart);
  return (
    <div className={styles.cartStatus__emptyCart}>
      <EmptyCartIcon
        className={classNames(styles.cartStatus__emptyCartIcon, { [animationStyles.shaking__animation]: totalCount == 0 })}
      />

      <p className={styles.cartStatus__emptyCartText}>Положите что-нибудь в корзину.</p>
    </div>
  );
};

export default EmptyCart;
