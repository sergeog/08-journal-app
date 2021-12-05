import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { Sidebar } from '../../../components/journal/Sidebar';
import { Provider } from 'react-redux';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    uid: 'TESTING',
    name: 'Serge',
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    notes: [],
    active: null,
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe('Pruebas en <Sidebar />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe llamar el startLogout', () => {
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
  });

  test('debe llamar el startNewNote', () => {
    wrapper.find('.journal__new-entry').simulate('click');
    expect(startNewNote).toHaveBeenCalled();
  });
});
