const { Wallet } = require('../models');

class WalletController {
  async create(req, res) {
    const { description, userId } = req.body;

    console.log(description);
    console.log(userId);

    if (!description || !userId) {
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
