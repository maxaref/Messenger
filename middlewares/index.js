const usersHandlers = require('./usersHandlers');
const Promise = require('bluebird');

module.exports = (app) => {
  app.use((req, res, next) => {
    req.login = Promise.promisify(req.login, { context: req });
    next();
  });

  app.post('/api/auth', usersHandlers.auth);
  app.get('/api/get_user', usersHandlers.getUser);
  app.get('/api/log_out', usersHandlers.logOut);
  app.post('/api/register', usersHandlers.register);
};
