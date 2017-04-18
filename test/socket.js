process.env.NODE_ENV = 'test';

const server = require('../server');
const chai = require('chai');
const should = chai.should();
const tools = require('./tools');
const socketsCompleatTime = 100;

const Users = require('../mongoose/models/Users');
const Messages = require('../mongoose/models/Messages');

describe('Socket actions', () => {
  const testUsers = [];
  testUsers.push({ fields: tools.getTestUserFields(1) });
  testUsers.push({ fields: tools.getTestUserFields(2) });
  testUsers.push({ fields: tools.getTestUserFields(3) });
  testUsers[2].fields.location = 'USA';

  const connectUser = (num) => (
    tools
      .getConnectedSocket(testUsers[num].fields)
      .then(socket => { testUsers[num].socket = socket; })
  );

  const setConnections = () => (
    connectUser(0)
      .then(() => connectUser(1))
      .then(() => connectUser(2))
      .catch((err) => console.log(err))
  );

  const disconnectSockets = () => {
    testUsers[0].socket.disconnect();
    testUsers[1].socket.disconnect();
    testUsers[2].socket.disconnect();
  };

  const createUser = (num) => {
    const newUser = new Users(testUsers[num].fields);
    return newUser.save();
  };

  before((done) => {
    Users
      .remove()
      .then(() => Messages.remove())
      .then(() => createUser(0))
      .then(() => createUser(1))
      .then(() => createUser(2))
      .then(() => setConnections())
      .then(() => done())
      .catch((err) => console.log(err));
  });

  describe('Change user', () => {
    it('user must have new name', (done) => {
      const newUserName = 'Igor';
      testUsers[0].socket.emit('change user', { name: newUserName });
      testUsers[0].socket.on('change user', (changedUser) => {
        changedUser.name.should.be.eql(newUserName);
        done();
      });
    });
  });

  describe('Messages', () => {
    it('add new messages user 1', (done) => {
      testUsers[0].message = 'test message user 1';

      testUsers[0].socket.emit('add message', testUsers[0].message);
      testUsers[0].socket.on('new message', (message) => {
        message.message.should.be.eql(testUsers[0].message);
      });
      testUsers[1].socket.on('new message', (message) => {
        message.message.should.be.eql(testUsers[0].message);
      });
      testUsers[2].socket.on('new message', (message) => {
        message.message.should.not.exist();
      });

      setTimeout(() => {
        disconnectSockets();
        done();
      }, socketsCompleatTime);
    });

    it('add new messages user 3', (done) => {
      testUsers[2].message = 'test message user 3';

      setConnections()
        .then(() => {
          testUsers[2].socket.emit('add message', testUsers[2].message);
          testUsers[0].socket.on('new message', (message) => {
            message.message.should.not.exist();
          });
          testUsers[1].socket.on('new message', (message) => {
            message.message.should.not.exist();
          });
          testUsers[2].socket.on('new message', (message) => {
            message.message.should.be.eql(testUsers[2].message);
          });

          setTimeout(() => {
            disconnectSockets();
            done();
          }, socketsCompleatTime);
        })
        .catch((err) => console.log(err));
    });

    it('get messages', (done) => {
      setConnections()
        .then(() => {
          testUsers[0].socket.emit('get messages');
          testUsers[2].socket.emit('get messages');
          testUsers[0].socket.on('messages', (messages) => {
            messages.length.should.be.eql(1);
          });
          testUsers[1].socket.on('messages', (messages) => {
            messages.length.should.not.exist();
          });
          testUsers[2].socket.on('messages', (messages) => {
            messages.length.should.be.eql(1);
          });

          setTimeout(done, socketsCompleatTime);
        })
        .catch((err) => console.log(err));
    });
  });
});
