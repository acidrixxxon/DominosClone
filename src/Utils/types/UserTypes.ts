export interface IUser {
  email: string;
  _id: string;
  confirmed: boolean;
  phone: string;
  firstName: string;
  secondName: string;
  isAdmin: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface IUserState {
  user: IUser | {} | null;
  loaders: {
    loginLoading: boolean;
    refreshLoading: boolean;
    registerLoading: boolean;
  };
  error: string | null;
}

export interface IClientData {
  email: string;
  phone: string;
  name: string;
}

export type IAddressData =
  | {
      street: string;
      house: string;
      room: string;
      floor: string;
      comments: string;
      restaurant?: {
        id: number;
        title: string;
      } | null;
    }
  | {
      restaurant: {
        id: number;
        title: string;
      } | null;
    };

export type IAddressData1 =
  | {
      street: string;
      house: string;
      room: string;
      floor: string;
      comments: string;
      restaurant?: {
        id: number;
        title: string;
      } | null;
    }
  | {
      restaurant: {
        id: number;
        title: string;
      } | null;
      street?: string;
      house?: string;
      room?: string;
      floor?: string;
      comments?: string;
    };

export interface ICustomerData {
  client: IClientData;
  details: IAddressData1;
  paymentType: null | IPaymentType;
}

export interface IPaymentType {
  id: number;
  title: string;
  stage?: 'замовлення сплачене' | 'очікує на оплату';
  status?: boolean;
  paymentLink?: string;
}
