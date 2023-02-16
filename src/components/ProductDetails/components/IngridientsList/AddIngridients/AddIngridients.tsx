import { FC, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { useFetchIngridientsQuery } from '../../../../../Api/ProductApi';
import { IPizzaIngridientsFull } from '../../../../../types/ProductTypes';
import Modal from '../../../../UI/Modal/Modal';
import styles from './AddIngridients.module.scss';

interface ComponentProps {
  ingridients: IPizzaIngridientsFull[];
  setDetails: React.Dispatch<React.SetStateAction<any>>;
}

const AddIngridients: FC<ComponentProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, error, isLoading } = useFetchIngridientsQuery();

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  return (
    <>
      <li className={styles.productDetails__ingridientsItemAdd} onClick={openModal}>
        <span className={styles.productDetails__ingridientsItemIcon}>
          <AiOutlinePlus />
        </span>
      </li>

      <Modal renderCondition={showModal} onClose={closeModal}></Modal>
    </>
  );
};

export default AddIngridients;
