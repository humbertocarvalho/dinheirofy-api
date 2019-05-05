const User = require('../models/User');

class UserDao {
  async create(user) {
    // Save user
    const newUser = await new User({
      email: user.email,
      password: user.password
    }).save();
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });

    return user;
  }
}

module.exports = UserDao;
