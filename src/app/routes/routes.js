const routes = require('express').Router();
const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');
const walletRoutes = require('./wallet.routes');

routes.use(userRoutes);
routes.use(sessionRoutes);
routes.use(walletRoutes);

module.exports = routes;
