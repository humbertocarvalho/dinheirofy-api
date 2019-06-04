const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    'Wallet',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      hooks: {}
    }
  );

  Wallet.associate = models => {
    Wallet.belongsTo(models.User, { constraints: true });
  };

  return Wallet;
};
