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
        .json({ message: 'This email is already registred' });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    return res.json({ user, token: user.generateToken() });
  }
}

module.exports = new UserController();
