const Messages = require('../mongoose/models/Messages');
const Users = require('../mongoose/models/Users');

module.exports = (socket) => {
  const io = socket.server;
  let user = socket.request.user;

  return {
    getMessages() {
      Messages
        .getMessages(user.location)
        .then((messages) => {
          socket.emit('messages', messages);
        })
        .catch((err) => console.log(err));
    },
    addMessage(text) {
      Messages
        .add(text, user)
        .then((message) => {
          io.sockets.to(user.location).emit('new message', message);
        })
        .catch((err) => console.log(err));
    },
    changeUser(userFields) {
      Users
        .change(user.id, userFields)
        .then((newUser) => {
          socket.request.user = user = newUser;
          io.setUserRoom(socket, user.location);
          socket.emit('change user', newUser);
        });
    },
  };
};
