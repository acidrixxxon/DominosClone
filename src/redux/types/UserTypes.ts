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
