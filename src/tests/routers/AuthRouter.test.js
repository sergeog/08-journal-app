import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { AuthRouter } from '../../routers/AuthRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};
const store = mockStore(initialState);

describe('Pruebas en <AuthRouter />', () => {
  test('debe mostrarse correctamente', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AuthRouter />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__main').exists()).toBe(true);
  });
});
