export interface IProductCategory {
  _id: string;
  title: string;
  products: IProduct[];
}

export interface IPizza {
  _id: string;
  aNewOne: boolean;
  category: string;
  class: number;
  defaultPrice: number;
  fullimageUrl: string;
  imageUrl: string;
  ingridients: [
    {
      ingridientId: {
        _id: string;
        addPrice: number;
        title: string;
        category: string;
        imageUrl: string;
      };
      qty: number;
      _id: string;
    },
  ];
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
