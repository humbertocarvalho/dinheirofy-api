const routes = require('express').Router();
const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');

routes.use(userRoutes);
routes.use(sessionRoutes);

module.exports = routes;
