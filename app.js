const conf = require('./config');
const express = require('express');
const socket = require('./socket');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const middlewares = require('./middlewares');
const setAuthStrategy = require('./setAuthStrategy');
const helmet = require('helmet');

app.set('http', http);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser(conf.SESSION_SECRET_KEY));

const sessionMiddleware = session({
  resave: true,
  saveUninitialized: true,
  store: new MongoStore(conf.mongo_store),
  secret: conf.SESSION_SECRET_KEY,
});
app.use(sessionMiddleware);

setAuthStrategy();
app.use(passport.initialize());
app.use(passport.session());

const setSessionIdFromQuery = (socketReq) => {
  const headers = socketReq.request.headers;
  if (socketReq.handshake.query.session_id) {
    headers.cookie = `connect.sid=${socketReq.handshake.query.session_id}; Path=/; HttpOnly`;
  }
};

io.use((socketReq, next) => {
  setSessionIdFromQuery(socketReq);
  sessionMiddleware(socketReq.request, {}, next);
});
io.use((socketReq, next) => {
  passport.initialize()(socketReq.request, {}, next);
});
io.use((socketReq, next) => {
  passport.session()(socketReq.request, {}, next);
});

middlewares(app);

socket(io);

const publicDir = `${__dirname}/public`;
app.use(express.static(publicDir));

app.get('*', (req, res) => {
  res.sendFile(`${publicDir}/index.html`);
});

module.exports = app;
