import { cleanup, fireEvent, getByTestId, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { storeSetup } from '../../../../redux/store';
import { ICartState } from '../../../../utils/types/CartTypes';
import CartStatus from './CartStatus';

const cartState = { items: [], totalCount: 5, totalCost: 500 };
const initialState: ICartState = { items: [], totalCount: 0, totalCost: 0 };

describe('testing cart status component', () => {
  afterEach(cleanup);

  let store: ReturnType<typeof storeSetup>;
  let cartStatus: HTMLElement;
  let details: HTMLElement;

  beforeEach(() => {
    store = storeSetup({ cart: cartState });
  });

  it('Check for render component with correct preloaded state', () => {
    render(
      <Provider store={store}>
        <CartStatus />
      </Provider>,
    );

    cartStatus = screen.getByTestId('cartStatus-button');

    expect(cartStatus).toBeInTheDocument();
    expect(screen.queryByText('Замовити')).toBeInTheDocument();
    expect(screen.getByText(`0${cartState.totalCount}`)).toBeInTheDocument();
    expect(screen.getByText(`${cartState.totalCost}.00 грн`)).toBeInTheDocument();
  });

  it('check add class name to cart status after click', () => {
    render(
      <Provider store={store}>
        <CartStatus />
      </Provider>,
    );

    cartStatus = screen.getByTestId('cartStatus-button');

    expect(cartStatus).not.toHaveClass('cartStatus__active');

    fireEvent(
      cartStatus,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(cartStatus).toHaveClass('cartStatus cartStatus__active');
  });

  it('check for visible cart status details block after click on cart status', () => {
    render(
      <Provider store={store}>
        <CartStatus />
      </Provider>,
    );

    cartStatus = screen.getByTestId('cartStatus-button');
    details = screen.getByTestId('cartStatus-details');

    fireEvent(
      cartStatus,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(details).toBeInTheDocument();
    expect(details).toHaveClass('cartStatus__details cartStatus__details-visible');
    expect(details).toBeVisible();
  });

  it('check for empty cart component render with detault initial state', () => {
    store = storeSetup({ cart: initialState });

    render(
      <Provider store={store}>
        <CartStatus />
      </Provider>,
    );

    expect(document.querySelector('.cartStatus__emptyCart')).toBeTruthy();
    expect(document.querySelector('.cartStatus__listContainer')).not.toBeTruthy();
  });

  it('check for product list component render with changed state', () => {
    store = storeSetup({ cart: cartState });

    render(
      <Provider store={store}>
        <CartStatus />
      </Provider>,
    );

    expect(document.querySelector('.cartStatus__emptyCart')).not.toBeTruthy();
    expect(document.querySelector('.cartStatus__listContainer')).toBeTruthy();
  });
});
