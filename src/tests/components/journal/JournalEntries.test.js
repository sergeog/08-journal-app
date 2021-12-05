import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import notesMock from '../../fixtures/notesMock';
import { JournalEntries } from '../../../components/journal/JournalEntries';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  notes: {
    notes: notesMock,
  },
};
const store = mockStore(initialState);

const wrapper = mount(
  <Provider store={store}>
    <JournalEntries />
  </Provider>
);

describe('Pruebas en <JournalEntries />', () => {
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe mostrar los entries', () => {
    const journalEntryTag = wrapper.find('JournalEntry');
    expect(journalEntryTag.exists()).toBe(true);
  });
});
