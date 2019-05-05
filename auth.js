const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserDao = require('./infra/user-dao');

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get user by email
      const user = await new UserDao().findByEmail(email);

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
