import { screen } from '@testing-library/react';
import { render, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import { request } from '../../../../Utils/test-utils';
import { storeSetup } from '../../../../redux/store';
import ProductDetails from '../../ProductDetails';
import Ingridients from './Ingridients';

describe('Testing for ingridients list component', () => {
  let productId = '6394d044b3618548a1a856cf';
  let store: any;

  beforeEach(async () => {
    store = storeSetup({ cart: { items: [], totalCount: 0, totalCost: 0 } });
  });

  it('Check that component rendered right', () => {
    request(productId).then(({ data: { data } }) => {
      const component = shallow(
        <Provider store={store}>
          <Ingridients ingridients={data.result} setDetails={() => console.log('da')} />
        </Provider>,
      );

      expect(component.length).toBe(1);
      expect(component).toBeInTheDocument();
      expect(component.find('h4')).toHaveTextContent('Інгрідієнти:');
      expect(component.find('ul').children()).to.have.lengthOf(data.result.ingridients.length);
    });
  });

  it('List of ingridients shouldnt be rendered if product is not pizza', () => {
    request('636c13e11d2d129f56089b6d').then(({ data: { data } }) => {
      const component = shallow(
        <Provider store={store}>
          <ProductDetails product={data.result} />
        </Provider>,
      );

      expect(component.find('#pizza__ingridients')).toBe(true);
    });
  });
});
