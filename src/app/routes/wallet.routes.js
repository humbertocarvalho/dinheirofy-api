const routes = require('express').Router();
const WalletController = require('../controllers/WalletController');

routes.get('/wallet/:userId', WalletController.get);
routes.post('/wallet', WalletController.create);
routes.put('/wallet/:walletId', WalletController.update);
routes.delete('/wallet/:walletId', WalletController.delete);

module.exports = routes;
