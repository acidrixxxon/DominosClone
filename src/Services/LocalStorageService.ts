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
    return JSON.parse(localStorage.getItem('cart'));
  }
}

export default new LocalStorageService();
