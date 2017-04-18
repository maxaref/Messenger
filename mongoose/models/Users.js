const mongoose = require('mongoose');
const db = require('../');
const md5 = require('crypto-js/md5');

const passwordToHash = (password) => md5(password).toString();

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
    set: passwordToHash,
  },
  location: {
    type: String,
    default: 'Ukraine',
  },
});

UserSchema.methods.isCorrectPassword = function (password) {
  return this.password === md5(password).toString();
};

UserSchema.statics.change = (userId, data) => (
  Users
    .findById(userId)
    .then((user) => {
      const updatedUser = Object.assign(user, data);
      return updatedUser.save();
    })
    .catch(err => { console.log(err); })
);

const Users = db.model('Users', UserSchema);
module.exports = Users;
