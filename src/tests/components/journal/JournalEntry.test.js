import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const note = {
  id: 10,
  date: 0,
  title: 'Title',
  body: 'Body',
  url: 'https://algunlugar.com/foto.jpg',
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note} />
  </Provider>
);

describe('Pruebas en <JournalEntry />', () => {
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe activar la nota', () => {
    wrapper.find('.journal__entry').simulate('click');
    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, { ...note })
    );
  });
});
