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
      return res.status(401).json({ message: 'Invalid inputs' });
    }

    const wallet = await Wallet.create({
      description,
      userId
    });

    return res.json({ wallet });
  }
}

module.exports = new WalletController();
