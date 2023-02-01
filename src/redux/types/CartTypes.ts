import { IProduct } from './ProductTypes';

export interface ICartState {
  items: IProduct[];
  totalCost: number;
  totalCount: number;
}
