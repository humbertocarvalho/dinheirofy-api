const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserDao = require('./infra/user-dao');

exports.authenticate = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get user by userName
      const user = await new UserDao().findByUsername(userName);

      // Math Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          resolve(user);
        } else {
          // Pass didnt match
          reject('Authentication Failed');
        }
      });
    } catch (err) {
      // Email not found
      reject('Authentication Failed');
    }
  });
};
