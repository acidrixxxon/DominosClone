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
}

export default new LocalStorageService();
