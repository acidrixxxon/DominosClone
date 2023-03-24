import { screen } from '@testing-library/react';
import axios from 'axios';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { AppStore, storeSetup } from '../../redux/store';
import { BACKEND_URL } from '../../utils/config';
import { request } from '../../utils/test-utils';
import ProductDetails from './ProductDetails';

describe('Product Page testing', () => {
  let store: AppStore;
  let productId = '6394d044b3618548a1a856cf';

  beforeEach(async () => {
    store = storeSetup({ cart: { items: [], totalCount: 0, totalCost: 0 } });
  });

  test('Current render product details component after fetch', () => {
    request(productId).then(({ data: { data } }) => {
      const component = shallow(
        <Provider store={store}>
          <ProductDetails product={data.result} />
        </Provider>,
      );

      expect(component.length).toBe(1);
    });
  });

  test('Current title', () => {
    request(productId).then(({ data: { data } }) => {
      const component = shallow(
        <Provider store={store}>
          <ProductDetails product={data.result} />
        </Provider>,
      );

      expect(screen.getByText(data.result.title)).toBeInTheDocument();
      expect(component.find('h4')).toHaveTextContent(data.result.title);
    });
  });

  test('Render ingridients list if product with class 0(pizza)', () => {
    request(productId).then(({ data: { data } }) => {
      const component = shallow(
        <Provider store={store}>
          <ProductDetails product={data.result} />
        </Provider>,
      );

      expect(component.find('#pizza__ingridients')).toBeInTheDocument();
      expect(component.find('ul').children()).to.have.lengthOf(data.result.ingridients.length);
    });
  });
});
