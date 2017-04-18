const conf = require('../config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
module.exports = mongoose.createConnection(conf.db.host + conf.db.name);
