import { IProductInCart } from './ProductTypes';

export interface ICartState {
  items: IProductInCart[];
  totalCost: number;
  totalCount: number;
}
