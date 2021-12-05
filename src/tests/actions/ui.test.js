import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from '../../actions/ui';
import { types } from '../../types/types';

describe('Pruebas en ui-actions', () => {
  test('debe llamar correctamente el setError', () => {
    const errorMessage = 'Help!!!';
    const action = setError(errorMessage);
    const expectedValue = {
      type: types.UI_SET_ERROR,
      payload: errorMessage,
    };

    expect(action).toEqual(expectedValue);
  });

  test('debe llamar correctamente el removeError', () => {
    const action = removeError();
    const expectedValue = {
      type: types.UI_REMOVE_ERROR,
    };

    expect(action).toEqual(expectedValue);
  });

  test('debe llamar correctamente el startLoading', () => {
    const action = startLoading();
    const expectedValue = {
      type: types.UI_START_LOADING,
    };

    expect(action).toEqual(expectedValue);
  });

  test('debe llamar correctamente el finishLoading', () => {
    const action = finishLoading();
    const expectedValue = {
      type: types.UI_FINISH_LOADING,
    };

    expect(action).toEqual(expectedValue);
  });
});
