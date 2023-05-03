import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { IPizzaIngridientsFull } from '../../../../../../../../../utils/types/ProductTypes';
import AddIngridients from '../AddIngridient/AddIngridients';
import IngridientsItem from './components/IngridientsItem/IngridientsItem';

interface ComponentProps {
  ingridients: IPizzaIngridientsFull[];
  setDetails: React.Dispatch<React.SetStateAction<any>>;
}

const IngridientsList: React.FC<ComponentProps> = ({ ingridients, setDetails }) => {
  return (
    <AnimatePresence>
      {ingridients.map((ingridient) => (
        <IngridientsItem ingridient={ingridient} key={ingridient.ingridientId._id} setDetails={setDetails} />
      ))}

      <AddIngridients setDetails={setDetails} ingridients={ingridients} />
    </AnimatePresence>
  );
};

export default IngridientsList;
