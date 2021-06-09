const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({}, { strict: false });

let Users;
try {
  Users = mongoose.model('users', usersSchema);
} catch (err) {
  Users = mongoose.model('users');
}

module.exports = Users;
