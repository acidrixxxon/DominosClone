import classNames from 'classnames';
import React, { FC } from 'react';

import './CartStatusDetails.scss';

interface ComponentProps {
  visible: boolean;
}

const CartStatusDetails: FC<ComponentProps> = ({ visible }) => {
  return <div className={classNames('cartStatus__details', { 'cartStatus__details-visible': visible })}>CartStatusDetails</div>;
};

export default CartStatusDetails;
