import { motion } from 'framer-motion';
import { FC } from 'react';

import styles from './Ingridients.module.scss';

import { IPizzaIngridientsFull } from '../../../../../../../utils/types/ProductTypes';
import IngridientsList from './components/List/IngridientsList';

interface ComponentProps {
  ingridients: IPizzaIngridientsFull[];
  setDetails: React.Dispatch<React.SetStateAction<any>>;
}

const Ingridients: FC<ComponentProps> = ({ ingridients, setDetails }) => {
  return (
    <div className={styles.productDetails__ingridientsContainer} id='pizza__ingridients'>
      <h4 className={styles.productDetails__heading}>Інгрідієнти:</h4>

      <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.productDetails__ingridientsList}>
        <IngridientsList ingridients={ingridients} setDetails={setDetails} />
      </motion.ul>
    </div>
  );
};

export default Ingridients;
