import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote, startDeleting } from '../../../actions/notes';
import notesMock from '../../fixtures/notesMock';

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn(),
  startDeleting: jest.fn(),
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
    notes: notesMock,
    active: notesMock[0],
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe('Pruebas en <NoteScreen />', () => {
  beforeAll(() => {
    store.clearActions();
  });

  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe disparar el activeNote cuando un campo de la forma cambie', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Title de la Nota 1 actualizada',
      },
    });

    expect(activeNote).toHaveBeenLastCalledWith(initialState.notes.active.id, {
      id: initialState.notes.active.id,
      body: initialState.notes.active.body,
      title: 'Title de la Nota 1 actualizada',
      date: initialState.notes.active.date,
    });
  });

  test('debe hacer click en el botón delete', () => {
    const deleteButton = wrapper.find('button.btn-danger');
    deleteButton.simulate('click');

    expect(startDeleting).toHaveBeenCalledWith(initialState.notes.active.id);
  });

  test('debe mostrar la imagen de la nota', () => {
    initialState.notes.active = notesMock[1];
    const store = mockStore(initialState);
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <NoteScreen />
      </Provider>
    );
    const imageDivTag = wrapper.find('.notes__image');
    const imageUrl = initialState.notes.active.url;

    expect(imageDivTag.exists()).toBe(true);
    expect(typeof imageUrl).toBe('string');
  });
});
