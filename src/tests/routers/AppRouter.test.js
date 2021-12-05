import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { firebase } from '../../firebase/firebase-config';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';

jest.mock('../../actions/auth', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    notes: [],
    active: {
      id: 'ABC',
    },
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  test('debe de llamar el login si estoy autenticado', async () => {
    let user;

    await act(async () => {
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword('test@tesing.com', '123456');
      user = userCredentials.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalledWith('p9rIiB2v6dQs9DjYyHNEd3IkuPP2', null);
  });
});
