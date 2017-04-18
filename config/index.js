
let database = 'messages';
if (process.env.NODE_ENV === 'test') database = 'test';

module.exports = {
  port: 3000,
  SESSION_SECRET_KEY: 'AD2wkjG3CawKA4234DaW1D',
  db: {
    host: 'mongodb://localhost/',
    name: database,
  },
  mongo_store: {
    url: 'mongodb://localhost/messages',
  },
};
