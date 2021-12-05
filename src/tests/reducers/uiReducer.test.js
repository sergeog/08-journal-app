import { uiReducer } from '../../reducers/uiReducer';
import { types } from '../../types/types';

describe('Pruebas en uiReducer', () => {
  const initialState = {
    loading: false,
    msgError: null,
  };

  test('debe realizar el UI_START_LOADING', () => {
    const action = {
      type: types.UI_START_LOADING,
    };

    const state = uiReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: true,
    };

    expect(state).toEqual(expectedState);
  });

  test('debe realizar el UI_FINISH_LOADING', () => {
    const currentState = {
      loading: true,
      msgError: null,
    };
    const action = {
      type: types.UI_FINISH_LOADING,
    };

    const state = uiReducer(currentState, action);
    const expectedState = {
      ...currentState,
      loading: false,
    };

    expect(state).toEqual(expectedState);
  });

  test('debe realizar el UI_SET_ERROR', () => {
    const action = {
      type: types.UI_SET_ERROR,
      payload: 'An error message text',
    };

    const state = uiReducer(initialState, action);
    const expectedState = {
      ...initialState,
      msgError: action.payload,
    };

    expect(state).toEqual(expectedState);
  });

  test('debe realizar el UI_REMOVE_ERROR', () => {
    const currentState = {
      ...initialState,
      msgError: 'An error message text',
    };
    const action = {
      type: types.UI_REMOVE_ERROR,
    };

    const state = uiReducer(currentState, action);
    const expectedState = {
      ...initialState,
      msgError: null,
    };

    expect(state).toEqual(expectedState);
  });

  test('no debe hacer cambios en el state', () => {
    const action = {
      type: 'Any type that does not exist',
    };

    const state = uiReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  test('debe utilizar el state por defecto', () => {
    const action = {
      type: 'Any type that does not exist',
    };

    const state = uiReducer(undefined, action);
    expect(state).toEqual(initialState);
  });
});
