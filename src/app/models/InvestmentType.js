const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const InvestmentType = sequelize.define(
    'InvestmentType',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      hooks: {}
    }
  );

  return InvestmentType;
};
