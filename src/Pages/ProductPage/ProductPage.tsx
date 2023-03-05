import { FC } from 'react';
import { Oval } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '../../Api/ProductApi';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import PageContainer from '../../components/UI/PageContainer/PageContainer';
import styles from './ProductPage.module.scss';

const ProductPage: FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetProductByIdQuery(id);

  return (
    <PageContainer className={styles.productPage}>
      <div className={styles.productPage__container}>
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
      </div>
    </PageContainer>
  );
};

export default ProductPage;
