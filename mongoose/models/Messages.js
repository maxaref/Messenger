const mongoose = require('mongoose');
const db = require('../');

const MessageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'Users' },
  message: String,
  date: { type: Date, default: Date.now },
  location: String,
});

MessageSchema.statics.getMessages = (location) => (
  Messages
    .find({ location })
    .populate({ path: 'user', select: { name: 1 } })
    .catch(err => { console.log(err); })
);

MessageSchema.statics.add = (text, user) => {
  const message = new Messages({
    message: text,
    user: user.id,
    location: user.location,
  });

  return message
    .save()
    .then((newMessage) => {
      const publicMessage = newMessage.toObject();
      publicMessage.user = {
        name: user.name,
      };
      return publicMessage;
    })
    .catch(err => { console.log(err); });
};

const Messages = db.model('Messages', MessageSchema);
module.exports = Messages;
