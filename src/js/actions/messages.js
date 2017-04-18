export const getMessages = () => () => {
  socket.emit('get messages');
};

export const add = text => () => {
  socket.emit('add message', text);
};
