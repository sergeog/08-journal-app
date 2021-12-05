import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../types/types';

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
// store.dispatch = jest.fn();

let wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe('Pruebas en <RegisterScreen />', () => {
  beforeEach(() => {
    store.clearActions();

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );
  });

  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe hacer el dispatch del error en el name', () => {
    const nameField = wrapper.find('input[name="name"]');
    nameField.simulate('change', {
      target: {
        name: 'name',
        value: '',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.UI_SET_ERROR);
    expect(actions[0].payload).toBe('Name is required');
  });

  test('debe hacer el dispatch del error en el email', () => {
    const emailField = wrapper.find('input[name="email"]');
    emailField.simulate('change', {
      target: {
        name: 'email',
        value: '',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.UI_SET_ERROR);
    expect(actions[0].payload).toBe('Email is not valid');
  });

  test('debe hacer el dispatch del error en ambos passwords requeridos', () => {
    const passwordField = wrapper.find('input[name="password"]');
    const password2Field = wrapper.find('input[name="password2"]');
    passwordField.simulate('change', {
      target: {
        name: 'password',
        value: '',
      },
    });
    password2Field.simulate('change', {
      target: {
        name: 'password2',
        value: '',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.UI_SET_ERROR);
    expect(actions[0].payload).toBe('Both passwords are required');
  });

  test('debe hacer el dispatch del error en ambos passwords deben ser al menos de 6 caracteres y ser iguales', () => {
    const passwordField = wrapper.find('input[name="password"]');
    const password2Field = wrapper.find('input[name="password2"]');
    passwordField.simulate('change', {
      target: {
        name: 'password',
        value: '12345',
      },
    });
    password2Field.simulate('change', {
      target: {
        name: 'password2',
        value: '1234',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.UI_SET_ERROR);
    expect(actions[0].payload).toBe(
      'Password should be at least 6 characters and match each other'
    );
  });

  test('debe mostrar la caja de alerta con el error en el name', () => {
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Name is required',
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
      initialState.ui.msgError
    );
  });

  test('debe mostrar la caja de alerta con el error en el email', () => {
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email is not valid',
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
      initialState.ui.msgError
    );
  });

  test('debe mostrar la caja de alerta con el error en ambos passwords requeridos', () => {
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Both passwords are required',
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
      initialState.ui.msgError
    );
  });

  test('debe mostrar la caja de alerta con el error en ambos passwords no son iguales y contengan menos de 6 caracteres', () => {
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError:
          'Password should be at least 6 characters and match each other',
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
      initialState.ui.msgError
    );
  });

  test('debe enviarse la forma correctamente', () => {
    const nameField = wrapper.find('input[name="name"]');
    const emailField = wrapper.find('input[name="email"]');
    const passwordField = wrapper.find('input[name="password"]');
    const password2Field = wrapper.find('input[name="password2"]');
    nameField.simulate('change', {
      target: {
        name: 'name',
        value: 'Serge',
      },
    });
    emailField.simulate('change', {
      target: {
        name: 'email',
        value: 'serge@mail.com',
      },
    });
    passwordField.simulate('change', {
      target: {
        name: 'password',
        value: '123456',
      },
    });
    password2Field.simulate('change', {
      target: {
        name: 'password2',
        value: '123456',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });
    const actions = store.getActions();

    expect(wrapper.find('.auth__alert-error').exists()).toBe(false);
    expect(actions[0].type).toBe(types.UI_REMOVE_ERROR);
  });
});
