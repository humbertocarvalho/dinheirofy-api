const { User } = require('../models');

class UserController {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({ message: 'Invalid inputs' });
    }

    const findUser = await User.findOne({ where: { email } });

    if (findUser) {
      return res
        .status(200)
        .json({ message: 'This email is already registered' });
    }

    const user = await User.create({
      name,
      email,
      password
    });
    res.set('x-access-token', user.generateToken());
    return res.json({ user });
  }

  async exists(req, res) {
    const { email } = req.params;

    const user = await User.findOne({ where: { email } });

    return res.json(!!user);
  }
}

module.exports = new UserController();
