import { ICartState } from '../types/CartTypes';

class LocalStorageService {
  saveAccessToken(token: string): void {
    return localStorage.setItem('accessToken', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  removeTokenFromLS(): void {
    return localStorage.removeItem('accessToken');
  }

  saveCart(cart: ICartState): void {
    return localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): ICartState {
    return localStorage.getItem('cart') !== null
      ? JSON.parse(localStorage.getItem('cart'))
      : {
          items: [],
          totalCount: 0,
          totalCost: 0,
        };
  }
}

export default new LocalStorageService();
