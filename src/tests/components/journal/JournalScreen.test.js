import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import { JournalScreen } from '../../../components/journal/JournalScreen';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    name: 'Serge',
  },
  notes: {
    notes: [],
    active: null,
  },
};
const store = mockStore(initialState);

const wrapper = mount(
  <Provider store={store}>
    <JournalScreen />
  </Provider>
);

describe('Pruebas en <JournalScreen />', () => {
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe mostrar el componente <NothingSelected /> cuando no haya alguna nota activa', () => {
    const nothingSelectedTag = wrapper.find('NothingSelected');
    expect(nothingSelectedTag.exists()).toBe(true);
  });
});
