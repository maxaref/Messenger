const handlersFactory = require('./handlers');

module.exports = (io) => {
  io.setUserRoom = (socket, room) => {
    if (socket.room) socket.leave(socket.room);
    socket.room = room;
    socket.join(socket.room);
  };

  io.on('connection', (socket) => {
    const handlers = handlersFactory(socket);

    const user = socket.request.user;
    io.setUserRoom(socket, user && user.location);

    socket.on('get messages', handlers.getMessages);
    socket.on('add message', handlers.addMessage);
    socket.on('change user', handlers.changeUser);
  });
};
