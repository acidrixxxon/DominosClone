import { ICartState } from '../types/CartTypes';
import { IClientData } from '../types/UserTypes';

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

  getCart(): string | null {
    return localStorage.getItem('cart');
  }

  saveCustomerData(data: IClientData): void {
    localStorage.setItem('customer', JSON.stringify(data));
  }
}

export default new LocalStorageService();
