import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import notesMock from '../../fixtures/notesMock';
import { NotesAppBar } from '../../../components/notes/NotesAppBar';
import { startSaveNote, startUploading } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
  startSaveNote: jest.fn(),
  startUploading: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  notes: {
    notes: notesMock,
    active: notesMock[0],
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <NotesAppBar />
  </Provider>
);

describe('Pruebas en <NotesAppBar />', () => {
  test('debe hacer click en el botón Save', () => {
    wrapper.find('button#btn-save').simulate('click');
    expect(startSaveNote).toHaveBeenCalledWith(initialState.notes.active);
  });

  test('debe seleccionar un archivo del campo fileSelector', async () => {
    const fileInput = wrapper.find('input[name="file"]');
    const response = await fetch(
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
    );
    const blob = await response.blob();
    const file = new File([blob], 'foto.png');

    fileInput.simulate('change', {
      target: {
        files: [file],
      },
    });

    expect(startUploading).toHaveBeenCalledWith(file);
  });
});
