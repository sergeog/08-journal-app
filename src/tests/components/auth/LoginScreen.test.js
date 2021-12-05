import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLogin } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLogin: jest.fn(),
}));

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

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe('Pruebas en <LoginScreen />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe autenticarse con google', () => {
    wrapper.find('.google-btn').simulate('click');
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test('debe autenticarse llenando las credenciales de acceso', () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(startLogin).toHaveBeenCalledWith('serge@gmail.com', '123456');
  });
});
