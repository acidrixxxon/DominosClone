import { v4 } from 'uuid';

import { ICartState } from './types/CartTypes';
import { IProduct, IProductInCart } from './types/ProductTypes';
import { ICustomerData } from './types/UserTypes';

export const CartProductDto = (item: IProduct, activeType: { size: number; crust: number | -1 }): IProductInCart => {
  return {
    _id: item.class === 0 ? item.variants[activeType.size].variants[activeType.crust]._id : item.variants[activeType.size]._id,
    class: item.class,
    image: item.imageUrl,
    category: item.category,
    title: item.title,
    uniqueId: v4(),
    fulltitle:
      item.class === 0
        ? item.variants[activeType.size].variants[activeType.crust].fulltitle
        : `${item.title}(${item.variants[activeType.size].size.toLocaleLowerCase()})`,
    ingridients: item.class === 0 ? item.ingridients : null,
    qty: 1,
    price:
      item.class === 0 && activeType.crust !== -1
        ? item.variants[activeType.size].variants[activeType.crust].price
        : item.variants[activeType.size].price,
  };
};

export const NewOrderDto = (orderType: number, customerData: ICustomerData, cart: ICartState) => {
  return {
    cart,
    details: {
      orderType: orderType === 0 ? { id: 0, title: 'Доставка' } : { id: 1, title: 'Самовиніс' },
      customerData:
        customerData.paymentType?.id === 12312
          ? {
              ...customerData,
              paymentType: {
                ...customerData.paymentType,
                stage: 'очікує на оплату',
                status: false,
              },
            }
          : customerData,
    },
  };
};
