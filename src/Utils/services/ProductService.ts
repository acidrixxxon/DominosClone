import axios from 'axios';

import { BACKEND_URL } from '../config';

class ProductService {
  fetchProducts(category: number): Promise<any> | undefined {
    const categoryString = category === 0 ? 'pizza' : category === 1 ? 'sides' : category === 2 ? 'drinks' : null;

    if (categoryString !== null) {
      return axios.get(`${BACKEND_URL}/${categoryString}/get_allcategories`);
    }
  }
}

export default new ProductService();
