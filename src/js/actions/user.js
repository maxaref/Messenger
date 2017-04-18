import * as router from './router';
import socketConnect from '../socket';

export const getUser = callback => (dispatch) => {
  fetch('/api/get_user', { credentials: 'include' })
    .then(responce => responce.json())
    .then((json) => {
      if (json.email) {
        socketConnect();

        dispatch({
          type: 'AUTH_SUCCESS',
          user: json,
        });
      }

      callback();
    });
};

export function change(user) {
  return () => {
    socket.emit('change user', user);
  };
}

export const auth = (email, password) => (dispatch) => {
  fetch('/api/auth', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(responce => responce.json())
    .then((json) => {
      if (json.email) {
        socketConnect();

        dispatch({
          type: 'AUTH_SUCCESS',
          user: json,
        });
      } else {
        dispatch({
          type: 'AUTH_FAILED',
          message: json.message,
        });
      }
    });
};

export const logOut = () => (dispatch) => {
  fetch('/api/log_out', { credentials: 'include' })
    .then(() => {
      socket.disconnect();

      dispatch({
        type: 'LOGOUT',
      });

      dispatch(router.push('/auth/'));
    });
};

export function registration(data) {
  return (dispatch) => {
    fetch('/api/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(responce => responce.json())
      .then((json) => {
        if (json.email) {
          socketConnect();

          dispatch({
            type: 'AUTH_SUCCESS',
            user: json,
          });
        } else {
          dispatch({
            type: 'REGISTER_FAILED',
            message: json.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
