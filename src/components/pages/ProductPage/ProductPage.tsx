import { FC } from 'react';
import { Oval } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import ProductDetails from '@/components/ProductDetails/ProductDetails';
import PageWrapper from '@/components/UI/PageWrapper/PageWrapper';

import { useGetProductByIdQuery } from '@/redux/api/ProductApi';

import styles from './ProductPage.module.scss';

const ProductPage: FC = () => {
  const { id } = useParams();

  const { data } = useGetProductByIdQuery(id);

  const isLoading = true;

  return (
    <PageWrapper className={styles.productPage}>
      {isLoading && (
        <div className={styles.productPage__loaderContainer}>
          <Oval
            height={150}
            width={150}
            color='red'
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor='#4f4f4f'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}

      {data && data.result && <ProductDetails product={data.result} />}
    </PageWrapper>
  );
};

export default ProductPage;
