import { ICartState } from '../types/CartTypes';
import { IClientData, ICustomerData } from '../types/UserTypes';

class LocalStorageService {
  saveAccessToken(token: string): void {
    return localStorage.setItem('accessToken', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  removeAccessToken(): void {
    return localStorage.removeItem('accessToken');
  }

  saveCart(cart: ICartState): void {
    return localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): string | null {
    return localStorage.getItem('cart');
  }

  saveCustomerData(data: ICustomerData, orderType: number): void {
    localStorage.setItem('customer', JSON.stringify(data.client));
    orderType === 0
      ? localStorage.setItem('deliveryAddress', JSON.stringify(data.details))
      : localStorage.setItem('dineinAddress', JSON.stringify(data.details));
  }
}

export default new LocalStorageService();
