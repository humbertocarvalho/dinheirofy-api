const { Wallet } = require('../models');
const { User } = require('../models');

class WalletController {
  async create(req, res) {
    const { description, userId } = req.body;

    console.log(req.body);
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
      UserId: userId
    });

    return res.json({ wallet });
  }

  async update(req, res) {
    const { description } = req.body;
    const { walletId } = req.params;

    if (!description) {
      return res
        .status(401)
        .json({ message: 'Could not update description to null' });
    }

    const wallet = await Wallet.findByPk(walletId);

    await wallet.update({ description });

    return res.json(wallet);
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
        user_id: userId
      }
    });

    return res.json(wallets);
  }

  async delete(req, res) {
    const { walletId } = req.params;

    await Wallet.destroy({
      where: { id: walletId }
    });

    return res.status(200).json({ message: 'Wallet was deleted succesfuly' });
  }
}

module.exports = new WalletController();
