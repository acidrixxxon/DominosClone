export type CHANGE_QTY = 'plus' | 'minus';

export const PLUS = 'plus';
export const MINUS = 'minus';

export type MOCARELLA_TYPES = 'add_mocarella' | 'remove_mocarella';

export const ADD_MOCARELLA = 'add_mocarella';
export const REMOVE_MOCARELLA = 'remove_mocarella';

export const MOCARELLA_ID = '63714ca4858cf7c6b09716fc';
export const SOUCE_CATEGORY_ID = '636f4d444ea5314e1da77912';

export const initialDeliveryInfo = {
  street: '',
  house: '',
  room: '',
  floor: '',
  comments: '',
};

export const initialDineinInfo = {
  restaurant: null,
};

export const initialClientInfo = {
  name: '',
  phone: '',
  email: '',
};
