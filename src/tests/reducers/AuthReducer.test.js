import { authReducer } from '../../reducers/AuthReducer';
import { types } from '../../types/types';

describe('Pruebas en el AuthReducer.js', () => {
  test('debe hacer el LOGIN', () => {
    const action = {
      type: types.LOGIN,
      payload: {
        uid: 'abc123',
        displayName: 'Serge',
      },
    };
    const state = authReducer({}, action);
    const expectedState = {
      uid: 'abc123',
      name: 'Serge',
    };

    expect(state).toEqual(expectedState);
  });

  test('debe hacer el LOGOUT', () => {
    const initState = {
      uid: 'abc123',
      name: 'Serge',
    };

    const action = {
      type: types.LOGOUT,
    };
    const state = authReducer(initState, action);
    const expectedState = {};

    expect(state).toEqual(expectedState);
  });

  test('no debe hacer cambios en el state', () => {
    const initState = {
      uid: 'abc123',
      name: 'Serge',
    };

    const action = {
      type: 'Any action that does not exist',
    };
    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });

  test('debe utilizar el state por defecto', () => {
    const initState = {
      uid: 'abc123',
      name: 'Serge',
    };

    const action = {
      type: 'Any action that does not exist',
    };
    const state = authReducer(undefined, action);

    expect(state).toEqual({});
  });
});
