export interface IProductCategory {
  _id: string;
  title: string;
  products: IProduct[];
}

export interface IPizzaIngridientsFull {
  ingridientId: IPizzaIngridientsShort;
  qty: number;
  _id: string;
}

export interface IPizzaIngridientsShort {
  _id: string;
  addPrice: number;
  title: string;
  category: string;
  imageUrl: string;
}

export interface IPizza {
  _id: string;
  aNewOne: boolean;
  category: string;
  class: number;
  defaultPrice: number;
  fullimageUrl: string;
  imageUrl: string;
  ingridients: IPizzaIngridientsFull[];
  rating: number;
  title: string;
  variants: [
    {
      _id: string;
      title: string;
      variants: [
        {
          _id: string;
          id?: string;
          fulltitle: string;
          inSell: true;
          price: number;
          title: string;
        },
      ];
      size?: string;
    },
  ];
}

export interface ISide {
  _id: string;
  category: string;
  class: number;
  imageUrl: string;
  defaultPrice: number;
  title: string;
  variants: [
    {
      size: string;
      price: number;
      _id: string;
    },
  ];
}

export type IProduct = IPizza & ISide;

export interface IProductInCart {
  _id: string;
  class: number;
  image: string;
  category: string;
  title: string;
  fulltitle: string;
  ingridients: IPizzaIngridientsFull[] | null;
  qty: number;
  price: number;
  uniqueId?: string;
}

export interface ISideVariant {
  size: string;
  price: number;
  _id: string;
  title?: string;
  variants?: any;
}

export interface IPizzaVariant {
  _id: string;
  title: string;
  variants: [
    {
      _id: string;
      id?: string;
      fulltitle: string;
      inSell: true;
      price: number;
      title: string;
    },
  ];
  price?: number;
  size?: string;
}

export type IProductVariant = IPizzaVariant & ISideVariant;

export type IProductDetails = IProduct & { defaultObj: IProduct };
