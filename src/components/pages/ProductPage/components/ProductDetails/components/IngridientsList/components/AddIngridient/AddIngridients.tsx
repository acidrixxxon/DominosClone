import { FC, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Oval } from 'react-loader-spinner';

import Modal from '@/components/UI/Modal/Modal';

import { IPizzaIngridientsFull } from '@/utils/types/ProductTypes';

import { useFetchIngridientsCategoriesQuery } from '@/redux/api/ProductApi';

import styles from './AddIngridients.module.scss';

import Category from './components/Category/Category';

interface ComponentProps {
  ingridients: IPizzaIngridientsFull[];
  setDetails: React.Dispatch<React.SetStateAction<any>>;
}

const AddIngridients: FC<ComponentProps> = ({ ingridients, setDetails }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, error, isLoading, isSuccess } = useFetchIngridientsCategoriesQuery('da');

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  return (
    <>
      <li className={styles.productDetails__ingridientsItemAdd} onClick={openModal}>
        <span className={styles.productDetails__ingridientsItemIcon}>
          <AiOutlinePlus />
        </span>
      </li>

      <Modal
        id='addIngridient-modal'
        renderCondition={showModal}
        onClose={closeModal}
        className={styles.productDetails__addIngridientsModal}>
        <h4 className={styles.productDetails__title}>Обрати інгрідієнти:</h4>

        {isLoading && (
          <Oval
            height={100}
            width={100}
            color='#4fa94d'
            wrapperStyle={{}}
            wrapperClass={styles.loaderContainer}
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor='red'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}

        {isSuccess && !isLoading && data && data.ingridients && (
          <ul className={styles.productDetails__categoriesList}>
            {data.ingridients.map((item) => (
              <Category item={item} ingridients={ingridients} key={item._id} setDetails={setDetails} closeModal={closeModal} />
            ))}
          </ul>
        )}
      </Modal>
    </>
  );
};

export default AddIngridients;
