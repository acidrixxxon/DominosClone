import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { IPizzaIngridientsFull } from '../../../../../types/ProductTypes';
import AddIngridients from '../AddIngridients/AddIngridients';
import IngridientsItem from './IngridientsItem/IngridientsItem';

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
