import { IProduct, IProductInCart } from '../types/ProductTypes';

export const CartProductDto = (item: IProduct, activeType: { size: number; crust: number | -1 }): IProductInCart => {
  return {
    _id: item.class === 0 ? item.variants[activeType.size].variants[activeType.crust]._id : item.variants[activeType.size]._id,
    class: item.class,
    image: item.imageUrl,
    category: item.category,
    title: item.title,
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
