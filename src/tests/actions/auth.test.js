import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { login, logout, startLogin, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: 'TESTING',
  },
};

const store = mockStore(initialState);

describe('Pruebas en auth-actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('debe hacer el login síncrono - login', () => {
    const uid = 'TESTING';
    const displayName = 'Serge';
    const action = login(uid, displayName);

    expect(action).toEqual({
      type: types.LOGIN,
      payload: {
        uid,
        displayName,
      },
    });
  });

  test('debe hacer el logout síncrono - logout', () => {
    const action = logout();
    expect(action).toEqual({ type: types.LOGOUT });
  });

  test('debe hacer el logout asíncrono - startLogout', async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.LOGOUT);
    expect(actions[1].type).toBe(types.NOTES_LOGOUT_CLEANING);
  });

  test('debe hacer el login asíncrono - startLogin', async () => {
    await store.dispatch(startLogin('test@tesing.com', '123456'));
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.UI_START_LOADING);
    expect(actions[1].type).toBe(types.LOGIN);
    expect(actions[1].payload).toEqual({
      uid: expect.any(String),
      displayName: null,
    });
    expect(actions[2].type).toBe(types.UI_FINISH_LOADING);
  });

  // test('debe hacer el registro asíncrono - startRegister', async () => {
  //   await store.dispatch(
  //     startRegister('test2@tesing2.com', '123456', 'Test 2')
  //   );
  //   const actions = store.getActions();

  //   expect(actions[0].type).toBe(types.LOGIN);
  //   expect(actions[0].payload).toEqual({
  //     uid: expect.any(String),
  //     displayName: null,
  //   });
  // });
});
