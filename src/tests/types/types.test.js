import { types } from '../../types/types';

describe('Pruebas en types.js', () => {
  const mockTypes = {
    LOGIN: '[Auth] Login',
    LOGOUT: '[Auth] Logout',

    UI_START_LOADING: '[UI] Start loading',
    UI_FINISH_LOADING: '[UI] Finish loading',

    UI_SET_ERROR: '[UI] Set error',
    UI_REMOVE_ERROR: '[UI] Remove error',

    NOTES_ADD_NEW: '[Notes] New Note',
    NOTES_ACTIVE: '[Notes] Set Active Note',
    NOTES_LOAD: '[Notes] Load Notes',
    NOTES_UPDATED: '[Notes] Note updated',
    NOTES_FILE_URL: '[Notes] Image url updated',
    NOTES_DELETE: '[Notes] Delete note',
    NOTES_LOGOUT_CLEANING: '[Notes] Logout cleaning',
  };

  test('debe evaluar que existan todos los types correctamente', () => {
    expect(types).toEqual(mockTypes);
  });
});
