const User = require('../models/User');

class UserDao {
  async create(user) {
    // Save user
    const newUser = await new User({
      userName: user.userName,
      name: user.name,
      email: user.email,
      password: user.password
    }).save();
  }

  async findByUsername(userName) {
    const user = await User.findOne({ userName });
    return user;
  }
}

module.exports = UserDao;
