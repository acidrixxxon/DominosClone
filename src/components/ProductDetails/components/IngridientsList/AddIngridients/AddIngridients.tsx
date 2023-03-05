import { FC, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Oval } from 'react-loader-spinner';

import { useFetchIngridientsCategoriesQuery } from '../../../../../Api/ProductApi';
import { IPizzaIngridientsFull } from '../../../../../types/ProductTypes';
import Modal from '../../../../UI/Modal/Modal';
import styles from './AddIngridients.module.scss';
import Category from './Category/Category';

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
