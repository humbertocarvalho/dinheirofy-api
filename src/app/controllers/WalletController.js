const { Wallet } = require('../models');
const { User } = require('../models');

class WalletController {
  async create(req, res) {
    const { description, userId } = req.body;

    if (!description || !userId) {
      return res.status(401).json({ message: 'Invalid inputs' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: `User with ID ${userId} was not found` });
    }

    const wallet = await Wallet.create({
      description,
      userId
    });

    return res.json({ wallet });
  }

  async update(req, res) {
    const { description } = req.body;

    if (!description) {
      return res
        .status(401)
        .json({ message: 'Could not update description to null' });
    }
  }

  async get(req, res) {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: `User with ID ${userId} was not found` });
    }

    const wallets = await Wallet.findAll({
      where: {
        userId
      }
    });

    return res.json(wallets.toJSON());
  }

  async delete(req, res) {}
}

module.exports = new WalletController();
