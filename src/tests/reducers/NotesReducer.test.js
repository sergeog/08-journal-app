import { notesReducer } from '../../reducers/NotesReducer';
import { types } from '../../types/types';
import notesMock from '../fixtures/notesMock';

describe('Pruebas en NotesReducer', () => {
  const initialState = {
    notes: [],
    active: null,
  };

  test('debe realizar el NOTES_ACTIVE', () => {
    const currentState = {
      notes: notesMock,
      active: null,
    };

    const action = {
      type: types.NOTES_ACTIVE,
      payload: {
        ...notesMock[0],
      },
    };

    const state = notesReducer(currentState, action);
    const expectedState = {
      notes: currentState.notes,
      active: action.payload,
    };

    expect(state).toEqual(expectedState);
  });

  test('debe realizar el NOTES_ADD_NEW', () => {
    const action = {
      type: types.NOTES_ADD_NEW,
      payload: {
        id: 'abcd1234',
        date: 1608420380881,
        body: 'Body de la nueva Nota',
        title: 'Title de la nueva Nota',
      },
    };

    const state = notesReducer(initialState, action);
    const expectedState = {
      ...initialState,
      notes: [action.payload, ...initialState.notes],
    };

    expect(state).toEqual(expectedState);
  });

  test('debe realizar el NOTES_LOAD', () => {
    const action = {
      type: types.NOTES_LOAD,
      payload: notesMock,
    };

    const state = notesReducer(initialState, action);
    const expectedState = {
      ...initialState,
      notes: [...action.payload],
    };

    expect(state).toEqual(expectedState);
  });

  test('debe realizar el NOTES_UPDATED', () => {
    const noteToUpdate = {
      id: '1CFevStfQVVzOksvbGcL',
      date: 1608420380881,
      body: 'Body de la Nota 1 Actualizada',
      title: 'Title de la Nota 1 Actualizada',
    };
    const initialState = {
      notes: notesMock,
      active: noteToUpdate,
    };

    const action = {
      type: types.NOTES_UPDATED,
      payload: {
        id: noteToUpdate.id,
        note: noteToUpdate,
      },
    };

    const state = notesReducer(initialState, action);
    const noteUpdated = state.notes.find((note) => note.id === noteToUpdate.id);

    expect(noteUpdated).toEqual(noteToUpdate);
  });

  test('debe realizar el NOTES_DELETE', () => {
    const currentState = {
      notes: notesMock,
      active: notesMock[0],
    };
    const noteIdToDelete = notesMock[0].id;

    const action = {
      type: types.NOTES_DELETE,
      payload: noteIdToDelete,
    };
    const state = notesReducer(currentState, action);
    const noteDeleted = state.notes.find((note) => note.id === noteIdToDelete);

    expect(noteDeleted).toBe(undefined);
  });

  test('debe realizar el NOTES_LOGOUT_CLEANING', () => {
    const currentState = {
      notes: notesMock,
      active: notesMock[0],
    };

    const action = {
      type: types.NOTES_LOGOUT_CLEANING,
    };
    const state = notesReducer(currentState, action);

    expect(state).toEqual(initialState);
  });

  test('no debe hacer cambios en el state', () => {
    const action = {
      type: 'Any type that does not exist',
    };

    const state = notesReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  test('debe utilizar el state por defecto', () => {
    const action = {
      type: 'Any type that does not exist',
    };

    const state = notesReducer(undefined, action);

    expect(state).toEqual(initialState);
  });
});
