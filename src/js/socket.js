import io from 'socket.io-client';
import store from './store';

export default function socketConnect() {
  window.socket = io();

  socket.on('messages', (messages) => {
    store.dispatch({
      type: 'SET_MESSAGES',
      messages,
    });
  });

  socket.on('new message', (message) => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      message,
    });
  });

  socket.on('change user', (user) => {
    store.dispatch({
      type: 'CHANGE_USER',
      user,
    });
  });
}
