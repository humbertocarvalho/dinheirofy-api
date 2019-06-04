const routes = require('express').Router();
const WalletController = require('../controllers/WalletController');

routes.post('/wallet', WalletController.create);

module.exports = routes;
