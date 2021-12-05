import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';

// asynchronous dispatch
export const startLogin = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        console.log(error);
        dispatch(finishLoading());
        Swal.fire('Error', error.message, 'error');
      });
  };
};

export const startRegister = (email, password, name) => {
  return (dispatch) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        console.log(error);
        Swal.fire('Error', error.message, 'error');
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

// synchronous dispatch
export const login = (uid, displayName) => ({
  type: types.LOGIN,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(noteLogout());
  };
};

export const logout = () => ({
  type: types.LOGOUT,
});
