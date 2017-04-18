const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./mongoose/models/Users');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    Users
      .findOne({ email })
      .then((user) => {
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        if (!user.isCorrectPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      })
      .catch(err => console.log(err));
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users
      .findById(id)
      .then((user) => done(null, user))
      .catch(err => console.log(err));
  });
};
