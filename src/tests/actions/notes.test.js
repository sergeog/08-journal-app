import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  activeNote,
  addNewNote,
  deleteNote,
  noteLogout,
  refreshNote,
  setNotes,
  startDeleting,
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import notesMock from '../fixtures/notesMock';

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    return 'http://hola-mundo.com/cosa.jpg';
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: 'TESTING',
  },
  notes: {
    active: {
      id: '0UI9CKB5Own3Vx7Ss8iB',
      title: 'Title',
      body: 'Body',
    },
  },
};

const store = mockStore(initialState);

describe('Pruebas en notes-actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('debe crear una nueva nota - startNewNote', async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();
    const expectedPayload = {
      id: expect.any(String),
      title: '',
      body: '',
      date: expect.any(Number),
    };

    expect(actions[0]).toEqual({
      type: types.NOTES_ACTIVE,
      payload: expectedPayload,
    });

    expect(actions[1]).toEqual({
      type: types.NOTES_ADD_NEW,
      payload: expectedPayload,
    });

    const docId = actions[0].payload.id;
    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test('debe cargar las notas - startLoadingNotes', async () => {
    await store.dispatch(startLoadingNotes('TESTING'));
    const actions = store.getActions();
    const expectedPayload = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0]).toEqual({
      type: expect.any(String),
      payload: expect.any(Array),
    });

    expect(actions[0].payload[0]).toMatchObject(expectedPayload);
  });

  test('debe actualizar la nota - startSaveNote', async () => {
    const note = {
      id: '0UI9CKB5Own3Vx7Ss8iB',
      title: 'Título',
      body: 'Body',
    };

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    const docReference = await db
      .doc(`/TESTING/journal/notes/${note.id}`)
      .get();

    expect(actions[0].type).toBe(types.NOTES_UPDATED);
    expect(docReference.data().title).toBe(note.title);
    expect(docReference.data().body).toBe(note.body);
  });

  test('debe actualizar la URL del entry - startUploading', async () => {
    const file = new File([], 'foto.jpg');
    await store.dispatch(startUploading(file));
    const docReference = await db
      .doc('/TESTING/journal/notes/0UI9CKB5Own3Vx7Ss8iB')
      .get();

    expect(docReference.data().url).toBe('http://hola-mundo.com/cosa.jpg');
  });

  test('debe eliminar la nota - startDeleting', async () => {
    const id = expect.any(String);
    await store.dispatch(startDeleting(id));
    const actions = store.getActions();
    console.log(actions);

    expect(actions[1].type).toBe(types.NOTES_DELETE);
    expect(actions[1].payload).toBe(id);
  });

  test('debe activar la nota - activeNote', () => {
    const note = notesMock[0];
    store.dispatch(activeNote(note.id, note));
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.NOTES_ACTIVE);
    expect(actions[0].payload).toEqual(note);
  });

  test('debe crear una nueva nota - addNewNote', () => {
    const note = notesMock[0];
    store.dispatch(addNewNote(note.id, note));
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.NOTES_ADD_NEW);
    expect(actions[0].payload).toEqual(note);
  });

  test('debe cargar las notas - setNotes', () => {
    store.dispatch(setNotes(notesMock));
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.NOTES_LOAD);
    expect(actions[0].payload).toEqual(notesMock);
  });

  test('debe actualizar la nota - refreshNote', () => {
    const note = notesMock[0];
    store.dispatch(refreshNote(note.id, note));
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.NOTES_UPDATED);
    expect(actions[0].payload).toEqual({
      id: note.id,
      note,
    });
  });

  test('debe eliminar la nota - deleteNote', () => {
    const id = expect.any(String);
    store.dispatch(deleteNote(id));
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.NOTES_DELETE);
    expect(actions[0].payload).toBe(id);
  });

  test('debe limpiar las notas al cerrar sesión - noteLogout', () => {
    store.dispatch(noteLogout());
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.NOTES_LOGOUT_CLEANING);
  });
});
