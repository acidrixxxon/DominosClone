import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { storeSetup } from '../../../../redux/store';
import { ICartState } from '../../../../redux/types/CartTypes';
import CartStatus from './CartStatus';

const cartState: ICartState = { items: [], totalCount: 5, totalCost: 500 };

describe('testing cart status component', () => {
  afterEach(cleanup);

  let store: ReturnType<typeof storeSetup>;

  beforeEach(() => {
    store = storeSetup({ cart: cartState });
  });

  it('Check for render component with correct preloaded state', () => {
    render(
      <Provider store={store}>
        <CartStatus />
      </Provider>,
    );
    expect(screen.queryByText('Замовити')).toBeInTheDocument();
    expect(screen.getByText(`0${cartState.totalCount}`)).toBeInTheDocument();
    expect(screen.getByText(`${cartState.totalCost}.00 грн`)).toBeInTheDocument();
  });
});
