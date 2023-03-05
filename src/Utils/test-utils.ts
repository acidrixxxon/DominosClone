import type { PreloadedState } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { AppStore, RootState, storeSetup } from '../redux/store';
import { BACKEND_URL } from './config';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const request = async (productId: string) => {
  return axios.get(`${BACKEND_URL}/search/${productId}`);
};

function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, store = storeSetup(preloadedState), ...renderOptions }: ExtendedRenderOptions = {},
) {
  // function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
  //   return <Provider store={store}>{children}</Provider>;
  // }
  // return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { renderWithProviders, request };
