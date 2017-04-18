const app = require('./app');
const conf = require('./config');

app.get('http').listen(conf.port, () => {
  console.log(`listening on *: ${conf.port}`);
});
