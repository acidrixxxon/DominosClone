export interface IProductCategory {
  _id: string;
  title: string;
  products: IPizza[];
}

export interface IPizza {
  _id: string;
  aNewOne: boolean;
  category: string;
  class: number;
  defaultPrice: number;
  fullimageUrl: string;
  imageUrl: string;
  ingridients: [];
  rating: number;
  title: string;
  variants: [];
}
