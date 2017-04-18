const passport = require('passport');
const Users = require('../mongoose/models/Users');

module.exports = {
  auth: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (!user) return res.send(err || info);

      return req.login(user)
        .then(() => res.send(user))
        .catch((error) => next(error));
    })(req, res, next);
  },
  getUser: (req, res) => {
    const user = req.user;
    res.send(user || {});
  },
  logOut: (req, res) => {
    req.logout();
    res.end();
  },
  register: (req, res) => {
    const user = new Users(req.body);

    user
      .save()
      .catch((err) => { throw new Error('Email already used.'); })
      .then((newUser) => req.login(newUser))
      .then(() => res.send(user))
      .catch((err) => { res.send({ error: true, message: err.message }); });
  },
};
