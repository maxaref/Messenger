const request = require('supertest');
const Promise = require('bluebird');
const io = require('socket.io-client');
const conf = require('../config');
const setCookie = require('set-cookie-parser');
const serverUrl = `http://127.0.0.1:${conf.port}`;

let tools = {
  auth(agent = request.agent(serverUrl), email, password, cb) {
    agent
      .post('/api/auth')
      .send({ email, password })
      .end(cb);
  },
  getResponceSID(result) {
    const cookies = setCookie.parse(result.headers['set-cookie']);
    const sid = cookies.find((cookie) => cookie.name === 'connect.sid').value;
    return sid;
  },
  getConnectedSocket({ email, password }) {
    return this
      .authAsync(undefined, email, password)
      .then((responce) => (
        io(
          serverUrl,
          {
            query: `session_id=${tools.getResponceSID(responce)}`,
          }
        )
      ));
  },
  getTestUserFields(num) {
    return {
      email: `test${num}@gmail.com`,
      password: '123456',
      name: `Max ${num}`,
    };
  },
};

tools = Promise.promisifyAll(tools);

module.exports = tools;
