import { FC } from 'react';
import { Oval, Triangle } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import PageWrapper from '@/components/UI/PageWrapper/PageWrapper';
import ProductDetails from '@/components/pages/ProductPage/components/ProductDetails/ProductDetails';

import { useGetProductByIdQuery } from '@/redux/api/ProductApi';

import styles from './ProductPage.module.scss';

const ProductPage: FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetProductByIdQuery(id);

  return (
    <PageWrapper className={styles.productPage}>
      {isLoading && (
        <div className={styles.productPage__loaderContainer}>
          <Triangle
            height='300'
            width='300'
            color='var(--black-color)'
            ariaLabel='triangle-loading'
            wrapperStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-150px,-150px)' }}
            visible={true}
          />
        </div>
      )}

      {data && data.result && <ProductDetails product={data.result} />}
    </PageWrapper>
  );
};

export default ProductPage;
