import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { PrivateRoute } from '../../routers/PrivateRoute';

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
store.dispatch = jest.fn();

describe('Pruebas en <PrivateRoute />', () => {
  const props = {};

  test('no debe mostrar el componente si el usuario NO está autenticado', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute
            isAuthenticated={false}
            component={() => {
              <span>Listo!</span>;
            }}
            {...props}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('span').exists()).toBe(false);
  });
});
