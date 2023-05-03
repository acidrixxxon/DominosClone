import { useAppDispatch } from '@/hooks/useAppDispatch';
import { bindActionCreators } from '@reduxjs/toolkit';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import GlobalLoader from '@/components/UI/GlobalLoader/GlobalLoader';

import { viewActions } from '@/redux/slices/viewSlice';

import styles from './ProductList.module.scss';

import { useAppSelector } from '../../../../../../../../hooks/useAppSelector';
import ProductListItem from './component/ProductListItem';

const ProductList: FC = () => {
  const { items, totalCost } = useAppSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const toCartHandler = () => {
    // dispatch(viewActions.setGlobalLoader(true));
    setLoading(true);

    setTimeout(() => {
      navigate('/cart');
      setLoading(false);
      // dispatch(viewActions.setGlobalLoader(false));
    }, 1000);
  };

  return (
    <>
      {loading && <GlobalLoader />}
      <div className={styles.cartStatus__listContainer}>
        {items.map((item) => (
          <ProductListItem item={item} key={item.uniqueId} />
        ))}
      </div>

      <div className={styles.cartStatus__footer}>
        <button onClick={toCartHandler} className={styles.cartStatus__footerLink}>
          <span className={styles.cartStatus__footerText}>Оформити</span>
          <span className={styles.cartStatus__footerPrice}>{totalCost}грн</span>
        </button>
      </div>
    </>
  );
};

export default ProductList;
